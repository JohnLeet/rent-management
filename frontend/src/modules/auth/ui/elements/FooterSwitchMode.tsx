import type { Mode } from '../../auth.types.ts';

interface FooterSwitchModeProps {
    className?: string;
    mode: Mode;
    onChange: (mode: Mode) => void;
}
type ModeMap = {
    login: 'register';
    register: 'login';
};

type VariantConfig<T extends Mode> = {
    question: string;
    label: string;
    trigger: ModeMap[T];
};

const variants = {
    login: {
        question: 'Нет аккаунта?',
        label: 'Зарегистрироваться',
        trigger: 'register',
    },
    register: {
        question: 'Уже есть аккаунт?',
        label: 'Войти',
        trigger: 'login',
    },
} satisfies {
    [K in Mode]: VariantConfig<K>;
};

export const FooterSwitchMode = ({ className, mode, onChange }: FooterSwitchModeProps) => {
    const variant = variants[mode];
    return (
        <div className="text-center pb-8 text-xs text-gray-400">
            <span>{`${variant.question}`} </span>
            <button
                type="button"
                onClick={() => onChange(variant.trigger)}
                className="text-blue-600 hover:underline"
            >
                {`${variant.label}`}
            </button>
        </div>
    );
};
