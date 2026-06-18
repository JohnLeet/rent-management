import { z } from 'zod';

export const AuthLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>;
