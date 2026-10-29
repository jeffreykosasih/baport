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
  workRights: 'Full work rights in Australia, no sponsorship needed. Available full-time.',
  visa: 'Applying for a 2-year Temporary Graduate visa (subclass 485).',
  headline: 'I map how work really happens',
  lead: 'Then I write the requirements a team can build, and plan the tests that prove the change worked.',
  // The big statement under the hero.
  statement:
    'Product owner in digital banking. Three years on Melbourne warehouse floors and delivery routes. A Master of IT. I bring all three to business analysis: the stakeholders, the technology, and the people doing the work.',
  facts: [
    { label: 'Product Owner', value: 'Bank Central Asia, 2022' },
    { label: 'Warehouse and delivery', value: 'Melbourne, 2023 to now' },
    { label: 'Master of IT', value: 'Kaplan Business School, graduating Dec 2026' },
    { label: 'Work rights', value: 'Full work rights, no sponsorship needed' },
  ],
};

// What a team gets from you. `art` picks the small drawing; `shownIn` lists case study slugs.
export const deliverables = [
  {
    art: 'process',
    title: 'Process maps',
    text: 'As-is and to-be maps in BPMN, with the pain points marked, so the whole team works from one picture.',
    shownIn: ['idriver'],
  },
  {
    art: 'requirements',
    title: 'Requirements',
    text: 'Functional and non-functional requirements, prioritised with MoSCoW, each one written so it can be tested.',
    shownIn: ['idriver'],
  },
  {
    art: 'stories',
    title: 'User stories',
    text: 'Stories with Given/When/Then acceptance criteria that a developer can build and a tester can check.',
    shownIn: ['idriver'],
  },
  {
    art: 'testing',
    title: 'UAT plans',
    text: 'Who tests, what has to pass before release, and the success measures that show the change worked.',
    shownIn: ['idriver'],
  },
  {
    art: 'options',
    title: 'Business cases',
    text: 'Options compared on cost, risk, time to benefit and fit, with a recommendation and a staged plan.',
    shownIn: ['energyai'],
  },
  {
    art: 'sql',
    title: 'SQL and reporting',
    text: 'Queries that check the success measures, and reporting in Power BI and Tableau (course in progress).',
    shownIn: ['idriver'],
  },
] as const;

// The personal story band, next to your photo.
export const story = {
  kicker: 'Why the floor matters',
  title: 'I’ve done the work the software is for',
  image: '/jeffrey-kosasih.jpg',
  imageAlt: 'Jeffrey Kosasih sitting among autumn trees',
  paragraphs: [
    'For three years I’ve picked and packed orders, driven forklifts and delivered newspapers on early-morning routes across Melbourne, alongside full-time study.',
    'I’ve set up shipments in Cin7 and logged in to a delivery app at the start of every run, so I know what a slow or confusing screen costs a shift. The iDriver case study came out of those routes.',
    'That’s why I start every analysis by watching how the work is really done.',
  ],
};

export type MethodStep = {
  title: string;
  text: string;
  // Case study slugs (their file names) that show this step.
  shownIn?: string[];
  // Where this step is shown when it isn't a case study, e.g. a job.
  evidence?: string;
};

// How you work, in order: the delivery lifecycle most BA job ads describe.
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
    title: 'Deliver',
    text: 'Work with developers across the SDLC, from discovery to release: backlog refinement, prioritisation and scope decisions in Agile and Scrum teams.',
    evidence: 'Shown as Product Owner at Bank Central Asia',
  },
  {
    title: 'Test',
    text: 'Plan user acceptance testing with the people who will use the change, and agree what has to pass before release.',
    shownIn: ['idriver'],
  },
  {
    title: 'Measure',
    text: 'Set success measures and check them with data: SQL, Excel, and reporting in Power BI and Tableau (course in progress).',
    shownIn: ['idriver', 'energyai'],
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

// Grouped the way BA job ads list them, so a recruiter can match line by line.
export const skills = [
  {
    group: 'Requirements and documentation',
    items:
      'Requirements elicitation, stakeholder analysis, functional and non-functional requirements, user stories with acceptance criteria (Given/When/Then), MoSCoW prioritisation, specs, wireframes',
  },
  {
    group: 'Process and systems analysis',
    items:
      'As-is and to-be process mapping (BPMN), workflow and process improvement, options analysis, business case, risk register',
  },
  {
    group: 'Testing and delivery',
    items:
      'User acceptance testing (UAT) planning, Agile and Scrum, backlog refinement and prioritisation, SDLC from discovery to release',
  },
  {
    group: 'Data and reporting',
    items:
      'SQL (joins, GROUP BY), Excel, smart-meter data analysis (capstone), Power BI and Tableau (course, Oct–Dec 2026)',
  },
  {
    group: 'Tools and technical',
    items:
      'Jira, draw.io, Cin7 (order management), Git and GitHub. I can read and write code (TypeScript, JavaScript, React, SwiftUI).',
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
