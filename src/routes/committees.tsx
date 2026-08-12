import { createFileRoute } from "@tanstack/react-router";
import { bodies } from "@/data/parliament";
import { BodyPage } from "@/components/directory/BodyPage";

const TITLE = "Parliamentary Committees of India 2026 — Chairpersons List";
const DESCRIPTION =
  "Parliamentary committees of India 2026-27: PAC, Estimates and Public Undertakings chairpersons, joint committees and statutory boards with tenure dates and cited sources.";
const URL = "https://indian-parliament.lovable.app/committees";

export const Route = createFileRoute("/committees")({
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
            name: "Parliamentary Committees, Parliament of India",
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
              {
                "@type": "ListItem",
                position: 2,
                name: "Committees and joint boards",
                item: URL,
              },
            ],
          },
        }),
      },
    ],
  }),
  component: CommitteesPage,
});

function CommitteesPage() {
  const body = bodies.find((b) => b.id === "committees");
  if (!body) return null;

  return (
    <BodyPage
      body={body}
      crumb="Committees"
      heading="Parliamentary committees and joint boards of India"
      intro="Chairpersons and office-bearers of the financial committees (Public Accounts, Estimates, Public Undertakings), joint parliamentary committees, special boards and the departmentally-related standing committees — with the current term, whether the post is elected, nominated or appointed, and the bulletin or official citation behind each entry."
      footnote="Financial committees are reconstituted annually for a 1 May – 30 April term; departmentally-related standing committees are reconstituted each year and chairpersons rotate between the two Houses."
      changeFilter={/committee|board|chairperson|pac|estimates|undertakings/i}
      otherLinks={[
        { to: "/lok-sabha", label: "Lok Sabha members" },
        { to: "/rajya-sabha", label: "Rajya Sabha members" },
        { to: "/", label: "Full directory" },
      ]}
    />
  );
}
