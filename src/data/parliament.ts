export type Appointment = "Elected" | "Nominated" | "Appointed" | "Ex officio";
export type Confidence = "Official" | "Reported";

export interface Member {
  name: string;
  title: string;
  party?: string;
  constituency?: string;
  start: string;
  end: string;
  appointment: Appointment;
  confidence: Confidence;
  note?: string;
  vacant?: boolean;
}

export interface Group {
  id: string;
  label: string;
  blurb: string;
  members: Member[];
}

export interface Body {
  id: string;
  name: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  groups: Group[];
}

export const AS_OF = "12 August 2026";

export const bodies: Body[] = [
  {
    id: "lok-sabha",
    name: "Lok Sabha",
    subtitle: "House of the People — 18th Lok Sabha (Lower House)",
    meta: [
      { label: "Sanctioned strength", value: "543 elected members" },
      { label: "House constituted", value: "24 June 2024" },
      { label: "Normal expiry of term", value: "23 June 2029 (unless dissolved earlier)" },
      { label: "Presiding authority", value: "Speaker, under Article 93" },
    ],
    groups: [
      {
        id: "ls-presiding",
        label: "Presiding Officers",
        blurb: "Constitutional offices that preside over sittings of the House.",
        members: [
          {
            name: "Om Birla",
            title: "Speaker of the Lok Sabha",
            party: "Bharatiya Janata Party",
            constituency: "Kota, Rajasthan",
            start: "26 June 2024",
            end: "Until dissolution of the 18th Lok Sabha (expected June 2029)",
            appointment: "Elected",
            confidence: "Official",
            note: "Second consecutive term; first elected Speaker on 19 June 2019.",
          },
          {
            name: "Vacant",
            title: "Deputy Speaker of the Lok Sabha",
            start: "Vacant since 23 June 2019",
            end: "No election scheduled",
            appointment: "Elected",
            confidence: "Official",
            vacant: true,
            note: "Article 93 requires the office to be filled 'as soon as may be'; it has remained unfilled across the 17th and 18th Lok Sabha.",
          },
          {
            name: "Panel of Chairpersons",
            title: "Members nominated to preside in the Speaker's absence",
            start: "Renominated each session",
            end: "Expires at the end of each session",
            appointment: "Nominated",
            confidence: "Official",
            note: "Up to ten members nominated by the Speaker under Rule 9; the panel rotates every session.",
          },
        ],
      },
      {
        id: "ls-floor",
        label: "Floor Leadership",
        blurb: "Leaders who manage government and opposition business on the floor.",
        members: [
          {
            name: "Narendra Damodardas Modi",
            title: "Leader of the House",
            party: "Bharatiya Janata Party",
            constituency: "Varanasi, Uttar Pradesh",
            start: "24 June 2024",
            end: "Co-terminous with tenure as Prime Minister",
            appointment: "Appointed",
            confidence: "Official",
            note: "The Prime Minister, being a member of the Lok Sabha, is Leader of the House.",
          },
          {
            name: "Rahul Rajiv Gandhi",
            title: "Leader of the Opposition",
            party: "Indian National Congress",
            constituency: "Rae Bareli, Uttar Pradesh",
            start: "25 June 2024",
            end: "Co-terminous with the 18th Lok Sabha",
            appointment: "Appointed",
            confidence: "Official",
            note: "Recognised by the Speaker as leader of the largest opposition party; office restored after a decade of vacancy (2014–2024).",
          },
          {
            name: "Kiren Rijiju",
            title: "Minister of Parliamentary Affairs",
            party: "Bharatiya Janata Party",
            constituency: "Arunachal West, Arunachal Pradesh",
            start: "10 June 2024",
            end: "At the pleasure of the President",
            appointment: "Appointed",
            confidence: "Official",
          },
        ],
      },
      {
        id: "ls-whips",
        label: "Whips",
        blurb: "Party managers responsible for attendance and voting discipline.",
        members: [
          {
            name: "Sanjay Jaiswal",
            title: "Chief Whip, Bharatiya Janata Party (Lok Sabha)",
            party: "Bharatiya Janata Party",
            constituency: "Paschim Champaran, Bihar",
            start: "July 2024",
            end: "Co-terminous with the 18th Lok Sabha",
            appointment: "Appointed",
            confidence: "Reported",
          },
          {
            name: "Kodikunnil Suresh",
            title: "Chief Whip, Indian National Congress (Lok Sabha)",
            party: "Indian National Congress",
            constituency: "Mavelikkara, Kerala",
            start: "July 2024",
            end: "Co-terminous with the 18th Lok Sabha",
            appointment: "Appointed",
            confidence: "Reported",
          },
        ],
      },
      {
        id: "ls-secretariat",
        label: "Secretariat",
        blurb: "Permanent officers of the House, appointed and non-political.",
        members: [
          {
            name: "Utpal Kumar Singh",
            title: "Secretary-General, Lok Sabha",
            start: "1 December 2020",
            end: "Serves at the pleasure of the Speaker (contractual, periodically extended)",
            appointment: "Appointed",
            confidence: "Official",
          },
        ],
      },
    ],
  },
  {
    id: "rajya-sabha",
    name: "Rajya Sabha",
    subtitle: "Council of States (Upper House) — permanent body, one-third retiring biennially",
    meta: [
      { label: "Sanctioned strength", value: "245 members (233 elected + 12 nominated)" },
      { label: "Nature of House", value: "Not subject to dissolution" },
      { label: "Member term", value: "6 years; one-third retire every two years" },
      { label: "Presiding authority", value: "Chairman (the Vice-President), under Article 89" },
    ],
    groups: [
      {
        id: "rs-presiding",
        label: "Presiding Officers",
        blurb: "The Chairman holds office ex officio as Vice-President of India.",
        members: [
          {
            name: "Chandrapuram Ponnusamy Radhakrishnan",
            title: "Chairman, Rajya Sabha (Vice-President of India)",
            start: "12 September 2025",
            end: "11 September 2030 (five-year term as Vice-President)",
            appointment: "Ex officio",
            confidence: "Official",
            note: "Elected Vice-President in the September 2025 election held after the resignation of Jagdeep Dhankhar in July 2025.",
          },
          {
            name: "Harivansh Narayan Singh",
            title: "Deputy Chairman, Rajya Sabha",
            party: "Janata Dal (United)",
            constituency: "Bihar",
            start: "14 September 2020 (second term; first elected 9 August 2018)",
            end: "Co-terminous with membership of the House",
            appointment: "Elected",
            confidence: "Official",
          },
          {
            name: "Panel of Vice-Chairpersons",
            title: "Members nominated to preside in the Chairman's absence",
            start: "Renominated each session",
            end: "Expires at the end of each session",
            appointment: "Nominated",
            confidence: "Official",
          },
        ],
      },
      {
        id: "rs-floor",
        label: "Floor Leadership",
        blurb: "Government and opposition leadership in the Council of States.",
        members: [
          {
            name: "Jagat Prakash Nadda",
            title: "Leader of the House",
            party: "Bharatiya Janata Party",
            constituency: "Gujarat",
            start: "27 June 2024",
            end: "Co-terminous with membership and Cabinet office",
            appointment: "Appointed",
            confidence: "Official",
          },
          {
            name: "Mallikarjun Kharge",
            title: "Leader of the Opposition",
            party: "Indian National Congress",
            constituency: "Karnataka",
            start: "26 June 2026 (reappointed; continuously in office since 16 February 2021)",
            end: "Co-terminous with his current six-year term (to 2032)",
            appointment: "Appointed",
            confidence: "Official",
            note: "Re-elected to the Rajya Sabha and sworn in on 29 June 2026; reappointed Leader of the Opposition with effect from 26 June 2026.",
          },
          {
            name: "Sonia Gandhi",
            title: "Chairperson, Congress Parliamentary Party",
            party: "Indian National Congress",
            constituency: "Rajasthan",
            start: "20 February 2024 (as Rajya Sabha member); CPP chair since 1998",
            end: "2030 (current Rajya Sabha term)",
            appointment: "Elected",
            confidence: "Official",
          },
        ],
      },
      {
        id: "rs-secretariat",
        label: "Secretariat",
        blurb: "Permanent officers of the Council.",
        members: [
          {
            name: "Pramod Chandra Mody",
            title: "Secretary-General, Rajya Sabha",
            start: "12 November 2021",
            end: "Serves at the pleasure of the Chairman (contractual, periodically extended)",
            appointment: "Appointed",
            confidence: "Official",
          },
        ],
      },
      {
        id: "rs-nominated",
        label: "Nominated Members",
        blurb: "Twelve members nominated by the President under Article 80(1)(a) for distinction in literature, science, art and social service.",
        members: [
          {
            name: "Twelve nominated seats",
            title: "Nominated members (Article 80)",
            start: "Rolling appointments",
            end: "Six years from date of nomination",
            appointment: "Nominated",
            confidence: "Official",
            note: "Four members — Ujjwal Nikam, C. Sadanandan Master, Harsh Vardhan Shringla and Meenakshi Jain — were nominated in July 2025 and serve until July 2031. Remaining seats rotate as terms lapse.",
          },
        ],
      },
    ],
  },
  {
    id: "committees",
    name: "Committees & Joint Boards",
    subtitle: "Financial committees, joint committees and statutory boards of Parliament",
    meta: [
      { label: "Financial committees", value: "Reconstituted annually, term 1 May – 30 April" },
      { label: "Current cycle", value: "1 May 2026 – 30 April 2027" },
      { label: "Departmentally-related standing committees", value: "24 committees, 31 members each" },
      { label: "Composition rule", value: "Chairpersons appointed by the Speaker or the Chairman, Rajya Sabha" },
    ],
    groups: [
      {
        id: "financial",
        label: "Financial Committees",
        blurb: "The three financial committees scrutinise public expenditure; reconstituted for 2026–27 on 1 May 2026.",
        members: [
          {
            name: "Kodikunnil Chandrasekharan Venugopal",
            title: "Chairperson, Committee on Public Accounts (PAC)",
            party: "Indian National Congress",
            constituency: "Alappuzha, Kerala",
            start: "1 May 2026 (reappointed; chair since 2024)",
            end: "30 April 2027",
            appointment: "Appointed",
            confidence: "Official",
            note: "By convention chaired by a member of the principal opposition party. 22 members: 15 from Lok Sabha, 7 from Rajya Sabha.",
          },
          {
            name: "Sanjay Jaiswal",
            title: "Chairperson, Estimates Committee",
            party: "Bharatiya Janata Party",
            constituency: "Paschim Champaran, Bihar",
            start: "1 May 2026 (reappointed)",
            end: "30 April 2027",
            appointment: "Appointed",
            confidence: "Official",
            note: "30 members, all drawn from the Lok Sabha.",
          },
          {
            name: "Baijayant 'Jay' Panda",
            title: "Chairperson, Committee on Public Undertakings (COPU)",
            party: "Bharatiya Janata Party",
            constituency: "Kendrapara, Odisha",
            start: "1 May 2026 (reappointed)",
            end: "30 April 2027",
            appointment: "Appointed",
            confidence: "Official",
            note: "22 members: 15 from Lok Sabha, 7 from Rajya Sabha.",
          },
        ],
      },
      {
        id: "special",
        label: "Special & Joint Committees",
        blurb: "Committees drawing membership from both Houses.",
        members: [
          {
            name: "Faggan Singh Kulaste",
            title: "Chairperson, Committee on the Welfare of Scheduled Castes and Scheduled Tribes",
            party: "Bharatiya Janata Party",
            constituency: "Mandla, Madhya Pradesh",
            start: "1 May 2026 (reappointed)",
            end: "30 April 2027",
            appointment: "Appointed",
            confidence: "Official",
            note: "Joint committee: 20 Lok Sabha and 10 Rajya Sabha members.",
          },
          {
            name: "Om Birla",
            title: "Chairperson, Business Advisory Committee (Lok Sabha) and Rules Committee (Lok Sabha)",
            party: "Bharatiya Janata Party",
            start: "26 June 2024 (ex officio as Speaker)",
            end: "Co-terminous with the office of Speaker",
            appointment: "Ex officio",
            confidence: "Official",
          },
          {
            name: "C. P. Radhakrishnan",
            title: "Chairperson, Business Advisory Committee (Rajya Sabha) and Rules Committee (Rajya Sabha)",
            start: "12 September 2025 (ex officio as Chairman)",
            end: "Co-terminous with the office of Chairman",
            appointment: "Ex officio",
            confidence: "Official",
          },
          {
            name: "Joint Committee on Offices of Profit",
            title: "Joint committee of both Houses",
            start: "Constituted for the life of the Lok Sabha",
            end: "Expires with the 18th Lok Sabha",
            appointment: "Nominated",
            confidence: "Official",
            note: "15 members: 10 from Lok Sabha, 5 from Rajya Sabha.",
          },
        ],
      },
      {
        id: "drsc",
        label: "Departmentally-Related Standing Committees (selected)",
        blurb: "Chairpersons of major standing committees. These are reconstituted annually and reported chairs should be verified against the latest Bulletin Part II before citation.",
        members: [
          {
            name: "Radha Mohan Das Agrawal",
            title: "Chairperson, Standing Committee on Home Affairs",
            party: "Bharatiya Janata Party",
            constituency: "Uttar Pradesh (Rajya Sabha)",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            confidence: "Reported",
          },
          {
            name: "Shashi Tharoor",
            title: "Chairperson, Standing Committee on External Affairs",
            party: "Indian National Congress",
            constituency: "Thiruvananthapuram, Kerala",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            confidence: "Reported",
          },
          {
            name: "Bhartruhari Mahtab",
            title: "Chairperson, Standing Committee on Finance",
            party: "Bharatiya Janata Party",
            constituency: "Cuttack, Odisha",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            confidence: "Reported",
          },
          {
            name: "Nishikant Dubey",
            title: "Chairperson, Standing Committee on Communications and Information Technology",
            party: "Bharatiya Janata Party",
            constituency: "Godda, Jharkhand",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            confidence: "Reported",
          },
          {
            name: "Radha Mohan Singh",
            title: "Chairperson, Standing Committee on Defence",
            party: "Bharatiya Janata Party",
            constituency: "Purvi Champaran, Bihar",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            confidence: "Reported",
          },
          {
            name: "Digvijaya Singh",
            title: "Chairperson, Standing Committee on Education, Women, Children, Youth and Sports",
            party: "Indian National Congress",
            constituency: "Madhya Pradesh (Rajya Sabha)",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            confidence: "Reported",
          },
        ],
      },
    ],
  },
];

