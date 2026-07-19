import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#020202]">
      <div className="container-shell py-12 sm:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Badge tone="subtle" className="mb-4">
              CipherNet / Midnight Moonshots
            </Badge>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Build privacy infrastructure that organizations can trust.</h3>
            <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
              CipherNet starts with credential verification, but the architecture is intentionally shaped for future confidential workflows: identity, education, medical, and financial proofs with minimal disclosure.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" asChild>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                Source Repository
              </a>
            </Button>
            <Button asChild>
              <a href="#top">Back to Top</a>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CipherNet. MIT licensed.</p>
          <p>Built for Midnight New Moon with privacy-first engineering discipline.</p>
        </div>
      </div>
    </footer>
  );
}
