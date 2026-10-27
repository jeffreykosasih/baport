import Link from 'next/link';
import { ProcessMap } from '@/components/ProcessMap';
import { Section } from '@/components/Section';
import { education, experience, method, profile, skills } from '@/content/profile';
import { formatDate, getCaseStudies, getNotes } from '@/lib/content';

export default function Home() {
  const studies = getCaseStudies();
  const featured = studies.find((study) => study.processMap);
  const notes = getNotes();
  const titleOf = (slug: string) => studies.find((study) => study.slug === slug)?.title ?? slug;

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-8 lg:pt-14">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
          <div>
            <h1 className="text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.015em] [font-stretch:118%] sm:text-[3.5rem] lg:text-[4rem]">
              {profile.name}
            </h1>
            <p className="mt-4 text-[1.3125rem] leading-snug font-medium lg:text-[1.5rem]">
              {profile.role} in {profile.location}
            </p>
          </div>
          <div className="max-w-[54ch]">
            {profile.intro.map((paragraph) => (
              <p key={paragraph} className="mt-3 first:mt-0">
                {paragraph}
              </p>
            ))}
            <ul className="mt-6 flex flex-wrap items-center gap-3">
              <li>
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  Email me
                </a>
              </li>
              <li>
                <a className="btn" href={profile.resume}>
                  Resume (PDF)
                </a>
              </li>
              <li>
                <a className="px-2 font-semibold underline" href={profile.linkedin}>
                  LinkedIn
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[0.9375rem] text-muted">{profile.workRights}</p>
          </div>
        </div>
      </section>

      {featured?.processMap && (
        <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-8 lg:mt-14">
          <ProcessMap map={featured.processMap} animate>
            {' '}
            <Link href={`/case-studies/${featured.slug}`}>Read the {featured.title} case study</Link>
          </ProcessMap>
        </div>
      )}

      <Section id="case-studies" title="Case studies" className="mt-16 lg:mt-24">
        <ul className="divide-y divide-rule">
          {studies.map((study) => (
            <li key={study.slug} className="py-8 first:pt-0 last:pb-0">
              <article>
                <h3 className="text-[1.75rem] leading-tight font-bold [font-stretch:112%]">
                  {study.title}
                </h3>
                <p className="mt-1 text-muted">
                  {study.context}, {study.year}
                </p>
                <p className="mt-4 max-w-[62ch]">{study.summary}</p>
                {study.deliverables.length > 0 && (
                  <ul className="mt-4 max-w-[62ch] list-disc space-y-1 pl-5 text-[1rem] marker:text-muted">
                    {study.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-5">
                  <Link className="font-semibold underline" href={`/case-studies/${study.slug}`}>
                    Read the {study.title} case study
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-i-work" title="How I work">
        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {method.map((step, i) => (
            <li key={step.title} className="max-w-[44ch]">
              <p
                aria-hidden="true"
                className="text-[1.5rem] leading-none font-bold text-muted tabular-nums [font-stretch:125%]"
              >
                {i + 1}
              </p>
              <h3 className="mt-2 text-[1.25rem] font-bold">{step.title}</h3>
              <p className="mt-2 text-[1rem]">{step.text}</p>
              {step.shownIn?.length ? (
                <p className="mt-2 text-[0.9375rem] text-muted">
                  Shown in{' '}
                  {step.shownIn.map((slug, j) => (
                    <span key={slug}>
                      {j > 0 && ' and '}
                      <Link className="underline" href={`/case-studies/${slug}`}>
                        {titleOf(slug)}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : (
                step.evidence && <p className="mt-2 text-[0.9375rem] text-muted">{step.evidence}</p>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="experience" title="Experience">
        <ol className="space-y-10">
          {experience.map((job) => (
            <li key={`${job.role}-${job.dates}`}>
              <h3 className="text-[1.25rem] leading-snug font-bold">
                {job.role}
                {job.org && <span className="font-normal">, {job.org}</span>}
              </h3>
              <p className="mt-0.5 text-[1rem] text-muted tabular-nums">
                {job.place}, {job.dates}
              </p>
              <ul className="mt-3 max-w-[68ch] list-disc space-y-1.5 pl-5 text-[1rem] marker:text-muted">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="skills" title="Skills and tools">
        <dl className="space-y-5">
          {skills.map((skill) => (
            <div key={skill.group} className="grid gap-x-8 gap-y-1 sm:grid-cols-[12rem_minmax(0,1fr)]">
              <dt className="font-semibold">{skill.group}</dt>
              <dd className="max-w-[60ch] text-[1rem]">{skill.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="education" title="Education">
        <ul className="space-y-6">
          {education.map((item) => (
            <li key={item.title}>
              <h3 className="text-[1.125rem] leading-snug font-bold">
                {item.title}
                <span className="font-normal">, {item.org}</span>
              </h3>
              <p className="text-[1rem] text-muted tabular-nums">
                {item.place}, {item.dates}
              </p>
              {item.note && <p className="mt-1 max-w-[68ch] text-[1rem]">{item.note}</p>}
            </li>
          ))}
        </ul>
      </Section>

      {notes.length > 0 && (
        <Section id="notes" title="Notes">
          <ul className="space-y-6">
            {notes.map((note) => (
              <li key={note.slug}>
                <p className="text-[0.9375rem] text-muted tabular-nums">{formatDate(note.date)}</p>
                <h3 className="text-[1.125rem] font-bold">
                  <Link className="underline-offset-4 hover:underline" href={`/notes/${note.slug}`}>
                    {note.title}
                  </Link>
                </h3>
                {note.summary && <p className="mt-1 text-[1rem]">{note.summary}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="contact" title="Contact">
        <div className="max-w-[56ch]">
          <p className="text-[1.5rem] leading-snug font-semibold">
            Hiring a junior business analyst? Email me at{' '}
            <a className="underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
          <p className="mt-4">
            You can also find me on{' '}
            <a className="underline" href={profile.linkedin}>
              LinkedIn
            </a>{' '}
            or download my{' '}
            <a className="underline" href={profile.resume}>
              resume (PDF)
            </a>
            .
          </p>
          <p className="mt-4 text-[1rem] text-muted">
            {profile.workRights} {profile.visa}
          </p>
        </div>
      </Section>
    </>
  );
}
