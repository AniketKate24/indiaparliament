export type Appointment = "Elected" | "Nominated" | "Appointed" | "Ex officio";
export type SourceType = "Bulletin" | "Official" | "Press";

export interface Source {
  type: SourceType;
  label: string;
  url: string;
}

export interface Member {
  name: string;
  title: string;
  party?: string;
  constituency?: string;
  start: string;
  end: string;
  appointment: Appointment;
  photo?: string;
  note?: string;
  vacant?: boolean;
  sources: Source[];
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

const SANSAD_LS_SPEAKER: Source = {
  type: "Official",
  label: "sansad.in — Office of the Speaker",
  url: "https://sansad.in/ls/about/speaker",
};
const SANSAD_LS_DY: Source = {
  type: "Official",
  label: "sansad.in — Deputy Speaker (vacancy notice)",
  url: "https://sansad.in/ls/about/deputy-speaker",
};
const SANSAD_RS: Source = {
  type: "Official",
  label: "sansad.in — Rajya Sabha leadership",
  url: "https://sansad.in/rs",
};
const PRS_COMMITTEES: Source = {
  type: "Official",
  label: "PRS Legislative Research — Committees",
  url: "https://prsindia.org/parliamentary-committees",
};

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
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Om_Birla_%282021%29_%28cropped%29.jpg/330px-Om_Birla_%282021%29_%28cropped%29.jpg",
            note: "Second consecutive term; first elected Speaker on 19 June 2019.",
            sources: [
              SANSAD_LS_SPEAKER,
              {
                type: "Bulletin",
                label: "Lok Sabha Bulletin Part II — election of Speaker, 26 June 2024",
                url: "https://sansad.in/ls/bulletins/bulletin2",
              },
            ],
          },
          {
            name: "Vacant",
            title: "Deputy Speaker of the Lok Sabha",
            start: "Vacant since 23 June 2019",
            end: "No election scheduled",
            appointment: "Elected",
            vacant: true,
            note: "Article 93 requires the office to be filled 'as soon as may be'; it has remained unfilled across the 17th and 18th Lok Sabha.",
            sources: [SANSAD_LS_DY],
          },
          {
            name: "Panel of Chairpersons",
            title: "Members nominated to preside in the Speaker's absence",
            start: "Renominated each session",
            end: "Expires at the end of each session",
            appointment: "Nominated",
            note: "Up to ten members nominated by the Speaker under Rule 9; the panel rotates every session.",
            sources: [
              {
                type: "Bulletin",
                label: "Lok Sabha Bulletin Part II — nomination of Panel of Chairpersons",
                url: "https://sansad.in/ls/bulletins/bulletin2",
              },
            ],
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
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/The_official_portrait_of_Shri_Narendra_Modi%2C_the_Prime_Minister_of_the_Republic_of_India.jpg/330px-The_official_portrait_of_Shri_Narendra_Modi%2C_the_Prime_Minister_of_the_Republic_of_India.jpg",
            note: "The Prime Minister, being a member of the Lok Sabha, is Leader of the House.",
            sources: [
              { type: "Official", label: "pmindia.gov.in — Prime Minister", url: "https://www.pmindia.gov.in/en/pms-profile/" },
            ],
          },
          {
            name: "Rahul Rajiv Gandhi",
            title: "Leader of the Opposition",
            party: "Indian National Congress",
            constituency: "Rae Bareli, Uttar Pradesh",
            start: "25 June 2024",
            end: "Co-terminous with the 18th Lok Sabha",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rahul_Gandhi.png/330px-Rahul_Gandhi.png",
            note: "Recognised by the Speaker as leader of the largest opposition party; office restored after a decade of vacancy (2014–2024).",
            sources: [
              {
                type: "Bulletin",
                label: "Lok Sabha Bulletin Part II — recognition of Leader of the Opposition",
                url: "https://sansad.in/ls/bulletins/bulletin2",
              },
              {
                type: "Press",
                label: "The Hindu — Rahul Gandhi named Leader of the Opposition",
                url: "https://www.thehindu.com/news/national/rahul-gandhi-leader-of-opposition-lok-sabha/article68333888.ece",
              },
            ],
          },
          {
            name: "Kiren Rijiju",
            title: "Minister of Parliamentary Affairs",
            party: "Bharatiya Janata Party",
            constituency: "Arunachal West, Arunachal Pradesh",
            start: "10 June 2024",
            end: "At the pleasure of the President",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Kiren_Rijiju_with_Modi_%28cropped%29.jpg/330px-Kiren_Rijiju_with_Modi_%28cropped%29.jpg",
            sources: [
              { type: "Official", label: "mpa.gov.in — Ministry of Parliamentary Affairs", url: "https://mpa.gov.in/" },
            ],
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
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sanjay_Jaiswal_Member_of_Parliament_%28cropped%29.jpg/330px-Sanjay_Jaiswal_Member_of_Parliament_%28cropped%29.jpg",
            sources: [
              {
                type: "Press",
                label: "Press reporting on BJP parliamentary party appointments, July 2024",
                url: "https://www.thehindu.com/news/national/",
              },
            ],
          },
          {
            name: "Kodikunnil Suresh",
            title: "Chief Whip, Indian National Congress (Lok Sabha)",
            party: "Indian National Congress",
            constituency: "Mavelikkara, Kerala",
            start: "July 2024",
            end: "Co-terminous with the 18th Lok Sabha",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kodikunnil_Suresh_MP.jpg/330px-Kodikunnil_Suresh_MP.jpg",
            sources: [
              {
                type: "Press",
                label: "Press reporting on Congress parliamentary party appointments, July 2024",
                url: "https://www.thehindu.com/news/national/",
              },
            ],
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
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Shri_Utpal_Kumar_Singh_IAS_%28Retd.%29_Lok_Sabha_secretary.jpg/330px-Shri_Utpal_Kumar_Singh_IAS_%28Retd.%29_Lok_Sabha_secretary.jpg",
            sources: [
              { type: "Official", label: "sansad.in — Lok Sabha Secretariat", url: "https://sansad.in/ls/about/secretariat" },
            ],
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
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Shri_C_P_Radhakrishnan%2C_Honourable_Vice_President_of_India.jpg/330px-Shri_C_P_Radhakrishnan%2C_Honourable_Vice_President_of_India.jpg",
            note: "Elected Vice-President in the September 2025 election held after the resignation of Jagdeep Dhankhar in July 2025.",
            sources: [
              { type: "Official", label: "vicepresidentofindia.nic.in", url: "https://vicepresidentofindia.nic.in/" },
              SANSAD_RS,
            ],
          },
          {
            name: "Harivansh Narayan Singh",
            title: "Deputy Chairman, Rajya Sabha",
            party: "Janata Dal (United)",
            constituency: "Bihar",
            start: "14 September 2020 (second term; first elected 9 August 2018)",
            end: "Co-terminous with membership of the House",
            appointment: "Elected",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Shri_Harivansh_Narayan_Singh_%28cropped%29.jpg/330px-Shri_Harivansh_Narayan_Singh_%28cropped%29.jpg",
            sources: [
              { type: "Official", label: "sansad.in — Deputy Chairman", url: "https://sansad.in/rs/about/deputychairman" },
            ],
          },
          {
            name: "Panel of Vice-Chairpersons",
            title: "Members nominated to preside in the Chairman's absence",
            start: "Renominated each session",
            end: "Expires at the end of each session",
            appointment: "Nominated",
            sources: [
              {
                type: "Bulletin",
                label: "Rajya Sabha Bulletin Part II — Panel of Vice-Chairpersons",
                url: "https://sansad.in/rs/bulletins/bulletin2",
              },
            ],
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
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Jagat_Prakash_Nadda_2023.jpg/330px-Jagat_Prakash_Nadda_2023.jpg",
            sources: [
              { type: "Official", label: "sansad.in — Leader of the House", url: "https://sansad.in/rs/about/leaderofthehouse" },
            ],
          },
          {
            name: "Mallikarjun Kharge",
            title: "Leader of the Opposition",
            party: "Indian National Congress",
            constituency: "Karnataka",
            start: "26 June 2026 (reappointed; continuously in office since 16 February 2021)",
            end: "Co-terminous with his current six-year term (to 2032)",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Mallikarjun_Kharge_briefing_the_media_after_presenting_the_Interim_Railway_Budget_2014-15_in_New_Delhi_%28cropped%29.jpg/330px-Mallikarjun_Kharge_briefing_the_media_after_presenting_the_Interim_Railway_Budget_2014-15_in_New_Delhi_%28cropped%29.jpg",
            note: "Re-elected to the Rajya Sabha and sworn in on 29 June 2026; reappointed Leader of the Opposition with effect from 26 June 2026.",
            sources: [
              {
                type: "Press",
                label: "The Hindu — Kharge reappointed Leader of the Opposition, 29 June 2026",
                url: "https://www.thehindu.com/news/national/eight-newly-elected-mps-take-oath-as-rajya-sabha-members/article71160713.ece",
              },
              {
                type: "Bulletin",
                label: "Rajya Sabha Bulletin Part II — recognition of Leader of the Opposition",
                url: "https://sansad.in/rs/bulletins/bulletin2",
              },
            ],
          },
          {
            name: "Sonia Gandhi",
            title: "Chairperson, Congress Parliamentary Party",
            party: "Indian National Congress",
            constituency: "Rajasthan",
            start: "20 February 2024 (as Rajya Sabha member); CPP chair since 1998",
            end: "2030 (current Rajya Sabha term)",
            appointment: "Elected",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sonia_Gandhi_in_2013.jpg/330px-Sonia_Gandhi_in_2013.jpg",
            sources: [
              { type: "Official", label: "sansad.in — Member profile", url: "https://sansad.in/rs/members" },
            ],
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
            sources: [
              { type: "Official", label: "sansad.in — Rajya Sabha Secretariat", url: "https://sansad.in/rs/about/secretariat" },
            ],
          },
        ],
      },
      {
        id: "rs-nominated",
        label: "Nominated Members",
        blurb:
          "Twelve members nominated by the President under Article 80(1)(a) for distinction in literature, science, art and social service.",
        members: [
          {
            name: "Twelve nominated seats",
            title: "Nominated members (Article 80)",
            start: "Rolling appointments",
            end: "Six years from date of nomination",
            appointment: "Nominated",
            note: "Four members — Ujjwal Nikam, C. Sadanandan Master, Harsh Vardhan Shringla and Meenakshi Jain — were nominated in July 2025 and serve until July 2031. Remaining seats rotate as terms lapse.",
            sources: [
              { type: "Official", label: "sansad.in — Nominated members", url: "https://sansad.in/rs/members" },
              {
                type: "Press",
                label: "Press reporting on July 2025 presidential nominations",
                url: "https://www.thehindu.com/news/national/",
              },
            ],
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
        blurb:
          "The three financial committees scrutinise public expenditure; reconstituted for 2026–27 on 1 May 2026.",
        members: [
          {
            name: "Kodikunnil Chandrasekharan Venugopal",
            title: "Chairperson, Committee on Public Accounts (PAC)",
            party: "Indian National Congress",
            constituency: "Alappuzha, Kerala",
            start: "1 May 2026 (reappointed; chair since 2024)",
            end: "30 April 2027",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/K.C._Venugopal.JPG/330px-K.C._Venugopal.JPG",
            note: "By convention chaired by a member of the principal opposition party. 22 members: 15 from Lok Sabha, 7 from Rajya Sabha.",
            sources: [
              { type: "Official", label: "PRS — Committee on Public Accounts", url: "https://prsindia.org/parliamentary-committees/public-accounts" },
              {
                type: "Press",
                label: "Economic Times — Lok Sabha reconstitutes committees for 2026-27",
                url: "https://economictimes.indiatimes.com/news/politics-and-nation/lok-sabha-reconstitutes-three-financial-one-standing-parliamentary-committee-till-2027/articleshow/130711776.cms",
              },
            ],
          },
          {
            name: "Sanjay Jaiswal",
            title: "Chairperson, Estimates Committee",
            party: "Bharatiya Janata Party",
            constituency: "Paschim Champaran, Bihar",
            start: "1 May 2026 (reappointed)",
            end: "30 April 2027",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Sanjay_Jaiswal_Member_of_Parliament_%28cropped%29.jpg/330px-Sanjay_Jaiswal_Member_of_Parliament_%28cropped%29.jpg",
            note: "30 members, all drawn from the Lok Sabha.",
            sources: [
              PRS_COMMITTEES,
              {
                type: "Press",
                label: "Economic Times — Om Birla rejigs 4 House panels for 2026-27",
                url: "https://economictimes.indiatimes.com/news/india/om-birla-tejigs-4-house-panels-for-2026-27-most-chiefs-stay-on/articleshow/130722341.cms",
              },
            ],
          },
          {
            name: "Baijayant 'Jay' Panda",
            title: "Chairperson, Committee on Public Undertakings (COPU)",
            party: "Bharatiya Janata Party",
            constituency: "Kendrapara, Odisha",
            start: "1 May 2026 (reappointed)",
            end: "30 April 2027",
            appointment: "Appointed",
            note: "22 members: 15 from Lok Sabha, 7 from Rajya Sabha.",
            sources: [
              PRS_COMMITTEES,
              {
                type: "Press",
                label: "Akashvani News — Speaker reconstitutes four committees for 2026-27",
                url: "https://newsonair.gov.in/lok-sabha-speaker-om-birla-reconstitutes-four-parliamentary-committees-for-2026-27/",
              },
            ],
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
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Shri_Faggan_Singh_Kulaste_taking_charge_as_the_Minister_of_State_for_Steel%2C_in_New_Delhi_on_May_31%2C_2019_%28cropped%29.jpg/330px-Shri_Faggan_Singh_Kulaste_taking_charge_as_the_Minister_of_State_for_Steel%2C_in_New_Delhi_on_May_31%2C_2019_%28cropped%29.jpg",
            note: "Joint committee: 20 Lok Sabha and 10 Rajya Sabha members.",
            sources: [
              PRS_COMMITTEES,
              {
                type: "Press",
                label: "Economic Times — committee reconstitution, 2 May 2026",
                url: "https://economictimes.indiatimes.com/news/politics-and-nation/lok-sabha-reconstitutes-three-financial-one-standing-parliamentary-committee-till-2027/articleshow/130711776.cms",
              },
            ],
          },
          {
            name: "Om Birla",
            title: "Chairperson, Business Advisory Committee and Rules Committee (Lok Sabha)",
            party: "Bharatiya Janata Party",
            start: "26 June 2024 (ex officio as Speaker)",
            end: "Co-terminous with the office of Speaker",
            appointment: "Ex officio",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Om_Birla_%282021%29_%28cropped%29.jpg/330px-Om_Birla_%282021%29_%28cropped%29.jpg",
            sources: [SANSAD_LS_SPEAKER],
          },
          {
            name: "Chandrapuram Ponnusamy Radhakrishnan",
            title: "Chairperson, Business Advisory Committee and Rules Committee (Rajya Sabha)",
            start: "12 September 2025 (ex officio as Chairman)",
            end: "Co-terminous with the office of Chairman",
            appointment: "Ex officio",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Shri_C_P_Radhakrishnan%2C_Honourable_Vice_President_of_India.jpg/330px-Shri_C_P_Radhakrishnan%2C_Honourable_Vice_President_of_India.jpg",
            sources: [SANSAD_RS],
          },
          {
            name: "Joint Committee on Offices of Profit",
            title: "Joint committee of both Houses",
            start: "Constituted for the life of the Lok Sabha",
            end: "Expires with the 18th Lok Sabha",
            appointment: "Nominated",
            note: "15 members: 10 from Lok Sabha, 5 from Rajya Sabha.",
            sources: [PRS_COMMITTEES],
          },
        ],
      },
      {
        id: "drsc",
        label: "Departmentally-Related Standing Committees (selected)",
        blurb:
          "Chairpersons of major standing committees. These are reconstituted annually; entries carrying a press badge should be confirmed against the latest Bulletin Part II.",
        members: [
          {
            name: "Radha Mohan Das Agrawal",
            title: "Chairperson, Standing Committee on Home Affairs",
            party: "Bharatiya Janata Party",
            constituency: "Uttar Pradesh (Rajya Sabha)",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            sources: [
              { type: "Press", label: "Press reporting on standing committee chairs", url: "https://www.thehindu.com/news/national/" },
              PRS_COMMITTEES,
            ],
          },
          {
            name: "Shashi Tharoor",
            title: "Chairperson, Standing Committee on External Affairs",
            party: "Indian National Congress",
            constituency: "Thiruvananthapuram, Kerala",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Shashi_Tharoor_2025.jpg/330px-Shashi_Tharoor_2025.jpg",
            sources: [
              { type: "Official", label: "PRS — External Affairs Committee", url: "https://prsindia.org/parliamentary-committees/external-affairs" },
            ],
          },
          {
            name: "Bhartruhari Mahtab",
            title: "Chairperson, Standing Committee on Finance",
            party: "Bharatiya Janata Party",
            constituency: "Cuttack, Odisha",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            photo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Bhartruhari_Mahtab_MP_2024.jpg",
            sources: [
              { type: "Official", label: "PRS — Finance Committee", url: "https://prsindia.org/parliamentary-committees/finance" },
            ],
          },
          {
            name: "Nishikant Dubey",
            title: "Chairperson, Standing Committee on Communications and Information Technology",
            party: "Bharatiya Janata Party",
            constituency: "Godda, Jharkhand",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Nishikant_Dubey_-_PCC_Meeting_For_Culture_And_Tourism_-_Kolkata_2017-07-10_1249_%28cropped%29.JPG/330px-Nishikant_Dubey_-_PCC_Meeting_For_Culture_And_Tourism_-_Kolkata_2017-07-10_1249_%28cropped%29.JPG",
            sources: [
              { type: "Official", label: "PRS — Communications and IT Committee", url: "https://prsindia.org/parliamentary-committees/communications-and-information-technology" },
            ],
          },
          {
            name: "Radha Mohan Singh",
            title: "Chairperson, Standing Committee on Defence",
            party: "Bharatiya Janata Party",
            constituency: "Purvi Champaran, Bihar",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/The_Union_Minister_for_Agriculture_and_Farmers_Welfare%2C_Shri_Radha_Mohan_Singh_briefing_the_media_on_Project_Chaman%2C_in_New_Delhi_on_October_16%2C_2017.jpg/330px-The_Union_Minister_for_Agriculture_and_Farmers_Welfare%2C_Shri_Radha_Mohan_Singh_briefing_the_media_on_Project_Chaman%2C_in_New_Delhi_on_October_16%2C_2017.jpg",
            sources: [
              { type: "Official", label: "PRS — Defence Committee", url: "https://prsindia.org/parliamentary-committees/defence" },
            ],
          },
          {
            name: "Digvijaya Singh",
            title: "Chairperson, Standing Committee on Education, Women, Children, Youth and Sports",
            party: "Indian National Congress",
            constituency: "Madhya Pradesh (Rajya Sabha)",
            start: "2024 (annually reconstituted)",
            end: "Current annual cycle",
            appointment: "Appointed",
            photo:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Digvijaya_Singh_%28cropped%29.jpg/330px-Digvijaya_Singh_%28cropped%29.jpg",
            sources: [
              { type: "Official", label: "PRS — Education Committee", url: "https://prsindia.org/parliamentary-committees/education-women-children-youth-and-sports" },
            ],
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
