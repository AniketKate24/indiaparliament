export type LogKind = "Reappointment" | "New appointment" | "Vacancy" | "Rotation" | "Scheduled";

export interface LogEntry {
  id: string;
  timestamp: string; // ISO
  displayDate: string;
  kind: LogKind;
  body: "Lok Sabha" | "Rajya Sabha" | "Committees";
  office: string;
  person: string;
  previous: { holder: string; start: string; end: string };
  current: { holder: string; start: string; end: string };
  summary: string;
  source: { type: "Bulletin" | "Official" | "Press"; label: string; url: string };
}

export const updateLog: LogEntry[] = [
  {
    id: "log-2026-06-29-lop-rs",
    timestamp: "2026-06-29T00:00:00Z",
    displayDate: "29 June 2026",
    kind: "Reappointment",
    body: "Rajya Sabha",
    office: "Leader of the Opposition, Rajya Sabha",
    person: "Mallikarjun Kharge",
    previous: { holder: "Mallikarjun Kharge", start: "16 February 2021", end: "25 June 2026 (end of prior RS term)" },
    current: { holder: "Mallikarjun Kharge", start: "26 June 2026", end: "2032 (current six-year RS term)" },
    summary:
      "Kharge was re-elected to the Rajya Sabha from Karnataka, took oath on 29 June 2026 and was reappointed Leader of the Opposition with retrospective effect from 26 June 2026, closing a three-day technical gap.",
    source: {
      type: "Press",
      label: "The Hindu, 29 June 2026",
      url: "https://www.thehindu.com/news/national/eight-newly-elected-mps-take-oath-as-rajya-sabha-members/article71160713.ece",
    },
  },
  {
    id: "log-2026-05-01-pac",
    timestamp: "2026-05-01T00:00:00Z",
    displayDate: "1 May 2026",
    kind: "Reappointment",
    body: "Committees",
    office: "Chairperson, Committee on Public Accounts",
    person: "K. C. Venugopal",
    previous: { holder: "K. C. Venugopal", start: "1 May 2025", end: "30 April 2026" },
    current: { holder: "K. C. Venugopal", start: "1 May 2026", end: "30 April 2027" },
    summary: "Retained the PAC chair in the annual reconstitution of the financial committees by the Speaker.",
    source: {
      type: "Press",
      label: "Economic Times, 2 May 2026",
      url: "https://economictimes.indiatimes.com/news/politics-and-nation/lok-sabha-reconstitutes-three-financial-one-standing-parliamentary-committee-till-2027/articleshow/130711776.cms",
    },
  },
  {
    id: "log-2026-05-01-estimates",
    timestamp: "2026-05-01T00:00:00Z",
    displayDate: "1 May 2026",
    kind: "Reappointment",
    body: "Committees",
    office: "Chairperson, Estimates Committee",
    person: "Sanjay Jaiswal",
    previous: { holder: "Sanjay Jaiswal", start: "1 May 2025", end: "30 April 2026" },
    current: { holder: "Sanjay Jaiswal", start: "1 May 2026", end: "30 April 2027" },
    summary: "Chairpersonship retained for the 2026–27 cycle.",
    source: {
      type: "Press",
      label: "Economic Times, 2 May 2026",
      url: "https://economictimes.indiatimes.com/news/india/om-birla-tejigs-4-house-panels-for-2026-27-most-chiefs-stay-on/articleshow/130722341.cms",
    },
  },
  {
    id: "log-2026-05-01-copu",
    timestamp: "2026-05-01T00:00:00Z",
    displayDate: "1 May 2026",
    kind: "Reappointment",
    body: "Committees",
    office: "Chairperson, Committee on Public Undertakings",
    person: "Baijayant 'Jay' Panda",
    previous: { holder: "Baijayant 'Jay' Panda", start: "1 May 2025", end: "30 April 2026" },
    current: { holder: "Baijayant 'Jay' Panda", start: "1 May 2026", end: "30 April 2027" },
    summary: "Chairpersonship retained for the 2026–27 cycle.",
    source: {
      type: "Official",
      label: "Akashvani News bulletin",
      url: "https://newsonair.gov.in/lok-sabha-speaker-om-birla-reconstitutes-four-parliamentary-committees-for-2026-27/",
    },
  },
  {
    id: "log-2026-05-01-scst",
    timestamp: "2026-05-01T00:00:00Z",
    displayDate: "1 May 2026",
    kind: "Reappointment",
    body: "Committees",
    office: "Chairperson, Committee on Welfare of SCs and STs",
    person: "Faggan Singh Kulaste",
    previous: { holder: "Faggan Singh Kulaste", start: "1 May 2025", end: "30 April 2026" },
    current: { holder: "Faggan Singh Kulaste", start: "1 May 2026", end: "30 April 2027" },
    summary: "Retained as chairperson of the joint SC/ST welfare committee.",
    source: {
      type: "Press",
      label: "Economic Times, 2 May 2026",
      url: "https://economictimes.indiatimes.com/news/politics-and-nation/lok-sabha-reconstitutes-three-financial-one-standing-parliamentary-committee-till-2027/articleshow/130711776.cms",
    },
  },
  {
    id: "log-2025-09-12-chairman",
    timestamp: "2025-09-12T00:00:00Z",
    displayDate: "12 September 2025",
    kind: "New appointment",
    body: "Rajya Sabha",
    office: "Chairman, Rajya Sabha (Vice-President of India)",
    person: "C. P. Radhakrishnan",
    previous: { holder: "Jagdeep Dhankhar", start: "11 August 2022", end: "21 July 2025 (resigned)" },
    current: { holder: "C. P. Radhakrishnan", start: "12 September 2025", end: "11 September 2030" },
    summary:
      "Radhakrishnan was elected Vice-President in the September 2025 election held after Dhankhar's resignation, and assumed the ex officio chairmanship of the Rajya Sabha.",
    source: { type: "Official", label: "vicepresidentofindia.nic.in", url: "https://vicepresidentofindia.nic.in/" },
  },
  {
    id: "log-2025-07-nominated",
    timestamp: "2025-07-13T00:00:00Z",
    displayDate: "July 2025",
    kind: "Rotation",
    body: "Rajya Sabha",
    office: "Nominated members (Article 80)",
    person: "Ujjwal Nikam, C. Sadanandan Master, Harsh Vardhan Shringla, Meenakshi Jain",
    previous: { holder: "Four seats vacant", start: "—", end: "Terms lapsed 2024–25" },
    current: { holder: "Four new nominees", start: "July 2025", end: "July 2031" },
    summary: "Presidential nominations filled four of the twelve nominated seats for full six-year terms.",
    source: { type: "Press", label: "National press reporting, July 2025", url: "https://www.thehindu.com/news/national/" },
  },
  {
    id: "log-2024-06-25-lop-ls",
    timestamp: "2024-06-25T00:00:00Z",
    displayDate: "25 June 2024",
    kind: "New appointment",
    body: "Lok Sabha",
    office: "Leader of the Opposition, Lok Sabha",
    person: "Rahul Gandhi",
    previous: { holder: "Vacant", start: "18 May 2014", end: "24 June 2024" },
    current: { holder: "Rahul Gandhi", start: "25 June 2024", end: "Co-terminous with the 18th Lok Sabha" },
    summary: "Office restored after ten years without a recognised Leader of the Opposition in the Lower House.",
    source: { type: "Bulletin", label: "Lok Sabha Bulletin Part II", url: "https://sansad.in/ls/bulletins/bulletin2" },
  },
  {
    id: "log-2019-06-23-dy-speaker",
    timestamp: "2019-06-23T00:00:00Z",
    displayDate: "23 June 2019",
    kind: "Vacancy",
    body: "Lok Sabha",
    office: "Deputy Speaker, Lok Sabha",
    person: "Vacant",
    previous: { holder: "M. Thambidurai", start: "13 August 2014", end: "23 June 2019" },
    current: { holder: "Vacant", start: "23 June 2019", end: "No election scheduled" },
    summary: "The office has remained unfilled through the 17th and 18th Lok Sabha, the longest vacancy since 1952.",
    source: { type: "Official", label: "sansad.in — Deputy Speaker page", url: "https://sansad.in/ls/about/deputy-speaker" },
  },
  {
    id: "log-next-2027-05-01",
    timestamp: "2027-05-01T00:00:00Z",
    displayDate: "1 May 2027 (scheduled)",
    kind: "Scheduled",
    body: "Committees",
    office: "All financial committees and the SC/ST Welfare Committee",
    person: "To be notified",
    previous: { holder: "2026–27 chairs", start: "1 May 2026", end: "30 April 2027" },
    current: { holder: "2027–28 chairs", start: "1 May 2027", end: "30 April 2028" },
    summary: "Next scheduled annual rotation; chairs are notified by the Speaker on or about 1 May.",
    source: { type: "Official", label: "PRS — Parliamentary committees", url: "https://prsindia.org/parliamentary-committees" },
  },
];
