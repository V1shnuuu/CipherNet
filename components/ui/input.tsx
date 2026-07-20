import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-white/80"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30',
            'backdrop-blur-xl transition-all duration-300',
            'focus:border-[rgba(0,245,160,0.3)] focus:outline-none focus:ring-1 focus:ring-[rgba(0,245,160,0.15)]',
            'hover:border-white/12',
            error && 'border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
