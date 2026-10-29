import Image from 'next/image';
import Link from 'next/link';
import { BarrierArt, DeliverableArt } from '@/components/Art';
import { Band, BandHead } from '@/components/Band';
import { ProcessMap } from '@/components/ProcessMap';
import { deliverables, education, experience, method, profile, skills, story } from '@/content/profile';
import { formatDate, getCaseStudies, getNotes } from '@/lib/content';

export default function Home() {
  const studies = getCaseStudies();
  const featured = studies.find((study) => study.processMap);
  const notes = getNotes();
  const titleOf = (slug: string) => studies.find((study) => study.slug === slug)?.title ?? slug;

  // "iDriver, EnergyAI" as links to the case studies.
  const shownIn = (slugs: readonly string[]) =>
    slugs.map((slug, i) => (
      <span key={slug}>
        {i > 0 && ', '}
        <Link className="text-fg underline underline-offset-4" href={`/case-studies/${slug}`}>
          {titleOf(slug)}
        </Link>
      </span>
    ));

  return (
    <>
      <section className="band-night">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-8 lg:pt-20 lg:pb-24">
          <p className="label text-accent">
            {profile.role}, {profile.location}
          </p>
          <h1 className="display mt-6 max-w-5xl text-[3rem] sm:text-[4.5rem] lg:text-[6.5rem]">{profile.headline}</h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p className="max-w-[52ch] text-[1.25rem] leading-normal text-muted">{profile.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a className="btn btn-signal" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className="btn" href={profile.resume}>
                Resume (PDF)
              </a>
              <a className="btn" href={profile.linkedin}>
                LinkedIn
              </a>
            </div>
          </div>
          {featured?.processMap && (
            <div className="mt-16 lg:mt-20">
              <ProcessMap map={featured.processMap} animate>
                {' '}
                <Link href={`/case-studies/${featured.slug}`}>Read the {featured.title} case study</Link>
              </ProcessMap>
            </div>
          )}
        </div>
      </section>

      <Band tone="day" className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-20">
          <p className="text-[1.625rem] leading-[1.3] font-medium sm:text-[2rem] lg:text-[2.375rem]">{profile.statement}</p>
          <dl className="grid content-start gap-6">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="border-t border-line pt-4">
                <dt className="label text-accent">{fact.label}</dt>
                <dd className="mt-1.5">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      <Band tone="night" id="work" className="py-20 lg:py-28">
        <BandHead id="work" kicker="Case studies" title="From the field" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {studies.map((study) => (
            <li key={study.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-sheet">
                <div className="relative aspect-[16/10] overflow-hidden bg-night">
                  {study.cover ? (
                    <Image src={study.cover} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  ) : study.coverArt === 'barriers' ? (
                    <div className="flex h-full items-center px-6">
                      <BarrierArt />
                    </div>
                  ) : study.coverArt === 'chart' ? (
                    <div className="flex h-full items-center justify-center px-6">
                      <DeliverableArt kind="sql" />
                    </div>
                  ) : null}
                </div>
                <div className="flex grow flex-col p-6 lg:p-8">
                  <div className="flex flex-wrap gap-2">
                    {study.kind && <span className="chip label text-accent">{study.kind}</span>}
                    <span className="chip label text-muted">
                      {study.context}, {study.year}
                    </span>
                  </div>
                  <h3 className="display mt-5 text-[2rem] lg:text-[2.5rem]">{study.title}</h3>
                  <p className="mt-3 text-muted">{study.summary}</p>
                  <p className="mt-auto pt-8">
                    <Link className="btn" href={`/case-studies/${study.slug}`}>
                      Read the {study.title} case study
                    </Link>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="day" id="deliverables" className="py-20 lg:py-28">
        <BandHead id="deliverables" kicker="What I hand over" title="The deliverables">
          The documents a team builds from. Each one is shown in a case study.
        </BandHead>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item) => (
            <li key={item.title} className="flex flex-col bg-sheet p-6 lg:p-8">
              <div className="flex h-24 items-center">
                <DeliverableArt kind={item.art} />
              </div>
              <h3 className="mt-6 text-[1.375rem] font-semibold uppercase">{item.title}</h3>
              <p className="mt-2 text-[1rem] text-muted">{item.text}</p>
              <p className="label mt-auto pt-6 text-muted">Shown in {shownIn(item.shownIn)}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="night" id="approach" className="py-20 lg:py-28">
        <BandHead id="approach" kicker="From discovery to release" title="How I work" />
        <ol className="route mt-14">
          {method.map((step, i) => (
            <li key={step.title} className="route-stop">
              <span className="route-node label" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="text-[1.25rem] font-semibold uppercase">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{step.text}</p>
              {step.shownIn?.length ? (
                <p className="label mt-3 text-muted">Shown in {shownIn(step.shownIn)}</p>
              ) : (
                step.evidence && <p className="label mt-3 text-muted">{step.evidence}</p>
              )}
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="day" id="story" className="py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image src={story.image} alt={story.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <BandHead id="story" kicker={story.kicker} title={story.title} />
            <div className="mt-8 grid max-w-[56ch] gap-4">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Band>

      <Band tone="night" id="background" className="py-20 lg:py-28">
        <BandHead id="background" kicker="Background" title="Banking, code and the warehouse floor" />
        <ol className="mt-14 border-b border-line">
          {experience.map((job) => (
            <li
              key={`${job.role}-${job.dates}`}
              className="grid gap-x-10 gap-y-2 border-t border-line py-8 lg:grid-cols-[14rem_minmax(0,1fr)]"
            >
              <p className="label text-accent">{job.dates}</p>
              <div>
                <h3 className="text-[1.5rem] leading-tight font-semibold uppercase">
                  {job.role}
                  {job.org && <span className="text-muted">, {job.org}</span>}
                </h3>
                <p className="label mt-2 text-muted">{job.place}</p>
                <ul className="mt-4 max-w-[70ch] list-disc space-y-1.5 pl-5 text-[1rem] text-muted marker:text-accent">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="label mt-16 text-accent">Education</h3>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {education.map((item) => (
            <li key={item.title} className="rounded-md border border-line p-6">
              <p className="label text-muted">{item.dates}</p>
              <p className="mt-2 text-[1.125rem] font-semibold">{item.title}</p>
              <p className="text-muted">
                {item.org}, {item.place}
              </p>
              {item.note && <p className="mt-2 text-[0.9375rem] text-muted">{item.note}</p>}
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="day" id="skills" className="py-20 lg:py-28">
        <BandHead id="skills" kicker="Skills and tools" title="What I work with" />
        <dl className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.group} className="border-t border-line pt-4">
              <dt className="label text-accent">{skill.group}</dt>
              <dd className="mt-3 text-[1rem]">{skill.items}</dd>
            </div>
          ))}
        </dl>
      </Band>

      {notes.length > 0 && (
        <Band tone="night" id="notes" className="py-20 lg:py-28">
          <BandHead id="notes" kicker="Notes" title="What I’m learning" />
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {notes.map((note) => (
              <li key={note.slug} className="rounded-md border border-line p-6">
                <p className="label text-muted">{formatDate(note.date)}</p>
                <h3 className="mt-2 text-[1.25rem] font-semibold">
                  <Link className="underline-offset-4 hover:underline" href={`/notes/${note.slug}`}>
                    {note.title}
                  </Link>
                </h3>
                {note.summary && <p className="mt-2 text-[1rem] text-muted">{note.summary}</p>}
              </li>
            ))}
          </ul>
        </Band>
      )}

      <Band tone="night" id="contact" className="py-24 lg:py-36">
        <p className="label text-accent">Available now</p>
        <h2 id="contact-title" className="display mt-6 text-[3.5rem] sm:text-[6rem] lg:text-[9rem]">
          Let’s talk
        </h2>
        <a
          className="mt-8 inline-block text-[1.5rem] font-medium break-all underline underline-offset-8 sm:text-[2.25rem]"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          <a className="btn btn-signal" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn" href={profile.linkedin}>
            LinkedIn
          </a>
          <a className="btn" href={profile.resume}>
            Resume (PDF)
          </a>
        </div>
        <p className="mt-10 max-w-[60ch] text-[1rem] text-muted">
          {profile.workRights} {profile.visa}
        </p>
      </Band>
    </>
  );
}
