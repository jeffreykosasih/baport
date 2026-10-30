import Image from 'next/image';
import Link from 'next/link';
import { BarrierArt, DeliverableArt, FlowArt } from '@/components/Art';
import { Band, BandHead } from '@/components/Band';
import { ProcessMap } from '@/components/ProcessMap';
import { certificates, education, experience, method, profile, skills, story } from '@/content/profile';
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

  // The bands alternate night and day, starting from the night hero.
  return (
    <>
      <section className="band-night">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-8 lg:pt-20 lg:pb-24">
          <p className="label flex flex-wrap gap-x-5 gap-y-2">
            <span className="text-accent">
              {profile.role}, {profile.location}
            </span>
            <span className="text-muted">{profile.workRightsInBrief}</span>
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

      <Band tone="day" id="work" className="py-20 lg:py-28">
        <BandHead id="work" kicker="Case studies" title="From the field" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {studies.map((study) => (
            <li key={study.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-sheet">
                {/* The cover stays dark, so its drawings read the night colours. */}
                <div className="band-night relative aspect-[16/10] overflow-hidden">
                  {study.cover ? (
                    <Image src={study.cover} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                  ) : study.coverArt === 'flow' && study.processMap ? (
                    <div className="flex h-full items-center px-6 sm:px-10">
                      <FlowArt map={study.processMap} />
                    </div>
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

      <Band tone="night" id="approach" className="py-20 lg:py-28">
        <BandHead id="approach" kicker="From discovery to release" title="How I work">
          Each step, and the documents a team builds from.
        </BandHead>
        <ol className="route mt-14">
          {method.map((step, i) => (
            <li key={step.title} className="route-stop flex flex-col">
              <span className="route-node label" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="text-[1.25rem] font-semibold uppercase">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{step.text}</p>
              {/* Under the text on phones; on wide screens, a row of drawings above the titles. */}
              <div className="mt-6 flex h-20 items-center lg:order-first lg:mt-0 lg:mb-6">
                <DeliverableArt kind={step.art} />
              </div>
              {step.shownIn?.length ? (
                <p className="label mt-3 text-muted">Shown in {shownIn(step.shownIn)}</p>
              ) : (
                step.evidence && <p className="label mt-3 text-muted">{step.evidence}</p>
              )}
            </li>
          ))}
        </ol>
      </Band>

      <Band tone="day" id="about" className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            {/* Zoomed in on the person: most of the original photo is trees. */}
            <Image
              src={story.image}
              alt={story.imageAlt}
              fill
              sizes="(min-width: 1024px) 60vw, 140vw"
              className="origin-[36%_92%] scale-150 object-cover"
            />
          </div>
          <div>
            <BandHead id="about" kicker={story.kicker} title={story.title} />
            <p className="mt-8 max-w-[56ch] text-[1.375rem] leading-snug font-medium">{profile.statement}</p>
            <div className="mt-6 grid max-w-[56ch] gap-4">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        <dl className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {profile.facts.map((fact) => (
            <div key={fact.label} className="border-t border-line pt-4">
              <dt className="label text-accent">{fact.label}</dt>
              <dd className="mt-1.5">{fact.value}</dd>
            </div>
          ))}
        </dl>
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
                <h3 className="text-[1.5rem] leading-tight font-semibold">
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
        {certificates.length > 0 && (
          <>
            <h3 className="label mt-12 text-accent">Certificates and courses</h3>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {certificates.map((item) => (
                <li key={item.title} className="rounded-md border border-line p-6">
                  <p className="label text-muted">{item.dates}</p>
                  <p className="mt-2 text-[1.125rem] font-semibold">{item.title}</p>
                  {item.org && <p className="text-muted">{item.org}</p>}
                  {item.url && (
                    <a className="label mt-3 inline-block text-fg underline underline-offset-4" href={item.url}>
                      View the certificate
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
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
        {/* Notes share the skills band, so the bands keep alternating. */}
        {notes.length > 0 && (
          <section id="notes" aria-labelledby="notes-title" className="mt-20 lg:mt-28">
            <BandHead id="notes" kicker="Notes" title="What I’m learning" />
            <ul className="mt-14 grid gap-6 md:grid-cols-2">
              {notes.map((note) => (
                <li key={note.slug} className="rounded-md border border-line bg-sheet p-6">
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
          </section>
        )}
      </Band>

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
