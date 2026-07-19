import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'subtle' | 'emerald' | 'cyan';
}

const toneClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  default: 'border-white/10 bg-white/8 text-white',
  subtle: 'border-white/10 bg-white/5 text-muted',
  emerald: 'border-[rgba(0,245,160,0.18)] bg-[rgba(0,245,160,0.08)] text-[#ccffe9]',
  cyan: 'border-[rgba(0,217,255,0.18)] bg-[rgba(0,217,255,0.08)] text-[#dff8ff]'
};

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return <span className={cn('inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]', toneClasses[tone], className)} {...props} />;
}
