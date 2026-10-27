import type { ReactNode } from 'react';

// A home-page section: the heading sits in its own column on wide screens,
// like the label of a swimlane.
export function Section({
  id,
  title,
  className = '',
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`mx-auto max-w-6xl scroll-mt-4 px-4 sm:px-8 ${className}`}
    >
      <div className="grid gap-x-12 gap-y-6 border-t border-rule py-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:py-20">
        <h2
          id={`${id}-title`}
          className="text-[1.5rem] leading-tight font-bold [font-stretch:112%] lg:sticky lg:top-8 lg:self-start"
        >
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}
