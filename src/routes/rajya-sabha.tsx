import { createFileRoute, Link } from "@tanstack/react-router";
import { AS_OF, bodies, changes } from "@/data/parliament";
import { MemberTable } from "@/components/directory/MemberTable";
import { Tag } from "@/components/directory/ui";

const TITLE = "Rajya Sabha Members List 2026 — Leaders & Office-Bearers";
const DESCRIPTION =
  "Rajya Sabha members list 2026: Chairman, Deputy Chairman, Leader of the House, Leader of the Opposition, whips and panel members with tenure dates and cited sources.";
const URL = "https://indian-parliament.lovable.app/rajya-sabha";

export const Route = createFileRoute("/rajya-sabha")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESCRIPTION,
          url: URL,
          about: {
            "@type": "GovernmentOrganization",
            name: "Rajya Sabha (Council of States), Parliament of India",
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Parliament of India Directory",
                item: "https://indian-parliament.lovable.app/",
              },
              { "@type": "ListItem", position: 2, name: "Rajya Sabha members list", item: URL },
            ],
          },
        }),
      },
    ],
  }),
  component: RajyaSabhaPage,
});

function RajyaSabhaPage() {
  const rs = bodies.find((b) => b.id === "rajya-sabha");
  if (!rs) return null;

  const members = rs.groups.flatMap((g) => g.members);
  const rsChanges = changes.filter((c) => /rajya sabha|council of states|chairman/i.test(c.text));

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
            <span>Rajya Sabha</span>
          </nav>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight">
            Rajya Sabha members list — office-bearers of the Council of States
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-primary-foreground/85">
            The current leadership of the Rajya Sabha (Upper House of the Parliament of India): the
            Chairman and Deputy Chairman, the Leader of the House and Leader of the Opposition,
            floor leaders and whips, and the Panel of Vice-Chairpersons — each with exact tenure
            dates, whether the post is elected, nominated, appointed or held ex officio, and the
            official bulletin or press citation behind the entry.
          </p>
          <p className="mt-4 text-xs uppercase tracking-wide text-primary-foreground/70">
            Data current as of {AS_OF}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <section className="rounded-xl border border-border bg-card p-6 shadow-plaque">
          <h2 className="font-display text-xl font-semibold">About the House</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rs.meta.map((m) => (
              <div key={m.label} className="rounded-lg border border-border bg-background p-4 text-xs">
                <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm">{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
            {members.length} positions listed below. The Rajya Sabha is a permanent body that is
            never dissolved; one-third of its members retire every two years, so floor leadership
            and panel nominations change on a rolling basis.
          </p>
        </section>

        {rs.groups.map((g) => (
          <section key={g.id} id={g.id} className="mt-14 scroll-mt-20">
            <div className="border-b-2 border-saffron pb-3">
              <h2 className="font-display text-2xl font-semibold">{g.label}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{g.blurb}</p>
            </div>
            <MemberTable members={g.members} />
          </section>
        ))}

        {rsChanges.length > 0 && (
          <section className="mt-16">
            <div className="border-b-2 border-saffron pb-3">
              <h2 className="font-display text-2xl font-semibold">
                Recent changes and upcoming rotations
              </h2>
            </div>
            <ul className="mt-6 space-y-4">
              {rsChanges.map((c) => (
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
        )}

        <section className="mt-16 rounded-xl border border-border bg-secondary p-6 text-sm text-secondary-foreground">
          <h2 className="font-display text-lg font-semibold">Looking for the other House?</h2>
          <p className="mt-2 text-xs leading-relaxed">
            The full directory covers the Lok Sabha, joint and financial committees, an update log
            of tenure changes and an expandable constitutional tree from Article 79 down to the
            individual member.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-md border border-saffron/50 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide"
          >
            Open the full directory
          </Link>
        </section>
      </div>
    </main>
  );
}
