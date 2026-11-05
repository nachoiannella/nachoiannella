import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { PrefsProvider, prefsScript } from '@/components/Prefs';
import { ChatLauncher } from '@/components/ChatLauncher';
import { Analytics } from '@/components/Analytics';
import { SITE_URL, site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: '%s · Nacho Iannella' },
  description: site.description,
  authors: [{ name: site.fullName, url: SITE_URL }],
  creator: site.name,
  keywords: ['Nacho Iannella', 'Ignacio Iannella', 'UX Manager', 'Product Design', 'Despegar', 'SOFIA', 'travel e-commerce', 'design leadership', 'Buenos Aires'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: SITE_URL, siteName: site.name, title: site.title, description: site.description, locale: 'en_US', alternateLocale: ['es_AR'] },
  twitter: { card: 'summary_large_image', creator: '@niachito', title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1a18' },
  ],
  colorScheme: 'dark light',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.fullName,
  alternateName: site.name,
  jobTitle: 'UX Manager',
  worksFor: { '@type': 'Organization', name: 'Despegar' },
  address: { '@type': 'PostalAddress', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
  email: `mailto:${site.email}`,
  url: SITE_URL,
  sameAs: Object.values(site.links),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-lang="en" data-depth="5" data-theme="dark" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <PrefsProvider>
          {children}
          <ChatLauncher />
        </PrefsProvider>
        <Analytics />
      </body>
    </html>
  );
}
