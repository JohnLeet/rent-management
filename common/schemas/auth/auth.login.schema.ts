import { z } from 'zod';

export const AuthLoginSchema = z.object({
    email: z.string().email('Email должен быть валидным'),
    password: z.string().min(8, 'Пароль должен содержать не менее 8 символов'),
});
export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>;
