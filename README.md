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
| Intro, experience, skills, education, contact details | `content/profile.ts` |
| Case studies, one Markdown file each | `content/case-studies/` |
| Notes, a learning log | `content/notes/` |
| Resume PDF and images | `public/` |
| The process map | `components/ProcessMap.tsx` |

## Add a case study

1. Copy `content/case-studies/energyai.md` to a new file. The file name becomes the URL: `payroll.md` is served at `/case-studies/payroll`.
2. Fill in the frontmatter: `title`, `context`, `year`, `order` (lower comes first), `summary`, `outcome`, `methods`, `deliverables`, and optionally `role`, `tools` and `processMap`.
3. Write the story underneath: the context, the problem, what you did, the result, and what you'd do differently. Tables, images and SQL code blocks all work in Markdown.

Add `draft: true` to keep a case study off the published site while you write it (`reporting-dashboard.md` is one, waiting for your Power BI or Tableau project).

For a BPMN-style process map, add `processMap` to the frontmatter (see `idriver.md`). Steps with `pain: true` are highlighted as pain points, and `note` adds a text annotation. The first case study with a map is the one on the home page.

## Reminders while you write

A blockquote that starts with `[!TODO]` is a reminder to yourself:

```md
> [!TODO] Add the requirements table.
```

It shows as a dashed box in `npm run dev` and is left out of the published site.

## Notes

Copy `content/notes/_template.md` to a new file and write. The Notes section appears on the home page once a note is published (no `draft: true`).

## Before you publish

- Fill in the reminders in both case studies.
- Check the iDriver process map steps in `idriver.md` against your draw.io map.
- Anyone can download the resume in `public/`, and it includes your phone number.
- Update `workRights` in `content/profile.ts` when your 485 is granted.

## Deploy

Push to a new GitHub repository, import it in Vercel, then add a domain.
