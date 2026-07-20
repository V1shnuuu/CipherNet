'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import {
  LayoutDashboard,
  FilePlus,
  ShieldCheck,
  Activity,
  Settings,
  BookOpen,
  Home,
  Hexagon,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/register', label: 'Register', icon: FilePlus },
  { href: '/verify', label: 'Verify', icon: ShieldCheck },
  { href: '/activity', label: 'Activity', icon: Activity },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/docs', label: 'Documentation', icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/6 bg-[#020202] lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/6 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
          <Hexagon className="h-4 w-4 text-[#00F5A0]" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white">CipherNet</span>
          <p className="text-[10px] text-white/30 uppercase tracking-wider">Midnight Preprod</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'sidebar-link',
                isActive && 'active'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/6 px-4 py-4">
        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/20">Contract</p>
          <p className="mt-1 font-mono text-[10px] text-white/30 break-all">
            0x8a9b...2a1b
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00F5A0]" />
            <span className="text-[10px] text-[#00F5A0]">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
