import { Link } from "@tanstack/react-router";
import { AS_OF, type Body, changes } from "@/data/parliament";
import { MemberTable } from "@/components/directory/MemberTable";
import { Tag } from "@/components/directory/ui";

export function BodyPage({
  body,
  crumb,
  heading,
  intro,
  footnote,
  changeFilter,
  otherLinks,
}: {
  body: Body;
  crumb: string;
  heading: string;
  intro: string;
  footnote: string;
  changeFilter: RegExp;
  otherLinks: { to: string; label: string }[];
}) {
  const count = body.groups.flatMap((g) => g.members).length;
  const related = changes.filter((c) => changeFilter.test(c.text));

  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <div className="tricolor-band h-2 w-full" aria-hidden />
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
            <span className="chakra-ring h-5 w-5 shrink-0" aria-hidden />
            <Link to="/" className="underline-offset-4 hover:underline">
              Directory
            </Link>
            <span aria-hidden>/</span>
            <span>{crumb}</span>
          </nav>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight">{heading}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-primary-foreground/85">
            {intro}
          </p>
          <p className="mt-4 text-xs uppercase tracking-wide text-primary-foreground/70">
            Data current as of {AS_OF}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-xl border border-border bg-card p-6 shadow-plaque">
          <h2 className="font-display text-xl font-semibold">At a glance</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {body.meta.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border bg-background p-4 text-xs"
              >
                <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm">{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
            {count} positions listed below. {footnote}
          </p>
        </section>

        {body.groups.map((g) => (
          <section key={g.id} id={g.id} className="mt-14 scroll-mt-20">
            <div className="border-b-2 border-saffron pb-3">
              <h2 className="font-display text-2xl font-semibold">{g.label}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{g.blurb}</p>
            </div>
            <MemberTable members={g.members} />
          </section>
        ))}

        {related.length > 0 && (
          <section className="mt-16">
            <div className="border-b-2 border-saffron pb-3">
              <h2 className="font-display text-2xl font-semibold">
                Recent changes and upcoming rotations
              </h2>
            </div>
            <ul className="mt-6 space-y-4">
              {related.map((c) => (
                <li
                  key={c.text}
                  className="rounded-xl border border-border bg-card p-5 shadow-plaque"
                >
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
        )}

        <section className="mt-16 rounded-xl border border-border bg-secondary p-6 text-sm text-secondary-foreground">
          <h2 className="font-display text-lg font-semibold">Explore the rest of Parliament</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otherLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md border border-saffron/50 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
