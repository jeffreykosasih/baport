import { notFound } from 'next/navigation';
import { profile } from '@/content/profile';
import { getCaseStudies, getCaseStudy } from '@/lib/content';
import { ogImage, ogSize } from '@/lib/og';

export const alt = `A business analysis case study by ${profile.name}`;
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return getCaseStudies().map(({ slug }) => ({ slug }));
}

// Each case study's link preview leads with its outcome.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return ogImage({
    kicker: [study.kind, `${study.context}, ${study.year}`].filter(Boolean).join(' · '),
    title: study.title,
    line: study.outcome,
    footer: `${profile.name} · ${profile.role}`,
  });
}
