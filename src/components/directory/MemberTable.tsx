import type { Member } from "@/data/parliament";
import { Portrait, SourceBadges, Tag, appointmentTone } from "@/components/directory/ui";

export function MemberRow({ m }: { m: Member }) {
  return (
    <tr className="border-t border-border align-top transition-colors hover:bg-muted/60">
      <td className="px-4 py-4">
        <div className="flex items-start gap-3">
          <Portrait name={m.name} photo={m.photo} />
          <div className="min-w-0">
            <div
              className={`font-display text-[15px] font-semibold leading-snug ${
                m.vacant ? "italic text-muted-foreground" : "text-foreground"
              }`}
            >
              {m.name}
            </div>
            {(m.party || m.constituency) && (
              <div className="mt-1 text-xs text-muted-foreground">
                {[m.party, m.constituency].filter(Boolean).join(" · ")}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm leading-snug">{m.title}</td>
      <td className="px-4 py-4 text-sm leading-snug">
        <div>
          <span className="text-muted-foreground">From </span>
          {m.start}
        </div>
        <div className="mt-1">
          <span className="text-muted-foreground">Until </span>
          {m.end}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col items-start gap-1.5">
          <Tag tone={appointmentTone[m.appointment]}>{m.appointment}</Tag>
          {m.vacant && (
            <Tag tone="bg-destructive/10 text-destructive border-destructive/30">Vacant</Tag>
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <SourceBadges sources={m.sources} />
      </td>
      <td className="px-4 py-4 text-xs leading-relaxed text-muted-foreground">{m.note ?? "—"}</td>
    </tr>
  );
}

export function MemberTable({ members }: { members: Member[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card shadow-plaque">
      <table className="w-full min-w-[1100px] border-collapse text-left">
        <thead>
          <tr className="bg-secondary text-[11px] uppercase tracking-wide text-secondary-foreground">
            <th className="px-4 py-3 font-semibold">Member</th>
            <th className="px-4 py-3 font-semibold">Designation</th>
            <th className="px-4 py-3 font-semibold">Tenure</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Sources</th>
            <th className="px-4 py-3 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <MemberRow key={`${m.name}-${m.title}`} m={m} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
