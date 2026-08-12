import { useState } from "react";
import { bodies, type Member } from "@/data/parliament";
import { Portrait, SourceBadges, Tag, appointmentTone } from "./ui";

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-background text-[10px] font-bold transition-transform ${
        open ? "rotate-90" : ""
      }`}
    >
      ▶
    </span>
  );
}

function Branch({
  children,
  header,
  defaultOpen = false,
  depth,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  defaultOpen?: boolean;
  depth: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted"
      >
        <Chevron open={open} />
        {header}
      </button>
      {open && (
        <ul
          className={`ml-[19px] border-l border-dashed border-border pl-4 ${
            depth === 0 ? "mb-2" : ""
          }`}
        >
          {children}
        </ul>
      )}
    </li>
  );
}

function Leaf({ m }: { m: Member }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted"
      >
        <Chevron open={open} />
        <Portrait name={m.name} photo={m.photo} size={38} />
        <span className="min-w-0">
          <span
            className={`block truncate font-display text-sm font-semibold ${
              m.vacant ? "italic text-muted-foreground" : ""
            }`}
          >
            {m.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">{m.title}</span>
        </span>
        <span className="ml-auto hidden sm:block">
          <Tag tone={appointmentTone[m.appointment]}>{m.appointment}</Tag>
        </span>
      </button>
      {open && (
        <div className="ml-[19px] border-l border-dashed border-border pl-4">
          <div className="my-1 rounded-lg border border-border bg-card p-4">
            <dl className="grid gap-3 text-xs sm:grid-cols-2">
              {m.party && (
                <div>
                  <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Party</dt>
                  <dd className="mt-0.5">{m.party}</dd>
                </div>
              )}
              {m.constituency && (
                <div>
                  <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
                    Constituency / State
                  </dt>
                  <dd className="mt-0.5">{m.constituency}</dd>
                </div>
              )}
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Tenure from</dt>
                <dd className="mt-0.5">{m.start}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Tenure until</dt>
                <dd className="mt-0.5">{m.end}</dd>
              </div>
              {m.note && (
                <div className="sm:col-span-2">
                  <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Note</dt>
                  <dd className="mt-0.5 leading-relaxed">{m.note}</dd>
                </div>
              )}
              <div className="sm:col-span-2">
                <dt className="mb-1.5 font-semibold uppercase tracking-wide text-muted-foreground">
                  Citations
                </dt>
                <dd>
                  <SourceBadges sources={m.sources} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </li>
  );
}

export function TreeView() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-plaque sm:p-6">
      <p className="mb-4 text-sm text-muted-foreground">
        Expand each branch to walk from Parliament down to the individual office-bearer. Every leaf
        opens to reveal party, constituency, exact tenure dates and citations.
      </p>
      <ul>
        <Branch
          depth={0}
          defaultOpen
          header={
            <span className="min-w-0">
              <span className="block font-display text-base font-semibold">Parliament of India</span>
              <span className="block text-xs text-muted-foreground">
                Sansad — the President, the Lok Sabha and the Rajya Sabha
              </span>
            </span>
          }
        >
          {bodies.map((b) => (
            <Branch
              key={b.id}
              depth={1}
              header={
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold">{b.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{b.subtitle}</span>
                </span>
              }
            >
              {b.groups.map((g) => (
                <Branch
                  key={g.id}
                  depth={2}
                  header={
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{g.label}</span>
                      <span className="block text-xs text-muted-foreground">
                        {g.members.length} {g.members.length === 1 ? "entry" : "entries"}
                      </span>
                    </span>
                  }
                >
                  {g.members.map((m) => (
                    <Leaf key={`${m.name}-${m.title}`} m={m} />
                  ))}
                </Branch>
              ))}
            </Branch>
          ))}
        </Branch>
      </ul>
    </div>
  );
}