export const changes = [
  {
    date: "29 June 2026",
    text: "Mallikarjun Kharge sworn in for a second Rajya Sabha term and reappointed Leader of the Opposition with effect from 26 June 2026.",
    kind: "Change",
  },
  {
    date: "1 May 2026",
    text: "Speaker Om Birla reconstituted the three financial committees and the SC/ST Welfare Committee for 2026–27; Venugopal, Jaiswal, Panda and Kulaste all retained their chairs. Terms run to 30 April 2027.",
    kind: "Rotation",
  },
  {
    date: "12 September 2025",
    text: "C. P. Radhakrishnan assumed office as Vice-President and ex officio Chairman of the Rajya Sabha following the resignation of Jagdeep Dhankhar on 21 July 2025.",
    kind: "Change",
  },
  {
    date: "July 2025",
    text: "Four seats among the twelve nominated Rajya Sabha members filled; those terms run to July 2031.",
    kind: "Rotation",
  },
  {
    date: "Since 23 June 2019",
    text: "The office of Deputy Speaker of the Lok Sabha remains vacant — the longest such vacancy since 1952.",
    kind: "Vacancy",
  },
  {
    date: "Biennially, next 2026–28 cycle",
    text: "One-third of Rajya Sabha members retire every two years, producing rolling changes in party strengths and in floor-leadership entitlements.",
    kind: "Rotation",
  },
];
