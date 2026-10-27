// Everything on the site that isn't a case study or a note. Edit it here;
// the pages read from this file.

export const profile = {
  name: 'Jeffrey Kosasih',
  role: 'Junior ICT business analyst',
  location: 'Melbourne',
  email: 'jefpkos@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jeffreykosasih',
  resume: '/Jeffrey-Kosasih-Business-Analyst-Resume.pdf',
  designPortfolio: 'https://jeffreyko.com',
  // Once the 485 is granted, say until when, e.g. "Full work rights until March 2029."
  workRights: 'Full work rights, available full-time.',
  visa: 'Applying for a 2-year Temporary Graduate visa (subclass 485).',
  intro: [
    'I find out how work really happens, map it, and write requirements a team can build.',
    'Before my Master of IT, I was a product owner in digital banking at Bank Central Asia. Since 2023 I’ve worked in Melbourne warehouses and on early-morning newspaper routes, using the kind of systems a business analyst works on.',
  ],
};

export type MethodStep = { title: string; text: string; shownIn: string[] };

// How you work, in order. `shownIn` lists case study slugs (their file names).
export const method: MethodStep[] = [
  {
    title: 'Understand',
    text: 'Talk to the people who do the work and watch it being done. Stakeholder analysis and requirements elicitation.',
    shownIn: ['idriver'],
  },
  {
    title: 'Map',
    text: 'Draw the as-is process in BPMN, mark the pain points, then design the to-be.',
    shownIn: ['idriver'],
  },
  {
    title: 'Define',
    text: 'Functional and non-functional requirements, MoSCoW priorities and user stories with Given/When/Then acceptance criteria. When the decision is bigger than a feature, options analysis and a business case.',
    shownIn: ['idriver', 'energyai'],
  },
  {
    title: 'Check',
    text: 'Plan UAT with the people who will use the change, set success measures, and test them with data.',
    shownIn: ['idriver'],
  },
];

export type Job = {
  role: string;
  org?: string;
  place: string;
  dates: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: 'Product Owner',
    org: 'Bank Central Asia (BCA)',
    place: 'Jakarta',
    dates: 'Jan–Apr 2022',
    points: [
      'Managed the backlog and feature priorities for BCA digital banking products used by millions of customers, including a portal and a data-monetisation project.',
      'Gathered requirements from business units and turned them into prioritised features the engineering team could build, balancing customer needs, technical limits and business goals.',
      'Acted as the main contact between business, design and engineering, and helped settle scope and trade-off decisions.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    org: 'Apple Developer Academy @ UC (University of Ciputra)',
    place: 'Surabaya',
    dates: 'Feb–Nov 2021',
    points: [
      'Product manager and iOS developer for Readdy, a team app that lets people with dyslexia scan text and read it more easily.',
      'Worked across the full lifecycle: planning and prioritising features, writing specs, then designing, building and testing iOS features in SwiftUI.',
    ],
  },
  {
    role: 'Warehouse and delivery roles',
    place: 'Melbourne',
    dates: '2023–present',
    points: [
      'Pick packer at Koko Black and Mount Zero Olives (2026–present). At Mount Zero I set up shipments for dispatch in Cin7.',
      'Delivery driver on early-morning newspaper routes for National Distribution Service, the work behind the iDriver case study. Earlier, pick packer and forklift driver at NDS, Toll, GripX, Hilton Foods and Ondeck Resources.',
      'Help supervisors with workflow and task allocation, and train new team members. All alongside full-time study.',
    ],
  },
];

export const skills = [
  {
    group: 'Business analysis',
    items:
      'Requirements elicitation, stakeholder analysis, as-is and to-be process mapping (BPMN), process improvement, functional and non-functional requirements, user stories, acceptance criteria (Given/When/Then), MoSCoW, options analysis, business case, risk register, user acceptance testing (UAT), wireframes',
  },
  {
    group: 'Delivery',
    items: 'Agile and Scrum, backlog refinement and prioritisation, SDLC from discovery to release',
  },
  {
    group: 'Data',
    items: 'Excel, SQL (joins, GROUP BY), smart-meter data analysis (capstone)',
  },
  {
    group: 'Tools and technical',
    items:
      'Jira, draw.io, Cin7 (order software), Git and GitHub. I can read and write code (TypeScript, JavaScript, React).',
  },
];

export const education = [
  {
    title: 'Master of Information Technology (Extension)',
    org: 'Kaplan Business School',
    place: 'Melbourne',
    dates: '2025–2026',
    note: 'Course completed, graduating December 2026. Also doing a Power BI and Tableau course (Oct–Dec 2026).',
  },
  {
    title: 'Bachelor of Information Technology',
    org: 'University of Ciputra',
    place: 'Surabaya',
    dates: '2015–2019',
  },
];
