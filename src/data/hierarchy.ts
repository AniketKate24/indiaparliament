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

const MHA: Source = {
  type: "Official",
  label: "mha.gov.in — Union Ministry of Home Affairs",
  url: "https://www.mha.gov.in/",
};
const PANCHAYATI_RAJ: Source = {
  type: "Official",
  label: "panchayat.gov.in — Ministry of Panchayati Raj",
  url: "https://panchayat.gov.in/",
};
const MOHUA: Source = {
  type: "Official",
  label: "mohua.gov.in — Ministry of Housing and Urban Affairs",
  url: "https://mohua.gov.in/",
};
const PMINDIA: Source = {
  type: "Official",
  label: "pmindia.gov.in — Prime Minister's Office",
  url: "https://www.pmindia.gov.in/",
};

const councilOfMinisters: TreeNode = {
  id: "council-of-ministers",
  label: "Prime Minister and the Union Council of Ministers",
  article: "Articles 74–75",
  detail:
    "The Council of Ministers, with the Prime Minister at its head, aids and advises the President, who acts on that advice. Ministers are collectively responsible to the Lok Sabha.",
  sources: [PMINDIA],
  children: [
    {
      id: "pm-holder",
      label: "Narendra Damodardas Modi",
      sublabel: "Prime Minister of India",
      member: {
        name: "Narendra Damodardas Modi",
        title: "Prime Minister of India; head of the Union Council of Ministers",
        party: "Bharatiya Janata Party",
        constituency: "Varanasi, Uttar Pradesh",
        start: "9 June 2024 (third term)",
        end: "Co-terminous with confidence of the 18th Lok Sabha",
        appointment: "Appointed",
        note: "Appointed by the President under Article 75(1) as the leader commanding a majority in the Lok Sabha.",
        sources: [PMINDIA],
      },
    },
    {
      id: "com-tiers",
      label: "Tiers of the Council",
      sublabel: "Cabinet Ministers · Ministers of State (Independent Charge) · Ministers of State",
      detail:
        "Total strength is capped at 15% of the Lok Sabha's membership by Article 75(1A). Portfolios are allocated by the President on the Prime Minister's advice under the Government of India (Allocation of Business) Rules, 1961.",
      sources: [MHA],
    },
    {
      id: "com-secretariat",
      label: "Permanent executive — Union civil services",
      sublabel: "Cabinet Secretary, Secretaries to Government of India, All-India Services",
      article: "Articles 77, 312",
      detail:
        "Executive business of the Union is expressed in the name of the President and transacted through ministries staffed by the permanent civil service, including the All-India Services created under Article 312.",
      sources: [MHA],
    },
  ],
};

const stateLevel: TreeNode = {
  id: "part-vi",
  label: "Part VI — The States (State level)",
  article: "Articles 152–237",
  detail:
    "Each State mirrors the Union at the sub-national level: a Governor as constitutional head, a Chief Minister and Council of Ministers as the real executive, a legislature, and a High Court.",
  sources: [MHA],
  children: [
    {
      id: "state-executive",
      label: "The State Executive",
      article: "Articles 153–167",
      children: [
        {
          id: "governor",
          label: "Governor of the State",
          sublabel: "Constitutional head of the State executive",
          article: "Articles 153–156",
          detail:
            "Appointed by the President, holds office during the President's pleasure for a normal term of five years. Union Territories with legislatures are headed by a Lieutenant Governor or Administrator under Article 239.",
          member: {
            name: "Governor (office, State-wise)",
            title: "Governor of a State — head of the State executive",
            start: "Five-year term from date of oath",
            end: "Holds office during the pleasure of the President",
            appointment: "Appointed",
            note: "All executive action of the State is taken in the Governor's name; the Governor acts on the aid and advice of the State Council of Ministers except in matters of discretion.",
            sources: [MHA],
          },
        },
        {
          id: "chief-minister",
          label: "Chief Minister and State Council of Ministers",
          sublabel: "Real executive of the State",
          article: "Articles 163–164",
          detail:
            "The Chief Minister is appointed by the Governor; other ministers are appointed on the Chief Minister's advice. The Council is collectively responsible to the Legislative Assembly.",
          member: {
            name: "Chief Minister (office, State-wise)",
            title: "Chief Minister — head of the State Council of Ministers",
            start: "On appointment by the Governor after an Assembly election",
            end: "While commanding the confidence of the Legislative Assembly",
            appointment: "Appointed",
            note: "Ministerial strength is capped at 15% of the Assembly's membership (minimum 12) by Article 164(1A).",
            sources: [MHA],
          },
        },
        {
          id: "state-services",
          label: "State Secretariat and services",
          sublabel: "Chief Secretary, departmental secretaries, district administration",
          article: "Article 166",
          detail:
            "District Collectors and Divisional Commissioners carry State executive authority down to the field level and coordinate with local bodies.",
          sources: [MHA],
        },
      ],
    },
    {
      id: "state-legislature",
      label: "The State Legislature",
      article: "Articles 168–212",
      detail:
        "Every State has a Legislative Assembly (Vidhan Sabha); six States also have a Legislative Council (Vidhan Parishad) under Article 169.",
      children: [
        {
          id: "vidhan-sabha",
          label: "Legislative Assembly — Vidhan Sabha",
          sublabel: "Directly elected MLAs, five-year term",
          article: "Articles 170, 172, 178",
          detail:
            "Presided over by a Speaker and Deputy Speaker elected from among the members. MLAs of a State form part of the electoral college for the President and elect that State's Rajya Sabha delegation under Article 80(4).",
        },
        {
          id: "vidhan-parishad",
          label: "Legislative Council — Vidhan Parishad",
          sublabel: "Permanent House in Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana, Uttar Pradesh",
          article: "Articles 171, 182",
          detail:
            "One-third of members retire every two years. Composed of members elected by local bodies, graduates, teachers and MLAs, plus members nominated by the Governor.",
        },
      ],
    },
    {
      id: "state-judiciary",
      label: "The High Courts",
      article: "Articles 214–231",
      detail:
        "A High Court for each State (some with common jurisdiction), with judges appointed by the President; subordinate district courts fall under Articles 233–237.",
    },
  ],
};

