import { bodies, type Member, type Source } from "./parliament";

export interface TreeNode {
  id: string;
  label: string;
  sublabel?: string;
  article?: string;
  detail?: string;
  sources?: Source[];
  member?: Member;
  children?: TreeNode[];
}

const SANSAD_LS_MEMBERS: Source = {
  type: "Official",
  label: "sansad.in — Lok Sabha members (18th Lok Sabha)",
  url: "https://sansad.in/ls/members",
};
const SANSAD_RS_MEMBERS: Source = {
  type: "Official",
  label: "sansad.in — Rajya Sabha members",
  url: "https://sansad.in/rs/members",
};

const body = (id: string) => bodies.find((b) => b.id === id)!;

function bodyGroupNodes(bodyId: string): TreeNode[] {
  return body(bodyId).groups.map((g) => ({
    id: `${bodyId}-${g.id}`,
    label: g.label,
    sublabel: `${g.members.length} ${g.members.length === 1 ? "entry" : "entries"}`,
    detail: g.blurb,
    children: g.members.map((m) => ({
      id: `${bodyId}-${g.id}-${m.name}-${m.title}`,
      label: m.name,
      sublabel: m.title,
      member: m,
    })),
  }));
}

function mp(
  name: string,
  constituency: string,
  party: string,
  start: string,
  end: string,
  house: "ls" | "rs",
): TreeNode {
  return {
    id: `${house}-mp-${name}`,
    label: name,
    sublabel: `${constituency} · ${party}`,
    member: {
      name,
      title: house === "ls" ? "Member of Parliament, Lok Sabha" : "Member of Parliament, Rajya Sabha",
      party,
      constituency,
      start,
      end,
      appointment: house === "ls" ? "Elected" : "Elected",
      sources: [house === "ls" ? SANSAD_LS_MEMBERS : SANSAD_RS_MEMBERS],
      note:
        house === "ls"
          ? "Directly elected from a territorial constituency under Article 81; term co-terminous with the 18th Lok Sabha."
          : "Elected by the elected members of the State Legislative Assembly under Article 80(4) for a six-year term.",
    },
  };
}

const lsBenches: TreeNode = {
  id: "ls-benches",
  label: "Members of the House (543 elected MPs)",
  article: "Article 81",
  detail:
    "Every individual MP sits under a party bench. Representative members are listed here; the full roll of 543 is published constituency-wise on sansad.in.",
  sources: [SANSAD_LS_MEMBERS],
  children: [
    {
      id: "ls-nda",
      label: "Treasury benches — National Democratic Alliance",
      sublabel: "293 members (BJP 240 + allies)",
      children: [
        mp("Narendra Damodardas Modi", "Varanasi, Uttar Pradesh", "Bharatiya Janata Party", "24 June 2024", "23 June 2029", "ls"),
        mp("Amit Anilchandra Shah", "Gandhinagar, Gujarat", "Bharatiya Janata Party", "24 June 2024", "23 June 2029", "ls"),
        mp("Rajnath Singh", "Lucknow, Uttar Pradesh", "Bharatiya Janata Party", "24 June 2024", "23 June 2029", "ls"),
        mp("Chirag Paswan", "Hajipur, Bihar", "Lok Janshakti Party (Ram Vilas)", "24 June 2024", "23 June 2029", "ls"),
      ],
    },
    {
      id: "ls-india",
      label: "Opposition benches — INDIA bloc",
      sublabel: "234 members (INC 99 + allies)",
      children: [
        mp("Rahul Rajiv Gandhi", "Rae Bareli, Uttar Pradesh", "Indian National Congress", "24 June 2024", "23 June 2029", "ls"),
        mp("Akhilesh Yadav", "Kannauj, Uttar Pradesh", "Samajwadi Party", "24 June 2024", "23 June 2029", "ls"),
        mp("Shashi Tharoor", "Thiruvananthapuram, Kerala", "Indian National Congress", "24 June 2024", "23 June 2029", "ls"),
        mp("Mahua Moitra", "Krishnanagar, West Bengal", "All India Trinamool Congress", "24 June 2024", "23 June 2029", "ls"),
      ],
    },
    {
      id: "ls-others",
      label: "Unaligned members and independents",
      sublabel: "16 members",
      children: [
        mp("Asaduddin Owaisi", "Hyderabad, Telangana", "AIMIM", "24 June 2024", "23 June 2029", "ls"),
        mp("Engineer Rashid (Abdul Rashid Sheikh)", "Baramulla, Jammu & Kashmir", "Independent (AIP)", "24 June 2024", "23 June 2029", "ls"),
      ],
    },
  ],
};

