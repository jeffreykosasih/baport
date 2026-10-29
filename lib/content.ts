import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { ProcessMapData } from '@/components/ProcessMap';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  // The kind of work, shown as a tag: "Process improvement", "Business case".
  kind?: string;
  // An image for the case study card, or a drawing when there is no image.
  cover?: string;
  coverArt?: 'barriers' | 'chart';
  year: number;
  order: number;
  summary: string;
  outcome: string;
  role?: string;
  methods: string[];
  tools: string[];
  deliverables: string[];
  processMap?: ProcessMapData;
  html: string;
};

export type Note = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  html: string;
};

// "> [!TODO] ..." blocks mark artifacts still to add. They show as callouts
// while you write (npm run dev) and are left out of the published site.
const TODO_BLOCK = /^> \[!TODO\][^\n]*(?:\n>[^\n]*)*/gm;

// Content between <!-- draft --> and <!-- /draft --> is suggested wording to
// check. It shows in a draft box while you write and is left out of the
// published site until you delete the two markers.
const DRAFT_BLOCK = /<!--\s*draft\s*-->([\s\S]*?)<!--\s*\/draft\s*-->/g;

function render(markdown: string) {
  const prepared = markdown
    .replace(DRAFT_BLOCK, (_, body: string) => (SHOW_DRAFTS ? `<div class="draft">\n\n${body.trim()}\n\n</div>` : ''))
    .replace(TODO_BLOCK, (block) => {
      if (!SHOW_DRAFTS) return '';
      const text = block.replace(/^> ?/gm, '').replace(/^\[!TODO\]\s*/, '');
      return `<aside class="todo">${marked.parseInline(text, { async: false })}</aside>`;
    });
  return marked.parse(prepared, { async: false });
}

// Files whose names start with an underscore are templates, never pages.
function readEntries(dir: string) {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(fullDir, file), 'utf8'));
      return { slug: file.replace(/\.md$/, ''), data, content };
    });
}

// Case studies and notes marked `draft: true` show in development only.
export function getCaseStudies(): CaseStudy[] {
  return readEntries('case-studies')
    .filter(({ data }) => SHOW_DRAFTS || !data.draft)
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title,
      context: data.context,
      kind: data.kind,
      cover: data.cover,
      coverArt: data.coverArt,
      year: data.year,
      order: data.order ?? 99,
      summary: data.summary,
      outcome: data.outcome,
      role: data.role,
      methods: data.methods ?? [],
      tools: data.tools ?? [],
      deliverables: data.deliverables ?? [],
      processMap: data.processMap,
      html: render(content),
    }))
    .sort((a, b) => a.order - b.order);
}

export function getCaseStudy(slug: string) {
  return getCaseStudies().find((study) => study.slug === slug);
}

// gray-matter turns unquoted YAML dates into Date objects.
function toISODate(value: unknown) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

export function getNotes(): Note[] {
  return readEntries('notes')
    .filter(({ data }) => SHOW_DRAFTS || !data.draft)
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title,
      date: toISODate(data.date),
      summary: data.summary ?? '',
      html: render(content),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string) {
  return getNotes().find((note) => note.slug === slug);
}

export function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
