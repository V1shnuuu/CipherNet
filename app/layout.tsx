import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
});

const bodyFont = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600']
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ciphernet.midnight'),
  title: {
    default: 'CipherNet',
    template: '%s | CipherNet'
  },
  description: 'CipherNet is a privacy-first credential verification platform built on Midnight.',
  applicationName: 'CipherNet',
  keywords: [
    'Midnight',
    'Compact',
    'Confidential smart contracts',
    'Credential verification',
    'Privacy infrastructure',
    'Zero knowledge'
  ],
  authors: [{ name: 'CipherNet' }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg'
  },
  openGraph: {
    title: 'CipherNet',
    description: 'The privacy layer for digital credential verification.',
    url: 'https://ciphernet.midnight',
    siteName: 'CipherNet',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CipherNet',
    description: 'The privacy layer for digital credential verification.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: '#030303',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} bg-background text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
