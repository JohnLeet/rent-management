import { api } from '@shared/api';
import { type AuthLoginDTO, type AuthRegistrationDTO } from '@commonSchemas/auth';

export const authApi = {
    login: (data: AuthLoginDTO) => api.post('/auth/login', data).then((r) => r.data),
    registration: (data: AuthRegistrationDTO) =>
        api.post('/auth/registration', data).then((r) => r.data),
};