const localGovernment: TreeNode = {
  id: "local-government",
  label: "Parts IX & IX-A — Local Government (Third tier)",
  article: "Articles 243–243ZG",
  detail:
    "The 73rd and 74th Constitutional Amendments (1992) created constitutionally mandated rural and urban self-government, with five-year terms, State Election Commissions and State Finance Commissions.",
  sources: [PANCHAYATI_RAJ, MOHUA],
  children: [
    {
      id: "panchayati-raj",
      label: "Part IX — Panchayats (rural)",
      article: "Articles 243–243O",
      detail:
        "A three-tier structure in States with population above twenty lakh. Seats are reserved for Scheduled Castes, Scheduled Tribes and women (not less than one-third).",
      sources: [PANCHAYATI_RAJ],
      children: [
        {
          id: "zila-parishad",
          label: "Zila Parishad — District Panchayat",
          sublabel: "District level",
          article: "Article 243B",
          detail: "Headed by an elected Adhyaksha/President; coordinates block plans and district development schemes.",
        },
        {
          id: "panchayat-samiti",
          label: "Panchayat Samiti — Block / Intermediate Panchayat",
          sublabel: "Intermediate level",
          article: "Article 243B",
          detail: "Links village panchayats to the district body; chaired by an elected Pradhan/Chairperson.",
        },
        {
          id: "gram-panchayat",
          label: "Gram Panchayat and Gram Sabha",
          sublabel: "Village level — the base of the pyramid",
          article: "Articles 243A, 243B",
          detail:
            "The Gram Sabha is the assembly of all registered voters of the village; the Gram Panchayat is headed by an elected Sarpanch/Pradhan with elected ward members.",
        },
      ],
    },
    {
      id: "urban-local-bodies",
      label: "Part IX-A — Municipalities (urban)",
      article: "Articles 243P–243ZG",
      sources: [MOHUA],
      children: [
        {
          id: "nagar-nigam",
          label: "Municipal Corporation — Nagar Nigam",
          sublabel: "Larger urban areas",
          article: "Article 243Q(1)(c)",
          detail: "Elected Mayor and councillors with a Municipal Commissioner as executive head.",
        },
        {
          id: "nagar-palika",
          label: "Municipal Council — Nagar Palika",
          sublabel: "Smaller urban areas",
          article: "Article 243Q(1)(b)",
          detail: "Elected Chairperson and ward councillors.",
        },
        {
          id: "nagar-panchayat",
          label: "Nagar Panchayat",
          sublabel: "Transitional areas moving from rural to urban",
          article: "Article 243Q(1)(a)",
        },
        {
          id: "urban-committees",
          label: "Ward, District Planning and Metropolitan Planning Committees",
          article: "Articles 243S, 243ZD, 243ZE",
          detail:
            "Statutory committees that consolidate panchayat and municipal plans into district and metropolitan development plans.",
        },
      ],
    },
  ],
};

export const constitutionTree: TreeNode = {

  id: "constitution",
  label: "Republic of India — Constitution of India",
  sublabel: "Supreme law — in force since 26 January 1950",
  detail:
    "The Constitution distributes authority across three tiers: the Union (Part V), the States (Part VI) and local self-government (Parts IX and IX-A). Every office below derives its existence, powers and tenure from a specific article.",

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
