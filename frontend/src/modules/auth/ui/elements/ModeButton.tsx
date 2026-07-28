import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../ui.helper.ts';

const baseLayout = 'flex-1 py-4 text-sm font-medium transition-colors';
const buttonVariants = cva(baseLayout, {
    variants: {
        variant: {
            default: 'text-gray-500 hover:text-gray-700',
            active: 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const ModeButton = ({ variant, className, children, ...props }: ButtonProps) => {
    return (
        <button className={cn(className, buttonVariants({ variant }))} {...props}>
            {children}
        </button>
    );
};
