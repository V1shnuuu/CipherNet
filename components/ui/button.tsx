import * as React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'solid';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-[linear-gradient(135deg,rgba(0,245,160,0.98),rgba(0,217,255,0.88))] text-[#020202] shadow-[0_16px_40px_rgba(0,245,160,0.22)] hover:shadow-[0_20px_54px_rgba(0,245,160,0.3)]',
  secondary:
    'border border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.07]',
  outline:
    'border border-[rgba(0,245,160,0.28)] bg-transparent text-white hover:border-[rgba(0,245,160,0.48)] hover:bg-[rgba(0,245,160,0.08)]',
  ghost: 'bg-transparent text-white hover:bg-white/5',
  solid: 'bg-white text-black hover:bg-white/90'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'md', type = 'button', asChild, children, ...props },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-ring disabled:pointer-events-none disabled:opacity-50',
    'border border-transparent',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(classes, (children.props as { className?: string }).className)
    });
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});
