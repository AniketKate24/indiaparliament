import { useState } from "react";
import type { Source, Appointment } from "@/data/parliament";

export const appointmentTone: Record<Appointment, string> = {
  Elected: "bg-verdant/12 text-verdant border-verdant/30",
  Appointed: "bg-accent text-accent-foreground border-saffron/40",
  Nominated: "bg-secondary text-secondary-foreground border-border",
  "Ex officio": "bg-muted text-muted-foreground border-border",
};

export const sourceTone: Record<Source["type"], string> = {
  Bulletin: "bg-verdant/12 text-verdant border-verdant/35",
  Official: "bg-primary/10 text-primary border-primary/30",
  Press: "bg-accent text-accent-foreground border-saffron/45",
};

export function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: string | undefined;
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        tone ?? "bg-muted text-muted-foreground border-border"
      }`}
    >
      {children}
    </span>
  );
}

export function SourceBadges({ sources }: { sources: Source[] }) {
  if (!sources?.length) return <span className="text-xs text-muted-foreground">No source on file</span>;
  return (
    <ul className="flex flex-col gap-1.5">
      {sources.map((s) => (
        <li key={s.url + s.label}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-opacity hover:opacity-80 ${sourceTone[s.type]}`}
            title={s.label}
          >
            <span className="uppercase tracking-wide">{s.type}</span>
            <span className="truncate font-medium normal-case opacity-80">{s.label}</span>
            <span aria-hidden>↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function initials(name: string) {
  return name
    .replace(/['"]/g, "")
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Portrait({
  name,
  photo,
  size = 44,
}: {
  name: string;
  photo?: string | undefined;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const style = { width: size, height: size };

  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt={`Portrait of ${name}`}
        loading="lazy"
        onError={() => setFailed(true)}
        style={style}
        className="shrink-0 rounded-full border border-border object-cover object-top"
      />
    );
  }
  return (
    <span
      style={style}
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-display text-xs font-semibold text-secondary-foreground"
    >
      {initials(name) || "—"}
    </span>
  );
}
