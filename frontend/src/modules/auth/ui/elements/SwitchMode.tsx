import { ModeButton } from './ModeButton';
import type { Mode } from '../../auth.types.ts';

interface SwitchModeProps {
    mode: Mode;
    onChange: (mode: Mode) => void;
    className?: string;
}
const modes = [
    { value: 'login', label: 'Войти' },
    { value: 'register', label: 'Регистрация' },
] as const;

export const SwitchMode = ({ mode, onChange, className }: SwitchModeProps) => {
    return (
        <div className={className}>
            {modes.map(({ value, label }) => (
                <ModeButton
                    key={value}
                    onClick={() => onChange(value)}
                    variant={mode === value ? 'active' : 'default'}
                >
                    {label}
                </ModeButton>
            ))}
        </div>
    );
};
