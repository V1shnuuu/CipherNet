'use client';

import { Sidebar } from '../../components/sidebar';
import { WalletButton } from '../../components/wallet-button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020202]">
      <Sidebar />
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/6 bg-[#020202]/80 px-6 backdrop-blur-xl">
          <h2 className="text-sm font-medium text-white/40">CipherNet Dashboard</h2>
          <WalletButton />
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
