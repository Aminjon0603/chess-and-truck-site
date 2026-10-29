import { PRIVACY_UPDATED, TERMS_UPDATED } from "./lib/legal.js";

export const siteBrand = {
  name: "Chess & Truck",
  short: "CT",
  city: "New York City",
  tagline: "Upcoming chess camps, tournaments, lessons, and after-school chess for kids in NYC",
  footerNote:
    "We're planning our first Chess & Truck summer camp in New York City. Dates and location will be posted when registration opens.",
  // Brand slogan and summary for the shared header and footer.
  slogan: "Big Moves Start Small.",
  brandNote:
    "Fun, friendly, and professional chess programs for kids in New York City. Lessons, camps, tournaments, and after-school programs.",
};

// Order follows the client's mockup. Contact Us is the separate header button.
export const navigationItems = [
  { label: "Home", path: "/" },
  {
    label: "Lessons",
    path: "/lessons/online",
    children: [
      { label: "Online Lessons", path: "/lessons/online", icon: "monitor" },
      { label: "In-Person Lessons", path: "/lessons/in-person", icon: "users" },
      { label: "Group Lessons", path: "/lessons/group", icon: "users" },
    ],
  },
  { label: "Camps", path: "/camps" },
  { label: "Tournaments", path: "/tournaments" },
  { label: "After-School", path: "/after-school" },
  { label: "Our Team", path: "/our-team" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
];

// Owner-confirmed facts are stated plainly (future tense for programs that have
// not launched). Planned details are labelled as plans. Undecided details say
// they will be announced.
export const academyHomePage = {
  hero: {
    eyebrow: "Chess & Truck",
    titleLead: "Big Smiles.",
    titleAccent: "Brilliant Moves.",
    tagline: "The greatest game in the world without a ball!",
    // The client's latest hero mockup: this line replaces the longer paragraph.
    intro: "Fun, friendship, and real chess improvement — guaranteed.",
    facts: [
      { icon: "users", text: "Beginners welcome" },
      { icon: "pin", text: "Based in NYC" },
    ],
  },
  programsSection: {
    eyebrow: "Programs",
    title: "Our four programs",
    intro: "Four exciting ways to discover chess, make friends, and grow as a player!",
  },
  whySection: {
    eyebrow: "How we teach",
    title: "Fun First.",
    titleAccent: "Strong Players Follow.",
    intro:
      "We believe kids improve fastest when they love what they're learning. That's why every lesson combines expert coaching, exciting challenges, and plenty of fun. Our goal is to help each child become a stronger player, a more confident thinker, and a lifelong fan of chess.",
    pillars: [
      {
        icon: "smile",
        title: "Fun Is Our First Move",
        text: "Every lesson is engaging, interactive, and something kids look forward to.",
      },
      {
        // The mockup's "Improvement Is Our Promise" is replaced: no guaranteed results.
        icon: "barChart",
        title: "Steady Improvement",
        text: "Structured coaching helps every child make real progress, at their own pace.",
      },
      {
        icon: "users",
        title: "Confidence Beyond the Board",
        text: "Kids develop focus, resilience, friendships, and a love of learning.",
      },
    ],
  },
  coachSection: {
    eyebrow: "Your coach",
    title: "Coach Andrea",
    intro: "Experienced. Passionate. Great with Kids.",
    role: "Coach",
    // The mockup's unconfirmed "thousands of children" is left out.
    summary:
      "Andrea has been teaching chess for 24 years in the United States and Canada. He has worked with children through chess camps, private lessons, school programs, and after-school clubs.",
    facts: [
      { icon: "cap", value: "24 years", label: "teaching chess" },
      { icon: "users", value: "U.S. & Canada", label: "where he's taught" },
      { icon: "heart", value: "Loves working with kids", label: "fun and supportive teaching style" },
      { icon: "chartUp", value: "Helps all levels", label: "from complete beginners to advanced players" },
    ],
  },
  howSection: {
    eyebrow: "Getting started",
    title: "How to get started",
    intro: "It's easy to join Chess & Truck!",
    steps: [
      {
        icon: "monitor",
        title: "Pick a program",
        text: "Explore our camps, tournaments, lessons, or after-school programs and find the best fit for your child.",
      },
      {
        icon: "chat",
        title: "Tell us about your child",
        text: "Share a few details about your child's age, experience, and goals. We're happy to recommend the right program and answer any questions.",
      },
      {
        // The mockup's "Spots can fill up quickly!" is left out.
        icon: "document",
        title: "Sign up when it opens",
        text: "Online private lessons are open now. For our other programs, dates, prices, and registration links will be posted on each program page when registration opens.",
      },
    ],
  },
  faqSection: {
    eyebrow: "Questions",
    title: "Common questions",
    intro: "Everything you need to know about Chess & Truck.",
    items: [
      {
        question: "Is this OK for beginners?",
        answer:
          "Yes. Online private lessons are open to complete beginners as well as experienced players. Tell us your child's age and level, and we'll help you find the right program.",
      },
      {
        question: "Who is the coach?",
        answer:
          "Online private lessons are taught by Coach Andrea, a FIDE Master with 24 years of experience teaching chess, and Coach Amir, also a FIDE Master. You can read about both on our Our Team page. We'll share who coaches our other programs when their registration opens.",
      },
      {
        question: "When does registration open?",
        answer:
          "Online private lessons are open now: you can buy a lesson package on the Online Lessons page. Camps, tournaments, after-school chess, and in-person and group lessons aren't open yet. Until a program page says registration is open, we aren't taking sign-ups or payments for it.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Online private lessons are $150 for one 60-minute lesson, $675 for 5 lessons, or $1,200 for 10 lessons, paid online through Stripe, a secure payment service. Prices for our other programs will be announced on each program page.",
      },
      {
        question: "What should my child bring?",
        answer:
          "It depends on the program. For online lessons, our team will tell you what you need when they contact you by email to arrange the lessons. Other program pages will list what to bring when registration opens.",
      },
      {
        question: "Where are the programs located?",
        answer:
          "Online private lessons take place online, from home. Our other programs will be in New York City. We haven't announced specific locations yet; each program page will list its location before registration opens.",
      },
    ],
  },
  contactCard: {
    title: "Have a question?",
    text: "Call, text, or email. We're happy to help you find the right program for your child.",
  },
};

// Redesigned inner pages (camps, tournaments, private lessons).
// Planned details are labelled as planned. The camp schedule is a sample, not a commitment.
export const campsPageContent = {
  hero: {
    eyebrow: "Chess Camps",
    title: "Our first summer chess camp",
    intro:
      "We're planning our first summer camp: full days of chess lessons, games, and time outside, with staff supervising kids all day. We'll post the dates, location, and price here when registration opens.",
  },
  glance: [
    { label: "Location", value: "Not announced yet" },
    { label: "Camp day", value: "9:00 AM - 3:00 PM (planned)" },
    { label: "Ages", value: "4 - 17 (planned, not final)" },
    { label: "Dates", value: "Not announced yet" },
  ],
  daySection: {
    eyebrow: "Planned schedule",
    title: "Sample Daily Schedule — Subject to Change",
    intro: "This is a sample day for our first camp. Times and activities may change before camp starts.",
  },
  learnSection: {
    eyebrow: "What kids will learn",
    title: "What we'll teach at camp",
  },
  faqSection: {
    eyebrow: "Camp questions",
    title: "Questions parents ask about camp",
  },
  faqs: [
    {
      question: "Will kids be supervised?",
      answer: "Yes. Staff will supervise kids the whole day, including lunch and breaks.",
    },
    {
      question: "What ages is camp for?",
      answer:
        "We're planning for ages 4 to 17, but that isn't final. The age range will be announced when registration opens.",
    },
    {
      question: "Is camp OK for beginners?",
      answer:
        "We plan to start each day with warm-up games, so coaches can see every child's level and put kids in groups. Who camp is for will be confirmed when registration opens.",
    },
    {
      question: "Will lunch be provided?",
      answer:
        "We haven't decided yet. We'll tell you whether lunch is provided or should be packed from home when registration opens.",
    },
    {
      question: "Will camp games be US Chess rated?",
      answer:
        "We're planning for some camp games to be official US Chess rated games, but that isn't final yet.",
    },
    {
      question: "Who will teach at camp?",
      answer:
        "We'll share the coaching staff when registration opens. You can read about Andrea on the About page.",
    },
  ],
  status: {
    title: "Camp registration is opening soon",
    text: "We're not taking camp sign-ups or payments yet. The dates, location, and price will be posted here first.",
  },
};

export const tournamentsPageContent = {
  hero: {
    eyebrow: "Chess Tournaments",
    title: "Chess tournaments for NYC kids",
    intro:
      "We're planning official US Chess rated tournaments for kids, with players grouped into sections by rating or playing level. Dates, location, and entry fees haven't been set.",
  },
  plannedFormat: [
    { label: "Rated", value: "US Chess rated" },
    { label: "Sections", value: "By rating or playing level" },
    { label: "Day and time", value: "Saturdays, 9:00 AM (planned)" },
    { label: "Venue", value: "Not announced yet" },
  ],
  sectionsSection: {
    eyebrow: "What's confirmed",
    title: "Rated play, grouped by level",
    intro: "No tournament has been scheduled yet, but every Chess & Truck tournament will have these two things.",
  },
  sectionCards: [
    {
      id: "rated",
      badge: "US Chess rated",
      title: "Official rated games",
      description:
        "US Chess is the national chess organization. In a rated game, the result counts toward your child's official rating, a number that shows playing strength.",
      bullets: [
        "Rated play usually requires a current US Chess membership",
        "We'll explain how to join when registration opens",
        "No event has been scheduled or sanctioned yet",
      ],
    },
    {
      id: "sections",
      badge: "Sections by level",
      title: "Kids play others near their level",
      description: "Players will be grouped into sections by rating or playing level.",
      bullets: [
        "Exact sections will be announced",
        "Rating cutoffs will be announced",
        "Format and number of rounds will be announced",
      ],
    },
  ],
  morningSection: {
    eyebrow: "Tournament morning",
    title: "What a tournament morning might look like",
  },
  morning: [
    {
      time: "8:30 AM",
      title: "Check-in (planned)",
      text: "Arrive, check in, and find your child's section. Times aren't final.",
    },
    {
      time: "9:00 AM",
      title: "First round (planned)",
      text: "Games are planned to start at 9:00 AM on Saturdays.",
    },
    {
      time: "After play",
      title: "Prizes (planned)",
      text: "We're planning trophies, medals, or other prizes. Details aren't final.",
    },
  ],
  registrationSection: {
    eyebrow: "Registration",
    title: "How registration will work",
    intro: "Registration isn't open yet. When it opens, you'll sign up right here in three steps.",
  },
  registrationSteps: [
    {
      title: "Pick a section",
      text: "Sections will be based on rating or playing level. You may need your child's US Chess ID.",
    },
    {
      title: "Fill out the form",
      text: "Enter the player's details, a parent or guardian, and an emergency contact.",
    },
    {
      title: "Pay online",
      text: "Pay the entry fee by card through Stripe. Entry fees will be announced.",
    },
  ],
  faqSection: {
    eyebrow: "Tournament questions",
    title: "Questions about tournaments",
  },
  faqs: [
    {
      question: "What does \"US Chess rated\" mean?",
      answer:
        "US Chess is the national chess organization. When a game is rated, the result counts toward your child's official rating, a number that shows how strong a player is. It goes up or down after each rated game.",
    },
    {
      question: "Does my child need a US Chess membership?",
      answer:
        "Most likely, yes. Rated play usually requires a current US Chess membership. We'll explain what's needed and how to sign up when registration opens.",
    },
    {
      question: "When is the first tournament?",
      answer: "We haven't set a date yet. It will be posted on this page when registration opens.",
    },
    {
      question: "Where will tournaments be held?",
      answer: "We're looking at a possible venue, but nothing is final. We'll post the location with the dates.",
    },
    {
      question: "Will there be prizes?",
      answer: "We're planning trophies, medals, or other prizes, but the details aren't final.",
    },
  ],
  status: {
    title: "Tournament registration is opening soon",
    text: "We're not taking tournament sign-ups or payments yet. The dates, venue, and entry fee will be posted here first.",
  },
};

export const lessonsPageContent = {
  hero: {
    eyebrow: "Private Chess Lessons",
    title: "Chess lessons at your child's pace",
    intro:
      "Lessons will be offered in person and online, for beginners and experienced players. In a private lesson, the coach will work with just your child: play a game, go over it together, and practice what came up.",
  },
  includesTitle: "Every lesson will include",
  includes: [
    { title: "A real game", text: "The coach sees how your child thinks during a game, not just on puzzles." },
    { title: "A review", text: "They go over the key moves together and talk about what to change." },
    { title: "Something to work on", text: "When it helps, your child leaves with notes or practice for next time." },
  ],
  sessionSection: {
    eyebrow: "How a lesson works",
    title: "Play, review, practice",
    intro: "Most lessons will have three parts. The mix depends on your child.",
  },
  session: [
    {
      title: "Play",
      text: "A practice game. Once your child is ready, games are played with a chess clock.",
    },
    {
      title: "Review",
      text: "Coach and student look at the key moments and talk through better moves.",
    },
    {
      title: "Practice",
      text: "Exercises on whatever came up in the game, from tactics to endgames.",
    },
  ],
  formatsSection: {
    eyebrow: "Formats",
    title: "In person or online",
    intro: "Both formats are confirmed. Locations, lesson lengths, and times will be announced.",
  },
  fitSection: {
    eyebrow: "Who it's for",
    title: "Lessons will work for",
  },
  fit: [
    {
      title: "Beginners",
      text: "Kids learning the basics: how the pieces work together, writing down moves, and simple tactics.",
    },
    {
      title: "Experienced players",
      text: "Players who want help going over their games and making better decisions.",
    },
    {
      title: "Your family's schedule",
      text: "Online and in-person options, with more than one lesson length. Times will be announced.",
    },
  ],
  stepsSection: {
    eyebrow: "Getting started",
    title: "How to start",
  },
  steps: [
    {
      title: "Tell us about your child",
      text: "Their age, their level, and whether you'd prefer lessons in person or online.",
    },
    {
      title: "We'll suggest a format",
      text: "Based on what you tell us, we'll recommend the setup that makes the most sense.",
    },
    {
      title: "Book when lessons open",
      text: "Lesson lengths, times, and prices will be posted on this page.",
    },
  ],
  status: {
    title: "Lesson registration is opening soon",
    text: "We're not booking lessons or taking payments yet. Lesson options and prices will be posted here first.",
  },
};

export const afterSchoolPageContent = {
  hero: {
    eyebrow: "After-School Programs",
    title: "After-school chess for NYC kids",
    intro:
      "We're talking with schools about after-school chess programs. No school agreement is final yet. Where classes will meet, which grades they're for, the schedule, and the price will be announced.",
  },
  glance: [
    { label: "Status", value: "Talking with schools" },
    { label: "Ages and grades", value: "Will be announced" },
    { label: "Schedule", value: "Not set yet" },
    { label: "Locations", value: "Not set yet" },
  ],
  audienceSection: {
    eyebrow: "Who it's for",
    title: "For parents and for schools",
  },
  audiences: [
    {
      id: "parents",
      tag: "For parents",
      title: "Chess after school",
      points: [
        "Chess classes after school, in a group with other kids",
        "Which schools, grades, and times will be announced",
        "The price will be posted here when registration opens",
      ],
      cta: "Ask a question",
    },
    {
      id: "schools",
      tag: "For schools",
      title: "Want chess at your school?",
      points: [
        "We're already talking with some schools, and we'd like to hear from yours",
        "Tell us about your students, your space, and which days work",
        "We'd agree on the format and terms with your school before anything is scheduled",
      ],
      cta: "Contact us",
    },
  ],
  benefitsSection: {
    eyebrow: "Why chess after school",
    title: "What kids practice in chess",
    intro: "Every child is different, but chess gives kids regular practice with these skills.",
  },
  benefits: [
    { title: "Focus and patience", text: "Thinking a move through before playing it." },
    { title: "Planning", text: "Setting a goal on the board and working toward it." },
    { title: "Learning from mistakes", text: "Looking back at a game to see what to change next time." },
    { title: "Good sportsmanship", text: "Winning and losing well." },
  ],
  sessionSection: {
    eyebrow: "A possible class",
    title: "What a class might look like",
    intro: "This is a rough idea, not a final plan. The format may be different at each school.",
  },
  session: [
    { time: "Start", title: "Short lesson", text: "One new idea, shown on a demo board." },
    { time: "Middle", title: "Games", text: "Kids play each other and try the idea, with a coach watching." },
    { time: "End", title: "Wrap-up", text: "A quick look at a few key moments before pick-up." },
  ],
  faqSection: {
    eyebrow: "After-school questions",
    title: "Questions about after-school chess",
  },
  faqs: [
    {
      question: "Is this offered at my child's school?",
      answer:
        "Not yet. We're talking with schools, but no agreement is final. If your school might be interested, please get in touch.",
    },
    {
      question: "When and where will classes meet?",
      answer: "That hasn't been decided. It will be posted on this page when registration opens.",
    },
    {
      question: "What ages or grades is it for?",
      answer: "We haven't set that yet. Ages and grades will be announced with each program.",
    },
  ],
  status: {
    title: "After-school registration is opening soon",
    text: "We're not taking after-school sign-ups or payments yet. Schedules, locations, and prices will be posted here first.",
  },
};

// Program names, summaries, and page content. Registration status lives in
// src/lib/programs.js so it can be shared with the checkout API.
export const programOverview = {
  eyebrow: "Our programs",
  title: "Our four programs",
  intro:
    "Camps, tournaments, lessons, and after-school chess. Here's what each one is and where registration stands.",
};

export const programs = [
  {
    id: "camps",
    iconKey: "camps",
    name: "Chess Camps",
    path: "/camps",
    summary:
      "We're planning our first summer camp: full days of chess lessons, games, and time outside.",
    // Homepage card text from the client's mockup; other pages keep summary.
    homeSummary: "Fun-filled camps with chess lessons, games, tournaments, and time outside.",
  },
  {
    id: "tournaments",
    iconKey: "tournaments",
    name: "Chess Tournaments",
    path: "/tournaments",
    registrationPath: "/register",
    summary:
      "US Chess rated tournaments for kids, with players grouped by rating or playing level. No dates yet.",
  },
  {
    id: "lessons",
    iconKey: "lessons",
    name: "Private Chess Lessons",
    path: "/lessons/online",
    // Online private lessons are on sale, so this card shows their status.
    statusProgramId: "onlineLessons",
    openLabel: "Online Lessons Open",
    summary:
      "Individual or online lessons for beginners and experienced players.",
  },
  {
    id: "afterSchool",
    iconKey: "afterSchool",
    name: "After-School Programs",
    path: "/after-school",
    summary:
      "We're talking with schools about after-school chess classes. Nothing is final yet.",
    homeSummary: "Weekly chess classes at schools across NYC. No details yet.",
  },
];

export const programPages = {
  tournaments: {
    eyebrow: "Chess Tournaments",
    title: "NYC scholastic chess tournaments.",
    intro:
      "We are preparing scholastic tournaments for school-age players. No tournament dates have been announced yet. The details below describe the planned format and may change before registration opens.",
    heroFacts: [
      { label: "Planned location", value: "Venue to be announced" },
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
    title: "Chess & Truck | Chess Programs for Kids in NYC",
    description:
      "Chess camps, tournaments, private lessons, and after-school chess for kids in New York City. Online private lessons are open now.",
  },
  "/about": {
    title: "About | Chess & Truck",
    description:
      "Meet Chess & Truck, a chess program for kids in New York City, and coach Andrea.",
  },
  "/camps": {
    title: "Chess Camps | Chess & Truck",
    description:
      "Our first summer chess camp in New York City: a sample daily schedule, what kids will learn, and when registration opens.",
  },
  "/camps/book": {
    title: "Chess Camps | Chess & Truck",
    description:
    "Our first summer chess camp in New York City. Camp registration is opening soon.",
  },
  "/camps/confirmed": {
    title: "Camp Confirmation | Chess & Truck",
    description:
      "Your Chess & Truck camp payment confirmation.",
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
      "Private chess lessons for kids in NYC, in person or online, for beginners and experienced players. Registration opens soon.",
  },
  "/lessons/online": {
    title: "Online Private Chess Lessons | Chess & Truck",
    description:
      "Personalized one-on-one online chess lessons for kids, from beginners to tournament players. Private 60-minute lessons, single or in packages.",
  },
  "/lessons/online/checkout": {
    title: "Checkout | Online Private Chess Lessons | Chess & Truck",
    description: "Choose your online private lesson package and tell us about your child.",
  },
  "/our-team": {
    title: "Our Team | Chess & Truck",
    description: "Meet the Chess & Truck coaches, Coach Amir and Coach Andrea.",
  },
  "/our-team/amir": {
    title: "Coach Amir | Chess & Truck",
    description: "Coach Amir, FIDE Master, coaches online private chess lessons for Chess & Truck.",
  },
  "/our-team/andrea": {
    title: "Coach Andrea | Chess & Truck",
    description: "Coach Andrea, FIDE Master, has 24 years of experience teaching chess in the United States and Canada.",
  },
  "/lessons/online/thank-you": {
    title: "Thank You | Online Private Chess Lessons | Chess & Truck",
    description: "Your online private chess lesson purchase.",
  },
  "/lessons/in-person": {
    title: "In-Person Lessons | Chess & Truck",
    description:
      "In-person chess lessons from Chess & Truck. Registration is opening soon.",
  },
  "/lessons/group": {
    title: "Group Lessons | Chess & Truck",
    description:
      "Group chess lessons from Chess & Truck. Registration is opening soon.",
  },
  "/lessons/manage": {
    title: "Manage Lessons | Chess & Truck",
    description:
      "Lesson support for current and incoming families who need scheduling help, coaching guidance, or next-step coordination.",
  },
  "/faq": {
    title: "FAQ | Chess & Truck",
    description:
      "Answers to common parent questions about Chess & Truck camps, tournaments, lessons, and after-school chess in NYC.",
  },
  "/contact": {
    title: "Contact | Chess & Truck",
    description:
      "Call, text, or email Chess & Truck with questions about any of our chess programs for kids in NYC.",
  },
  "/register": {
    title: "Tournament Registration | Chess & Truck",
    description:
      "Tournament registration for Chess & Truck. Registration is opening soon.",
  },
  "/tournaments": {
    title: "Chess Tournaments | Chess & Truck",
    description:
      "US Chess rated chess tournaments for kids in NYC, with players grouped by rating or playing level. Registration is opening soon.",
  },
  "/after-school": {
    title: "After-School Programs | Chess & Truck",
    description:
      "After-school chess programs for kids in NYC. We're talking with schools; details will be announced. Registration is opening soon.",
  },
  "/interest/confirm": {
    title: "Confirm your email | Chess & Truck",
    description: "Confirm that you'd like an email when Chess & Truck registration opens.",
  },
  "/interest/unsubscribe": {
    title: "Unsubscribe | Chess & Truck",
    description: "Stop emails about a Chess & Truck program.",
  },
  "/terms": {
    title: "Terms of Service | Chess & Truck",
    description:
      "Chess & Truck terms for registration, payments, cancellations, and program conduct.",
  },
  "/privacy": {
    title: "Privacy Policy | Chess & Truck",
    description:
      "How Chess & Truck collects, uses, and protects family and payment information.",
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
  title: "Summer chess camp, coming soon.",
    intro: "Our first summer chess camp is in preparation. Location and dates will be announced.",
  heroFacts: [
    { label: "Dates", value: "Coming soon" },
    { label: "Location", value: "To be announced" },
    { label: "Age range", value: "Will be announced" },
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
  title: "Summer chess camp",
  intro: "",
  chips: [],
  heroFacts: [
    { label: "Dates", value: "Coming soon" },
    { label: "Location", value: "To be announced" },
    { label: "Levels", value: "Beginner through Advanced" },
    { label: "Age range", value: "Will be announced" },
  ],
  portraitCaption: "Simple camp booking with real chess structure.",
  asideTag: "Opening soon",
  asideTitle: "Program Overview",
  asideText:
      "A planned full-day program with chess lessons, practice games, a lunch break, and outdoor time.",
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
    { title: "Location", text: "To be announced" },
    { title: "Dates", text: "Next season's dates coming soon" },
    { title: "Time", text: "9:00 AM - 3:00 PM" },
    { title: "Age range", text: "Will be announced" },
    { title: "Practice games", text: "Played during camp sessions" },
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
      defaultSchedulePreference: "",
      scheduleText: "9:00 AM - 3:00 PM",
      details: [
        "Daily chess instruction",
        "Practice games, lunch break, and outdoor time",
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
      defaultSchedulePreference: "",
      scheduleText: "9:00 AM - 3:00 PM",
      details: [
        "Chess instruction",
        "Practice games and structured play",
        "Lunch break, outdoor time, and fun activities",
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
      defaultSchedulePreference: "",
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
          defaultSchedulePreference: "",
          campTime: "9:00 AM - 12:00 PM",
          label: "ENROLL AM",
        },
        {
          optionId: "half-day-pm",
          title: "Half Day PM",
          switcherTitle: "Half Day PM",
          scheduleText: "12:00 PM - 3:00 PM",
          price: "$95 per half day",
          defaultSchedulePreference: "",
          campTime: "12:00 PM - 3:00 PM",
          label: "ENROLL PM",
        },
      ],
    },
  ],
  // Camp days now come only from approved launch sessions.
  bookingSchedule: [],
  mapSection: {
    eyebrow: "Camp location",
    title: "Location",
  intro: "Location to be announced.",
    address: "Location to be announced",
    directionsLabel: "Open in Google Maps",
    directionsHref: "",
    embedSrc: "",
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
      text: "Kids arrive and start with warm-up games while coaches see each child's level and form groups.",
    },
    {
      time: "10:00 - 11:00 AM",
      title: "Outdoor time",
      text: "Soccer, playground time, tag, and other organized outdoor games. We may visit Central Park, but that isn't final.",
    },
    {
      time: "11:00 AM - 12:00 PM",
      title: "Chess lessons and organized activities",
      text: "Puzzles, simuls (one coach playing many kids at once), fast games, and other structured chess activities.",
    },
    {
      time: "12:00 - 1:00 PM",
      title: "Lunch break and social time",
      text: "Time to eat, rest, and talk with friends, with staff supervising. Lunch details will be announced.",
    },
    {
      time: "1:00 - 2:30 PM",
      title: "Chess lessons, practice games, and analysis",
      text: "A lesson, practice games, going over games as a group, and an ice cream break. We're planning for some games to be US Chess rated, but that isn't final.",
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
    { title: "Tactics", text: "Spotting forks, pins, and quick wins." },
    { title: "Openings", text: "Starting a game with a good plan." },
    { title: "Strategy", text: "Making a plan and using every piece." },
    { title: "Endgames", text: "Winning when only a few pieces are left." },
    { title: "Tournament habits", text: "Using a chess clock and staying focused." },
    { title: "Thinking it through", text: "Slowing down before each move." },
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
      answer: "Who camp is for will be confirmed when registration opens. We plan to group kids by level.",
    },
    {
      question: "Who leads instruction?",
      answer: "Coaching details for the camp will be shared when registration opens. You can read about Andrea, our featured coach, on the About page.",
    },
    {
      question: "What should students bring?",
      answer: "A packing list will be posted with registration. Whether lunch is provided hasn't been decided yet.",
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
    chips: ["Daily rhythm", "Summer camp", "Outdoor time"],
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

// About page: owner-confirmed facts only. Chess & Truck has not run its own
// camps or tournaments yet. Online private lessons are on sale; the rest are upcoming.
export const aboutPage = {
  hero: {
    eyebrow: "About us",
    title: "About Chess & Truck",
    intro:
      "Chess & Truck is a new chess program for kids in New York City. Our coach, Andrea, has 24 years of experience teaching chess.",
  },
  facts: [
    { label: "Based in", value: "New York City" },
    { label: "Programs", value: "Four, online lessons open now" },
    { label: "Coach", value: "Andrea, 24 years teaching chess" },
    { label: "Registration", value: "Online lessons open" },
  ],
  whoSection: {
    eyebrow: "Who we are",
    title: "A new chess program for NYC kids",
    intro:
      "We're launching camps, tournaments, lessons, and after-school chess. Online private lessons are open now, and we'll share the details of each other program before its registration opens.",
  },
  whoPoints: [
    {
      title: "Real chess, explained clearly",
      text: "Kids will play real games, then go over them with a coach to see what worked and what to change.",
    },
    {
      title: "Details before sign-up",
      text: "Each program page lists the price and details before we take any registrations or payments.",
    },
    {
      title: "Easy to reach",
      text: "You can call, text, or email the people who run Chess & Truck with any question.",
    },
  ],
  programsSection: {
    eyebrow: "Our programs",
    title: "Our four chess programs",
    intro: "Online private lessons are open now. The other programs aren't open for registration yet; each page shows what's confirmed and what's still being planned.",
  },
  coach: {
    eyebrow: "Your coach",
    title: "Coach Andrea",
    role: "Coach",
    bio: "Andrea has taught chess for 24 years in the United States and Canada. He has taught at children's chess camps, given private lessons, and taught in after-school chess programs.",
    facts: [
      { value: "24 years", label: "teaching chess" },
      { value: "U.S. & Canada", label: "where he's taught" },
      { value: "Camps, lessons, after-school", label: "teaching experience" },
    ],
  },
  contact: {
    title: "Have a question?",
    text: "Call, text, or email. We're happy to help you figure out which program fits your child.",
  },
};

export const eventsPage = {
  eyebrow: "Events & Tournaments",
  title: "NYC scholastic tournaments with a clear Saturday service.",
  intro:
    "Open and Beginner sections, a 9:00 AM start, and a morning schedule that wraps by lunch. Families can review the structure now and contact us for current tournament details.",
  heroFacts: [
    { label: "Location", value: "Venue to be announced" },
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
    { title: "Location", text: "Venue to be announced" },
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
    { label: "Location", value: "Venue to be announced" },
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

// FAQ page: owner-confirmed facts, with plans labeled as plans.
export const faqPage = {
  hero: {
    eyebrow: "FAQ",
    title: "Questions parents ask",
    intro:
      "Straight answers about our four programs. When something hasn't been decided yet, we say so.",
  },
  contact: {
    title: "Still have a question?",
    text: "Call, text, or email. Your message comes straight to us, and we'll reply by email or phone.",
  },
  categories: [
    {
      id: "faq-registration",
      title: "Registration and cost",
      items: [
        {
          question: "Is registration open?",
          answer:
            "For online private lessons, yes: you can buy a lesson package on the Online Lessons page. Camps, tournaments, after-school chess, and in-person and group lessons aren't open yet, and we aren't taking sign-ups or payments for them. Each program page will say when its registration opens.",
        },
        {
          question: "When will programs begin?",
          answer:
            "Online private lessons start after you buy a package: our team contacts you by email to arrange the schedule. We haven't set start dates for our other programs yet. Dates will be posted on each program page before registration opens.",
        },
        {
          question: "How much do programs cost?",
          answer:
            "Online private lessons are $150 for one 60-minute lesson, $675 for 5 lessons, or $1,200 for 10 lessons, paid online through Stripe, a secure payment service. Prices for our other programs will be announced on each program page.",
        },
      ],
    },
    {
      id: "faq-ages",
      title: "Ages and experience",
      items: [
        {
          question: "What ages can participate?",
          answer:
            "It depends on the program, and nothing is final yet. Camp is planned for ages 4 to 17. Ages for after-school classes, lessons, and tournaments will be announced.",
        },
        {
          question: "Are beginners welcome?",
          answer:
            "Yes. Online private lessons are open to everyone from complete beginners to advanced tournament players. For our other programs, we'll say who each one is for when registration opens. Tell us your child's level, and we'll suggest where to start.",
        },
      ],
    },
    {
      id: "faq-locations",
      title: "Locations and formats",
      items: [
        {
          question: "Where will programs take place?",
          answer:
            "In New York City. We haven't announced specific locations yet. For tournaments, we're looking at a possible venue, but nothing is final. For after-school chess, we're talking with schools, but no agreement is final.",
        },
        {
          question: "Are private lessons online or in person?",
          answer:
            "Online private lessons are open now: one-on-one, 60 minutes each. In-person and group lessons are coming; their locations, schedules, and prices will be announced.",
        },
      ],
    },
    {
      id: "faq-camps",
      title: "Chess camps",
      items: [
        {
          question: "Is the chess camp supervised?",
          answer: "Yes. Staff will supervise kids the whole day, including lunch and breaks.",
        },
        {
          question: "Is lunch included?",
          answer:
            "We haven't decided yet. We'll tell you whether lunch is provided or should be packed from home when registration opens.",
        },
        {
          question: "What will a camp day look like?",
          answer:
            "We're planning full days of chess lessons, games, outdoor time, and an ice cream break, from about 9:00 AM to 3:00 PM. The times aren't final. A sample daily schedule is on the Camps page.",
        },
      ],
    },
    {
      id: "faq-tournaments",
      title: "Tournaments",
      items: [
        {
          question: "Are tournaments US Chess rated?",
          answer:
            "Yes. Our tournaments will be official US Chess rated events, with players grouped by rating or playing level. No tournament has been scheduled yet. Rated play usually requires a current US Chess membership, and we'll explain how to join when registration opens.",
        },
        {
          question: "Will there be prizes?",
          answer: "We're planning trophies, medals, or other prizes, but the details aren't final.",
        },
      ],
    },
    {
      id: "faq-after-school",
      title: "After-school",
      items: [
        {
          question: "Is after-school chess offered at my child's school?",
          answer:
            "Not yet. We're talking with schools, but no agreement is final. If your school might be interested, please get in touch.",
        },
      ],
    },
    {
      id: "faq-contact",
      title: "Contact",
      items: [
        {
          question: "How can I contact Chess & Truck?",
          answer:
            "Call or text (646) 251-7087 or (646) 494-5363, email info@chessandtruck.com, or use the form on our Contact page. We'll reply by email or phone.",
        },
        {
          question: "Who is the coach?",
          answer:
            "Online private lessons are taught by Coach Andrea, a FIDE Master with 24 years of experience teaching chess, and Coach Amir, also a FIDE Master. You can read about both on our Our Team page. We'll share who coaches our other programs when their registration opens.",
        },
      ],
    },
  ],
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Contact us",
  intro: "Questions about a program, your child's level, or timing? Call, text, email, or send a message below.",
  heroFacts: [],
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
      eyebrow: "Online",
      title: "Online lessons",
      text: "Lessons over video, with the same game review.",
    },
    {
      eyebrow: "In person",
      title: "In-person lessons",
      text: "At a real board, for kids who focus better face to face. Locations will be announced.",
    },
    {
      eyebrow: "Lesson length",
      title: "More than one length",
      text: "Several lesson lengths will be offered. The exact options will be announced.",
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
      note: "Opening soon",
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
      note: "Opening soon",
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
        note: "Opening soon",
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
    chips: ["Zoom-based", "NYC families", "Opening soon"],
    portraitCaption:
      "Remote lessons should still feel demanding, personal, and sharply structured from the first session.",
    asideTag: "Remote standard",
    asideTitle: "Online should still feel like real coaching",
    asideText:
      "The screen should never lower the standard. The right online setup keeps the pace clear, the student engaged, and the lesson specific.",
    asideFacts: [
      { label: "Best for", value: "Weekly rhythm" },
      { label: "Works well for", value: "Game review and calculation" },
      { label: "Status", value: "Opening soon" },
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
        note: "Opening soon",
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
        note: "Opening soon",
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
        note: "Opening soon",
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
    chips: ["NYC-based", "Face-to-face", "Opening soon"],
    portraitCaption:
      "Some students understand more quickly when the coach is right there at the board and the lesson pace can shift in real time.",
    asideTag: "In-person fit",
    asideTitle: "Direct coaching can change the pace fast",
    asideText:
      "For certain students, over-the-board instruction creates better focus, stronger habits, and more immediate course correction than a remote setup.",
    asideFacts: [
      { label: "Best for", value: "Board-first learners" },
      { label: "Works well for", value: "Habits and fundamentals" },
      { label: "Status", value: "Opening soon" },
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
        note: "Opening soon",
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
        note: "Opening soon",
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
    chips: ["Small groups", "Better level matching", "Opening soon"],
    portraitCaption:
      "A good group lesson does not feel generic. It feels fast, focused, and matched to the students actually in the room.",
    asideTag: "Group standard",
    asideTitle: "Group lessons need better structure than most programs give them",
    asideText:
      "The students should be close enough in level for the lesson to move as one group, but varied enough for the room to stay alive.",
    asideFacts: [
      { label: "Best for", value: "Shared pace" },
      { label: "Works well for", value: "Peer energy and repetition" },
      { label: "Status", value: "Opening soon" },
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
        note: "Opening soon",
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
        note: "Opening soon",
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
    badge: "Planned rated section",
    description: "For kids who have played in tournaments before. We plan to make this section US Chess rated and will confirm before registration opens.",
    bullets: [
      "Needs a current US Chess membership",
      "You'll enter your child's US Chess ID when you register",
      "Best for kids with tournament experience",
    ],
  },
  {
    id: "beginner",
    title: "Beginner Section",
    badge: "Unrated section",
    description: "For kids playing in their first tournaments.",
    bullets: [
      "No US Chess membership needed",
      "A relaxed first tournament experience",
      "Good for younger or newer players",
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
    statusLabel: "Opening soon",
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
      "Age eligibility will be announced when registration opens.",
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
      "The planned camp day runs from 9:00 AM to 3:00 PM with chess lessons, practice games, lunch, outdoor time, and fun activities. The schedule may change.",
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
    label: "Call or text",
    display: "(646) 251-7087",
    href: "tel:+16462517087",
  },
  {
    label: "Second number",
    display: "(646) 494-5363",
    href: "tel:+16464945363",
  },
];

export const contactEmails = [
  {
    label: "Write to us",
    display: "info@chessandtruck.com",
    href: "mailto:info@chessandtruck.com",
  },
];

export const termsPage = {
  eyebrow: "Terms of Service",
  title: "Terms of Service",
  updated: TERMS_UPDATED,
  intro:
    "These terms explain how online private chess lessons from Chess & Truck work: what you buy, how lessons are scheduled, and how rescheduling, cancellations, and refunds work.",
  sections: [
    {
      id: "about",
      title: "About these terms",
      body: [
        "Chess & Truck is the brand of CHESS AND TRUCK, a chess program for kids based in New York City. In these terms, \"we\" and \"us\" mean CHESS AND TRUCK.",
        "These terms apply to the chessandtruck.com website and to online private lesson purchases made through it. By checking \"I agree to the Terms of Service\" at checkout, you accept the version of these terms shown on this page at that time.",
      ],
    },
    {
      id: "who-can-buy",
      title: "Who can buy",
      body: [
        "If the lessons are for a child, a parent or legal guardian must make the purchase and arrange the lessons with us. Please make sure the details you give us about yourself and the student are accurate.",
      ],
    },
    {
      id: "lessons",
      title: "Online private lessons and packages",
      body: [
        "Online private lessons are one-on-one sessions with a Chess & Truck coach, held online. Each lesson lasts 60 minutes. You can buy:",
      ],
      items: [
        "1 lesson: $150",
        "5-Lesson Package: $675 ($135 per lesson)",
        "10-Lesson Package: $1,200 ($120 per lesson)",
      ],
      after: [
        "Prices are in U.S. dollars. Each purchase is a one-time payment. There is no subscription, no automatic renewal, and no recurring charge.",
      ],
    },
    {
      id: "payment",
      title: "Payment",
      body: [
        "Every purchase is paid in full upfront on a secure checkout page run by Stripe, our payment processor. You can use a card or another payment method Stripe offers on that page. Your purchase is confirmed only after Stripe confirms the payment. We then email you a confirmation with your package and order number. We never see or store your full card or bank details.",
      ],
    },
    {
      id: "scheduling",
      title: "Scheduling your lessons",
      body: [
        "After your payment is confirmed, our team contacts you by email to arrange lesson times with you. Times are agreed by email; there is no online booking calendar at this time.",
      ],
    },
    {
      id: "rescheduling",
      title: "Rescheduling, cancellations, and missed lessons",
      items: [
        "If you tell us at least 24 hours before a scheduled lesson starts, you can reschedule it at no cost.",
        "If you cancel or reschedule with less than 24 hours' notice, or the student misses the lesson without telling us, that lesson counts as used.",
        "We never charge anything extra for a late cancellation or a missed lesson. It simply counts as one of the lessons you bought.",
      ],
      after: ["Please send rescheduling and cancellation requests to info@chessandtruck.com."],
    },
    {
      id: "our-cancellations",
      title: "If we cancel a lesson",
      body: [
        "If we need to cancel a scheduled lesson, we will offer you a new time or a refund for that lesson at your package's per-lesson price. A lesson we cancel never counts as used.",
      ],
    },
    {
      id: "refunds",
      title: "Refunds",
      body: [
        "You can ask for a refund for any unused lessons. The refund for each unused lesson is your package's per-lesson price:",
      ],
      items: [
        "1 lesson: $150",
        "5-Lesson Package: $135 per lesson",
        "10-Lesson Package: $120 per lesson",
      ],
      after: [
        "Lessons that have already taken place, and lessons that count as used under the 24-hour rule above, are not refunded. We do not recalculate used lessons at the single-lesson price, and we do not charge a refund fee.",
        "Example: you paid $675 for the 5-Lesson Package and used 2 lessons. Your refund for the 3 unused lessons is 3 × $135 = $405.",
        "To ask for a refund, email info@chessandtruck.com. Our team reviews each request and issues approved refunds through Stripe to the payment method you used. How long it takes to appear depends on your bank or payment provider.",
      ],
    },
    {
      id: "no-expiration",
      title: "Lessons don't expire",
      body: ["Paid lessons you haven't used do not expire."],
    },
    {
      id: "financial-aid",
      title: "Financial aid and discounts",
      body: [
        "Financial aid and discounts are available for families who need support. They are arranged individually: ask us through the Contact page before you buy. No discount is applied automatically.",
      ],
    },
    {
      id: "other-programs",
      title: "Other programs",
      body: [
        "These lesson rules apply to online private lessons only. Camps, tournaments, after-school programs, and in-person and group lessons are not open yet. Their terms will be posted before their registration opens.",
      ],
    },
    {
      id: "conduct",
      title: "Lesson conduct",
      body: [
        "Students and families are expected to treat coaches and other participants with respect and to follow the coach's instructions during lessons, so every lesson stays safe, focused, and fun.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "We may update these terms. The date at the top shows the latest version. The version you agreed to when you bought your lessons applies to that purchase.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [
        "Questions, rescheduling, cancellations, and refund requests: info@chessandtruck.com.",
      ],
    },
  ],
};

export const privacyPage = {
  eyebrow: "Privacy Policy",
  title: "Privacy Policy",
  updated: PRIVACY_UPDATED,
  intro:
    "This policy explains what information Chess & Truck collects, why we need it, who can see it, and how you can ask us to correct or delete it.",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: [
        "Chess & Truck is the brand of CHESS AND TRUCK, a chess program for kids based in New York City. You can reach us at info@chessandtruck.com.",
      ],
    },
    {
      id: "information-you-give",
      title: "Information you give us",
      body: ["We only ask for what we need. Depending on what you do on the site, that is:"],
      items: [
        "Buying online lessons: your name, your email address, your phone number (optional), the student's name, the student's age, the student's chess level, any notes you choose to add for the coach, the package you chose, and the version of the Terms of Service you agreed to and when.",
        "Paying: you enter your payment details on Stripe's checkout page, not on our site. Stripe tells us whether the payment succeeded, the amount, and the contact details entered at checkout.",
        "Using the contact form: your name, your email address, your phone number (optional), your message, and the topic if you picked one (for example, Financial Aid & Discounts).",
        "Asking to hear when a program opens (where we offer this): your email address, the program, and when you asked and confirmed.",
        "Emailing or calling us: whatever you choose to tell us.",
      ],
      after: [
        "We don't ask for a home address, a full date of birth, or the student's school. Please don't put sensitive information, such as health details, in the notes for the coach.",
      ],
    },
    {
      id: "children",
      title: "Information about children",
      body: [
        "Our lessons are for kids, so when a parent or guardian buys lessons, we ask that adult for the student's name, age, chess level, and optional notes. We use this only to arrange and teach the lessons and to choose the right level. Purchases and sign-ups should be made by a parent or guardian, not by a child. If you think a child sent us information directly, email us and we will delete it.",
      ],
    },
    {
      id: "how-we-use",
      title: "How we use information",
      items: [
        "To process your payment and confirm your purchase.",
        "To contact you by email to arrange lesson times, and to run the lessons.",
        "To handle rescheduling, cancellations, and refund requests.",
        "To answer your questions.",
        "To email you when a program you asked about opens, if you asked us to.",
        "To keep business, accounting, and tax records of purchases.",
        "To protect the site from abuse, for example by limiting repeated form submissions.",
      ],
      after: ["We don't sell your information, and we don't use it for advertising."],
    },
    {
      id: "emails",
      title: "Emails we send",
      body: [
        "After a purchase, we email the buyer a confirmation with the package and order number, and our team gets an email with the purchase details so we can arrange the lessons. We then email you about scheduling. These are service emails about your purchase.",
        "We don't run a marketing newsletter, and buying lessons does not sign you up for one. If you ask to hear when a program opens, we send one email to confirm your request and one email when registration for that program opens. Each of those emails has an unsubscribe link. When you unsubscribe, we keep a record of it so we don't email you again.",
      ],
    },
    {
      id: "who-can-see",
      title: "Who can see your information",
      body: [
        "The Chess & Truck team and the coach who teaches your lessons can see the details you gave us. We also use these service providers, which handle information only to provide their service to us:",
      ],
      items: [
        "Stripe processes payments. It receives your payment details directly and stores your payment, together with the purchase details we send it (your name, email, optional phone, and the student's name, age, level, and notes). Stripe's own privacy policy applies to the information it collects.",
        "Supabase hosts our database. For lesson purchases, it stores the order number, the Stripe payment reference, the package, the amount, and when the order and its emails were processed. It doesn't store names or contact details for orders. It also stores the list of people who asked to hear when a program opens.",
        "Resend sends our emails, so it handles the email addresses and the contents of the emails we send.",
        "Vercel hosts our website and the server code behind our forms. Like any web host, it processes technical information such as your IP address and browser type when you visit.",
        "Google Fonts provides some of the fonts on our pages, so your browser contacts Google's servers, which receive your IP address.",
      ],
      after: [
        "Emails we send and receive are also kept in our business email account. We may share information if the law requires it.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      body: [
        "We don't use analytics tools, advertising cookies, or tracking pixels. Our site doesn't set cookies. Registration forms that are not open yet may save a draft in your browser's own storage, on your device only.",
        "Stripe's checkout page is run by Stripe and uses its own cookies, for example to process the payment and prevent fraud.",
      ],
    },
    {
      id: "retention",
      title: "How long we keep information",
      body: [
        "We keep information only as long as we need it for the reason we collected it, and longer only when we need it for accounting, tax, refunds, payment disputes, or legal reasons. For example:",
      ],
      items: [
        "Purchase records are kept as business records while we need them for lessons, refunds, accounting, and tax.",
        "Contact form messages are kept as long as we need them to answer you and keep a record of our conversation.",
        "Requests to hear when a program opens that are never confirmed are deleted automatically 30 days after the request. This rule applies only to those requests.",
        "Records used to limit repeated form submissions are kept in coded form and deleted after about 2 days.",
        "Stripe keeps payment records under its own policies.",
      ],
    },
    {
      id: "your-choices",
      title: "Correcting or deleting your information",
      body: [
        "To see, correct, or delete your information, email info@chessandtruck.com from the email address you used with us, so we can confirm the request is yours. We will correct or delete what we can. We may need to keep some records, such as purchase and payment records, for accounting, tax, refunds, or payment disputes. Copies of emails already sent, and records held by Stripe, may also remain. We will tell you what we kept and why.",
        "You can unsubscribe from program-opening emails at any time with the link in those emails.",
      ],
    },
    {
      id: "security",
      title: "Security",
      body: [
        "Our site uses HTTPS. Our database can be reached only by our own server code, and only people who need the information to run lessons can see it. No system is perfectly secure, but we work to protect your information.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: ["We may update this policy. The date at the top shows the latest version."],
    },
    {
      id: "contact",
      title: "Contact",
      body: ["Privacy questions and requests: info@chessandtruck.com."],
    },
  ],
};

// Online Private Chess Lessons page. Text follows the client's mockup; the
// approved exceptions are Coach Andrea's bio and the Coach Ikrom -> Coach Amir swap.
export const onlineLessonsPage = {
  breadcrumb: [
    { label: "Home", path: "/" },
    { label: "Lessons" },
    { label: "Online Private Lessons" },
  ],
  hero: {
    title: "Online Private Chess Lessons",
    accent: "Big Moves. From Anywhere.",
    intro:
      "Personalized one-on-one chess coaching from the comfort of your home. Fun, engaging, and effective lessons designed to help your child build skills, confidence, and a genuine love for the game.",
    cta: "Get Started",
    features: [
      { icon: "monitor", text: "Learn from experienced coaches" },
      { icon: "barChart", text: "Lessons tailored to your child" },
      { icon: "calendar", text: "Flexible scheduling from home" },
    ],
  },
  fun: {
    title: "Learning Chess Should Be Fun!",
    text:
      "We believe the best improvement happens when children genuinely enjoy learning. Our private online lessons combine expert instruction, interactive puzzles, practical games, and personalized feedback to make every session something kids look forward to.",
    items: [
      { icon: "bulb", label: "Build Skills", tone: "gold" },
      { icon: "users", label: "Grow Confidence", tone: "green" },
      { icon: "barChart", label: "Have Fun", tone: "blue" },
      { icon: "trophy", label: "See Real Progress", tone: "rose" },
    ],
  },
  special: {
    title: "What Makes Our Online Lessons Special?",
    cards: [
      { icon: "personStar", title: "100% Personalized", text: "Every lesson is tailored to your child's level, strengths, and goals." },
      { icon: "puzzle", title: "Fun & Interactive", text: "Chess puzzles, games, challenges, and practical exercises keep kids engaged and motivated." },
      { icon: "barChart", title: "Measurable Progress", text: "Game analysis and clear learning goals help students improve with confidence." },
      { icon: "cap", title: "All Skill Levels", text: "From complete beginners to advanced tournament players, everyone is welcome." },
    ],
  },
  audience: {
    title: "Who Are These Lessons For?",
    intro: "Our online private lessons are a great fit for:",
    items: [
      { icon: "learner", title: "Beginners", text: "learning the basics" },
      { icon: "rook", title: "Intermediate", text: "players looking to improve" },
      { icon: "trophy", title: "Competitive", text: "players preparing for tournaments" },
      { icon: "users", title: "", text: "Students who prefer the flexibility of learning from home" },
    ],
  },
  pricing: {
    eyebrow: "Invest in their next big move",
    title: "Private Lesson Packages & Pricing",
    intro: "All lessons are private, one-on-one sessions conducted online. Each lesson lasts 60 minutes.",
    // Prices must match api/_lib/priceCatalog.js (checked by tests/lessons.test.js).
    plans: [
      {
        packageId: "single",
        name: "Pay As You Go",
        price: "$150",
        unit: "per 60-minute lesson",
        points: ["Maximum flexibility", "No package commitment"],
      },
      {
        packageId: "five",
        name: "5-Lesson Package",
        price: "$675",
        unit: "($135 per lesson)",
        points: ["Save $75 compared with individual lessons", "Great for consistent progress"],
      },
      {
        packageId: "ten",
        name: "10-Lesson Package",
        price: "$1,200",
        unit: "($120 per lesson)",
        points: ["Save $300 compared with individual lessons", "20% savings"],
        badge: "Best Value",
        featured: true,
      },
    ],
  },
  // The first three points and the note are the client's text; the last two
  // match the Terms of Service (refunds and no expiration).
  policy: {
    title: "Booking & Rescheduling Policy",
    points: [
      "All 5- and 10-lesson packages are paid in full upfront.",
      "Please give at least 24 hours' notice if you need to reschedule a lesson.",
      "Lessons canceled or rescheduled with less than 24 hours' notice will count as a completed session.",
      "Unused lessons never expire.",
      "You can ask for a refund for unused lessons at your package's per-lesson price.",
    ],
    note: "We value your time and ours, and appreciate your help in keeping lessons running smoothly!",
    termsLabel: "Read the full Terms of Service",
  },
  aid: {
    title: "Financial Aid & Discounts",
    text:
      "We believe every child should have the opportunity to experience the many benefits of chess. Financial aid and discounts are available for families who need support.",
    cta: "Learn More / Inquire",
    contactPath: "/contact?topic=financial-aid",
  },
  coaches: {
    title: "Meet Your Online Coaches",
    intro: "Learn from experienced coaches who love working with kids.",
    teamLabel: "Meet Our Team",
    teamPath: "/our-team",
  },
  cta: {
    title: "Ready to Make Your Next Move?",
    text: "Tell us a little about your child, and we'll help you find the right coach and schedule for online private lessons.",
    button: "Get Started",
  },
  checkout: {
    path: "/lessons/online/checkout",
    pageTitle: "Checkout",
    title: "Tell us about your child",
    intro: "After payment, our team will contact you by email to arrange your online lessons.",
    cancelled: "Payment was cancelled. You have not been charged. You can choose a package again whenever you're ready.",
    // Short version of the Terms of Service, shown right before payment.
    summaryTitle: "Before you pay",
    summary: [
      "You pay for your lessons in full upfront. This is a one-time payment, not a subscription.",
      "Our team will email you to arrange lesson times.",
      "Tell us at least 24 hours before a lesson to reschedule it at no cost.",
      "A lesson canceled with less than 24 hours' notice, or missed, counts as used.",
      "You can get a refund for unused lessons at your package's per-lesson price ($150, $135, or $120).",
      "Unused lessons never expire.",
    ],
  },
  thankYou: {
    title: "Thank you for your purchase!",
    message: "Thank you for your purchase! Our team will contact you by email to arrange your online lessons.",
  },
};

// The coaching team. The online lessons cards, the Our Team page, and each
// profile all read from here, so they never disagree. Text is the client's;
// Andrea's line uses the owner-confirmed 24 years (not the mockup's 7+).
export const coaches = [
  {
    id: "amir",
    name: "Coach Amir",
    title: "FIDE Master",
    text:
      "25+ years of playing experience and 15+ years of coaching. Passionate about helping children build skills, confidence, and a love for chess.",
    photo: "amir",
    photoAlt: "Coach Amir at a chess board",
    profilePath: "/our-team/amir",
  },
  {
    id: "andrea",
    name: "Coach Andrea",
    title: "FIDE Master",
    text:
      "Andrea is a FIDE Master with 24 years of experience teaching chess in the United States and Canada. He has taught at children's chess camps, given private lessons, and taught in after-school programs.",
    photo: "andrea",
    photoAlt: "Coach Andrea at an outdoor chess table",
    profilePath: "/our-team/andrea",
  },
];

export const ourTeamPage = {
  breadcrumb: [{ label: "Home", path: "/" }, { label: "Our Team" }],
  title: "Our Team",
  intro: "Learn from experienced coaches who love working with kids.",
  profileCta: "Explore Online Lessons",
  profileCtaPath: "/lessons/online",
  backLabel: "Back to Our Team",
};

// In-person and group lessons have no approved terms yet: no prices,
// schedule, or payment until the owner approves them.
export const comingSoonLessonPages = {
  "/lessons/in-person": {
    programId: "inPersonLessons",
    eyebrow: "Lessons",
    title: "In-Person Lessons",
    intro: "Prices, schedule, and location will be posted here when registration opens.",
  },
  "/lessons/group": {
    programId: "groupLessons",
    eyebrow: "Lessons",
    title: "Group Lessons",
    intro: "Prices, schedule, and location will be posted here when registration opens.",
  },
};
