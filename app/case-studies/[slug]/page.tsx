import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Band } from '@/components/Band';
import { ProcessMap } from '@/components/ProcessMap';
import { profile } from '@/content/profile';
import { getCaseStudies, getCaseStudy } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    // Without its own, a shared link would show the home page's title.
    openGraph: { title: `${study.title} | ${profile.name}`, description: study.summary, type: 'article', locale: 'en_AU' },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = getCaseStudies().filter((other) => other.slug !== slug);
  const facts = [
    { label: 'Outcome', value: study.outcome },
    { label: 'Role', value: study.role },
    { label: 'Methods', value: study.methods.join(', ') },
    { label: 'Tools', value: study.tools.join(', ') },
  ].filter((fact) => fact.value);

  return (
    <article>
      <section className="band-night">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-8 lg:pt-14 lg:pb-20">
          <Link className="label text-muted underline-offset-4 hover:text-fg hover:underline" href="/#work">
            All case studies
          </Link>
          <div className="mt-10 flex flex-wrap gap-2">
            {study.kind && <span className="chip label text-accent">{study.kind}</span>}
            <span className="chip label text-muted">
              {study.context}, {study.year}
            </span>
          </div>
          <h1 className="display mt-6 text-[3.5rem] sm:text-[5rem] lg:text-[7rem]">{study.title}</h1>
          <p className="mt-8 max-w-[56ch] text-[1.375rem] leading-snug">{study.summary}</p>
          <dl className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-4">
                <dt className="label text-accent">{fact.label}</dt>
                <dd className="mt-1.5 text-[1rem]">{fact.value}</dd>
              </div>
            ))}
          </dl>
          {study.processMap && (
            <div className="mt-16">
              <ProcessMap map={study.processMap} />
            </div>
          )}
        </div>
      </section>

      <Band tone="day" className="py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,70ch)_17rem] lg:justify-between">
          {/* First on phones; beside the story, and following it down, on wide screens. */}
          {study.deliverables.length > 0 && (
            <aside
              aria-labelledby="delivered-title"
              className="rounded-md border border-line bg-sheet p-6 lg:sticky lg:top-24 lg:order-last lg:self-start"
            >
              <h2 id="delivered-title" className="label text-accent">
                What I delivered
              </h2>
              <ul className="mt-4 grid gap-3 text-[0.9375rem] leading-snug">
                {study.deliverables.map((item) => (
                  <li key={item} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <div className="md" dangerouslySetInnerHTML={{ __html: study.html }} />
        </div>
      </Band>

      <Band tone="night" className="py-16 lg:py-24">
        {others.map((other) => (
          <div key={other.slug} className="mb-12 max-w-3xl">
            <p className="label text-accent">Next case study</p>
            <p className="display mt-4 text-[2.5rem] lg:text-[3.5rem]">{other.title}</p>
            <p className="mt-4 text-muted">{other.summary}</p>
            <Link className="btn mt-6" href={`/case-studies/${other.slug}`}>
              Read the {other.title} case study
            </Link>
          </div>
        ))}
        <p className="text-muted">
          Want to talk about this work?{' '}
          <a className="text-fg underline" href={`mailto:${profile.email}`}>
            Email me
          </a>
          .
        </p>
      </Band>
    </article>
  );
}
