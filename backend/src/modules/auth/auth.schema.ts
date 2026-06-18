import { AuthLoginSchema, AuthRegistrationSchema } from '@schemas/auth';
import { Role } from '@/prisma/prisma-client/enums';

export const registrationApiSchema = {
    summary: 'Registration new user',
    body: AuthRegistrationSchema,
};
export const loginApiSchema = {
    summary: 'Login user',
    body: AuthLoginSchema,
};

export type { AuthRegistrationDTO, AuthLoginDTO } from '@schemas/auth';
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
export type { Role } from '@/prisma/prisma-client/enums';
