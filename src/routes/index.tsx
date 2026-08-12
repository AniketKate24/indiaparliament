import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AS_OF, bodies, changes, type Member } from "@/data/parliament";
import { updateLog } from "@/data/updateLog";
import { Portrait, SourceBadges, Tag, appointmentTone } from "@/components/directory/ui";
import { TreeView } from "@/components/directory/TreeView";
import { UpdateLog } from "@/components/directory/UpdateLog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indian Parliamentary Board Directory — Lok Sabha & Rajya Sabha" },
      {
        name: "description",
        content:
          "Sourced directory of India's parliamentary leadership: Speaker, Chairman, floor leaders, whips and committee chairs with tenures, citations, an update log and an expandable org tree.",
      },
      { property: "og:title", content: "Indian Parliamentary Board Directory" },
      {
        property: "og:description",
        content:
          "Lok Sabha, Rajya Sabha and joint committee office-bearers with tenure dates, official vs press citations, change log and tree view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Directory,
});

type TabId = "directory" | "log" | "tree";

const tabs: { id: TabId; label: string; hint: string }[] = [
  { id: "directory", label: "Directory", hint: "Tabular listing by House" },
  { id: "log", label: "Update log", hint: "Changes with previous vs new tenure" },
  { id: "tree", label: "Tree view", hint: "Expandable hierarchy with photos" },
];

function Row({ m }: { m: Member }) {
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

function Directory() {
  const [tab, setTab] = useState<TabId>("directory");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      bodies
        .map((b) => ({
          ...b,
          groups: b.groups
            .map((g) => ({
              ...g,
              members: q
                ? g.members.filter((m) =>
                    [m.name, m.title, m.party, m.constituency, m.note]
                      .filter(Boolean)
                      .join(" ")
                      .toLowerCase()
                      .includes(q),
                  )
                : g.members,
            }))
            .filter((g) => g.members.length > 0),
        }))
        .filter((b) => b.groups.length > 0),
    [q],
  );

  const all = bodies.flatMap((b) => b.groups.flatMap((g) => g.members));
  const citations = all.flatMap((m) => m.sources);
  const stats = [
    { label: "Positions mapped", value: String(all.length) },
    {
      label: "Official / bulletin cites",
      value: String(citations.filter((s) => s.type !== "Press").length),
    },
    { label: "Press cites", value: String(citations.filter((s) => s.type === "Press").length) },
    { label: "Logged changes", value: String(updateLog.length) },
  ];

  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <div className="tricolor-band h-2 w-full" aria-hidden />
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
            <span className="chakra-ring h-5 w-5 shrink-0" aria-hidden />
            <span className="h-px w-10 bg-saffron" />
            Sansad Bhavan · New Delhi
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight font-semibold sm:text-5xl">
            Parliamentary Board Directory of India
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
            Office-bearers of the Lok Sabha, the Rajya Sabha and the joint committees of Parliament —
            with full legal names, designations, tenure dates, the mode of appointment and a citation
            for every entry. Data current as of {AS_OF}.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-primary px-4 py-4">
                <div className="font-display text-2xl font-semibold text-saffron">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wide text-primary-foreground/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-3">
          <div role="tablist" aria-label="Views" className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                title={t.hint}
                onClick={() => setTab(t.id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  tab === t.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {tab === "directory" && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, role or party…"
              className="ml-auto w-full max-w-xs rounded-md border border-input bg-background px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring sm:w-64"
            />
          )}
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {tab === "directory" && (
          <>
            <section className="rounded-xl border border-border bg-card p-6 shadow-plaque">
              <h2 className="font-display text-xl font-semibold">
                Summary of the leadership structure
              </h2>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {bodies.map((b) => (
                  <div key={b.id} className="rounded-lg border border-border bg-background p-4">
                    <div className="font-display text-base font-semibold">{b.name}</div>
                    <p className="mt-1 text-xs text-muted-foreground">{b.subtitle}</p>
                    <dl className="mt-3 space-y-2">
                      {b.meta.map((m) => (
                        <div key={m.label} className="text-xs">
                          <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
                            {m.label}
                          </dt>
                          <dd className="mt-0.5">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="font-semibold uppercase tracking-wide">Citation key</span>
                <Tag tone="bg-verdant/12 text-verdant border-verdant/35">Bulletin</Tag>
                <span>Parliamentary Bulletin Part II notification</span>
                <Tag tone="bg-primary/10 text-primary border-primary/30">Official</Tag>
                <span>Government or House website</span>
                <Tag tone="bg-accent text-accent-foreground border-saffron/45">Press</Tag>
                <span>Media reporting — verify before citation</span>
              </div>
            </section>

            {filtered.length === 0 && (
              <p className="mt-12 text-center text-sm text-muted-foreground">
                No office-bearer matches “{query}”.
              </p>
            )}

            {filtered.map((b) => (
              <section key={b.id} id={b.id} className="mt-14 scroll-mt-20">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-saffron pb-3">
                  <h2 className="font-display text-2xl font-semibold">{b.name}</h2>
                  <p className="text-sm text-muted-foreground">{b.subtitle}</p>
                </div>

                {b.groups.map((g) => (
                  <div key={g.id} className="mt-8">
                    <h3 className="font-display text-lg font-semibold">{g.label}</h3>
                    <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{g.blurb}</p>
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
                          {g.members.map((m) => (
                            <Row key={`${m.name}-${m.title}`} m={m} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </section>
            ))}

            <section id="changes" className="mt-16 scroll-mt-20">
              <div className="border-b-2 border-saffron pb-3">
                <h2 className="font-display text-2xl font-semibold">
                  Vacancies and upcoming rotations at a glance
                </h2>
              </div>
              <ul className="mt-6 space-y-4">
                {changes.map((c) => (
                  <li key={c.text} className="rounded-xl border border-border bg-card p-5 shadow-plaque">
                    <div className="flex flex-wrap items-center gap-3">
                      <Tag tone="bg-accent text-accent-foreground border-saffron/40">{c.kind}</Tag>
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {c.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{c.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {tab === "log" && (
          <section>
            <div className="border-b-2 border-saffron pb-3">
              <h2 className="font-display text-2xl font-semibold">Update log</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Every recorded reappointment, new appointment, vacancy and rotation, with timestamps
                and the previous versus new tenure dates side by side.
              </p>
            </div>
            <div className="mt-6">
              <UpdateLog />
            </div>
          </section>
        )}

        {tab === "tree" && (
          <section>
            <div className="border-b-2 border-saffron pb-3">
              <h2 className="font-display text-2xl font-semibold">Structural tree</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Parliament → House → functional branch → office-bearer. Each node expands on demand.
              </p>
            </div>
            <div className="mt-6">
              <TreeView />
            </div>
          </section>
        )}

        <footer className="mt-16 rounded-xl border border-border bg-secondary p-6 text-xs leading-relaxed text-secondary-foreground">
          <p className="font-semibold uppercase tracking-wide">Sourcing and maintenance</p>
          <p className="mt-2">
            Citations are graded: <strong>Bulletin</strong> entries trace to a Parliamentary Bulletin
            Part II notification, <strong>Official</strong> entries to a House or government website,
            and <strong>Press</strong> entries to media reporting that should be confirmed against
            sansad.in before formal citation. Financial committees rotate on 1 May each year;
            departmentally-related standing committees are reconstituted annually; the Rajya Sabha
            renews one-third of its membership every two years. Portraits are drawn from Wikimedia
            Commons and fall back to a monogram where no free image exists.
          </p>
        </footer>
      </div>
    </main>
  );
}
