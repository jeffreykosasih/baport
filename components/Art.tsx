// Small drawings of each kind of BA deliverable. They show the shape of the
// work, not real content: lines stand in for text.

import { Fragment } from 'react';
import type { ProcessMapData } from '@/components/ProcessMap';

const Line = ({ w, accent = false }: { w: string; accent?: boolean }) => (
  <span className={`block h-1.5 rounded-full ${accent ? 'bg-accent' : 'bg-fg/25'}`} style={{ width: w }} />
);

export type ArtKind = 'stakeholders' | 'process' | 'requirements' | 'backlog' | 'testing' | 'sql';

export function DeliverableArt({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case 'stakeholders':
      // A power and interest grid, with the stakeholder to manage closely marked.
      return (
        <div className="relative h-16 w-28 border-b-[1.5px] border-l-[1.5px] border-fg" aria-hidden="true">
          <span className="absolute inset-x-0 top-1/2 h-px bg-fg/25" />
          <span className="absolute inset-y-0 left-1/2 w-px bg-fg/25" />
          {[
            { x: 76, y: 24, key: true },
            { x: 28, y: 32, key: false },
            { x: 88, y: 62, key: false },
            { x: 60, y: 74, key: false },
            { x: 20, y: 78, key: false },
          ].map((dot) => (
            <span
              key={`${dot.x}-${dot.y}`}
              className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot.key ? 'bg-accent' : 'bg-fg/40'}`}
              style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
            />
          ))}
        </div>
      );
    case 'process':
      return (
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-4 w-4 shrink-0 rounded-full border-[1.5px] border-fg" />
          <span className="h-px w-3 bg-fg" />
          <span className="h-8 w-12 shrink-0 rounded-[4px] border-[1.5px] border-fg" />
          <span className="h-px w-3 bg-fg" />
          <span className="h-8 w-12 shrink-0 rounded-[4px] bg-signal" />
          <span className="h-px w-3 bg-fg" />
          <span className="h-4 w-4 shrink-0 rounded-full border-[3.5px] border-fg" />
        </div>
      );
    case 'requirements':
      return (
        <div className="grid w-full max-w-56 gap-2.5" aria-hidden="true">
          {[
            ['R1', '70%', 'Must'],
            ['R2', '55%', 'Must'],
            ['R3', '80%', 'Should'],
            ['R4', '45%', 'Could'],
          ].map(([id, w, priority]) => (
            <div key={id} className="grid grid-cols-[2rem_1fr_3.5rem] items-center gap-2">
              <span className="label text-muted">{id}</span>
              <Line w={w} />
              <span className="label text-accent">{priority}</span>
            </div>
          ))}
        </div>
      );
    case 'backlog':
      // A sprint board, with the work in progress marked.
      return (
        <div className="grid w-full max-w-56 grid-cols-3 gap-3" aria-hidden="true">
          {[
            { column: 'To do', cards: 3 },
            { column: 'Doing', cards: 1 },
            { column: 'Done', cards: 2 },
          ].map(({ column, cards }) => (
            <div key={column} className="grid content-start gap-1.5">
              <span className="label whitespace-nowrap text-muted">{column}</span>
              {Array.from({ length: cards }, (_, i) => (
                <span key={i} className={`h-3 rounded-[2px] ${column === 'Doing' ? 'bg-accent' : 'bg-fg/25'}`} />
              ))}
            </div>
          ))}
        </div>
      );
    case 'testing':
      return (
        <div className="grid w-full max-w-56 gap-2" aria-hidden="true">
          {['Given', 'When', 'Then'].map((lead, i) => (
            <div key={lead} className="flex items-center gap-2">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border-[1.5px] border-fg text-[0.625rem] leading-none">
                {i < 2 ? '✓' : ''}
              </span>
              <span className="label w-12 shrink-0 text-muted">{lead}</span>
              <Line w={['65%', '50%', '70%'][i]} />
            </div>
          ))}
        </div>
      );
    case 'sql':
      return (
        <div className="grid w-full max-w-56 gap-3" aria-hidden="true">
          <div className="flex h-14 items-end gap-1.5">
            {[40, 55, 48, 70, 62, 85, 78].map((h, i) => (
              <span key={i} className={`w-full rounded-t-[2px] ${i === 6 ? 'bg-accent' : 'bg-fg/25'}`} style={{ height: `${h}%` }} />
            ))}
          </div>
          <span className="label text-muted">select … group by week</span>
        </div>
      );
  }
}

// A case study's process map in miniature, for its card: each lane's tasks as
// boxes, pain points filled in. Box sizes follow the card's width, so a
// shorter to-be lane reads as a shorter flow.
export function FlowArt({ map }: { map: ProcessMapData }) {
  return (
    <div className="@container w-full" aria-hidden="true">
      <div className="mx-auto grid w-max gap-6">
        {map.lanes.map((lane) => (
          <div key={lane.label} className="flex items-center">
            <span className="label mr-3 w-12 shrink-0 text-muted">{lane.label}</span>
            <span className="h-3.5 w-3.5 shrink-0 rounded-full border-[1.5px] border-fg" />
            {lane.steps.map((step, i) => (
              <Fragment key={i}>
                <span className="h-px w-[3cqw] shrink-0 bg-fg" />
                <span
                  className={`h-[6.5cqw] w-[10cqw] shrink-0 rounded-[4px] ${step.pain ? 'bg-signal' : 'border-[1.5px] border-fg'}`}
                />
              </Fragment>
            ))}
            <span className="h-px w-[3cqw] shrink-0 bg-fg" />
            <span className="h-3.5 w-3.5 shrink-0 rounded-full border-[3px] border-fg" />
          </div>
        ))}
      </div>
    </div>
  );
}

// EnergyAI's four barriers, each tied to every other: they fed into each other.
export function BarrierArt() {
  const barriers = [
    { label: 'Legacy integration', x: 25, y: 22 },
    { label: 'Security approval', x: 75, y: 22 },
    { label: 'Regulatory evidence', x: 25, y: 78 },
    { label: 'Unmeasured benefits', x: 75, y: 78 },
  ];
  const links = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
  ];

  return (
    <div className="relative aspect-[16/10] w-full" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={barriers[a].x}
            y1={barriers[a].y}
            x2={barriers[b].x}
            y2={barriers[b].y}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {barriers.map((barrier) => (
        <span
          key={barrier.label}
          className="label absolute w-max max-w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-accent bg-sheet px-2.5 py-1.5 text-center text-balance"
          style={{ left: `${barrier.x}%`, top: `${barrier.y}%` }}
        >
          {barrier.label}
        </span>
      ))}
    </div>
  );
}
