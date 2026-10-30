'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type NavItem = { href: string; label: string };

// The menu on screens too narrow for the header links: a button that opens a
// panel of links under the header. Escape, a link or a tap outside closes it.
export function SiteMenu({
  items,
  email,
  linkedin,
  resume,
}: {
  items: NavItem[];
  email: string;
  linkedin: string;
  resume: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={root} className="lg:hidden">
      <button
        ref={button}
        type="button"
        className="btn min-h-10 px-3"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <div
        id="site-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-sheet shadow-2xl shadow-black/60"
      >
        <ul className="mx-auto max-w-7xl px-4 sm:px-8">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link className="display block py-4 text-[2rem]" href={item.href} onClick={close}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 py-6 sm:px-8">
          <a className="btn btn-signal" href={`mailto:${email}`}>
            Email me
          </a>
          <a className="btn" href={linkedin}>
            LinkedIn
          </a>
          {/* The header drops its Resume button on the narrowest phones. */}
          <a className="btn min-[22.5rem]:hidden" href={resume}>
            Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
