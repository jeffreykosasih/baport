import type { ReactNode } from 'react';

// A full-width band in one of the two tones; everything inside reads its colours.
export function Band({
  tone,
  id,
  className = '',
  children,
}: {
  tone: 'night' | 'day';
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={`band-${tone} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8">{children}</div>
    </section>
  );
}

// The kicker and big uppercase heading that open each band.
export function BandHead({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-4xl">
      <p className="label text-accent">{kicker}</p>
      <h2 id={id ? `${id}-title` : undefined} className="display mt-4 text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem]">
        {title}
      </h2>
      {children && <div className="mt-6 max-w-[60ch] text-muted">{children}</div>}
    </div>
  );
}
