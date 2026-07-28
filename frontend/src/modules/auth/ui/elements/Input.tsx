import { cva } from 'class-variance-authority';
import { cn } from '../ui.helper.ts';

const baseLayout =
    'w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm  focus:outline-none placeholder-grey-400 focus:ring-2 focus:border-transparent transition';
const InputClass = cva([baseLayout], {
    variants: {
        variant: {
            primary: 'text-gray-900 border-gray-300 focus:ring-blue-500 placeholder-gray-400',
            error: 'text-red-900 border-red-300 focus:ring-red-500 ',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});
interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputClass> {}

export const Input = ({ error, className, ...props }) => {
    const variant = error ? 'error' : 'primary';
    return <input className={cn(className, InputClass({ variant }))} {...props} />;
};
