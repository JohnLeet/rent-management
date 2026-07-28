import { prisma } from '@shared/db/prisma';
import { AppError } from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import {
    type AuthLoginDTO,
    type AuthRegistrationDTO,
    UserResponseDTO,
    userSelect,
} from './auth.schema';

export const authService = {
    async register(data: AuthRegistrationDTO): Promise<UserResponseDTO> {
        const hash = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({
            data: { ...data, password: hash },
            select: userSelect,
        });
        return user;
    },

    async login(data: AuthLoginDTO): Promise<UserResponseDTO> {
        const userWithPasswordSelect = {
            ...userSelect,
            password: true,
        } as const;

        const user = await prisma.user.findUnique({
            where: { email: data.email },
            select: userWithPasswordSelect,
        });
        if (!user) throw new AppError('Invalid credentials', 401);

        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) throw new AppError('Invalid credentials', 401);
        const { password, ...safeUser } = user;
        return safeUser;
    },
};
