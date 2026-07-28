import { useState } from 'react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FooterSwitchMode, Input, SubmitButton, SwitchMode } from '../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin, useRegistration } from '../../auth.hooks';

import type { Mode } from '../../auth.types';
import { type AuthFormValues, AuthLoginSchema, AuthRegistrationSchema } from '@commonSchemas/auth';

export const AuthForm = () => {
    const [mode, setMode] = useState<Mode>('login');
    const { mutate: registration, isPendingRegistration } = useRegistration();
    const { mutate: login, isPendingLogin } = useLogin();
    const authSchema = mode === 'login' ? AuthLoginSchema : AuthRegistrationSchema;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        getValues,
    } = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
    });
    const onSubmit = async (data: AuthFormValues) => {
        if (mode === 'login') {
            login(data);
        } else {
            registration(data);
        }
        reset();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Tab switcher */}

                    <SwitchMode
                        className="flex border-b border-gray-200"
                        onChange={setMode}
                        mode={mode}
                    />

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {mode === 'login' ? 'Добро пожаловать' : 'Создать аккаунт'}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {mode === 'login'
                                    ? 'Введите данные для входа'
                                    : 'Заполните форму для регистрации'}
                            </p>
                        </div>

                        {mode === 'register' && (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Имя</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        {...register('name')}
                                        type="text"
                                        placeholder="Иван Иванов"
                                        error={errors.name}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500">{`${errors.name?.message}`}</p>
                                )}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    {...register('email')}
                                    type="email"
                                    placeholder="you@example.com"
                                    error={errors.email}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500">{`${errors.email?.message}`}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">Пароль</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    type="password"
                                    {...register('password')}
                                    placeholder="••••••••"
                                    error={errors.password}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-500">{`${errors.password?.message}`}</p>
                            )}
                        </div>
                        <SubmitButton className="bg-blue-100">
                            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                            <ArrowRight className="w-4 h-4" />
                        </SubmitButton>
                    </form>
                    <FooterSwitchMode
                        className="text-center pb-8 text-xs text-gray-400"
                        onChange={setMode}
                        mode={mode}
                    />
                </div>
            </div>
        </div>
    );
};
