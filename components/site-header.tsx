'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon } from 'lucide-react';
import { WalletButton } from './wallet-button';
import { cn } from '../lib/utils';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Verify', href: '/verify' },
  { label: 'Docs', href: '/docs' },
];

export function SiteHeader({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-white/5 bg-[#020202]/80 backdrop-blur-2xl backdrop-saturate-150',
          className
        )}
      >
        <div className="container-shell flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5" aria-label="CipherNet home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] transition-all duration-300 group-hover:border-[rgba(0,245,160,0.3)] group-hover:shadow-[0_0_20px_rgba(0,245,160,0.12)]">
              <Hexagon className="h-4 w-4 text-[#00F5A0]" />
            </span>
            <span className="text-base font-semibold tracking-tight text-white">CipherNet</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-white/50 transition-colors duration-200 hover:text-white hover:bg-white/[0.04]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <WalletButton />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-white/60 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-white/6 bg-[#020202]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-shell flex flex-col gap-1 py-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-white/60 transition-colors hover:text-white hover:bg-white/[0.04]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 px-4 sm:hidden">
                <WalletButton />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
