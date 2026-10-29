// Small drawings of each kind of BA deliverable. They show the shape of the
// work, not real content: lines stand in for text.

const Line = ({ w, accent = false }: { w: string; accent?: boolean }) => (
  <span className={`block h-1.5 rounded-full ${accent ? 'bg-accent' : 'bg-fg/25'}`} style={{ width: w }} />
);

export type ArtKind = 'process' | 'requirements' | 'stories' | 'testing' | 'options' | 'sql';

export function DeliverableArt({ kind }: { kind: ArtKind }) {
  switch (kind) {
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
    case 'stories':
      return (
        <div className="grid w-full max-w-56 gap-2 rounded-[4px] border border-line bg-sheet p-3" aria-hidden="true">
          {['As a', 'I want', 'So that'].map((lead, i) => (
            <div key={lead} className="flex items-center gap-2">
              <span className="label w-16 shrink-0 whitespace-nowrap text-accent">{lead}</span>
              <Line w={['60%', '75%', '50%'][i]} />
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
    case 'options':
      return (
        <div className="grid grid-cols-[repeat(5,1.25rem)] gap-1.5" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            if (col === 0) return <span key={i} className="label text-muted">{['A', 'B', 'C', 'D'][row]}</span>;
            const score = (row * 3 + col * 2) % 4;
            return (
              <span
                key={i}
                className={`h-5 w-5 rounded-full ${row === 3 ? 'bg-accent' : 'border border-fg/40'}`}
                style={row === 3 ? undefined : { opacity: 0.35 + score * 0.2 }}
              />
            );
          })}
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
