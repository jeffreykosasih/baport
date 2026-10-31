export type FlowStep = { label: string; note?: string; pain?: boolean };
export type Lane = { label: string; end?: string; steps: FlowStep[] };
export type ProcessMapData = { title: string; caption?: string; lanes: Lane[] };

// A BPMN-style process map: one pool per lane, each running from a start
// event through its tasks to an end event. `pain` marks a pain point and
// `note` becomes a text annotation on the task.
export function ProcessMap({ map }: { map: ProcessMapData }) {
  const hasPain = map.lanes.some((lane) => lane.steps.some((step) => step.pain));

  return (
    <figure className="pmap">
      <div className="pmap-sheet">
        <p className="pmap-title label text-muted">{map.title}</p>
        <div className="pmap-lanes">
          {map.lanes.map((lane) => (
            <section
              key={lane.label}
              className="lane"
              aria-label={`${lane.label} process`}
              data-notes={lane.steps.some((step) => step.note) || undefined}
            >
              <p className="lane-label label">{lane.label}</p>
              <div className="flow">
                <span className="event" aria-hidden="true" />
                <ol className="steps">
                  {lane.steps.map((step, i) => (
                    <li key={`${i}-${step.label}`} className="node" data-pain={step.pain || undefined}>
                      <span className="task">
                        {step.label}
                        {step.pain && <span className="sr-only"> (pain point)</span>}
                      </span>
                      {step.note && <span className="note">{step.note}</span>}
                    </li>
                  ))}
                </ol>
                <div className="node node-end">
                  <span className="event event-end" aria-hidden="true" />
                  {lane.end && <span className="end-label">{lane.end}</span>}
                </div>
              </div>
            </section>
          ))}
        </div>
        {hasPain && (
          <p className="pmap-legend label">
            <span className="swatch" aria-hidden="true" />
            Pain point
          </p>
        )}
      </div>
      {map.caption && <figcaption className="pmap-caption">{map.caption}</figcaption>}
    </figure>
  );
}
