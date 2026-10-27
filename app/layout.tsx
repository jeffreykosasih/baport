import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Archivo } from 'next/font/google';
import Link from 'next/link';
import { profile } from '@/content/profile';
import './globals.css';

// One family throughout; its wider widths set names and labels.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const title = `${profile.name}, junior ICT business analyst`;
const description =
  'Junior ICT business analyst in Melbourne. Case studies in process mapping, requirements, user stories, UAT planning and business cases.';

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  openGraph: { title, description, type: 'website', locale: 'en_AU' },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-AU" className={archivo.variable}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-4 py-5 sm:px-8">
          <Link className="text-[1.0625rem] font-bold [font-stretch:112%]" href="/">
            {profile.name}
          </Link>
          <nav aria-label="Main">
            <ul className="flex gap-x-5 text-[0.9375rem]">
              <li className="max-sm:hidden">
                <Link className="underline-offset-4 hover:underline" href="/#case-studies">
                  Case studies
                </Link>
              </li>
              <li className="max-sm:hidden">
                <Link className="underline-offset-4 hover:underline" href="/#experience">
                  Experience
                </Link>
              </li>
              <li>
                <a className="underline-offset-4 hover:underline" href={profile.resume}>
                  Resume
                </a>
              </li>
              <li>
                <Link className="underline-offset-4 hover:underline" href="/#contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-rule py-8 text-[0.9375rem] text-muted">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            {profile.designPortfolio && (
              <p>
                Design work at{' '}
                <a className="underline" href={profile.designPortfolio}>
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
