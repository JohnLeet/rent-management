import { AuthLoginSchema, AuthRegistrationSchema } from '@schemas/auth';
import type { Role } from '@/prisma/prisma-client/enums';

export type { AuthRegistrationDTO, AuthLoginDTO } from '@schemas/auth';
export type { Role } from '@/prisma/prisma-client/enums';

export const registrationApiSchema = {
    summary: 'Registration new user',
    body: AuthRegistrationSchema,
};
export const loginApiSchema = {
    summary: 'Login user',
    body: AuthLoginSchema,
};

export { AuthLoginSchema, AuthRegistrationSchema };

export const userSelect = {
    id: true,
    email: true,
    name: true,
    role: true,
} as const;

export type UserResponseDTO = Prisma.UserGetPayload<{
    select: typeof userSelect;
}>;

export interface JwtPayload {
    id: string;
    role: Role;
    email: string;
}
