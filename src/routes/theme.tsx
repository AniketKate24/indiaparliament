import { createFileRoute, Link } from "@tanstack/react-router";
import { Chakra } from "@/components/brand/Chakra";

export const Route = createFileRoute("/theme")({
  head: () => ({
    meta: [
      { title: "Tiranga Theme — Parliament of India Directory" },
      {
        name: "description",
        content:
          "Tiranga design system for the Parliament of India Directory: saffron, white, India green and Ashoka Chakra navy tokens, typography, components and accessibility ratios.",
      },
      { property: "og:title", content: "Tiranga Theme — Parliament of India Directory" },
      {
        property: "og:description",
        content:
          "CSS custom properties, component snippets, contrast tables and cultural guidance for an Indian flag themed website.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThemeSpec,
});

const palette = [
  {
    name: "Saffron",
    hex: "#FF9933",
    token: "--saffron",
    swatch: "bg-saffron",
    role: "Accent / energy",
    usage: "Highlights, active states, top band, stat figures, focus glow. Never body text on white.",
    variants: ["--saffron-12 tint", "--saffron-24 hover", "--saffron-60 overlay", "--saffron-text AA text"],
  },
  {
    name: "White",
    hex: "#FFFFFF",
    token: "--card / --background",
    swatch: "bg-card border border-border",
    role: "Surface / background",
    usage: "Cards, tables, forms, the centre band. Carries all long-form reading.",
    variants: ["#FFFFFF surface", "#FCFCFA page", "white/15 on navy", "white/70 muted on navy"],
  },
  {
    name: "India green",
    hex: "#138808",
    token: "--verdant",
    swatch: "bg-verdant",
    role: "Secondary / affirmative",
    usage: "Success, verified sources, footer band, confirm buttons, focus ring.",
    variants: ["--verdant-12 tint", "--verdant-24 hover", "--verdant-60 overlay", "--verdant-text AA text"],
  },
  {
    name: "Chakra navy",
    hex: "#000080",
    token: "--primary / --ink",
    swatch: "bg-primary",
    role: "Primary / structure",
    usage: "Header, primary buttons, headings, the Chakra mark. The workhorse colour.",
    variants: ["--chakra-12 tint", "--chakra-24 divider", "--chakra-70 scrim", "#000080 solid"],
  },
];

const contrast = [
  { pair: "Navy #000080 on white", ratio: "15.3:1", grade: "AAA", ok: true },
  { pair: "White on navy #000080", ratio: "15.3:1", grade: "AAA", ok: true },
  { pair: "Green #138808 on white", ratio: "4.9:1", grade: "AA (body), AAA at 18pt+", ok: true },
  { pair: "Deep green var(--verdant-text) on white", ratio: "7.4:1", grade: "AAA", ok: true },
  { pair: "Saffron #FF9933 on white", ratio: "2.0:1", grade: "FAIL — decorative only", ok: false },
  { pair: "Navy on saffron #FF9933", ratio: "7.6:1", grade: "AAA", ok: true },
  { pair: "Burnt saffron var(--saffron-text) on white", ratio: "5.6:1", grade: "AA", ok: true },
  { pair: "White on green #138808", ratio: "4.3:1", grade: "AA large only — use 18pt+/bold", ok: false },
];

const cssSnippet = `:root {
  /* Flag colours */
  --saffron:  oklch(0.76 0.16 60);   /* #FF9933 */
  --white:    #ffffff;
  --verdant:  oklch(0.52 0.17 143);  /* #138808 */
  --chakra:   oklch(0.24 0.14 279);  /* #000080 */

  /* Opacity variants — overlays, tints, hovers */
  --saffron-12: oklch(0.76 0.16 60 / .12);
  --saffron-24: oklch(0.76 0.16 60 / .24);
  --saffron-60: oklch(0.76 0.16 60 / .60);
  --verdant-12: oklch(0.52 0.17 143 / .12);
  --verdant-24: oklch(0.52 0.17 143 / .24);
  --chakra-70:  oklch(0.24 0.14 279 / .70);

  /* AA-safe text substitutes on white */
  --saffron-text: oklch(0.48 0.13 55);
  --verdant-text: oklch(0.42 0.14 143);

  /* Semantic roles */
  --background: #fcfcfa;  --foreground: var(--chakra);
  --primary: var(--chakra);        --primary-foreground: #fff;
  --secondary: var(--saffron-12);  --accent: var(--saffron);
  --ring: var(--verdant);          --border: oklch(0.88 0.02 80);
}`;

const bandSnippet = `/* Tricolour band — 1:1:1 stripes, used as page rule only */
.tricolor-band {
  background: linear-gradient(to bottom,
    var(--saffron) 0 33.333%,
    #fff 33.333% 66.666%,
    var(--verdant) 66.666% 100%);
}

/* Subtle page wash: saffron dawn at top, green field at foot */
.tricolor-wash {
  background:
    linear-gradient(to bottom, var(--saffron-12), transparent 38%),
    linear-gradient(to top,    var(--verdant-12), transparent 38%);
}`;

const buttonSnippet = `<button class="rounded-md bg-primary px-4 py-2 font-semibold
  text-primary-foreground hover:bg-primary/90
  focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-verdant">
  Primary
</button>`;

const wireframe = `┌──────────────────────────────────────────────┐
│ ▓▓▓ saffron band  (4px, full bleed)          │
├──────────────────────────────────────────────┤
│ NAV  ◉ Chakra mark   Home  Directory  Theme  │  navy bg, white text
├──────────────────────────────────────────────┤
│                                              │
│  HERO  ── saffron kicker rule ──             │  navy → navy/95
│  H1 display serif, white                     │  saffron numerals
│  [ Primary navy btn ]  [ Ghost white btn ]   │
├──────────────────────────────────────────────┤
│  WHITE CANVAS  (all reading happens here)    │
│  ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ card   │ │ card   │ │ card   │  saffron   │
│  │ navy h3│ │        │ │        │  top hair- │
│  └────────┘ └────────┘ └────────┘  line      │
│  ── tricolour rule (3px) section divider ──  │
│  table: navy head row, green verified tags   │
├──────────────────────────────────────────────┤
│ FOOTER  green field, white text, ◉ mark      │
│ ▓▓▓ green band closes the page               │
└──────────────────────────────────────────────┘`;

function Section({
  id,
  n,
  title,
  lead,
  children,
}: {
  id: string;
  n: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-12">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-sm font-semibold text-saffron-text">{n}</span>
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
      </div>
      {lead ? <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{lead}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-primary p-4 text-[12px] leading-relaxed text-primary-foreground/90">
      <code>{children}</code>
    </pre>
  );
}

function Do({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-relaxed">
      <span className="mt-0.5 font-semibold text-verdant-text">Do</span>
      <span className="text-muted-foreground">{children}</span>
    </li>
  );
}

function Dont({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-relaxed">
      <span className="mt-0.5 font-semibold text-destructive">Don't</span>
      <span className="text-muted-foreground">{children}</span>
    </li>
  );
}

function ThemeSpec() {
  return (
    <main className="min-h-dvh bg-background font-sans text-foreground">
      <div className="tricolor-band h-2 w-full" aria-hidden />

      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
            <Chakra size={22} className="text-saffron" />
            <span className="h-px w-10 bg-saffron" />
            Design system
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight font-semibold sm:text-5xl">
            Tiranga — a complete Indian flag theme
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
            Saffron #FF9933, white #FFFFFF, India green #138808 and Ashoka Chakra navy #000080 —
            specified as tokens, type, layout, components, contrast ratios and Flag Code guidance.
            This page renders the live theme it documents.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-primary-foreground/25 px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/10"
          >
            ← Back to the directory
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <Section
          id="palette"
          n="01"
          title="Colour palette and usage"
          lead="Four colours, four jobs. Navy carries structure and text, white carries reading, green affirms, saffron accents. Saffron and green are never load-bearing for small text on white — the AA-safe substitutes below exist for that."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {palette.map((c) => (
              <article key={c.name} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className={`h-20 ${c.swatch}`} aria-hidden />
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                    <code className="text-xs text-muted-foreground">{c.hex}</code>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-saffron-text">
                    {c.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.usage}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {c.variants.map((v) => (
                      <li
                        key={v}
                        className="rounded border border-border bg-muted px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Code>{cssSnippet}</Code>
          </div>
        </Section>

        <Section
          id="type"
          n="02"
          title="Typography"
          lead="A humanist serif for display and a neutral grotesque for text: dignified without turning theatrical. Devanagari pairing keeps bilingual headings on the same rhythm."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                k: "Headings",
                f: "Fraunces (or Tiro Devanagari Hindi for हिन्दी)",
                spec: "600 weight, -0.01em tracking, 1.1 line-height, clamp(1.75rem, 4vw, 3rem). Colour: navy on white, white on navy.",
                sample: <span className="font-display text-3xl font-semibold">Sansad</span>,
              },
              {
                k: "Body",
                f: "Source Sans 3",
                spec: "400/16px, 1.65 line-height, max 68ch measure. Colour: --foreground; secondary text --muted-foreground.",
                sample: <span className="text-base">Readable at 16px minimum.</span>,
              },
              {
                k: "Accent / eyebrow",
                f: "Source Sans 3 uppercase",
                spec: "600/12px, 0.24em tracking, saffron-text on white or saffron on navy. Never longer than five words.",
                sample: (
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-saffron-text">
                    Sansad Bhavan
                  </span>
                ),
              },
            ].map((t) => (
              <article key={t.k} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-lg font-semibold">{t.k}</h3>
                <p className="mt-1 text-xs text-saffron-text">{t.f}</p>
                <div className="mt-4 border-y border-border py-4">{t.sample}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.spec}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="layout"
          n="03"
          title="Layout and visual hierarchy"
          lead="The flag reads top-to-bottom, so the page does too: saffron at the crown, a wide white reading field, green at the foot. Bands stay thin rules and washes — the page is never divided into three equal coloured thirds, which would imitate the flag itself."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="tricolor-wash p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-saffron-text">
                  Saffron dawn
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A 12% saffron gradient fades out by 38% of the viewport height; a matching 12%
                  green rises from the footer. Content sits on plain white in between, so contrast
                  never drops below the values in section 06.
                </p>
                <hr className="tricolor-rule my-6" />
                <p className="text-xs text-muted-foreground">
                  3px tricolour rule as a section divider.
                </p>
              </div>
            </div>
            <Code>{wireframe}</Code>
          </div>
          <div className="mt-4">
            <Code>{bandSnippet}</Code>
          </div>
        </Section>

        <Section
          id="components"
          n="04"
          title="UI components"
          lead="Every control below is live — inspect it, then copy the pattern."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-semibold">Buttons</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verdant">
                  Primary · navy
                </button>
                <button className="rounded-md bg-verdant px-4 py-2 text-sm font-semibold text-verdant-foreground transition hover:brightness-95">
                  Confirm · green
                </button>
                <button className="rounded-md bg-saffron px-4 py-2 text-sm font-semibold text-saffron-foreground transition hover:brightness-105">
                  Accent · saffron
                </button>
                <button className="rounded-md border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-secondary">
                  Ghost
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Saffron buttons always take navy labels (7.6:1). Green buttons take white labels at
                14px+ semibold. Focus ring is India green at 2px with 2px offset on every variant.
              </p>
              <div className="mt-4">
                <Code>{buttonSnippet}</Code>
              </div>
            </article>

            <article className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-semibold">Cards</h3>
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card shadow-plaque">
                <div className="h-1 bg-saffron" aria-hidden />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-verdant-text">
                    Verified
                  </p>
                  <h4 className="mt-1 font-display text-base font-semibold">Card with saffron hairline</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    White surface, 1px --border, 12px radius, saffron 4px top hairline for emphasis,
                    green tint (--verdant-12) for the affirmative state.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-semibold">Navigation</h3>
              <nav className="mt-4 overflow-hidden rounded-lg border border-border">
                <div className="tricolor-band h-1" aria-hidden />
                <div className="flex items-center gap-4 bg-primary px-4 py-3 text-primary-foreground">
                  <Chakra size={18} className="text-saffron" />
                  <span className="text-sm font-semibold">Tiranga</span>
                  <span className="ml-auto flex gap-3 text-xs">
                    <span className="border-b-2 border-saffron pb-0.5">Home</span>
                    <span className="text-primary-foreground/70">Directory</span>
                    <span className="text-primary-foreground/70">Theme</span>
                  </span>
                </div>
              </nav>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Navy bar, white labels, saffron 2px underline for the active item, 1px tricolour hair
                above. Sticky variant drops to bg-card/95 with backdrop blur so the white field keeps
                text legible while scrolling.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-lg font-semibold">Forms</h3>
              <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="spec-name" className="text-xs font-semibold uppercase tracking-wide">
                    Member name
                  </label>
                  <input
                    id="spec-name"
                    placeholder="Search the directory"
                    className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-verdant focus:outline-2 focus:outline-offset-1 focus:outline-verdant"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="spec-check"
                    type="checkbox"
                    defaultChecked
                    className="size-4 accent-[var(--verdant)]"
                  />
                  <label htmlFor="spec-check" className="text-sm text-muted-foreground">
                    Official bulletin sources only
                  </label>
                </div>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Apply
                </button>
              </form>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Inputs stay white with a warm-grey border; focus turns the border India green.
                Errors use --destructive plus an icon and text label, never colour alone.
              </p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
              <h3 className="font-display text-lg font-semibold">Footer</h3>
              <div className="mt-4 overflow-hidden rounded-lg">
                <div className="bg-verdant px-5 py-6 text-verdant-foreground">
                  <div className="flex items-center gap-3">
                    <Chakra size={20} />
                    <span className="font-display text-base font-semibold">Tiranga theme</span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm text-verdant-foreground/85">
                    India-green field, white text at 15px semibold minimum for AA, Chakra mark in
                    white, and a closing 4px green band. Legal and source links sit at 14px.
                  </p>
                </div>
                <div className="h-1 bg-verdant" aria-hidden />
              </div>
            </article>
          </div>
        </Section>

        <Section
          id="chakra"
          n="05"
          title="Ashoka Chakra integration"
          lead="The Chakra is drawn as a standalone 24-spoke navy wheel — a motif, not a flag. Keeping it separate from saffron and green bands is what keeps the usage compliant and respectful."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Logo mark", node: <Chakra size={40} className="text-primary" /> },
              {
                label: "Loading spinner",
                node: <Chakra size={40} spinning className="text-primary" />,
              },
              { label: "Section divider", node: <hr className="tricolor-rule w-full" /> },
            ].map((x) => (
              <article
                key={x.label}
                className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="flex h-14 w-full items-center justify-center">{x.node}</div>
                <p className="text-sm font-semibold">{x.label}</p>
              </article>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            <Do>Draw exactly 24 evenly spaced spokes in navy (#000080) — the count is prescribed.</Do>
            <Do>Use it as a favicon, spinner, watermark at ≤8% opacity, or bullet glyph.</Do>
            <Do>Rotate the spinner clockwise, slowly (6s), and disable it under prefers-reduced-motion.</Do>
            <Dont>
              Place the Chakra on a saffron/white/green banner — that composes an actual National
              Flag, which the Flag Code governs and which a website decoration must not imitate.
            </Dont>
            <Dont>
              Distort, recolour, add text inside the wheel, use it as a page background behind
              content, or apply it to merchandise, packaging or purely commercial promotion.
            </Dont>
            <Dont>Use the State Emblem (four lions) at all — it is separately restricted by law.</Dont>
          </ul>
        </Section>

        <Section
          id="a11y"
          n="06"
          title="Accessibility"
          lead="Measured against WCAG 2.1. Saffron on white fails badly at 2.0:1, so it is never used for text — the burnt-saffron token exists for that job."
        >
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[520px] border-collapse bg-card text-left text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 font-semibold">Combination</th>
                  <th className="px-4 py-3 font-semibold">Ratio</th>
                  <th className="px-4 py-3 font-semibold">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {contrast.map((r) => (
                  <tr key={r.pair} className="border-t border-border">
                    <td className="px-4 py-3">{r.pair}</td>
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{r.ratio}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          r.ok
                            ? "bg-[var(--verdant-12)] text-verdant-text"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {r.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-6 space-y-2">
            <Do>Reserve saffron for fills, rules, icons ≥24px and borders — never for text on white.</Do>
            <Do>Pair every colour-coded status with a text label or icon for colour-blind users.</Do>
            <Do>Keep the focus ring India green at 2px/2px offset (3:1 against both white and navy).</Do>
            <Do>Use h-dvh, 44×44px minimum tap targets, and a single &lt;main&gt; landmark per page.</Do>
            <Dont>Set body text on the tricolour wash where the tint exceeds 12%.</Dont>
          </ul>
        </Section>

        <Section
          id="responsive"
          n="07"
          title="Responsive behaviour"
          lead="The tricolour signals scale down rather than disappear, so the identity survives on a 360px screen."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                k: "Mobile · <640px",
                pts: [
                  "Top band 3px; wash gradients shortened to 22% height",
                  "Single column, 20px gutters, cards full-bleed with 12px radius",
                  "Nav collapses to Chakra mark + sheet menu; tabs scroll horizontally",
                  "Display type clamps to 1.75rem; tables become stacked key/value cards",
                ],
              },
              {
                k: "Tablet · 640–1024px",
                pts: [
                  "Top band 4px; two-column card grid",
                  "Sticky nav with visible labels, saffron underline retained",
                  "Tables scroll horizontally inside a bordered container",
                  "Hero padding 3.5rem, measure capped at 60ch",
                ],
              },
              {
                k: "Desktop · ≥1024px",
                pts: [
                  "Top band 8px; full saffron-dawn and green-field washes",
                  "Max width 1152px, three/four column grids",
                  "Hover states enabled (saffron-24 tints); Chakra watermark ≤8% in hero",
                  "Section dividers use the full 3px tricolour rule",
                ],
              },
            ].map((b) => (
              <article key={b.k} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-semibold">{b.k}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {b.pts.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-saffron" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="culture"
          n="08"
          title="Cultural sensitivity"
          lead="The tricolour carries statutory and emotional weight. Use it where the subject is genuinely civic; choose another palette where it is not."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-base font-semibold text-verdant-text">Appropriate</h3>
              <ul className="mt-3 space-y-2">
                <Do>Government, parliamentary and civic-information sites like this directory.</Do>
                <Do>Republic Day, Independence Day and national commemoration pages.</Do>
                <Do>Public-service, education and non-partisan civic-tech projects.</Do>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-base font-semibold text-destructive">Avoid</h3>
              <ul className="mt-3 space-y-2">
                <Dont>Rendering a literal flag as a background, loader, cursor or scroll effect.</Dont>
                <Dont>
                  Animating, tearing, folding, fragmenting or inverting the bands; the flag is never a
                  transition device.
                </Dont>
                <Dont>
                  Tying the palette to a political party, a sale, or merchandise — it reads as
                  appropriation of a national symbol.
                </Dont>
                <Dont>
                  Mixing the tricolour with religious iconography, or placing text or logos over the
                  band area.
                </Dont>
              </ul>
            </div>
          </div>
        </Section>
      </div>

      <footer className="bg-verdant px-6 py-8 text-verdant-foreground">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <Chakra size={20} />
          <p className="text-sm font-semibold">
            Tiranga theme specification · colours per the Flag Code of India, 2002
          </p>
        </div>
      </footer>
    </main>
  );
}
