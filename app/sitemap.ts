import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { getCaseStudies, getNotes } from '@/lib/content';

// Every published page, for search engines.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site },
    ...getCaseStudies().map((study) => ({ url: `${profile.site}/case-studies/${study.slug}` })),
    ...getNotes().map((note) => ({ url: `${profile.site}/notes/${note.slug}`, lastModified: note.date })),
  ];
}
