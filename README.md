# Business analyst portfolio

Jeffrey Kosasih's BA portfolio: a Next.js site with case studies written in Markdown. The design portfolio stays at jeffreyko.com.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where things live

| What | Where |
| --- | --- |
| Your intro and photo, how you work, experience, education, certificates, skills, contact details and the site's address | `content/profile.ts` |
| Case studies, one Markdown file each | `content/case-studies/` |
| Notes, a learning log | `content/notes/` |
| Resume PDF and images | `public/` |
| The process map | `components/ProcessMap.tsx` |
| The small drawings in How I work and on the case study cards | `components/Art.tsx` |
| Link previews, the image shown when someone shares a link | `app/opengraph-image.tsx`, and `app/case-studies/[slug]/opengraph-image.tsx` for each case study |

## Add a case study

1. Copy `content/case-studies/energyai.md` to a new file. The file name becomes the URL: `payroll.md` is served at `/case-studies/payroll`.
2. Fill in the frontmatter: `title`, `context`, `year`, `order` (lower comes first), `summary`, `outcome` (it also leads the link preview), `methods`, `deliverables` (listed under "What I delivered" beside the story), and optionally `kind`, `role`, `tools` and `processMap`. For the card on the home page, set `cover` to an image, or `coverArt` to a drawing: `flow` draws the case study's process map, `barriers` EnergyAI's four barriers, and the name of a drawing in `components/Art.tsx`, such as `backlog` or `sql`, draws that one.
3. Write the story underneath: the context, the problem, what you did, the result, and what you'd do differently. Tables, images and SQL code blocks all work in Markdown.

Add `draft: true` to keep a case study off the published site while you write it. `bca.md` is one, waiting for your Bank Central Asia details, and `reporting-dashboard.md` waits for your Power BI or Tableau project.

For a BPMN-style process map, add `processMap` to the frontmatter (see `idriver.md`). Steps with `pain: true` are highlighted as pain points, and `note` adds a text annotation.

## Reminders while you write

A blockquote that starts with `[!TODO]` is a reminder to yourself:

```md
> [!TODO] Add the requirements table.
```

It shows as a dashed box in `npm run dev` and is left out of the published site.

Suggested wording waiting for your check sits between draft markers:

```md
<!-- draft -->
| ID | Requirement | Priority |
<!-- /draft -->
```

It shows in an orange draft box in `npm run dev` and stays off the published site. Once it's accurate, delete the two marker lines and it publishes.

## Notes

Copy `content/notes/_template.md` to a new file and write. A "What I'm learning" list appears under Skills on the home page once a note is published (no `draft: true`). It suits a log of a course, such as one note per module.

## Before you publish

- Fill in the reminders in both case studies.
- Check the iDriver process map steps in `idriver.md` against your draw.io map.
- Anyone can download the resume in `public/`, and it includes your phone number.
- When you add your own domain, change `site` in `content/profile.ts` so link previews and the sitemap use it.
- When you start the IBM certificate, add it to `certificates` and update `intro` in `content/profile.ts`.

## Deploy

Push to a new GitHub repository, import it in Vercel, then add a domain.
