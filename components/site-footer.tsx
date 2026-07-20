'use client';

import Link from 'next/link';
import { Hexagon } from 'lucide-react';
import { MOCK_CONTRACT_ADDRESS } from '../types';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Register', href: '/register' },
      { label: 'Verify', href: '/verify' },
      { label: 'Activity', href: '/activity' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Settings', href: '/settings' },
      { label: 'GitHub', href: 'https://github.com/V1shnuuu/CipherNet' },
    ],
  },
  {
    title: 'Midnight',
    links: [
      { label: 'Midnight Network', href: 'https://midnight.network' },
      { label: 'Compact Language', href: 'https://docs.midnight.network' },
      { label: 'Lace Wallet', href: 'https://www.lace.io' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#020202]">
      <div className="container-shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03]">
                <Hexagon className="h-4 w-4 text-[#00F5A0]" />
              </div>
              <span className="text-sm font-semibold text-white">CipherNet</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/30">
              The privacy layer for digital trust. Verify credentials without revealing them.
            </p>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wider text-white/15">Contract Address</p>
              <p className="mt-1 font-mono text-[10px] text-white/20 break-all">{MOCK_CONTRACT_ADDRESS}</p>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/25 transition-colors hover:text-white/60"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/25 transition-colors hover:text-white/60"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/15">
            © {new Date().getFullYear()} CipherNet. Built for Midnight Moonshots.
          </p>
          <p className="text-xs text-white/15">
            Midnight Preprod · Compact v0.23
          </p>
        </div>
      </div>
    </footer>
  );
}
