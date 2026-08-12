import { createFileRoute } from "@tanstack/react-router";
import { bodies } from "@/data/parliament";
import { BodyPage } from "@/components/directory/BodyPage";

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
  const body = bodies.find((b) => b.id === "rajya-sabha");
  if (!body) return null;

  return (
    <BodyPage
      body={body}
      crumb="Rajya Sabha"
      heading="Rajya Sabha members list — office-bearers of the Council of States"
      intro="The current leadership of the Rajya Sabha (Upper House of the Parliament of India): the Chairman and Deputy Chairman, the Leader of the House and Leader of the Opposition, floor leaders and whips, nominated members and the Secretariat — each with exact tenure dates, whether the post is elected, nominated, appointed or held ex officio, and the bulletin or official citation behind the entry."
      footnote="The Rajya Sabha is a permanent body that is never dissolved; one-third of its members retire every two years, so floor leadership and panel nominations change on a rolling basis."
      changeFilter={/rajya sabha|council of states|chairman/i}
      otherLinks={[
        { to: "/lok-sabha", label: "Lok Sabha members" },
        { to: "/committees", label: "Committees & joint boards" },
        { to: "/", label: "Full directory" },
      ]}
    />
  );
}
