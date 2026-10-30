import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

// Any address with no page behind it lands here.
export default function NotFound() {
  return (
    <section className="band-night">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-8 lg:pt-28 lg:pb-36">
        <p className="label text-accent">Error 404</p>
        <h1 className="display mt-6 max-w-4xl text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem]">This stop isn’t on the route</h1>
        <p className="mt-8 max-w-[52ch] text-[1.25rem] leading-normal text-muted">
          The page may have moved, or the address has a typo.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn btn-signal" href="/#work">
            See the case studies
          </Link>
          <Link className="btn" href="/">
            Go to the home page
          </Link>
        </div>
      </div>
    </section>
  );
}
