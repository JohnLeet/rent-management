import { z } from 'zod';

export const AuthRegistrationSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(8),
});
export type AuthRegistrationDTO = z.infer<typeof AuthRegistrationSchema>;
