import { useMemo, useState } from "react";
import { updateLog, type LogKind } from "@/data/updateLog";
import { Tag, sourceTone } from "./ui";

const kindTone: Record<LogKind, string> = {
  Reappointment: "bg-verdant/12 text-verdant border-verdant/30",
  "New appointment": "bg-primary/10 text-primary border-primary/30",
  Vacancy: "bg-destructive/10 text-destructive border-destructive/30",
  Rotation: "bg-accent text-accent-foreground border-saffron/40",
  Scheduled: "bg-secondary text-secondary-foreground border-border",
};

const filters: (LogKind | "All")[] = [
  "All",
  "Reappointment",
  "New appointment",
  "Vacancy",
  "Rotation",
  "Scheduled",
];

export function UpdateLog() {
  const [filter, setFilter] = useState<LogKind | "All">("All");

  const entries = useMemo(
    () =>
      [...updateLog]
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
        .filter((e) => filter === "All" || e.kind === filter),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ol className="mt-6 space-y-4">
        {entries.map((e) => (
          <li key={e.id} className="rounded-xl border border-border bg-card p-5 shadow-plaque">
            <div className="flex flex-wrap items-center gap-3">
              <Tag tone={kindTone[e.kind]}>{e.kind}</Tag>
              <Tag>{e.body}</Tag>
              <time
                dateTime={e.timestamp}
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {e.displayDate}
              </time>
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                {e.timestamp.slice(0, 10)}T{e.timestamp.slice(11, 19)}Z
              </span>
            </div>

            <h3 className="mt-3 font-display text-base font-semibold">{e.office}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.summary}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
              <div className="rounded-lg border border-border bg-muted/60 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Previous
                </div>
                <div className="mt-1 text-sm font-semibold">{e.previous.holder}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {e.previous.start} → {e.previous.end}
                </div>
              </div>
              <div className="hidden items-center justify-center text-lg text-saffron sm:flex" aria-hidden>
                →
              </div>
              <div className="rounded-lg border border-verdant/30 bg-verdant/8 p-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  New / current
                </div>
                <div className="mt-1 text-sm font-semibold">{e.current.holder}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {e.current.start} → {e.current.end}
                </div>
              </div>
            </div>

            <a
              href={e.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-opacity hover:opacity-80 ${sourceTone[e.source.type]}`}
            >
              <span className="uppercase tracking-wide">{e.source.type}</span>
              <span className="font-medium normal-case opacity-80">{e.source.label}</span>
              <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
