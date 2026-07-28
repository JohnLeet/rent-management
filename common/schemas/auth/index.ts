export { AuthRegistrationSchema, type AuthRegistrationDTO } from './auth.registration.schema';
export { AuthLoginSchema, type AuthLoginDTO } from './auth.login.schema';

export type AuthFormValues = AuthLoginDTO | AuthRegistrationDTO;
