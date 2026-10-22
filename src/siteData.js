export const siteBrand = {
  name: "Chess & Truck",
  short: "CT",
  city: "New York City",
  tagline: "Chess camps, tournaments, private lessons, after-school programs, and Chess Dojo training in NYC",
  footerNote:
    "We are preparing the first Chess & Truck summer chess camp in New York City. Dates and location will be announced when registration opens. Planned camp days include chess instruction, structured play, and outdoor time.",
  // Brand slogan and summary for the shared header and footer.
  slogan: "Big Moves Start Small.",
  brandNote:
    "Chess camps, tournaments, private lessons, after-school programs, and Chess Dojo training for New York City families.",
};

export const navigationItems = [
  { label: "Home", path: "/" },
  { label: "Camps", path: "/camps" },
  { label: "Tournaments", path: "/tournaments" },
  { label: "Lessons", path: "/private-lessons" },
  { label: "After-School", path: "/after-school" },
  { label: "Dojo", path: "/dojo" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
];

export const academyHomePage = {
  hero: {
    eyebrow: "Chess programs for NYC kids",
    title: "Your Next Move Starts Here.",
    intro:
      "Chess camps, tournaments, private lessons, after-school programs, and Chess Dojo training for New York City kids. Structured lessons, real games, and an approach kids enjoy.",
    facts: ["Beginners welcome", "Direct parent support", "New York City"],
  },
  programsSection: {
    eyebrow: "Programs",
    title: "Five ways to play, learn, and compete",
    intro: "Explore what each program offers and where registration stands.",
  },
  whySection: {
    eyebrow: "Why Chess & Truck",
    title: "Serious chess, taught with clarity and fun",
    intro:
      "We keep chess structured enough to build real skills and fun enough that kids want to come back.",
    pillars: [
      {
        title: "Clear program details",
        text: "We share schedules, locations, and what each program includes before families register.",
      },
      {
        title: "Real games, real progress",
        text: "Lessons combine real games with guided analysis, so students understand what to repeat and what to change.",
      },
      {
        title: "Direct communication",
        text: "Parents can reach us by phone, text, or email for a clear answer and next step.",
      },
    ],
  },
  coachSection: {
    eyebrow: "Coach spotlight",
    title: "Meet Andrea",
    role: "Italian Chess Master",
    summary:
      "Andrea is based in New York and has taught chess through camps, private lessons, after-school programs, and events in the U.S. and Canada.",
    facts: [
      { value: "24 years", label: "teaching chess" },
      { value: "U.S. & Canada", label: "teaching experience" },
    ],
  },
  howSection: {
    eyebrow: "How it works",
    title: "Getting started is simple",
    steps: [
      {
        title: "Choose a program",
        text: "Browse camps, tournaments, private lessons, after-school programs, and the Chess Dojo.",
      },
      {
        title: "Tell us about your student",
        text: "Share your child's age, experience, and goals, and we will suggest a good starting point.",
      },
      {
        title: "Register when it opens",
        text: "Schedules, pricing, and registration details will be posted on each program page when it opens.",
      },
    ],
  },
  faqSection: {
    eyebrow: "Questions",
    title: "Frequently asked questions",
    items: [
      {
        question: "Is Chess & Truck suitable for beginners?",
        answer:
          "Yes. Beginners are welcome. Tell us your child's age and experience, and we will suggest the best place to start.",
      },
      {
        question: "Who leads instruction?",
        answer:
          "Andrea is an Italian Chess Master with 24 years of teaching experience. We will share coaching details for each program when its registration opens.",
      },
      {
        question: "When does registration open?",
        answer:
          "Each program above shows its current status. While a program shows Registration Opening Soon, we are not taking registrations or payments for it. Registration details will be posted on each program page.",
      },
      {
        question: "How do payments work?",
        answer:
          "We will share pricing and payment details for each program when its registration opens. Payments made on this website are processed securely by Stripe.",
      },
    ],
  },
  contactCard: {
    title: "Questions? Talk to us.",
    text: "Call, text, or email, and we will point you to the right program.",
  },
};

// Redesigned inner pages (camps, tournaments, private lessons).
// Planned details are labelled as planned. The camp schedule is the proposed plan for the first camp.
export const campsPageContent = {
  hero: {
    eyebrow: "Chess Camps",
    title: "Our first summer chess camp.",
    intro:
      "We are preparing the first Chess & Truck summer camp: full days of chess lessons, games, and outdoor time. Dates, location, and pricing will be posted here when registration opens.",
  },
  glance: [
    { label: "Location", value: "To be announced" },
    { label: "Planned camp day", value: "9:00 AM - 3:00 PM" },
    { label: "Proposed ages", value: "4 - 17" },
    { label: "Dates", value: "To be announced" },
  ],
  daySection: {
    eyebrow: "Planned schedule",
    title: "Camp Daily Schedule",
    intro: "This is the planned schedule for our first camp and is subject to change.",
  },
  learnSection: {
    eyebrow: "What students will work on",
    title: "Real chess skills, one day at a time",
  },
  faqSection: {
    eyebrow: "Camp questions",
    title: "What parents ask about camp",
  },
  faqs: [
    {
      question: "Is camp suitable for beginners?",
      answer:
        "Yes. Beginners will be welcome. The planned camp day starts with warm-up games so coaches can group students by level.",
    },
    {
      question: "Who leads instruction?",
      answer:
        "Coaching details for the camp will be shared when registration opens. You can read about Andrea, our featured coach, on the About page.",
    },
    {
      question: "What should students bring?",
      answer:
        "A packing list will be posted with registration. It is likely to include a water bottle, sunscreen, a change of clothes, and a packed lunch.",
    },
    {
      question: "Are campers supervised?",
      answer: "Yes. Students will be supervised throughout the camp day.",
    },
    {
      question: "Are early drop-off and extended day options available?",
      answer:
        "Early drop-off and extended day options have not been decided yet. Any options will be listed when registration opens.",
    },
  ],
  status: {
    title: "Camp registration is opening soon",
    text: "Camp registration and payments are not open yet. Dates, location, pricing, and enrollment options will be posted on this page when registration opens.",
  },
};

export const tournamentsPageContent = {
  hero: {
    eyebrow: "Chess Tournaments",
    title: "Scholastic chess tournaments for NYC players.",
    intro:
      "We are preparing Open and Beginner tournaments for school-age players. Dates and the venue have not been announced, and the format below may change before registration opens.",
  },
  plannedFormat: [
    { label: "Day", value: "Saturday mornings" },
    { label: "Start", value: "9:00 AM, finishing around lunch" },
    { label: "Sections", value: "Open (rated) and Beginner" },
    { label: "Venue", value: "To be announced" },
  ],
  sectionsSection: {
    eyebrow: "Planned sections",
    title: "Two sections, so every player starts in the right place",
    intro: "Section rules may be adjusted before registration opens.",
  },
  morningSection: {
    eyebrow: "Planned tournament morning",
    title: "How a tournament Saturday is planned to run",
  },
  morning: [
    {
      time: "8:30 AM",
      title: "Check-in",
      text: "Families arrive, settle in, and get players ready before the first round.",
    },
    {
      time: "9:00 AM",
      title: "Rounds begin",
      text: "Play starts on time, with Open and Beginner sections separated.",
    },
    {
      time: "Around lunch",
      title: "Wrap-up",
      text: "The format is designed to finish by lunch, so the day stays manageable for families.",
    },
  ],
  registrationSection: {
    eyebrow: "Registration",
    title: "How registration will work",
    intro: "Registration is not open yet. When it opens, it will follow these steps on this website.",
  },
  registrationSteps: [
    {
      title: "Choose a section",
      text: "Open section players need an active US Chess membership and ID. Beginner section players do not.",
    },
    {
      title: "Complete the form",
      text: "Enter player, parent or guardian, and emergency contact details.",
    },
    {
      title: "Pay online",
      text: "Pay the entry fee through secure Stripe checkout and receive a confirmation.",
    },
  ],
  faqSection: {
    eyebrow: "Tournament questions",
    title: "Before the first tournament",
  },
  faqs: [
    {
      question: "When is the first tournament?",
      answer: "No tournament dates have been announced yet. Dates will be posted on this page when registration opens.",
    },
    {
      question: "Does my child need a US Chess membership?",
      answer:
        "Only for the Open section, which is planned as a rated section. Beginner section players do not need a membership.",
    },
    {
      question: "Where will tournaments be held?",
      answer: "The venue has not been announced yet. It will be listed here with the tournament dates.",
    },
  ],
  status: {
    title: "Tournament registration is opening soon",
    text: "Tournament registration and payments are not open yet. Dates, the venue, and entry details will be posted on this page when registration opens.",
  },
};

export const lessonsPageContent = {
  hero: {
    eyebrow: "Private Chess Lessons",
    title: "Coaching built around your child.",
    intro:
      "Private lessons focus on one student: real games, guided analysis, and practice that connects from one session to the next.",
  },
  includesTitle: "Every lesson is built around",
  includes: [
    { title: "A real game", text: "The coach sees decisions in real time, not only puzzle answers." },
    { title: "Analysis that teaches", text: "Moves are reviewed so the student knows what to repeat and what to change." },
    { title: "A clear next focus", text: "Key notes or homework direction can follow the session when useful." },
  ],
  sessionSection: {
    eyebrow: "How a lesson works",
    title: "Play, review, practice",
    intro: "A typical session moves through three parts. The balance depends on the student.",
  },
  session: [
    {
      title: "Play",
      text: "A practice game, often at 10+10 or 15+10 once the student is ready for clock play.",
    },
    {
      title: "Review",
      text: "Coach and student go through the key moments together and talk through better options.",
    },
    {
      title: "Practice",
      text: "Targeted training work on the ideas that came up, from tactics to endgames.",
    },
  ],
  formatsSection: {
    eyebrow: "Planned formats",
    title: "Choose the setting that fits",
    intro: "Formats and scheduling will be confirmed when lesson registration opens.",
  },
  fitSection: {
    eyebrow: "Who lessons help",
    title: "A good fit for",
  },
  fit: [
    {
      title: "Beginners who need real fundamentals",
      text: "Students still building board vision, notation, good habits, and simple tactical awareness.",
    },
    {
      title: "Developing players who need game review",
      text: "Students already playing serious games who need clearer analysis, calculation, and decision-making.",
    },
    {
      title: "Families who want consistency",
      text: "A steady lesson rhythm that builds over time instead of changing direction every week.",
    },
  ],
  stepsSection: {
    eyebrow: "Getting started",
    title: "How to start",
  },
  steps: [
    {
      title: "Tell us about your student",
      text: "Share age, level, and whether you prefer private, group, online, or in-person lessons.",
    },
    {
      title: "We suggest a fit",
      text: "We recommend the format that suits your student best.",
    },
    {
      title: "Book when lessons open",
      text: "Lesson options and pricing will be posted on this page when registration opens.",
    },
  ],
  status: {
    title: "Lesson registration is opening soon",
    text: "Lesson booking and payments are not open yet. Lesson options and pricing will be posted on this page when registration opens.",
  },
};

export const afterSchoolPageContent = {
  hero: {
    eyebrow: "After-School Programs",
    title: "Chess after the school bell.",
    intro:
      "We are planning after-school chess for NYC students, designed to work for families and for schools. Schedules, locations, and pricing have not been set yet.",
  },
  glance: [
    { label: "For", value: "School-age students" },
    { label: "Beginners", value: "Welcome" },
    { label: "Schedule", value: "To be announced" },
    { label: "Locations", value: "To be announced" },
  ],
  audienceSection: {
    eyebrow: "Who it's for",
    title: "Planned for families and schools",
  },
  audiences: [
    {
      id: "parents",
      tag: "For parents",
      title: "A structured way to keep playing",
      points: [
        "Regular chess practice in a group setting after school",
        "Beginners welcome, with room to grow for stronger players",
        "Schedule, location, and pricing will be posted here when registration opens",
      ],
      cta: "Ask a question",
    },
    {
      id: "schools",
      tag: "For schools and administrators",
      title: "Interested in chess at your school?",
      points: [
        "We are open to conversations with schools about hosting after-school chess",
        "Tell us about your students, available space, and preferred days",
        "Format and terms would be agreed with each school before anything is scheduled",
      ],
      cta: "Start a conversation",
    },
  ],
  benefitsSection: {
    eyebrow: "Why chess after school",
    title: "What structured chess can help children practice",
    intro: "Every child is different. These are skills chess gives children a regular chance to practice.",
  },
  benefits: [
    { title: "Focus and patience", text: "Thinking a move through before playing it." },
    { title: "Planning", text: "Setting a goal on the board and working toward it." },
    { title: "Learning from mistakes", text: "Reviewing games to see what to change next time." },
    { title: "Good sportsmanship", text: "Winning and losing graciously with friends." },
  ],
  sessionSection: {
    eyebrow: "A planned session",
    title: "What a session could look like",
    intro: "A proposed outline. The final format will be set with each program.",
  },
  session: [
    { time: "Start", title: "Short lesson", text: "One idea taught clearly, with examples on the board." },
    { time: "Middle", title: "Supervised games", text: "Students play and try the idea in real games." },
    { time: "End", title: "Review and wrap-up", text: "A quick look at key moments before pick-up." },
  ],
  faqSection: {
    eyebrow: "After-school questions",
    title: "Before the program opens",
  },
  faqs: [
    {
      question: "Is this available at my child's school?",
      answer:
        "Not yet. We have not announced any school programs. If your school is interested in hosting after-school chess, please contact us.",
    },
    {
      question: "When and where will sessions take place?",
      answer: "Schedules and locations have not been set. They will be posted on this page when registration opens.",
    },
    {
      question: "Does my child need chess experience?",
      answer: "No. Beginners will be welcome.",
    },
  ],
  status: {
    title: "After-school registration is opening soon",
    text: "After-school registration and payments are not open yet. Schedules, locations, and pricing will be posted on this page when registration opens.",
  },
};

export const dojoPageContent = {
  hero: {
    eyebrow: "Chess Dojo",
    title: "Training for competitive players.",
    intro:
      "The Chess Dojo is our planned training program for players who want to prepare seriously for tournaments, built around game analysis and practical training.",
  },
  glance: [
    { label: "Focus", value: "Tournament preparation" },
    { label: "Method", value: "Game analysis and practical training" },
    { label: "For", value: "Players who compete or plan to" },
    { label: "Schedule", value: "To be announced" },
  ],
  compareSection: {
    eyebrow: "How the Dojo fits",
    title: "Between lessons and tournaments",
    intro: "Each program has a different job. The Dojo connects practice to competition.",
  },
  compare: [
    {
      id: "lessons",
      name: "Private Lessons",
      text: "One-on-one coaching built around a single student's needs and pace.",
      path: "/private-lessons",
      link: "See Private Lessons",
    },
    {
      id: "dojo",
      name: "Chess Dojo",
      text: "Training for competitive play: preparing before events and learning from games after them.",
    },
    {
      id: "tournaments",
      name: "Tournaments",
      text: "Rated and beginner-friendly competition where players put their preparation to the test.",
      path: "/tournaments",
      link: "See Tournaments",
    },
  ],
  focusSection: {
    eyebrow: "Training focus",
    title: "What Dojo training works on",
    intro:
      "Progress depends on each player's practice. The Dojo focuses on habits and understanding, not promised ratings or results.",
  },
  focus: [
    {
      title: "Tournament preparation",
      text: "Opening ideas, time management, and a calm routine before each round.",
    },
    {
      title: "Game analysis",
      text: "Going through players' own games to find turning points and recurring mistakes.",
    },
    {
      title: "Practical training",
      text: "Calculation, endgames, and training games with a clock.",
    },
    {
      title: "Competition habits",
      text: "Notation, clock use, and handling the ups and downs of a tournament day.",
    },
  ],
  faqSection: {
    eyebrow: "Dojo questions",
    title: "Before the Dojo opens",
  },
  faqs: [
    {
      question: "How is the Dojo different from private lessons?",
      answer:
        "Private lessons follow one student's needs. The Dojo is planned around competition: preparing for events and analyzing tournament games.",
    },
    {
      question: "Do players need to enter Chess & Truck tournaments?",
      answer:
        "The Dojo is planned to work alongside our tournaments. How it connects to tournament entry will be confirmed when registration opens.",
    },
    {
      question: "Who will coach the Dojo?",
      answer: "Coaching arrangements have not been confirmed yet. They will be shared on this page when registration opens.",
    },
  ],
  status: {
    title: "Dojo registration is opening soon",
    text: "Dojo registration and payments are not open yet. Schedule, format, and pricing will be posted on this page when registration opens.",
  },
};

// Program names, summaries, and page content. Registration status lives in
// src/lib/programs.js so it can be shared with the checkout API.
export const programOverview = {
  eyebrow: "Our programs",
  title: "Chess education for every stage",
  intro:
    "Camps, tournaments, lessons, after-school programs, and the Chess Dojo. Here is what each program is and where registration stands today.",
};

export const programs = [
  {
    id: "camps",
    iconKey: "camps",
    name: "Chess Camps",
    path: "/camps",
    summary:
      "Our first summer camp is in preparation, with planned days of chess lessons, games, and outdoor time.",
  },
  {
    id: "tournaments",
    iconKey: "tournaments",
    name: "Chess Tournaments",
    path: "/tournaments",
    registrationPath: "/register",
    summary:
      "Planned scholastic tournaments with Open and Beginner sections. Tournament dates have not been announced yet.",
  },
  {
    id: "lessons",
    iconKey: "lessons",
    name: "Private Chess Lessons",
    path: "/private-lessons",
    summary:
      "Private, small-group, and online coaching with real games, guided analysis, and structured improvement.",
  },
  {
    id: "afterSchool",
    iconKey: "afterSchool",
    name: "After-School Programs",
    path: "/after-school",
    summary:
      "After-school chess for NYC students. Program details are still being finalized.",
  },
  {
    id: "dojo",
    iconKey: "dojo",
    name: "Chess Dojo",
    path: "/dojo",
    summary:
      "Extra coaching around tournament day, turning competition into both a playing experience and a training block.",
  },
];

export const programPages = {
  tournaments: {
    eyebrow: "Chess Tournaments",
    title: "NYC scholastic chess tournaments.",
    intro:
      "We are preparing scholastic tournaments for school-age players. No tournament dates have been announced yet. The details below describe the planned format and may change before registration opens.",
    heroFacts: [
      { label: "Planned location", value: "Brick Church, 62 E 92nd Street, New York, NY 10128" },
      { label: "Planned sections", value: "Open + Beginner" },
      { label: "Planned format", value: "Saturday mornings, 9:00 AM to lunch" },
    ],
    highlightSection: {
      eyebrow: "What we are planning",
      title: "Built for students who want real tournament structure",
      intro: "This is the planned approach, not a schedule of upcoming events.",
    },
    highlights: [
      {
        title: "Scholastic tournaments",
        text: "Planned for school-age players who want a more organized NYC format built around real chess improvement.",
      },
      {
        title: "Open and Beginner sections",
        text: "The plan is to give experienced players and first-time competitors clearer placement from the start.",
      },
      {
        title: "Shorter Saturday format",
        text: "The goal is a serious tournament morning that starts at 9:00 AM and finishes around lunch.",
      },
    ],
    usesSectionOptions: true,
    sectionsSection: {
      eyebrow: "Planned sections",
      title: "Open and Beginner sections",
      intro: "Section rules may be adjusted before registration opens.",
    },
    scheduleSection: {
      eyebrow: "Planned event morning",
      title: "How a tournament Saturday is planned to run",
      intro: "No tournament dates are scheduled yet. Timing may change before the first event is announced.",
    },
    schedule: [
      {
        time: "8:30 AM",
        title: "Check-in window",
        text: "Families arrive, settle in, and get players ready before the first round begins.",
      },
      {
        time: "9:00 AM",
        title: "Rounds begin",
        text: "Play starts on time, with Open and Beginner sections already separated clearly.",
      },
      {
        time: "Around lunch",
        title: "Wrap-up",
        text: "The format is designed to finish by lunch so families get a serious event without losing the whole day.",
      },
    ],
  },
  afterSchool: {
    eyebrow: "After-School Programs",
    title: "After-school chess for NYC students.",
    intro:
      "We are preparing after-school chess programs for NYC students. Program details are still being finalized, and we will share them when they are confirmed.",
    heroFacts: [
      { label: "Program", value: "After-school chess" },
      { label: "Details", value: "Being finalized" },
      { label: "Updates", value: "Contact us to hear first" },
    ],
    highlightSection: {
      eyebrow: "Where things stand",
      title: "What we can share today",
    },
    highlights: [
      {
        title: "In preparation",
        text: "We are finalizing the program format, schedule, and locations before announcing them.",
      },
      {
        title: "Schools can reach out",
        text: "Schools and parent groups interested in after-school chess can contact us to start a conversation.",
      },
      {
        title: "Families can get updates",
        text: "Program details and registration will be posted on this page when they are ready.",
      },
    ],
  },
  dojo: {
    eyebrow: "Chess Dojo",
    title: "Master Training Dojo.",
    intro:
      "A premium coaching program for ambitious players who want more than a standard tournament entry. We are preparing the Dojo alongside our tournaments.",
    heroFacts: [
      { label: "For", value: "Ambitious tournament players" },
      { label: "Focus", value: "Critical positions and game review" },
      { label: "Planned format", value: "Coaching around tournament day" },
    ],
    highlightSection: {
      eyebrow: "What the Dojo is",
      title: "Extra coaching around tournament day",
    },
    highlights: [
      {
        title: "Coach-guided review",
        text: "Review critical positions with coach guidance during the tournament day.",
      },
      {
        title: "Competition plus training",
        text: "Turn the event into both a competition experience and a training block.",
      },
      {
        title: "More than an entry",
        text: "Give ambitious players more value than a standard entry alone.",
      },
    ],
    showsDojoFeature: true,
  },
};

export const lessonMenuItems = [
  {
    label: "Manage Your Lessons",
    path: "/lessons/manage",
    description: "Schedule help, lesson changes, and direct support from the lesson desk.",
    signal: "Lesson desk",
    imageKey: "manage",
  },
];

export const lessonMenuFeature = {
  eyebrow: "Lesson desk",
  title: "Manage your lessons fast.",
  text:
    "Open the lesson desk for scheduling help, lesson changes, and direct support.",
  ctaLabel: "Manage your lessons",
  ctaPath: "/lessons/manage",
};

export const campMenuItems = [
  {
    label: "Camp Overview",
    path: "/camps",
    description: "See dates, location, daily format, and how summer camp works before you register.",
    signal: "Opening soon",
    imageKey: "overview",
  },
];

export const campMenuFeature = {
  eyebrow: "Summer camp",
  title: "Summer camp | Weekdays",
  text:
    "We are preparing the first Chess & Truck summer chess camp in New York City. Dates and location will be announced when registration opens. Planned camp days include chess instruction, structured play, and outdoor time.",
  ctaLabel: "View Full Camp Details",
  ctaPath: "/camps",
};

export const routeMeta = {
  "/": {
    title: "Chess & Truck | Chess Camps, Tournaments & Lessons in NYC",
    description:
      "Chess & Truck offers chess camps, tournaments, private lessons, after-school programs, and Chess Dojo training for kids in New York City.",
  },
  "/about": {
    title: "About | Chess & Truck",
    description:
      "Learn why Chess & Truck is built for NYC families and how summer camp and direct parent communication are being structured.",
  },
  "/camps": {
    title: "Chess Camps | Chess & Truck",
    description:
      "Chess & Truck is preparing its first summer chess camp in New York City: the planned daily schedule, what students will work on, and registration status.",
  },
  "/camps/book": {
    title: "Camp Booking | Chess & Truck",
    description:
    "Chess & Truck summer camp booking. Camp registration is opening soon.",
  },
  "/camps/confirmed": {
    title: "Camp Confirmation | Chess & Truck",
    description:
      "Review your Chess & Truck camp payment confirmation, receipt details, and the next step after Stripe checkout.",
  },
  "/camps/training": {
    title: "Training Camps | Chess & Truck",
    description:
      "Daily training camp format for students who want structured chess work, strong rhythm, and coach-led practice.",
  },
  "/camps/prep": {
    title: "Advanced Training Camps | Chess & Truck",
    description:
      "Advanced training camp blocks for students who want sharper game review, stronger calculation, and more focused summer work.",
  },
  "/camps/online": {
    title: "Online Camps | Chess & Truck",
    description:
      "Online camp format for students who want a structured remote chess week with clear coaching and daily direction.",
  },
  "/events": {
    title: "Camps | Chess & Truck",
    description:
    "Chess & Truck tournaments in New York City. Registration is opening soon.",
  },
  "/events/chess-and-truck-tournament": {
    title: "Summer Camp | Chess & Truck",
    description:
    "Chess & Truck tournaments in New York City. Registration is opening soon.",
  },
  "/private-lessons": {
    title: "Private Chess Lessons | Chess & Truck",
    description:
      "Private, small-group, and online chess lessons in NYC with game review and structured coaching. Registration is opening soon.",
  },
  "/lessons/online": {
    title: "Online Lessons | Chess & Truck",
    description:
      "Online chess lessons for students who want focused coaching, cleaner structure, and a clear private lesson path.",
  },
  "/lessons/in-person": {
    title: "In Person Lessons | Chess & Truck",
    description:
      "In-person chess lessons in New York City for students who benefit from direct board work and face-to-face coaching.",
  },
  "/lessons/group": {
    title: "Group Lessons | Chess & Truck",
    description:
      "Small-group chess lessons for students who learn well through shared pace, focused instruction, and strong level matching.",
  },
  "/lessons/manage": {
    title: "Manage Lessons | Chess & Truck",
    description:
      "Lesson support for current and incoming families who need scheduling help, coaching guidance, or next-step coordination.",
  },
  "/faq": {
    title: "FAQ | Chess & Truck",
    description:
      "Get answers about summer camp, student fit, what to bring, and how to get the next step.",
  },
  "/contact": {
    title: "Contact | Chess & Truck",
    description:
      "Reach the Chess & Truck team by phone, email, or the contact form for camp questions.",
  },
  "/register": {
    title: "Registration | Chess & Truck",
    description:
      "Complete the Chess & Truck registration form and continue to secure checkout.",
  },
  "/tournaments": {
    title: "Chess Tournaments | Chess & Truck",
    description:
      "NYC scholastic chess tournaments with Open and Beginner sections. Registration is opening soon.",
  },
  "/after-school": {
    title: "After-School Programs | Chess & Truck",
    description:
      "After-school chess programs for NYC students are in preparation. Registration is opening soon.",
  },
  "/dojo": {
    title: "Chess Dojo | Chess & Truck",
    description:
      "The Master Training Dojo adds coach-guided review around tournament day. Registration is opening soon.",
  },
  "/terms": {
    title: "Terms of Service | Chess & Truck",
    description:
      "Review Chess & Truck terms covering camp inquiries, payments, cancellations, and program participation.",
  },
  "/privacy": {
    title: "Privacy Policy | Chess & Truck",
    description:
      "See how Chess & Truck uses contact and payment-related information for camp and family communication.",
  },
};

export const featuredTournament = {
  slug: "summer-camp",
  title: "Summer Chess Camp",
  city: "Location to be announced",
  scheduleLabel: "Weekdays | Dates coming soon",
  formatLabel: "9:00 AM - 3:00 PM (planned)",
  pricingLabel: "Camp details coming soon",
  venueLabel: "Location to be announced",
  shortSummary: "Our first summer camp is in preparation: a planned full-day program of chess lessons, structured play, and outdoor time.",
  longSummary:
    "We are preparing the first Chess & Truck summer chess camp in New York City. Dates and location will be announced when registration opens. Planned camp days include chess instruction, structured play, and outdoor time.",
  basePrice: 0,
  dojoPrice: 0,
};

export const footerLegalLinks = [
  { label: "Terms of Service", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

export const homePage = {
  eyebrow: "NYC chess camps",
  title: "Summer chess camps at 62 E 92nd Street, New York, NY 10128.",
    intro: "Weekday summer camp at 62 E 92nd Street, New York, NY 10128.",
  heroFacts: [
    { label: "Dates", value: "Coming soon" },
    { label: "Location", value: "62 E 92nd Street, New York, NY 10128" },
    { label: "Age range", value: "Ages 4 - 17" },
    { label: "Levels", value: "Beginner through Advanced" },
  ],
  offerSection: {
    eyebrow: "What camp includes",
    title: "The essentials, fast",
    intro: "Only the details families need first.",
  },
  offerCards: [
    {
      title: "Camp Details",
      text: "Dates, location, daily format, and the practical details parents usually ask first.",
      path: "/camps",
    },
    {
      title: "Sample Day",
      text: "A simple day rhythm with lessons, games, breaks, lunch, and review.",
      path: "/camps",
    },
    {
      title: "Contact the Team",
      text: "Ask about availability, pricing, or which camp format fits your family best.",
      path: "/contact",
    },
  ],
  processSection: {
    eyebrow: "How to join",
    title: "Three simple steps",
    intro: "Keep the next step obvious.",
  },
  processCards: [
    {
      title: "Review the camp page",
      text: "Start with dates, location, schedule, and what students will do each day.",
    },
    {
      title: "Ask about fit and pricing",
      text: "Send one message and we will tell you what fits your student and what is available.",
    },
    {
      title: "Get the next step",
      text: "We will send the right follow-up for registration, schedule, or program details.",
    },
  ],
  ctaTitle: "Ask about summer camp.",
  ctaText: "Use Contact for pricing, availability, and the next step.",
};

export const carouselSlides = [
  {
    label: "Open Section",
    title: "Rated competition",
    text: "For players with an active USCF ID.",
  },
  {
    label: "Beginner Section",
    title: "Beginner-friendly",
    text: "A better first tournament step.",
  },
  {
    label: "Tournament Morning",
    title: "Saturday 9 AM",
    text: "Serious format without taking over the whole day.",
  },
  {
    label: "Family Support",
    title: "Direct support",
    text: "Call, text, email, or use the contact form when you need a clear next step.",
  },
];

export const campOverviewPage = {
  eyebrow: "Camps",
  title: "Summer Chess Camps on the Upper East Side",
  intro: "",
  chips: [],
  heroFacts: [
    { label: "Dates", value: "Coming soon" },
    { label: "Location", value: "62 E 92nd Street, New York, NY 10128" },
    { label: "Levels", value: "Beginner through Advanced" },
    { label: "Age range", value: "Ages 4 - 17" },
  ],
  portraitCaption: "Simple camp booking with real chess structure.",
  asideTag: "Opening soon",
  asideTitle: "Program Overview",
  asideText:
      "Full-day program with chess lessons, rated matches, lunch, outdoor park time, and a fun, engaging environment students look forward to each day.",
  asideFacts: [
    { label: "Schedule", value: "9:00 AM - 3:00 PM" },
      { label: "Coaching", value: "Details coming soon" },
    { label: "Contact", value: "Contact Us" },
  ],
  overviewSection: {
    eyebrow: "What camp includes",
    title: "What students do",
    intro: "The essentials.",
  },
  overviewPoints: [
    {
      title: "Daily coached lessons",
      text: "Coach-led instruction every day.",
    },
    {
      title: "Practice games",
      text: "Guided play with review built in.",
    },
    {
      title: "Puzzle solving",
      text: "Daily tactics and calculation work.",
    },
    {
      title: "Mini tournament play",
      text: "Clock play and game-day habits.",
    },
    {
      title: "Structured day rhythm",
      text: "Learn, play, break, review.",
    },
  ],
  detailsSection: {
    eyebrow: "Camp details",
    title: "The details parents ask first",
    intro: "Quick facts.",
  },
  detailsCards: [
    { title: "Location", text: "62 E 92nd Street, New York, NY 10128" },
    { title: "Dates", text: "Next season's dates coming soon" },
    { title: "Time", text: "9:00 AM - 3:00 PM" },
    { title: "Age range", text: "Ages 4 - 17" },
    { title: "Rated matches", text: "Included during camp sessions" },
    { title: "Skill levels", text: "Beginner through advanced groupings" },
    { title: "Contact", text: "Contact Us for availability and next steps" },
  ],
  bookingSection: {
    eyebrow: "Camp booking",
    title: "Enrollment Options",
    intro: "",
    note: "",
  },
  bookingCards: [
    {
      id: "full-week",
      eyebrow: "Weekly Pass",
      title: "Full Week Camp",
      price: "$700 per week",
      defaultSchedulePreference: "Week of June 15",
      scheduleText: "Jun 15 - Jun 19 | 9:00 AM - 3:00 PM",
      details: [
        "Daily chess instruction",
        "Rated games, lunch break, and outdoor park time",
        "Fun, engaging activities throughout the day",
      ],
      availability: "Limited group size",
      cta: "Enroll",
      campTime: "9:00 AM - 3:00 PM",
    },
    {
      id: "single-day",
      eyebrow: "Daily Pass",
      title: "Single Day Camp",
      price: "$150 per day",
      defaultSchedulePreference: "Monday, June 15",
      scheduleText: "9:00 AM - 3:00 PM",
      details: [
        "Chess instruction",
        "Rated games and structured play",
        "Lunch, outdoor park time, and fun activities",
      ],
      availability: "Limited group size",
      cta: "Enroll",
      campTime: "9:00 AM - 3:00 PM",
    },
    {
      id: "half-day",
      eyebrow: "AM/PM options",
      title: "Half Day",
      price: "$95 per half day",
      defaultSchedulePreference: "Monday, June 15",
      scheduleText: "9:00 AM - 12:00 PM or 12:00 PM - 3:00 PM",
      details: [
        "Flexible for families and kids",
        "Intense training with lessons and games",
        "Fun activities included",
      ],
      availability: "Choose AM or PM",
      actions: [
        {
          optionId: "half-day-am",
          title: "Half Day AM",
          switcherTitle: "Half Day AM",
          scheduleText: "9:00 AM - 12:00 PM",
          price: "$95 per half day",
          defaultSchedulePreference: "Monday, June 15",
          campTime: "9:00 AM - 12:00 PM",
          label: "ENROLL AM",
        },
        {
          optionId: "half-day-pm",
          title: "Half Day PM",
          switcherTitle: "Half Day PM",
          scheduleText: "12:00 PM - 3:00 PM",
          price: "$95 per half day",
          defaultSchedulePreference: "Monday, June 15",
          campTime: "12:00 PM - 3:00 PM",
          label: "ENROLL PM",
        },
      ],
    },
  ],
  bookingSchedule: [
    {
      id: "camp-day-1",
      date: "Monday, June 15th, 2026",
      relativeLabel: "Weekday session",
      time: "9:00 AM",
      title: "Summer Camp Day",
    subtitle: "Full day at 62 E 92nd Street, New York, NY 10128",
      price: "$150.00",
      spotsLeft: "12 spots left",
      optionId: "single-day",
      schedulePreference: "Monday, June 15",
    },
    {
      id: "camp-day-2",
      date: "Tuesday, June 16th, 2026",
      relativeLabel: "Day 2",
      time: "9:00 AM",
      title: "Summer Camp Day",
    subtitle: "Full day at 62 E 92nd Street, New York, NY 10128",
      price: "$150.00",
      spotsLeft: "12 spots left",
      optionId: "single-day",
      schedulePreference: "Tuesday, June 16",
    },
    {
      id: "camp-day-3",
      date: "Wednesday, June 17th, 2026",
      relativeLabel: "Midweek session",
      time: "9:00 AM",
      title: "Summer Camp Day",
    subtitle: "Full day at 62 E 92nd Street, New York, NY 10128",
      price: "$150.00",
      spotsLeft: "12 spots left",
      optionId: "single-day",
      schedulePreference: "Wednesday, June 17",
    },
    {
      id: "camp-day-4",
      date: "Thursday, June 18th, 2026",
      relativeLabel: "Late-week session",
      time: "9:00 AM",
      title: "Summer Camp Day",
    subtitle: "Full day at 62 E 92nd Street, New York, NY 10128",
      price: "$150.00",
      spotsLeft: "12 spots left",
      optionId: "single-day",
      schedulePreference: "Thursday, June 18",
    },
    {
      id: "camp-day-5",
      date: "Friday, June 19th, 2026",
      relativeLabel: "Wrap-up day",
      time: "9:00 AM",
      title: "Summer Camp Day",
    subtitle: "Full day at 62 E 92nd Street, New York, NY 10128",
      price: "$150.00",
      spotsLeft: "12 spots left",
      optionId: "single-day",
      schedulePreference: "Friday, June 19",
    },
  ],
  mapSection: {
    eyebrow: "Camp location",
    title: "Location",
  intro: "62 E 92nd Street, New York, NY 10128.",
    address: "62 E 92nd Street, New York, NY 10128",
    directionsLabel: "Open in Google Maps",
    directionsHref:
      "https://www.google.com/maps/search/?api=1&query=62%20E%2092nd%20Street%20New%20York%20NY%2010128",
    embedSrc:
      "https://www.google.com/maps?q=62%20E%2092nd%20Street%20New%20York%20NY%2010128&output=embed",
  },
  scheduleSection: {
    eyebrow: "FULL CAMP DAY",
    title: "APPROXIMATE SCHEDULE",
    intro: "",
  },
  sampleSchedule: [
    {
      time: "9:00 - 10:00 AM",
      title: "Drop-off, warm-up games, evaluation, and grouping",
      text: "Students arrive, settle in, and begin with warm-up games while coaches evaluate level and group students thoughtfully.",
    },
    {
      time: "10:00 - 11:00 AM",
      title: "Central Park fun",
      text: "Soccer, playground time, board games, tag, and other organized outdoor games keep the morning active and social.",
    },
    {
      time: "11:00 AM - 12:00 PM",
      title: "Chess lessons and organized activities",
      text: "Puzzles, simuls, blitz games, the $1 beat-the-coach challenge, and other fun structured chess activities.",
    },
    {
      time: "12:00 - 1:00 PM",
      title: "Lunch break and social time",
      text: "A relaxed lunch block gives students time to recharge, eat, and connect with the group.",
    },
    {
      time: "1:00 - 2:30 PM",
      title: "Chess lessons, rated matches, and analysis",
      text: "The afternoon block includes instruction, rated games, group post-game analysis, and an ice cream break.",
    },
    {
      time: "2:30 - 3:00 PM",
      title: "Recap, fun chess activities, and pick-up",
      text: "Students wrap up the day with a quick recap, fun chess activities, and end-of-day pick-up.",
    },
  ],
  learningSection: {
    eyebrow: "What students learn",
    title: "What students work on",
    intro: "Core chess areas.",
  },
  learningCards: [
    { title: "Tactics", text: "Patterns and calculation." },
    { title: "Openings", text: "Clean development habits." },
    { title: "Strategy", text: "Planning and piece activity." },
    { title: "Endgames", text: "Core winning methods." },
    { title: "Tournament habits", text: "Clock use and focus." },
    { title: "Thinking process", text: "Slower, better decisions." },
  ],
  cards: [
    {
      title: "Training Camps",
      text: "Daily school-break camps with lessons, practice games, puzzle work, and coach-led review.",
      path: "/camps",
    },
    {
      title: "Tournament Prep Camps",
      text: "Shorter competitive camp blocks for players getting ready for rated events and stronger tournament habits.",
      path: "/camps",
    },
    {
      title: "Online Camps",
      text: "Remote training format for families who want camp structure without commuting across the city.",
      path: "/camps",
    },
  ],
  faqSection: {
    eyebrow: "FAQ",
    title: "Common Questions",
    intro: "",
  },
  faqs: [
    {
      question: "Is this suitable for beginners?",
      answer: "Yes. Beginners are welcome, and students are grouped thoughtfully by level. Even complete beginners may join!",
    },
    {
      question: "Who leads instruction?",
      answer: "Coaching details for the camp will be shared when registration opens. You can read about Andrea, our featured coach, on the About page.",
    },
    {
      question: "What should students bring?",
      answer: "A water bottle, sunscreen, a change of clothes, and a packed lunch unless opting for our pizza option.",
    },
    {
      question: "Are campers supervised at all times?",
      answer: "Yes. Students are supervised at all times throughout the day.",
    },
    {
      question: "Are early drop-off and extended day options available?",
      answer: "Yes. Both options are available during enrollment.",
    },
  ],
  ctaTitle: "Ask about summer camp",
  ctaText: "Contact Us for availability, pricing, and the next step.",
};

export const campBookingPage = {
  eyebrow: "Camp booking",
  title: "Choose an option and continue to secure checkout",
  intro: "Pick an option, add family details, and continue to Stripe.",
  chips: ["Date selection", "Additional services", "Secure checkout"],
  formTitle: "Enrollment Options",
  formIntro: "Pick your week or dates, add extras, and continue to secure checkout.",
  sections: [
    {
      title: "Parent contact",
      intro: "Who should we email and text about camp details?",
    },
    {
      title: "Student details",
      intro: "A few basics so we know who the camp spot is for.",
    },
    {
      title: "Additional details",
      intro: "Add anything we should know before checkout.",
    },
  ],
  supportTitle: "Need help before checkout?",
  supportText: "Contact Us if you have any questions, reservations or concerns.",
  siblingNote: "Booking for more than one student? Please submit a separate booking for each child.",
};

export const campDetailPages = {
  "/camps/training": {
    eyebrow: "Training Camps",
    title: "Daily camp rhythm for students who need more than casual chess.",
    intro:
      "A summer camp format built around instruction, supervised play, review, and daily habits that actually move a student forward.",
    chips: ["Daily rhythm", "Summer camp", "Central Park"],
    portraitCaption:
      "A strong training camp should feel focused and alive, not like a room where chess is just one activity in the background.",
    asideTag: "Training camp fit",
    asideTitle: "This should feel like a real training week",
    asideText:
      "The best version gives students structure each day: learn, apply, review, and come back the next morning sharper than before.",
    asideFacts: [
      { label: "Best for", value: "Students building fundamentals" },
      { label: "Daily feel", value: "Coach-led and active" },
      { label: "Season", value: "Summer" },
    ],
    cards: [
      { title: "Daily instruction", text: "Coach-led camp blocks with a clear training theme instead of random activity shifts." },
      { title: "Built-in play and review", text: "Students should not only learn ideas. They should play, make decisions, and review what happened." },
      { title: "Stronger routine", text: "A multi-day camp can create better momentum than one-off sessions if the pace is right." },
    ],
    pathSection: {
      eyebrow: "Camp paths",
      title: "Three ways the first training camp release can work",
      intro: "Short, concrete camp options for families who want clarity before dates open.",
    },
    pathCards: [
      {
        eyebrow: "Start here",
        title: "Intro Camp Week",
        bullets: [
          "First release week designed to set standards and rhythm correctly",
          "Best for families who want a clean introduction to the camp format",
          "Useful for students who need structure more than intensity right away",
        ],
        meta: "Founding camp release",
        note: "Dates coming soon",
        cta: "Ask about intro camp week",
      },
      {
        eyebrow: "Core rhythm",
        title: "Training Block",
        bullets: [
          "Daily coaching rhythm with instruction, play, and review built into the week",
          "Good for students who improve through repetition and consistent expectations",
          "Stronger fit for families who want a serious chess week, not generic childcare",
        ],
        meta: "Full training week",
        note: "Ask about this camp week",
        cta: "Ask about training blocks",
      },
      {
        eyebrow: "Focused push",
        title: "Skill Camp",
        bullets: [
          "Camp week centered on one area such as tactics, endgames, or tournament habits",
          "Good for players who need a sharper training theme than a general program offers",
          "Can sit well before or after an event stretch depending on the student's goals",
        ],
        meta: "Theme-based camp",
        note: "Added based on demand",
        cta: "Ask about skill camps",
      },
    ],
    checklistTitle: "What a strong training camp should include",
    checklist: [
      "Coach-led structure from arrival to the final game review",
      "Actual chess work, not only puzzle packets and casual play",
      "Level-aware pacing so students are challenged without getting lost",
      "Clear communication with families before registration opens",
    ],
    ctaTitle: "Ask about training camp spots",
    ctaText:
      "If this is the camp format your family wants, contact us now and we will reply with availability and next steps.",
    ctaLabel: "Contact about training camps",
  },
  "/camps/prep": {
    eyebrow: "Advanced Training Camps",
    title: "Shorter, sharper camp blocks for students who want deeper work.",
    intro:
      "This camp format is for students who already know the basics and want a more focused training week with stronger review and cleaner habits.",
    chips: ["Advanced players", "Summer camp", "Focused training"],
    portraitCaption:
      "Advanced camp should feel sharper than general camp: more game review, cleaner goals, and stronger daily focus.",
    asideTag: "Prep camp fit",
    asideTitle: "This is for players who already care about performance",
    asideText:
      "The goal is not to keep the room busy. The goal is to help students leave camp more prepared, more accurate, and more stable over the board.",
    asideFacts: [
      { label: "Best for", value: "Active competitors" },
      { label: "Works well for", value: "Game review and prep" },
      { label: "Season", value: "Summer" },
    ],
    cards: [
      { title: "Game review first", text: "The week should include real review of practical mistakes, not only abstract instruction." },
      { title: "Better game habits", text: "Useful for pacing, notation, decision-making, and more disciplined play." },
      { title: "Sharper themes", text: "Calculation, openings, endgames, and practical habits can be trained more directly here." },
    ],
    pathSection: {
      eyebrow: "Prep tracks",
      title: "Three ways advanced camp can open",
      intro: "Competitive families usually want the fast version: what it is, who it is for, and how it starts.",
    },
    pathCards: [
      {
        eyebrow: "Start here",
        title: "Weekend Prep Block",
        bullets: [
          "Short focused format for players who want a concentrated prep experience",
          "A clean first option for families who want something sharper than a general camp week",
          "Useful for players who want a more competitive training focus",
        ],
        meta: "Short prep release",
        note: "Dates coming soon",
        cta: "Ask about prep blocks",
      },
      {
        eyebrow: "Core rhythm",
        title: "Pre-Event Camp Week",
        bullets: [
          "Focused week ahead of an important training stretch",
          "Can center around game review, openings, calculation, and practical game habits",
          "Best for players who already compete and want cleaner preparation",
        ],
        meta: "Competition week",
        note: "Ask about this camp week",
        cta: "Ask about pre-event week",
      },
      {
        eyebrow: "Post-event reset",
        title: "Review & Rebuild Camp",
        bullets: [
          "Camp block after an event stretch to review games and clean up recurring mistakes",
          "Useful when a player needs clarity more than volume",
          "Can help reset direction before the next training cycle starts",
        ],
        meta: "Post-event training",
        note: "Built around demand and event timing",
        cta: "Ask about review camps",
      },
    ],
    checklistTitle: "What advanced camp should include",
    checklist: [
      "Practical game review tied to the student's actual competitive level",
      "Clear training themes instead of generic camp rotation",
      "A sharper room with stronger focus and less filler",
      "Honest positioning before registration opens",
    ],
    ctaTitle: "Ask about advanced training camp",
    ctaText:
      "If competitive camp blocks are what your student needs, contact us now and we will send details and next steps.",
    ctaLabel: "Contact about prep camps",
  },
  "/camps/online": {
    eyebrow: "Online Camps",
    title: "Remote camp structure for families who still want a serious week.",
    intro:
      "For students who need a structured chess week without commuting, online camps can still feel focused, coach-led, and worth the time.",
    chips: ["Remote format", "Summer camp", "Structured days"],
    portraitCaption:
      "Online camp should not feel passive. The right setup keeps the student engaged, moving, and accountable through the day.",
    asideTag: "Online camp fit",
    asideTitle: "Remote should still feel active and coach-led",
    asideText:
      "The screen should not lower the standard. The structure should still create pace, real work, and a meaningful week for the student.",
    asideFacts: [
      { label: "Best for", value: "Remote families" },
      { label: "Works well for", value: "Review and guided practice" },
      { label: "Season", value: "Summer" },
    ],
    cards: [
      { title: "Cleaner than random online time", text: "A camp week should give students structure, not more disconnected chess activity." },
      { title: "Useful for guided review", text: "Strong format for game review, live puzzles, training themes, and coach feedback." },
      { title: "No city commute", text: "Good for families who want strong chess work without the daily travel commitment." },
    ],
    pathSection: {
      eyebrow: "Online camp paths",
      title: "Three ways remote camp can work well",
      intro: "The format should stay simple and well explained from the start.",
    },
    pathCards: [
      {
        eyebrow: "Start here",
        title: "Mini Online Camp",
        bullets: [
          "Short focused format to establish pacing and parent expectations clearly",
          "Best for families who want to test the remote camp structure first",
          "Useful when a student benefits from shorter, more controlled camp blocks",
        ],
        meta: "Short online release",
        note: "Dates coming soon",
        cta: "Ask about mini online camps",
      },
      {
        eyebrow: "Core rhythm",
        title: "Full Online Camp Week",
        bullets: [
          "A clearer daily rhythm with instruction, applied work, and review",
          "Good for students who do well with a coach-led home setup",
          "Better than random online study because the week actually holds together",
        ],
        meta: "Remote camp week",
        note: "Ask about online availability",
        cta: "Ask about online camp weeks",
      },
      {
        eyebrow: "Focused push",
        title: "Theme Week Online",
        bullets: [
          "Remote camp built around one training theme such as tactics, endgames, or game review",
          "Good for students who need one sharper training direction instead of a broad camp mix",
          "Can sit well before a busy training stretch or as a mid-season reset",
        ],
        meta: "Theme-based remote camp",
        note: "Added based on family demand",
        cta: "Ask about theme weeks",
      },
    ],
    checklistTitle: "What online camp should include",
    checklist: [
      "Coach-led pacing that keeps students active, not passive",
      "Clear daily structure instead of screen time for its own sake",
      "Real review and applied work inside the camp day",
      "A format that respects family logistics from the start",
    ],
    ctaTitle: "Ask about online camp spots",
    ctaText:
      "If remote camp is the best fit for your family, contact us now and we will send details and next steps.",
    ctaLabel: "Contact about online camps",
  },
};

export const aboutPage = {
  eyebrow: "About CHESS AND TRUCK",
  title: "A Smarter Chess Program for NYC Families",
  intro: [
    "Chess & Truck is building chess programs for New York City families: clear options, direct communication, and coaching your child will actually benefit from.",
    "Our coaching blends structured learning with a fun, engaging approach kids enjoy.",
    "Real games. Real coaching. Real progress.",
  ],
  heroFacts: [
    { label: "Focus", value: "Scholastic chess" },
    { label: "City", value: "New York City" },
    { label: "Programs", value: "Camps, tournaments, lessons" },
  ],
  introSection: {
    eyebrow: "What matters most to families",
    title: "What Matters Most to Families",
    intro: "We prioritize fun, clarity, structure, and meaningful instruction -- every step of the way.",
  },
  coachSpotlight: {
    eyebrow: "Coach spotlight",
    title: "Meet Andrea",
    intro: "Italian Chess Master • 24 years of teaching experience",
    paragraphs: [
      "Based in New York, Andrea has spent nearly 24 years teaching chess through camps, private lessons, after-school programs, birthday events, and promotional programs in both the U.S. and Canada.",
      "He brings a rare mix of structure, energy, and joy to every lesson, helping young players discover the beauty of chess through serious instruction that still feels genuinely fun.",
    ],
    highlights: [
      "24 years teaching chess",
      "Camps, lessons, events, and after-school programs",
      "NYC-based with international coaching experience",
    ],
  },
  pillars: [
    {
      title: "Transparent program design",
      text: "All essential details -- schedule, setting, and daily structure -- are clear from the outset.",
    },
    {
      title: "Substantive instruction",
      text: "Our programs are designed to build analytical thinking through real games and guided review.",
    },
    {
      title: "Clear lines of communication",
      text: "Parents stay informed and supported, without needing to chase information.",
    },
  ],
  whySection: {
    eyebrow: "Why Parents Trust Us",
    title: "The Standard Families Should Expect",
    intro: "Clarity, trust, and a clear sense of what comes next.",
  },
  standards: [
    "Thoughtful level placement prior to enrollment",
    "Direct, accessible communication",
    "Transparent updates -- no vague timelines",
    "Programs that feel structured from the very first interaction",
  ],
};

export const eventsPage = {
  eyebrow: "Events & Tournaments",
  title: "NYC scholastic tournaments with a clear Saturday service.",
  intro:
    "Open and Beginner sections, a 9:00 AM start, and a morning schedule that wraps by lunch. Families can review the structure now and contact us for current tournament details.",
  heroFacts: [
    { label: "Location", value: "Brick Church, 62 E 92nd Street, New York, NY 10128" },
    { label: "Service", value: "Open + Beginner" },
    { label: "Status", value: "Current details available" },
  ],
  offerSection: {
    eyebrow: "What these events are",
    title: "Built for students who want real tournament structure",
    intro: "This page should answer the practical questions first, before registration opens.",
  },
  offerCards: [
    {
      title: "Scholastic tournaments",
      text: "School-age players compete in a more organized NYC format built around real chess improvement.",
    },
    {
      title: "Open and Beginner sections",
      text: "Experienced players and first-time competitors get clearer placement from the start.",
    },
    {
      title: "Shorter Saturday format",
      text: "The goal is a serious tournament morning that starts at 9:00 AM and finishes around lunch.",
    },
  ],
  detailSection: {
    eyebrow: "Event details",
    title: "The fast version parents usually ask first",
    intro: "Dates are still being finalized, but the core event structure is already set.",
  },
  detailCards: [
    { title: "Location", text: "Brick Church, 62 E 92nd Street, New York, NY 10128" },
    { title: "Dates", text: "Contact Us for current tournament dates" },
    { title: "Time", text: "Saturday mornings, 9:00 AM to lunch" },
    { title: "Service", text: "Rated and beginner-friendly divisions" },
    { title: "Entry", text: "Registration from $55 planned" },
    { title: "Contact", text: "Contact Us now" },
  ],
  sampleSection: {
    eyebrow: "Sample event morning",
    title: "How a tournament Saturday is expected to run",
    intro: "Exact timing may shift slightly by date, but the overall rhythm is already defined.",
  },
  sampleSchedule: [
    {
      time: "8:30 AM",
      title: "Check-in window",
      text: "Families arrive, settle in, and get players ready before the first round begins.",
    },
    {
      time: "9:00 AM",
      title: "Rounds begin",
      text: "Play starts on time, with Open and Beginner sections already separated clearly.",
    },
    {
      time: "Mid-morning",
      title: "Between-round support",
      text: "Players reset between games, and dojo add-on students can move into coached work when available.",
    },
    {
      time: "Around lunch",
      title: "Wrap-up",
      text: "The format is designed to finish by lunch so families get a serious event without losing the whole day.",
    },
  ],
  supportCards: [
    {
      title: "Clear section fit",
      text: "Parents can already see the difference between Open and Beginner before the first date is posted.",
    },
    {
      title: "Important rules up front",
      text: "USCF requirements and the basic registration path are visible before checkout.",
    },
    {
      title: "Simple next step",
      text: "Families can use Contact Us now for current tournament information and next steps.",
    },
  ],
  ctaTitle: "Want tournament details?",
  ctaText:
      "Contact Us now and we will send section guidance, registration details, and the next step.",
};

export const tournamentPage = {
  eyebrow: "Featured Tournament",
  title: "Chess & Truck Tournament",
    intro: "The format is set. Contact Us for current tournament details and the next step.",
  atAGlance: [
    { label: "Location", value: "Brick Church, 62 E 92nd Street, New York, NY 10128" },
    { label: "Service", value: "Open & Beginner sections" },
    { label: "Schedule", value: "Saturday mornings, 9:00 AM to lunch" },
    { label: "Status", value: "Current details available" },
  ],
  checklist: [
    "Open section players will still need an active USCF ID",
    "Beginner players will still have a simpler entry path",
    "The Saturday morning structure is already set",
    "Use Contact if you want the latest tournament details",
  ],
};

export const faqPage = {
  eyebrow: "FAQ",
  title: "Camp FAQ",
  intro: "The answers parents usually want before booking.",
  heroFacts: [
    { label: "Camp dates", value: "Coming soon" },
    { label: "Location", value: "To be announced" },
    { label: "Planned camp time", value: "9:00 AM - 3:00 PM" },
    { label: "Support", value: "Call, text, or email" },
  ],
  quickCards: [
    {
      title: "Is this suitable for beginners?",
      text: "Yes. Beginners will be welcome. The planned camp day starts with warm-up games so coaches can group students by level.",
    },
    {
      title: "Who leads instruction?",
      text: "Coaching details for the camp will be shared when registration opens. You can read about Andrea, our featured coach, on the About page.",
    },
    {
      title: "What should students bring?",
      text: "A packing list will be posted with registration. It is likely to include a water bottle, sunscreen, a change of clothes, and a packed lunch.",
    },
    {
      title: "Are campers supervised at all times?",
      text: "Yes. Students will be supervised at all times throughout the camp day.",
    },
    {
      title: "Are early drop-off and extended day options available?",
      text: "Early drop-off and extended day options have not been decided yet. Any options will be listed when registration opens.",
    },
  ],
  prepSection: {
    eyebrow: "Before you register",
    title: "What parents usually want to know first",
    intro: "These are the questions that usually decide whether a family is ready to move forward.",
  },
  prepCards: [
    {
      title: "Who can join?",
      text: "School-age players who want a stronger summer chess routine.",
    },
    {
      title: "What should students bring?",
      text: "A water bottle, lunch or snack if needed, and anything staff should know medically.",
    },
    {
      title: "Is prior experience required?",
      text: "No. Beginners are welcome, and we will help point families to the right starting format.",
    },
  ],
  flowSection: {
    eyebrow: "How sign-up works",
    title: "The registration flow is simple",
    intro: "Families should know what happens before they ever hit checkout.",
  },
  flowSteps: [
    {
      title: "Review the right page",
      text: "Start with the camp page first so you can see the format, schedule, and fit.",
    },
    {
      title: "Send one message",
      text: "Tell us the student age, current level, and what camp question you have.",
    },
    {
      title: "Get the next step",
      text: "We reply with availability, pricing, and the cleanest next move for your family.",
    },
  ],
  ctaTitle: "Still have a question?",
  ctaText: "If the answer is not here yet, send a message and we will point you in the right direction.",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Have questions? We’re here to help",
  intro: "",
  heroFacts: [
    {
      label: "Phone",
      lines: ["Call or Text", "(646) 251-7087", "(646) 494-5363"],
    },
    {
      label: "Email",
      lines: ["info@chessandtruck.com"],
    },
  ],
  topicSection: {
    eyebrow: "What to contact us about",
    title: "Three common reasons families reach out",
    intro: "If the right page still leaves a question, this is the next step.",
  },
  topicCards: [
    {
      title: "Camp questions",
      text: "Ask about our first camp, the planned daily format, or whether camp fits your family.",
    },
    {
      title: "Lesson inquiries",
      text: "Ask about online or in-person lessons, student fit, weekly coaching, or current availability.",
    },
    {
      title: "Camp updates",
      text: "Ask about school-break camp plans, age fit, availability, or which format fits your family best.",
    },
  ],
  supportCards: [
    {
      title: "Before you book",
      text: "Reach out if you want to understand fit, format, or timing before booking.",
    },
    {
      title: "Operational support",
      text: "Use this for logistics, scheduling questions, and follow-up after booking.",
    },
    {
      title: "Best next step",
      text: "One clear message is enough. We will point you to the right program, page, or next step.",
    },
  ],
  responseSection: {
    eyebrow: "What happens next",
    title: "What families should expect after sending a message",
    intro: "The contact path should feel simple and direct, not like a black box.",
  },
  responseSteps: [
    {
      title: "We read the question first",
      text: "Messages are reviewed for fit, timing, and whether your question is really about camp or lessons.",
    },
    {
      title: "We point you to the right next step",
      text: "That may mean a direct answer, the right page, or the best available option for your student.",
    },
    {
      title: "You get a clear follow-up",
      text: "If you contact us early, we keep your message tied to the right program so you do not have to start over later.",
    },
  ],
  messageChecklist: [
    "Student age and current level",
    "Whether you want camp or lessons",
    "Your preferred format: online, in person, or school-break camp",
  ],
  ctaTitle: "Need help choosing the right next step?",
  ctaText:
    "Send one message with the student age, current level, and whether you are looking for camp or lessons. Or call, text, or email if you already know what you need.",
};

export const privateLessonsPage = {
  eyebrow: "Private Chess Lessons",
  title: "Chess lessons in NYC: private, small-group, and online.",
  intro:
    "Private, group, and online chess lessons for families who want clear coaching and a simple next step.",
  heroChips: ["Private coaching", "Small-group options", "Online + in person"],
  quickFacts: [
    { label: "Levels", value: "Beginner to advanced" },
    { label: "Formats", value: "Private, group, online" },
    { label: "Includes", value: "Game + analysis" },
    { label: "Contact", value: "Ask for availability" },
  ],
  heroNote:
    "Pick the format that fits your student and contact us for the next step.",
  detailsSection: {
    eyebrow: "Lesson details",
    title: "The practical details families ask first",
    intro: "The core lesson structure is clear from the start.",
  },
  detailsCards: [
    { title: "Who it is for", text: "School-age students from beginners to advanced players who need clearer structure and real improvement." },
    { title: "Formats", text: "Private lessons, small-group coaching, and online options are all available paths." },
    { title: "Session flow", text: "Lesson time can include a real game, guided analysis, and targeted training work." },
    { title: "Game format", text: "Practice games can use 10+10 or 15+10 once the student is ready for clock work." },
    { title: "Written feedback", text: "When useful, families get a short follow-up with the key lesson points and next focus." },
    { title: "Pricing", text: "Lesson rates are shared clearly as part of the booking process, not after a vague inquiry call." },
  ],
  formatCards: [
    {
      eyebrow: "Remote",
      title: "Online lessons",
      text: "Remote coaching with game review and a clean weekly rhythm.",
    },
    {
      eyebrow: "Face to face",
      title: "In-person lessons",
      text: "Board-first coaching for students who focus better live.",
    },
    {
      eyebrow: "Shared training",
      title: "Group lessons",
      text: "Small groups with stronger pace and better level matching.",
    },
  ],
  getSection: {
    eyebrow: "What you get",
    title: "Each lesson should give the student something concrete",
    intro: "Parents should be able to see what a session includes and why it helps.",
  },
  getCards: [
    {
      title: "A real game",
      text: "Students do not only solve puzzles. The lesson can include live play so the coach can see decisions in real time.",
    },
    {
      title: "Analysis that teaches something",
      text: "Moves are reviewed with a purpose, so the student understands what to repeat and what to change next time.",
    },
    {
      title: "Written follow-up when needed",
      text: "Key notes, homework direction, or the next training focus can be sent after the session.",
    },
    {
      title: "Structured improvement",
      text: "Lessons should connect week to week instead of feeling like disconnected chess activities.",
    },
  ],
  pathSection: {
    eyebrow: "Ways to start",
    title: "Three clear lesson paths",
    intro: "These are three clear ways families can start lessons.",
  },
  pathCards: [
    {
      eyebrow: "Start here",
      title: "Starter Lesson",
      bullets: [
        "One private session to assess level, pace, and coach fit",
        "Best for families who want to meet the coach before choosing a longer rhythm",
        "A clean first step for students who are just entering structured training",
      ],
      meta: "Single-session inquiry",
      note: "Available now",
      cta: "Ask about starter lessons",
    },
    {
      eyebrow: "Core rhythm",
      title: "Weekly Coaching",
      bullets: [
        "A consistent weekly lesson slot with one coach and one training direction",
        "Better for students who improve through rhythm, accountability, and repetition",
        "Strong fit for families who want progress that builds month to month",
      ],
      meta: "Recurring private coaching",
      note: "Priority scheduling available",
      cta: "Ask about weekly coaching",
    },
      {
        eyebrow: "Competitive focus",
        title: "Focused Improvement Block",
        bullets: [
          "A short focused run of lessons built around recent games and recurring weaknesses",
          "Can center around game review, calculation, openings, and decision-making",
          "Best for players who want sharper preparation before the next training stretch",
        ],
        meta: "Pre-event coaching track",
        note: "Available on request",
        cta: "Ask about prep coaching",
    },
  ],
  fitCards: [
    {
      title: "Beginners who need real fundamentals",
      text: "Good fit for students still building board vision, notation, habits, and simple tactical awareness.",
    },
    {
      title: "Developing players who need game review",
      text: "Strong fit for students already playing serious games and needing clearer analysis, calculation, and decision-making habits.",
    },
    {
      title: "Families who want consistency",
      text: "One coach, one pace, and a lesson rhythm that actually builds over time instead of changing every week.",
    },
  ],
  fitSection: {
    eyebrow: "Who lessons fit",
    title: "Who usually gets the most value from this lesson format",
    intro: "The best lesson fit depends on level, pace, and how much structure the student needs week to week.",
  },
  processSteps: [
    {
      step: "01",
      title: "Tell us the student and format",
      text: "Send age, level, and whether you want private, group, online, or in-person lessons.",
    },
    {
      step: "02",
      title: "We point you to the best fit",
      text: "We will recommend the cleanest service for your student.",
    },
    {
      step: "03",
      title: "You get the next step",
      text: "We send the best available lesson option or update.",
    },
  ],
  highlightTitle: "What strong coaching should feel like",
  highlightBody:
    "Clear fit, real coaching, and a lesson plan that matches the student from the first session.",
  checklist: [
    "A coach who can explain moves clearly and keep the student active",
    "A lesson plan that matches the student level instead of generic chess busywork",
    "Real analysis after games, not only move-by-move correction",
    "A clean parent contact path before lessons begin",
  ],
  ctaTitle: "Tell us the student, level, and lesson format.",
  ctaText:
    "Send age, level, and whether you want private, group, online, or in-person lessons.",
};

export const lessonDetailPages = {
  "/lessons/online": {
    eyebrow: "Online Lessons",
    title: "Serious coaching, no commute required.",
    intro:
      "A clean remote lesson path for students who want consistency, game review, and a real training rhythm from home.",
    chips: ["Zoom-based", "NYC families", "Available now"],
    portraitCaption:
      "Remote lessons should still feel demanding, personal, and sharply structured from the first session.",
    asideTag: "Remote standard",
    asideTitle: "Online should still feel like real coaching",
    asideText:
      "The screen should never lower the standard. The right online setup keeps the pace clear, the student engaged, and the lesson specific.",
    asideFacts: [
      { label: "Best for", value: "Weekly rhythm" },
      { label: "Works well for", value: "Game review and calculation" },
      { label: "Status", value: "Available now" },
    ],
    cards: [
      {
        title: "Built for consistency",
        text: "Strong for families who want one clear lesson slot each week without travel getting in the way.",
      },
      {
        title: "Clean screen-sharing work",
        text: "Useful for reviewing games, solving positions live, and tracking thought process move by move.",
      },
      {
        title: "Better than random app time",
        text: "The student gets a coach, a pace, and a sequence instead of scattered puzzle volume.",
      },
    ],
    pathSection: {
      eyebrow: "Online formats",
      title: "Three strong ways online coaching can start",
      intro: "Simple choices, clear rhythm, and direct availability.",
    },
    pathCards: [
      {
        eyebrow: "Start here",
        title: "Starter Session",
        bullets: [
          "One remote lesson to assess level, pace, and coach fit",
          "Best for families who want to test the format before committing to a weekly slot",
          "A clean first step for students entering structured online work",
        ],
        meta: "Single online inquiry",
        note: "Available now",
        cta: "Ask about online starters",
      },
      {
        eyebrow: "Weekly rhythm",
        title: "Core Online Coaching",
        bullets: [
          "One coach, one weekly slot, and one clear training direction",
          "Strong fit for students who improve through repetition and follow-up work",
          "Built for game review, calculation, and consistent progress from home",
        ],
        meta: "Recurring online coaching",
        note: "Priority scheduling available",
        cta: "Ask about weekly online",
      },
      {
        eyebrow: "Focused block",
        title: "Game Review Intensive",
        bullets: [
          "Short run of lessons centered on recent games and recurring mistakes",
          "Useful for players who need clarity before the next training stretch",
          "Can sharpen openings, decision-making, and post-game understanding fast",
        ],
        meta: "Targeted online block",
        note: "Available on request",
        cta: "Ask about review blocks",
      },
    ],
    checklistTitle: "What online lessons should include",
    checklist: [
      "A coach who keeps the student active, not passive",
      "Structured follow-up work between sessions",
      "Real game review, not only generic exercises",
      "A weekly rhythm that families can actually keep",
    ],
    ctaTitle: "Ask about online lessons",
    ctaText: "If online coaching is the right fit, contact us now and we will reply with availability and the next step.",
    ctaLabel: "Contact about online lessons",
  },
  "/lessons/in-person": {
    eyebrow: "In Person Lessons",
    title: "Board work feels different in the room.",
    intro:
      "For students who focus better face to face, in-person coaching keeps the board, the pace, and the lesson energy sharper.",
    chips: ["NYC-based", "Face-to-face", "Available now"],
    portraitCaption:
      "Some students understand more quickly when the coach is right there at the board and the lesson pace can shift in real time.",
    asideTag: "In-person fit",
    asideTitle: "Direct coaching can change the pace fast",
    asideText:
      "For certain students, over-the-board instruction creates better focus, stronger habits, and more immediate course correction than a remote setup.",
    asideFacts: [
      { label: "Best for", value: "Board-first learners" },
      { label: "Works well for", value: "Habits and fundamentals" },
      { label: "Status", value: "Available now" },
    ],
    cards: [
      {
        title: "Clearer board habits",
        text: "Ideal for notation, piece coordination, calculation posture, and decision-making that needs direct correction.",
      },
      {
        title: "Better for younger students",
        text: "Some players stay more present and coachable when the lesson happens with the board right in front of them.",
      },
      {
        title: "Stronger live interaction",
        text: "The coach can slow down, press harder, or redirect faster depending on how the student is actually responding.",
      },
    ],
    pathSection: {
      eyebrow: "In-person formats",
      title: "Three clean ways to start over the board",
      intro: "Face-to-face coaching should feel direct, calm, and specific from day one.",
    },
    pathCards: [
      {
        eyebrow: "Start here",
        title: "Board Assessment",
        bullets: [
          "One in-person lesson to see how the student focuses, calculates, and responds live",
          "Best for families who want to evaluate coach fit before choosing a longer rhythm",
          "Useful first step for younger students and board-first learners",
        ],
        meta: "Single in-person inquiry",
        note: "Available now",
        cta: "Ask about board assessments",
      },
      {
        eyebrow: "Core rhythm",
        title: "Weekly Board Coaching",
        bullets: [
          "A fixed lesson slot with direct correction and stronger board habits",
          "Good for notation, discipline, calculation posture, and decision-making",
          "Best for students who learn faster with the coach in the room",
        ],
        meta: "Recurring in-person coaching",
        note: "Priority live scheduling available",
        cta: "Ask about weekly in-person",
      },
      {
        eyebrow: "Competitive focus",
        title: "Focused Improvement Block",
        bullets: [
          "Short focused run of lessons built around recent games and specific weaknesses",
          "Can center on game review, openings, calculation, and board habits",
          "Best for players who want sharper preparation and cleaner follow-up work",
        ],
        meta: "Pre-event in-person track",
        note: "Available on request",
        cta: "Ask about prep coaching",
      },
    ],
    checklistTitle: "What in-person coaching should feel like",
    checklist: [
      "Calm, focused instruction without wasted time",
      "More than casual play across the board",
      "Lesson pacing that matches the student's level",
      "A clear next step after each session",
    ],
    ctaTitle: "Ask about in-person lessons",
    ctaText: "If face-to-face coaching is the right fit, contact us now and we will share availability and the next step.",
    ctaLabel: "Contact about in-person lessons",
  },
  "/lessons/group": {
    eyebrow: "Group Lessons",
    title: "Small group training, not crowded filler.",
    intro:
      "The right group lesson creates pace, energy, and accountability without losing clarity.",
    chips: ["Small groups", "Better level matching", "Available now"],
    portraitCaption:
      "A good group lesson does not feel generic. It feels fast, focused, and matched to the students actually in the room.",
    asideTag: "Group standard",
    asideTitle: "Group lessons need better structure than most programs give them",
    asideText:
      "The students should be close enough in level for the lesson to move as one group, but varied enough for the room to stay alive.",
    asideFacts: [
      { label: "Best for", value: "Shared pace" },
      { label: "Works well for", value: "Peer energy and repetition" },
      { label: "Status", value: "Available now" },
    ],
    cards: [
      {
        title: "Smarter level grouping",
        text: "The lesson works better when students are grouped by readiness, not just by age or convenience.",
      },
      {
        title: "Built-in motivation",
        text: "Many students push harder when they can learn alongside peers without being lost in a large room.",
      },
      {
        title: "Good for ongoing rhythm",
        text: "A steady group can become a strong weekly training environment if the structure is right from the start.",
      },
    ],
    pathSection: {
      eyebrow: "Group formats",
      title: "Three ways group training can open well",
      intro: "The goal is not crowd size. The goal is pace, level fit, and repeatable energy.",
    },
    pathCards: [
      {
        eyebrow: "Start here",
        title: "Founding Group",
        bullets: [
          "Small first-release group used to set pace and level standards correctly",
          "Best for families who want to join the first clean version of the format",
          "Strong fit for students who like peer energy but still need structure",
        ],
        meta: "Early group interest",
        note: "Available now",
        cta: "Ask about founding groups",
      },
      {
        eyebrow: "Core rhythm",
        title: "Weekly Training Group",
        bullets: [
          "Consistent lesson time with students close enough in level to move together",
          "Works best when the room has a clear theme, not random activity blocks",
          "Great for repetition, confidence, and stronger weekly study habits",
        ],
        meta: "Recurring group coaching",
        note: "Priority access available",
        cta: "Ask about weekly groups",
      },
      {
        eyebrow: "Competitive focus",
        title: "Advanced Training Group",
        bullets: [
          "Short group block around deeper review and post-game discussion",
          "Can emphasize openings, calculation themes, and stronger game habits",
          "Best for players who benefit from training beside motivated peers",
        ],
        meta: "Event-focused group track",
        note: "Available on request",
        cta: "Ask about advanced groups",
      },
    ],
    checklistTitle: "What a strong group format needs",
    checklist: [
      "Students who are close enough in level to move together",
      "A coach who can keep the room active and clean",
      "Clear themes instead of random activity blocks",
      "A clear structure that protects quality before scale",
    ],
    ctaTitle: "Ask about group lessons",
    ctaText: "If small-group coaching is the right fit, contact us and we will share availability and next steps.",
    ctaLabel: "Contact about group lessons",
  },
  "/lessons/manage": {
    eyebrow: "Manage Your Lessons",
    title: "Lesson support starts here.",
    intro:
      "Use this page for lesson scheduling, questions, and next steps.",
    chips: ["Schedule help", "Lesson questions", "Direct support"],
    portraitCaption:
      "Fast lesson support for scheduling, questions, and next steps.",
    asideTag: "Lesson desk",
    asideTitle: "Simple support for families.",
    asideText:
      "Contact Us for lesson scheduling, coach questions, or help choosing the right next step.",
    asideFacts: [
      { label: "For", value: "Current and new families" },
      { label: "Best for", value: "Scheduling and support" },
      { label: "Reply", value: "Direct contact" },
    ],
    cards: [
      {
        title: "Scheduling",
        text: "Ask about lesson times, availability, or changes to an existing plan.",
      },
      {
        title: "Lesson fit",
        text: "Tell us the student's age, level, and goals so we can guide you to the right lesson setup.",
      },
      {
        title: "Next step",
        text: "Use this page when you want the fastest path to start or continue lessons.",
      },
    ],
    pathSection: null,
    pathCards: [],
    checklistTitle: "",
    checklist: [],
    ctaTitle: "Contact the lesson desk",
    ctaText: "Use the contact page or call/text us for scheduling help, lesson questions, or the next step.",
    ctaLabel: "Contact lesson support",
  },
};

export const registerPage = {
  eyebrow: "Registration",
  title: "Fill the form. Then pay.",
  intro: "Player details first. Secure checkout after.",
  draftNote: "This form saves a local draft on this device while you work.",
  sidebarNotes: [
    "Open section players need an active USCF ID.",
    "Beginner section players do not need a USCF membership.",
    "School name is optional and only used for team scoring.",
    "Use Contact if you want help before paying.",
  ],
};

export const sectionOptions = [
  {
    id: "open",
    title: "Open Section",
    badge: "Rated division",
    description: "For players ready for rated competition.",
    bullets: [
      "Active USCF membership required",
      "USCF ID must be included in registration",
      "Best fit for experienced scholastic competitors",
    ],
  },
  {
    id: "beginner",
    title: "Beginner Section",
    badge: "Unrated division",
    description: "For players newer to tournament chess.",
    bullets: [
      "No USCF membership required",
      "A friendlier entry point into tournament play",
      "Good fit for younger or less experienced players",
    ],
  },
];

export const serviceLevels = [
  {
    id: "entry",
    label: "Tournament Entry",
    description: "Standard tournament registration.",
    amount: 55,
  },
  {
    id: "entry-dojo",
    label: "Tournament Entry + Master Training Dojo",
    description: "Tournament entry plus coached work around the day.",
    amount: 155,
  },
];

export const masterTrainingDojo = {
  eyebrow: "Master Training Dojo",
  title: "Extra coaching around tournament day",
  summary: "A premium add-on for players who want more than the base event.",
  bullets: [
    "Review critical positions with coach guidance during the tournament day",
    "Turn the event into both a competition experience and a training block",
    "Give ambitious players more value than a standard entry alone",
  ],
  highlight: "Available as an add-on for players who want extra coaching around tournament day.",
};

export const upcomingTournaments = [
  {
    id: "first-release",
    dateLabel: "Current details",
    statusLabel: "Available now",
    timeLabel: "Saturday mornings",
    title: "First tournament date",
    meta: "Open & Beginner format already confirmed",
    summary: "Tournament details are available now. Families can reach out for the latest date and registration information.",
    availabilityLabel: "Contact for details",
    ctaLabel: "Get Details",
    path: "/contact",
  },
  {
    id: "contact-us",
    dateLabel: "Contact Us",
    statusLabel: "Direct support",
    timeLabel: "9:00 AM to lunch",
    title: "Tournament guidance",
    meta: "Direct help from the team",
    summary: "If you want help choosing the right section or understanding the format, contact the team now.",
    availabilityLabel: "Contact open now",
    ctaLabel: "Contact Team",
    path: "/contact",
  },
  {
    id: "format-confirmed",
    dateLabel: "What is locked in",
    statusLabel: "Format confirmed",
    timeLabel: "Open & Beginner",
    title: "Saturday tournament structure",
    meta: "Shorter family-friendly morning window",
    summary: "The core structure is already set: Open & Beginner divisions, 9 AM start, and a finish around lunch.",
    availabilityLabel: "Format live now",
    ctaLabel: "See Format",
    path: "/events/chess-and-truck-tournament",
  },
];

export const scheduleItems = [
  {
    title: "Expected arrival window",
    text: "Families should expect a clean early check-in before play begins.",
  },
  {
    title: "Planned round start",
    text: "The tournament morning is designed around a 9:00 AM start.",
  },
  {
    title: "Between-round support",
    text: "Dojo players can add coached work between rounds when the add-on is available.",
  },
  {
    title: "Planned wrap-up",
    text: "The goal is a serious morning that is done by lunch.",
  },
];

export const policyItems = [
  "Open section players will need an active USCF membership.",
  "Beginner section players will not need a USCF membership.",
  "The Saturday morning structure is already set before the dates go public.",
  "Families can use Contact Us now if they want the latest tournament details.",
  "Full registration and payment happen after the date and section are confirmed.",
];

export const faqItems = [
  {
    question: "What ages is camp for?",
    answer:
      "The proposed age range is 4 - 17. Final ages will be confirmed when registration opens.",
  },
  {
    question: "Is this good for beginners?",
    answer:
      "Yes. Camp is built for beginners as well as improving players who want stronger structure.",
  },
  {
    question: "Are students grouped by level?",
    answer:
      "That is the plan. Students will be grouped by level so the coaching, games, and activities feel right for the group.",
  },
  {
    question: "What is a typical camp day like?",
    answer:
      "The planned camp day runs from 9:00 AM to 3:00 PM with chess instruction, rated games, lunch, outdoor park time, and fun activities. The schedule is subject to change.",
  },
  {
    question: "What should my child bring?",
    answer:
      "Bring a water bottle, a snack if needed, and anything staff should know medically.",
  },
  {
    question: "Is prior experience required?",
    answer:
      "No. Beginners are welcome, and we can help point families to the right camp format.",
  },
  {
    question: "Is lunch included?",
    answer:
      "Lunch is not part of camp because the day ends at 12:00 PM. Send a snack if your child needs one.",
  },
  {
    question: "How do I register?",
    answer:
      "Use the booking section on the camp page to choose your option and continue to checkout.",
  },
  {
    question: "How do I contact the team?",
    answer:
      "Call, text, email, or use the contact form and we will get back to you.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "Include the student age, current level, and the question you want answered.",
  },
];

export const contactNumbers = [
  {
    label: "Primary Contact",
    display: "(646) 251-7087",
    href: "tel:+16462517087",
  },
  {
    label: "Alternate Contact",
    display: "(646) 494-5363",
    href: "tel:+16464945363",
  },
];

export const contactEmails = [
  {
    label: "General Inquiries",
    display: "info@chessandtruck.com",
    href: "mailto:info@chessandtruck.com",
  },
];

export const termsPage = {
  eyebrow: "Terms of Service",
  title: "Program terms for families and students",
  intro:
    "These terms explain how CHESS AND TRUCK handles camp inquiries, payments, cancellations, and participation expectations.",
  sections: [
    {
      title: "Inquiry accuracy",
      body:
        "Families are responsible for submitting accurate student, parent, contact, and any relevant medical information when making an inquiry or registering for a program.",
    },
    {
      title: "Payment and confirmation",
      body:
        "Any payment handled through the website is completed through Stripe. A program booking or payment is treated as confirmed only after Stripe confirms it successfully.",
    },
    {
      title: "Program fit",
      body:
        "Families should choose the most appropriate camp format before paying. CHESS AND TRUCK may contact a family if a selected option appears inconsistent with the student's level, age, or program fit.",
    },
    {
      title: "Cancellations and changes",
      body:
        "Requests to cancel or change a booking should be sent as early as possible. Approved changes depend on timing, program capacity, and operational feasibility.",
    },
    {
      title: "Program conduct",
      body:
        "Students, parents, and guests are expected to follow staff instructions, respect the learning environment, and support a safe, focused program experience.",
    },
    {
      title: "Contact",
      body:
        "Questions about program fit, payment, or terms may be sent through the Contact page before payment is made.",
    },
  ],
};

export const privacyPage = {
  eyebrow: "Privacy Policy",
  title: "How registration and contact information is used",
  intro:
    "CHESS AND TRUCK collects only the information needed to operate camp, communicate with families, and process secure payments.",
  sections: [
    {
      title: "Information collected",
      body:
        "The site may collect contact details, student information, parent and emergency contact information, and medical notes that are relevant to safety and communication.",
    },
    {
      title: "How information is used",
      body:
        "Registration and inquiry information is used for program operations, support, eligibility review, emergency readiness, and family communication. Contact form submissions are used to respond to questions and support needs.",
    },
    {
      title: "Payments",
      body:
        "Payments are processed securely through Stripe. CHESS AND TRUCK does not store full card information on the website.",
    },
    {
      title: "Limited sharing",
      body:
        "Information is shared only with service providers that help operate the registration and communication workflow, such as payment and email delivery services, and only for operational purposes.",
    },
    {
      title: "Retention and review",
      body:
        "Registration and contact records may be retained for program operations, support follow-up, and administration. Families can contact the team if they need help reviewing or correcting submitted information.",
    },
  ],
};
