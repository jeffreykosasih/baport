import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
  return study ? { title: study.title, description: study.summary } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = getCaseStudies().filter((other) => other.slug !== slug);

  return (
    <article className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
      <p className="pt-4 text-[0.9375rem]">
        <Link className="text-muted underline-offset-4 hover:underline" href="/#case-studies">
          All case studies
        </Link>
      </p>

      <header className="mt-8 grid gap-x-16 gap-y-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <h1 className="text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.015em] [font-stretch:118%] sm:text-[3.5rem]">
            {study.title}
          </h1>
          <p className="mt-3 text-muted">
            {study.context}, {study.year}
          </p>
          <p className="mt-6 max-w-[56ch] text-[1.3125rem] leading-snug">{study.summary}</p>
        </div>
        <dl className="grid gap-4 text-[0.9375rem]">
          <Fact label="Outcome">{study.outcome}</Fact>
          {study.role && <Fact label="Role">{study.role}</Fact>}
          {study.methods.length > 0 && <Fact label="Methods">{study.methods.join(', ')}</Fact>}
          {study.tools.length > 0 && <Fact label="Tools">{study.tools.join(', ')}</Fact>}
        </dl>
      </header>

      {study.processMap && (
        <div className="mt-12 lg:mt-16">
          <ProcessMap map={study.processMap} />
        </div>
      )}

      <div className="md mt-12 lg:mt-16" dangerouslySetInnerHTML={{ __html: study.html }} />

      <footer className="mt-16 border-t border-rule pt-8">
        {others.map((other) => (
          <div key={other.slug} className="mb-8 max-w-[62ch]">
            <Link
              className="text-[1.25rem] font-bold underline [font-stretch:112%]"
              href={`/case-studies/${other.slug}`}
            >
              Read the {other.title} case study
            </Link>
            <p className="mt-2 text-[1rem] text-muted">{other.summary}</p>
          </div>
        ))}
        <p>
          Want to talk about this work?{' '}
          <a className="underline" href={`mailto:${profile.email}`}>
            Email me
          </a>
          .
        </p>
      </footer>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}
