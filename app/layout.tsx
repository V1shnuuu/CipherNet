import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { WalletProvider } from '../lib/wallet-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const interDisplay = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cipher-net-eight.vercel.app'),
  title: {
    default: 'CipherNet — The Privacy Layer for Digital Trust',
    template: '%s | CipherNet',
  },
  description:
    'Privacy-preserving credential verification platform built on Midnight. Verify credentials without revealing them using zero-knowledge proofs and confidential smart contracts.',
  applicationName: 'CipherNet',
  keywords: [
    'Midnight',
    'Compact',
    'Confidential smart contracts',
    'Credential verification',
    'Privacy',
    'Zero knowledge proofs',
    'Lace wallet',
    'Blockchain',
  ],
  authors: [{ name: 'CipherNet' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
  },
  openGraph: {
    title: 'CipherNet — The Privacy Layer for Digital Trust',
    description: 'Verify credentials without revealing them. Built on Midnight.',
    url: 'https://cipher-net-eight.vercel.app',
    siteName: 'CipherNet',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CipherNet — The Privacy Layer for Digital Trust',
    description: 'Verify credentials without revealing them. Built on Midnight.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#020202',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interDisplay.variable} ${jetbrainsMono.variable} bg-background text-text antialiased`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
