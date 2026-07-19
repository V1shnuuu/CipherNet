import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('mx-auto mb-12 max-w-3xl text-center sm:mb-16', className)}>
      <Badge tone="emerald" className="mb-4">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>
    </div>
  );
}
