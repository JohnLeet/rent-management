import { z } from 'zod';

export const AuthRegistrationSchema = z.object({
    email: z.string().email('Email должен быть валидным'),
    name: z.string().min(3, 'Имя должно содержать не менее 3 символов'),
    password: z.string().min(8, 'Пароль должен содержать не менее 8 символов'),
});
export type AuthRegistrationDTO = z.infer<typeof AuthRegistrationSchema>;
