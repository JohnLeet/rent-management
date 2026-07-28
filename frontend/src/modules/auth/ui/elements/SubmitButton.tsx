import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui.helper';

const baseLayout =
    'w-full flex items-center justify-center gap-2 transition-colors rounded-lg cursor-pointer';
const state = 'disabled:opacity-50 disabled:cursor-not-allowed';

const buttonVariants = cva([baseLayout, state], {
    variants: {
        variant: {
            primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:hover:bg-blue-600',
        },
        size: {
            md: 'text-sm font-medium py-2.5',
        },
        shape: {
            rounded: '',
        },
    },
    defaultVariants: {
        variant: 'primary',
        shape: 'rounded',
        size: 'md',
    },
});

interface ButtonProps
    extends
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
        VariantProps<typeof buttonVariants> {}

export const SubmitButton = ({ variant, size, children, className, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            type="submit"
            className={cn(className, buttonVariants({ variant, size }))}
        >
            {children}
        </button>
    );
};
