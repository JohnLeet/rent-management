import { authApi } from './auth.api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
    return {
        isAuthenticated: false,
    };
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authApi.login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth.login'] });
        },
        onError: (error) => {
            console.error('Ошибка создания:', error);
        },
    });
};

export const useRegistration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: authApi.registration,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth.registration'] });
        },
        onError: (error) => {
            console.error('Ошибка создания:', error);
        },
    });
};
