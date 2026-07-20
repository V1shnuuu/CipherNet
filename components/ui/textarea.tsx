import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30',
            'backdrop-blur-xl transition-all duration-300 resize-none min-h-[100px]',
            'focus:border-[rgba(0,245,160,0.3)] focus:outline-none focus:ring-1 focus:ring-[rgba(0,245,160,0.15)]',
            'hover:border-white/12',
            error && 'border-red-500/40',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export { Textarea };
