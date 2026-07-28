import { ApiClient } from '@shared/lib';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://127.2.0.1:3000';

export const api = new ApiClient(`${apiUrl}/api/v1`);

/*api.addRequestInterceptor((config) => {
    config.credentials = 'include';
    return config;
});*/

api.addResponseInterceptor((res) => {
    if (res.status === 401 || res.status === 500) {
        window.location.href = '/auth';
    }
    return res;
});

export default api;