const rsBenches: TreeNode = {
  id: "rs-benches",
  label: "Members of the House (233 elected + 12 nominated)",
  article: "Article 80",
  detail:
    "State delegations are elected by the elected members of each State Legislative Assembly; twelve members are nominated by the President for distinction in literature, science, art and social service.",
  sources: [SANSAD_RS_MEMBERS],
  children: [
    {
      id: "rs-state-delegations",
      label: "State and Union Territory delegations",
      sublabel: "233 elected members, one-third retiring every two years",
      children: [
        mp("Jagat Prakash Nadda", "Gujarat", "Bharatiya Janata Party", "3 April 2024", "2 April 2030", "rs"),
        mp("Mallikarjun Kharge", "Karnataka", "Indian National Congress", "26 June 2020", "25 June 2026 (re-elected)", "rs"),
        mp("Sonia Gandhi", "Rajasthan", "Indian National Congress", "20 February 2024", "19 February 2030", "rs"),
        mp("Derek O'Brien", "West Bengal", "All India Trinamool Congress", "3 April 2023", "2 April 2029", "rs"),
      ],
    },
    {
      id: "rs-nominated",
      label: "Nominated members",
      sublabel: "12 members nominated by the President",
      children: [
        {
          id: "rs-nominated-detail",
          label: "Presidential nominees",
          sublabel: "Article 80(1)(a) read with the Fourth Schedule",
          member: {
            name: "Twelve nominated members",
            title: "Nominated Member, Rajya Sabha",
            start: "Staggered six-year terms",
            end: "Six years from date of nomination",
            appointment: "Nominated",
            note: "Nominated by the President on the advice of the Council of Ministers for special knowledge or practical experience in literature, science, art and social service.",
            sources: [SANSAD_RS_MEMBERS],
          },
        },
      ],
    },
  ],
};

export const constitutionTree: TreeNode = {
  id: "constitution",
  label: "Constitution of India",
  sublabel: "Supreme law — in force since 26 January 1950",
  detail:
    "Part V of the Constitution constitutes the Union. Every parliamentary office below derives its existence, powers and tenure from a specific article.",
  sources: [
    {
      type: "Official",
      label: "legislative.gov.in — Constitution of India",
      url: "https://legislative.gov.in/constitution-of-india/",
    },
  ],
  children: [
    {
      id: "part-v",
      label: "Part V — The Union",
      article: "Articles 52–151",
      detail: "Chapter I creates the Executive; Chapter II creates Parliament.",
      children: [
        {
          id: "union-executive",
          label: "Chapter I — The Union Executive",
          article: "Articles 52–78",
          children: [
            {
              id: "president",
              label: "The President of India",
              article: "Article 52 & 79",
              detail:
                "A constituent part of Parliament. Summons and prorogues the Houses (Art 85), addresses them (Art 86–87), assents to Bills (Art 111) and nominates 12 Rajya Sabha members (Art 80).",
              sources: [
                { type: "Official", label: "presidentofindia.nic.in", url: "https://presidentofindia.nic.in/" },
              ],
              children: [
                {
                  id: "president-holder",
                  label: "Droupadi Murmu",
                  sublabel: "President of India",
                  member: {
                    name: "Droupadi Murmu",
                    title: "President of India — constituent part of Parliament under Article 79",
                    start: "25 July 2022",
                    end: "24 July 2027",
                    appointment: "Elected",
                    note: "Elected by an electoral college of MPs and MLAs under Article 54.",
                    sources: [
                      { type: "Official", label: "presidentofindia.nic.in — The President", url: "https://presidentofindia.nic.in/" },
                    ],
                  },
                },
              ],
            },
            {
              id: "vice-president",
              label: "The Vice-President of India",
              article: "Articles 63–64",
              detail: "Ex officio Chairman of the Rajya Sabha.",
              children: [
                {
                  id: "vp-holder",
                  label: "Chandrapuram Ponnusamy Radhakrishnan",
                  sublabel: "Vice-President and Chairman, Rajya Sabha",
                  member: {
                    name: "Chandrapuram Ponnusamy Radhakrishnan",
                    title: "Vice-President of India; ex officio Chairman, Rajya Sabha",
                    start: "12 September 2025",
                    end: "11 September 2030",
                    appointment: "Elected",
                    sources: [
                      { type: "Official", label: "sansad.in — Rajya Sabha leadership", url: "https://sansad.in/rs" },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          id: "parliament",
          label: "Chapter II — Parliament of India (Sansad)",
          article: "Article 79",
          detail:
            "\u201cThere shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States and the House of the People.\u201d",
          children: [
            {
              id: "tree-lok-sabha",
              label: "House of the People — Lok Sabha",
              article: "Articles 81, 83(2), 93",
              detail: body("lok-sabha").subtitle,
              children: [
                {
                  id: "ls-offices",
                  label: "Constitutional and House offices",
                  sublabel: `${body("lok-sabha").groups.length} functional branches`,
                  children: bodyGroupNodes("lok-sabha"),
                },
                lsBenches,
              ],
            },
            {
              id: "tree-rajya-sabha",
              label: "Council of States — Rajya Sabha",
              article: "Articles 80, 83(1), 89",
              detail: body("rajya-sabha").subtitle,
              children: [
                {
                  id: "rs-offices",
                  label: "Constitutional and House offices",
                  sublabel: `${body("rajya-sabha").groups.length} functional branches`,
                  children: bodyGroupNodes("rajya-sabha"),
                },
                rsBenches,
              ],
            },
            {
              id: "tree-committees",
              label: "Parliamentary Committees & Joint Boards",
              article: "Article 118 — rules of procedure of each House",
              detail: body("committees").subtitle,
              children: bodyGroupNodes("committees"),
            },
          ],
        },
      ],
    },
  ],
};
