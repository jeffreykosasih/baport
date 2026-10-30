import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Albert_Sans, IBM_Plex_Mono } from 'next/font/google';
import Link from 'next/link';
import { SiteMenu } from '@/components/SiteMenu';
import { profile } from '@/content/profile';
import './globals.css';

// A Scandinavian geometric sans for everything, and a mono for labels.
const albert = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-albert',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const title = `${profile.name}, junior ICT business analyst`;
const description =
  'Junior ICT business analyst in Melbourne. Case studies in process mapping, requirements, user stories, UAT planning and business cases.';

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  openGraph: { title, description, type: 'website', locale: 'en_AU' },
  twitter: { card: 'summary_large_image' },
};

const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#about', label: 'About' },
  { href: '/#background', label: 'Background' },
  { href: '/#contact', label: 'Contact' },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-AU" className={`${albert.variable} ${plexMono.variable}`}>
      <body className="band-night">
        <a className="skip label" href="#main">
          Skip to content
        </a>
        {/* Stays at the top while you scroll, so email and the resume are always in reach. */}
        <header className="band-night sticky top-0 z-20 border-b border-line">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
            <Link
              className="text-[1rem] font-semibold tracking-wide whitespace-nowrap uppercase sm:text-[1.0625rem]"
              href="/"
            >
              {profile.name}
            </Link>
            <nav aria-label="Main" className="flex items-center gap-3 lg:gap-6">
              <ul className="label flex gap-6 max-lg:hidden">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link className="text-muted transition-colors hover:text-fg" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <a className="btn min-h-10 px-4 max-lg:hidden" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className="btn min-h-10 px-3 max-[22.5rem]:hidden sm:px-4" href={profile.resume}>
                Resume
              </a>
              <SiteMenu items={nav} email={profile.email} linkedin={profile.linkedin} resume={profile.resume} />
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="label flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-8 text-muted">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            {profile.designPortfolio && (
              <p>
                Design work at{' '}
                <a className="text-fg underline" href={profile.designPortfolio}>
                  {profile.designPortfolio.replace('https://', '')}
                </a>
              </p>
            )}
          </div>
        </footer>
      </body>
    </html>
  );
}
