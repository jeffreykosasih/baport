import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { profile } from '@/content/profile';
import { formatDate, getNote, getNotes } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getNotes().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    // Without its own, a shared link would show the home page's title.
    openGraph: { title: `${note.title} | ${profile.name}`, description: note.summary, type: 'article', locale: 'en_AU' },
  };
}

export default async function NotePage({ params }: Props) {
  const note = getNote((await params).slug);
  if (!note) notFound();

  return (
    <article className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
      <p className="pt-4 text-[0.9375rem]">
        <Link className="text-muted underline-offset-4 hover:underline" href="/#notes">
          All notes
        </Link>
      </p>
      <header className="mt-8 max-w-[56ch] lg:mt-12">
        <p className="text-muted tabular-nums">{formatDate(note.date)}</p>
        <h1 className="mt-2 text-[2.25rem] leading-tight font-extrabold [font-stretch:112%]">{note.title}</h1>
        {note.summary && <p className="mt-4 text-[1.3125rem] leading-snug">{note.summary}</p>}
      </header>
      <div className="md mt-10" dangerouslySetInnerHTML={{ __html: note.html }} />
    </article>
  );
}
