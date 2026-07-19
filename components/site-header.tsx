import { navigation } from '@/lib/site';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn('sticky top-0 z-50 border-b border-white/5 bg-[#030303]/70 backdrop-blur-xl', className)}>
      <div className="container-shell flex h-20 items-center justify-between gap-6">
        <a href="#top" className="group flex items-center gap-3" aria-label="CipherNet home">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(0,245,160,0.12)] transition duration-300 group-hover:border-[rgba(0,245,160,0.35)] group-hover:shadow-[0_0_24px_rgba(0,245,160,0.16)]">
            <span className="h-5 w-5 rounded-full border border-[rgba(0,245,160,0.7)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),rgba(0,245,160,0.2)_45%,rgba(0,0,0,0.05)_80%)]" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-white">CipherNet</span>
              <Badge tone="cyan" className="hidden sm:inline-flex">
                Midnight New Moon
              </Badge>
            </div>
            <p className="text-xs text-muted">The privacy layer for digital credential verification.</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" asChild className="hidden sm:inline-flex">
            <a href="#docs">View Documentation</a>
          </Button>
          <Button size="sm" asChild className="shadow-[0_12px_32px_rgba(0,245,160,0.18)]">
            <a href="#deployment">Deploy Contract</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
