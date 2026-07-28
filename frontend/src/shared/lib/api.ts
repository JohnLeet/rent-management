// src/lib/api.ts
// Обёртка над fetch — покрывает основные фичи Axios

// ─── Типы ────────────────────────────────────────────────────────────────────

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    timeout?: number;
    signal?: AbortSignal;
}

interface ApiResponse<T> {
    data: T;
    status: number;
    headers: Headers;
}

// Интерсепторы — аналог axios.interceptors
interface Interceptors {
    request: Array<(config: RequestInit & { url: string }) => RequestInit & { url: string }>;
    response: Array<(res: ApiResponse<unknown>) => ApiResponse<unknown>>;
}

// ─── Класс ApiClient ──────────────────────────────────────────────────────────

export class ApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;
    private interceptors: Interceptors = { request: [], response: [] };

    constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
        this.baseURL = baseURL.replace(/\/$/, ''); // убираем trailing slash
        this.defaultHeaders = defaultHeaders;
    }

    // Добавить request-интерсептор (например, подставить токен)
    addRequestInterceptor(
        fn: (config: RequestInit & { url: string }) => RequestInit & { url: string }
    ) {
        this.interceptors.request.push(fn);
    }

    // Добавить response-интерсептор (например, логировать ошибки)
    addResponseInterceptor(fn: (res: ApiResponse<unknown>) => ApiResponse<unknown>) {
        this.interceptors.response.push(fn);
    }

    // Приватный метод — собирает и выполняет запрос
    private async request<T>(
        method: Method,
        path: string,
        body?: unknown,
        config: RequestConfig = {}
    ): Promise<ApiResponse<T>> {
        // 1. Собираем URL с query params
        const url = new URL(this.baseURL + path);
        if (config.params) {
            Object.entries(config.params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
        }

        // 2. Собираем заголовки
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...this.defaultHeaders,
            ...config.headers,
        };

        // 3. Конфиг запроса
        let fetchConfig: RequestInit & { url: string } = {
            url: url.toString(),
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal: config.signal,
            credentials: 'include',
        };

        // 4. Прогоняем через request-интерсепторы
        for (const interceptor of this.interceptors.request) {
            fetchConfig = interceptor(fetchConfig);
        }

        // 5. Таймаут — через AbortController
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        let abortController: AbortController | undefined;

        if (config.timeout && !config.signal) {
            abortController = new AbortController();
            fetchConfig.signal = abortController.signal;
            timeoutId = setTimeout(() => abortController!.abort(), config.timeout);
        }

        try {
            const res = await fetch(fetchConfig.url, fetchConfig);

            if (timeoutId) clearTimeout(timeoutId);

            // 6. Главная фишка: бросаем ошибку на 4xx/5xx (fetch молчит)
            if (!res.ok) {
                let errorBody: unknown;
                try {
                    errorBody = await res.json();
                } catch {
                    errorBody = null;
                }

                const error = new ApiError(
                    `HTTP ${res.status}: ${res.statusText}`,
                    res.status,
                    errorBody
                );
                throw error;
            }

            // 7. Парсим тело (если есть)
            const data: T = res.status === 204 ? (null as T) : await res.json();

            let response: ApiResponse<unknown> = { data, status: res.status, headers: res.headers };

            // 8. Прогоняем через response-интерсепторы
            for (const interceptor of this.interceptors.response) {
                response = interceptor(response);
            }

            return response as ApiResponse<T>;
        } catch (err) {
            if (timeoutId) clearTimeout(timeoutId);

            // Красивая ошибка таймаута
            if (err instanceof DOMException && err.name === 'AbortError') {
                throw new ApiError(`Timeout after ${config.timeout}ms`, 0, null);
            }
            throw err;
        }
    }

    // ─── Публичные методы (аналог axios.get / .post / .put / .delete) ──────────

    get<T>(path: string, config?: RequestConfig) {
        return this.request<T>('GET', path, undefined, config);
    }

    post<T>(path: string, body?: unknown, config?: RequestConfig) {
        return this.request<T>('POST', path, body, config);
    }

    put<T>(path: string, body?: unknown, config?: RequestConfig) {
        return this.request<T>('PUT', path, body, config);
    }

    patch<T>(path: string, body?: unknown, config?: RequestConfig) {
        return this.request<T>('PATCH', path, body, config);
    }

    delete<T>(path: string, config?: RequestConfig) {
        return this.request<T>('DELETE', path, undefined, config);
    }
}

// ─── Кастомный класс ошибки (как axios AxiosError) ───────────────────────────

export class ApiError extends Error {
    status: number;
    body: unknown;

    constructor(message: string, status: number, body: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.body = body;
    }
}

// ─── Создание инстанса (как axios.create) ─────────────────────────────────────
