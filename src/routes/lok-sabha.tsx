import { createFileRoute } from "@tanstack/react-router";
import { bodies } from "@/data/parliament";
import { BodyPage } from "@/components/directory/BodyPage";

const TITLE = "Lok Sabha Members List 2026 — Speaker, Leaders & Whips";
const DESCRIPTION =
  "Lok Sabha members list 2026: Speaker Om Birla, Deputy Speaker vacancy, Leader of the House, Leader of the Opposition, whips and secretariat with tenures and cited sources.";
const URL = "https://indian-parliament.lovable.app/lok-sabha";

export const Route = createFileRoute("/lok-sabha")({
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
            name: "Lok Sabha (House of the People), Parliament of India",
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
              { "@type": "ListItem", position: 2, name: "Lok Sabha members list", item: URL },
            ],
          },
        }),
      },
    ],
  }),
  component: LokSabhaPage,
});

function LokSabhaPage() {
  const body = bodies.find((b) => b.id === "lok-sabha");
  if (!body) return null;

  return (
    <BodyPage
      body={body}
      crumb="Lok Sabha"
      heading="Lok Sabha members list — office-bearers of the House of the People"
      intro="The current leadership of the 18th Lok Sabha (Lower House of the Parliament of India): the Speaker and the vacant office of Deputy Speaker, the Panel of Chairpersons, the Leader of the House and Leader of the Opposition, party floor leaders and whips, and the Secretariat — each with exact tenure dates, whether the post is elected, nominated or appointed, and the bulletin or official citation behind the entry."
      footnote="The 18th Lok Sabha was constituted on 24 June 2024 and runs to June 2029 unless dissolved earlier; the Panel of Chairpersons is renominated each session."
      changeFilter={/lok sabha|speaker|house of the people/i}
      otherLinks={[
        { to: "/rajya-sabha", label: "Rajya Sabha members" },
        { to: "/committees", label: "Committees & joint boards" },
        { to: "/", label: "Full directory" },
      ]}
    />
  );
}
