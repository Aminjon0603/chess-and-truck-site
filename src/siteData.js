export const siteBrand = {
  name: "CHESS AND TRUCK",
  short: "CT",
  city: "New York City",
  tagline: "NYC summer chess camps at Central Park",
  footerNote:
    "Summer chess camp runs June 15 to August 21 at the House of Chess and Checkers in Central Park.",
};

export const navigationItems = [
  { label: "Home", path: "/" },
  { label: "Camps", path: "/camps" },
  { label: "Lessons", path: "/private-lessons" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
];

export const lessonMenuItems = [
  {
    label: "Online Lessons",
    path: "/lessons/online",
    description: "Remote coaching with structure, game review, and a cleaner weekly rhythm.",
    signal: "Remote coaching",
    imageKey: "online",
  },
  {
    label: "In Person Lessons",
    path: "/lessons/in-person",
    description: "Face-to-face coaching in New York City for students who learn better over the board.",
    signal: "NYC live coaching",
    imageKey: "inperson",
  },
  {
    label: "Group Lessons",
    path: "/lessons/group",
    description: "Small-group training with smarter pacing, better grouping, and more energy in the room.",
    signal: "Small training groups",
    imageKey: "group",
  },
  {
    label: "Manage Your Lessons",
    path: "/lessons/manage",
    description: "Schedule help, lesson changes, and direct support while the lesson desk launches.",
    signal: "Lesson desk",
    imageKey: "manage",
  },
];

export const lessonMenuFeature = {
  eyebrow: "Lesson launch",
  title: "Choose the right lesson path fast.",
  text:
    "Online, in-person, group, and support pages built for New York City families who want clarity before lessons open.",
  ctaLabel: "Open lesson overview",
  ctaPath: "/private-lessons",
};

export const campMenuItems = [
  {
    label: "Camp Overview",
    path: "/camps",
    description: "See dates, location, daily format, and how summer camp works before you register.",
    signal: "Summer 2026",
    imageKey: "overview",
  },
  {
    label: "Training Camps",
    path: "/camps/training",
    description: "Daily chess camp format built around rhythm, coaching, and real over-the-board work.",
    signal: "Daily training",
    imageKey: "training",
  },
  {
    label: "Advanced Training Camps",
    path: "/camps/prep",
    description: "Sharper camp blocks for students who want deeper review, stronger habits, and more focused work.",
    signal: "Advanced focus",
    imageKey: "prep",
  },
  {
    label: "Online Camps",
    path: "/camps/online",
    description: "Remote camp format for families who want structure without crossing the city.",
    signal: "Remote camp",
    imageKey: "online",
  },
];

export const campMenuFeature = {
  eyebrow: "Summer camp",
  title: "Chess camp in Central Park, June 15 to August 21.",
  text:
    "Structured summer camp for NYC families who want lessons, guided games, and a clear daily rhythm.",
  ctaLabel: "Open camp overview",
  ctaPath: "/camps",
};

export const routeMeta = {
  "/": {
    title: "CHESS AND TRUCK | NYC Chess Camps",
    description:
      "NYC summer chess camps at Central Park from June 15 to August 21 with daily lessons, guided games, and practical camp details for families.",
  },
  "/about": {
    title: "About | CHESS AND TRUCK",
    description:
      "Learn why CHESS AND TRUCK is being built for NYC families and how camps, lessons, and direct parent communication are being structured.",
  },
  "/camps": {
    title: "Camps | CHESS AND TRUCK",
    description:
      "See summer camp dates, Central Park location, daily format, and what students will do at CHESS AND TRUCK camps.",
  },
  "/camps/book": {
    title: "Camp Booking | CHESS AND TRUCK",
    description:
      "Choose a summer camp option, add family details, and continue to secure checkout for CHESS AND TRUCK camps in Central Park.",
  },
  "/camps/training": {
    title: "Training Camps | CHESS AND TRUCK",
    description:
      "Daily training camp format for students who want structured chess work, strong rhythm, and coach-led practice.",
  },
  "/camps/prep": {
    title: "Advanced Training Camps | CHESS AND TRUCK",
    description:
      "Advanced training camp blocks for students who want sharper game review, stronger calculation, and more focused summer work.",
  },
  "/camps/online": {
    title: "Online Camps | CHESS AND TRUCK",
    description:
      "Online camp format for students who want a structured remote chess week with clear coaching and daily direction.",
  },
  "/events": {
    title: "Camps | CHESS AND TRUCK",
    description:
      "NYC summer chess camps in Central Park with dates, format, daily structure, and clear next steps for families.",
  },
  "/events/chess-and-truck-tournament": {
    title: "Summer Camp | CHESS AND TRUCK",
    description:
      "See the summer camp format, Central Park location, daily structure, and camp details for CHESS AND TRUCK.",
  },
  "/private-lessons": {
    title: "Lessons | CHESS AND TRUCK",
    description:
      "Chess lessons in NYC and online with game review, structured coaching, and clear lesson options for beginner and improving students.",
  },
  "/lessons/online": {
    title: "Online Lessons | CHESS AND TRUCK",
    description:
      "Online chess lessons for students who want focused coaching, cleaner structure, and a launch-ready private lesson path.",
  },
  "/lessons/in-person": {
    title: "In Person Lessons | CHESS AND TRUCK",
    description:
      "In-person chess lessons in New York City for students who benefit from direct board work and face-to-face coaching.",
  },
  "/lessons/group": {
    title: "Group Lessons | CHESS AND TRUCK",
    description:
      "Small-group chess lessons for students who learn well through shared pace, focused instruction, and strong level matching.",
  },
  "/lessons/manage": {
    title: "Manage Lessons | CHESS AND TRUCK",
    description:
      "Lesson support for current and incoming families who need scheduling help, coaching guidance, or next-step coordination.",
  },
  "/faq": {
    title: "FAQ | CHESS AND TRUCK",
    description:
      "Get answers about summer camp, lessons, student fit, what to bring, and how to get the next step.",
  },
  "/contact": {
    title: "Contact | CHESS AND TRUCK",
    description:
      "Reach the CHESS AND TRUCK team by phone, email, or the contact form for camp and lesson questions.",
  },
  "/register": {
    title: "Contact | CHESS AND TRUCK",
    description:
      "Contact CHESS AND TRUCK for camp availability, lesson openings, pricing, and the next step.",
  },
  "/terms": {
    title: "Terms of Service | CHESS AND TRUCK",
    description:
      "Review CHESS AND TRUCK terms covering camp and lesson inquiries, payments, cancellations, and program participation.",
  },
  "/privacy": {
    title: "Privacy Policy | CHESS AND TRUCK",
    description:
      "See how CHESS AND TRUCK uses contact and payment-related information for camp, lesson, and family communication.",
  },
};

export const featuredTournament = {
  slug: "summer-camp",
  title: "Summer Chess Camp",
  city: "House of Chess and Checkers, Central Park",
  scheduleLabel: "June 15 - August 21",
  formatLabel: "Half-day and full-day camp",
  pricingLabel: "Camp details available now",
  venueLabel: "House of Chess and Checkers, Central Park",
  shortSummary: "Central Park summer camp. Daily lessons, guided games, and clear structure.",
  longSummary: "Summer camp runs June 15 to August 21 at the House of Chess and Checkers in Central Park.",
  basePrice: 0,
  dojoPrice: 0,
};

export const footerLegalLinks = [
  { label: "Terms of Service", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

export const homePage = {
  eyebrow: "NYC chess camps",
  title: "Summer chess camps in Central Park.",
  intro: "June 15 to August 21. Daily lessons, guided games, and a clear chess-first camp day.",
  heroFacts: [
    { label: "Dates", value: "June 15 - August 21" },
    { label: "Location", value: "House of Chess and Checkers, Central Park" },
    { label: "Service", value: "Half-day and full-day camp" },
    { label: "Levels", value: "Beginner-friendly and improving players" },
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
      path: "/camps/training",
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

export const lessonCarouselSlides = [
  {
    key: "online",
    label: "Online Lessons",
    title: "Remote coaching with a real weekly rhythm",
    text: "Best for families who want structure, game review, and no commute.",
    imageKey: "online",
    path: "/lessons/online",
  },
  {
    key: "inperson",
    label: "In Person Lessons",
    title: "Face-to-face board work in New York City",
    text: "For students who focus better live and learn faster over the board.",
    imageKey: "inperson",
    path: "/lessons/in-person",
  },
  {
    key: "group",
    label: "Group Lessons",
    title: "Small groups with cleaner level matching",
    text: "Shared pace, stronger energy, and less wasted time than oversized classes.",
    imageKey: "group",
    path: "/lessons/group",
  },
  {
    key: "manage",
    label: "Lesson Desk",
    title: "Schedule, support, and launch updates",
    text: "Use this path for lesson questions while the full lesson system opens soon.",
    imageKey: "manage",
    path: "/lessons/manage",
  },
];

export const campOverviewPage = {
  eyebrow: "Camps",
  title: "Summer Chess Camps in Central Park",
  intro:
    "June 15 to August 21. Lessons, games, and a clear chess-first camp day at the House of Chess and Checkers.",
  chips: ["June 15 - August 21", "Central Park", "NYC families"],
  heroFacts: [
    { label: "Dates", value: "June 15 - August 21" },
    { label: "Location", value: "House of Chess and Checkers, Central Park" },
    { label: "Levels", value: "Beginner-friendly and improving players" },
    { label: "Service", value: "Half-day and full-day camp" },
  ],
  portraitCaption:
    "A clean camp setup with real chess structure from day one.",
  asideTag: "Summer 2026",
  asideTitle: "Camp at a glance",
  asideText:
    "Central Park, June 15 to August 21. Review the basics, choose an option, and contact us for availability.",
  asideFacts: [
    { label: "Dates", value: "June 15 - August 21" },
    { label: "Venue", value: "House of Chess and Checkers" },
    { label: "Enrollment", value: "Early access open" },
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
    { title: "Location", text: "House of Chess and Checkers, Central Park" },
    { title: "Dates", text: "June 15 - August 21" },
    { title: "Time", text: "Morning, half-day, and full-day options" },
    { title: "Service", text: "Chess-first summer camp" },
    { title: "Ages", text: "School-age players" },
    { title: "Skill levels", text: "Beginner-friendly with level grouping" },
    { title: "Enrollment", text: "Contact us for availability and next steps" },
  ],
  bookingSection: {
    eyebrow: "Camp booking",
    title: "Choose your camp option",
    intro: "Simple checkout.",
    note: "Booking for siblings? Adjust quantity in checkout.",
  },
  bookingCards: [
    {
      id: "full-week",
      eyebrow: "Weekly camp",
      title: "Full Week Camp",
      price: "$450 per week",
      details: [
        "Five camp days in one week",
        "Best value for families booking a full block",
        "Built around lessons, coached games, and outdoor breaks in Central Park",
      ],
      availability: "Limited group size",
      cta: "Reserve Your Week",
    },
    {
      id: "single-day",
      eyebrow: "Flexible option",
      title: "Single Day",
      price: "$100 per day",
      details: [
        "Join for one camp day at a time",
        "Good fit for families building around a changing summer schedule",
        "Same chess-first structure in a shorter commitment",
      ],
      availability: "Limited group size",
      cta: "Book a Day",
    },
  ],
  mapSection: {
    eyebrow: "Camp location",
    title: "Find us in Central Park",
    intro: "House of Chess and Checkers, Central Park.",
    address: "House of Chess and Checkers, Central Park, New York, NY",
    directionsLabel: "Open in Google Maps",
    directionsHref:
      "https://www.google.com/maps/search/?api=1&query=House%20of%20Chess%20and%20Checkers%20Central%20Park%20New%20York%20NY",
    embedSrc:
      "https://www.google.com/maps?q=House%20of%20Chess%20and%20Checkers%20Central%20Park%20New%20York%20NY&output=embed",
  },
  scheduleSection: {
    eyebrow: "Sample day",
    title: "A sample camp day",
    intro: "Timing may shift by group.",
  },
  sampleSchedule: [
    {
      time: "9:00 AM",
      title: "Warm-up puzzles",
      text: "Short tactical warm-up.",
    },
    {
      time: "9:30 AM",
      title: "Group lesson",
      text: "Coach-led lesson.",
    },
    {
      time: "10:30 AM",
      title: "Practice games",
      text: "Apply the lesson in games.",
    },
    {
      time: "11:30 AM",
      title: "Lunch / break",
      text: "Reset before the next block.",
    },
    {
      time: "12:15 PM",
      title: "Mini tournament",
      text: "Short competitive rounds.",
    },
    {
      time: "1:15 PM",
      title: "Endgame or game review",
      text: "Review before dismissal.",
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
      path: "/camps/training",
    },
    {
      title: "Tournament Prep Camps",
      text: "Shorter competitive camp blocks for players getting ready for rated events and stronger tournament habits.",
      path: "/camps/prep",
    },
    {
      title: "Online Camps",
      text: "Remote training format for families who want camp structure without commuting across the city.",
      path: "/camps/online",
    },
  ],
  faqSection: {
    eyebrow: "Camp FAQ",
    title: "Quick answers",
    intro: "The basics.",
  },
  faqs: [
    {
      question: "Is this good for beginners?",
      answer: "Yes. The camp is beginner-friendly, with grouping to keep stronger students challenged.",
    },
    {
      question: "Are students grouped by level?",
      answer: "Yes. We group as cleanly as possible so lesson pace and game level make sense.",
    },
    {
      question: "What should students bring?",
      answer: "Bring a water bottle, a snack or lunch if needed, and anything listed in the registration note.",
    },
    {
      question: "Is tournament experience required?",
      answer: "No. General camp works for students still building fundamentals.",
    },
    {
      question: "Is lunch included?",
      answer: "Lunch guidance comes with registration details. Expect either a lunch block or a bring-your-own-lunch note.",
    },
    {
      question: "How do I join early access?",
      answer: "Use the contact page, call or text (646) 251-7087 or (646) 494-5363, or email info@chessandtruck.com. Families on the early access list will hear first when dates and enrollment are released.",
    },
  ],
  ctaTitle: "Ask about summer camp",
  ctaText: "Contact us for availability, pricing, and the next step.",
};

export const campBookingPage = {
  eyebrow: "Camp booking",
  title: "Choose an option and continue to secure checkout",
  intro:
    "Pick a camp option, add the family details we need, and continue to Stripe to reserve a spot.",
  chips: ["June 15 - August 21", "Central Park", "Secure checkout"],
  formTitle: "Camp booking details",
  formIntro:
    "This short step helps us know who the student is before you continue to payment.",
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
      title: "Camp preference",
      intro: "Tell us which week or day you want first.",
    },
  ],
  supportTitle: "Need help before checkout?",
  supportText:
    "Call, text, or email if you want to confirm fit, availability, or the best camp option before paying.",
  siblingNote: "Booking for siblings? You can increase quantity during Stripe checkout.",
};

export const campDetailPages = {
  "/camps/training": {
    eyebrow: "Training Camps",
    title: "Daily camp rhythm for students who need more than casual chess.",
    intro:
      "A summer camp format built around instruction, supervised play, review, and daily habits that actually move a student forward.",
    chips: ["Daily rhythm", "Summer 2026", "Central Park"],
    portraitCaption:
      "A strong training camp should feel focused and alive, not like a room where chess is just one activity in the background.",
    asideTag: "Training camp fit",
    asideTitle: "This should feel like a real training week",
    asideText:
      "The best version gives students structure each day: learn, apply, review, and come back the next morning sharper than before.",
    asideFacts: [
      { label: "Best for", value: "Students building fundamentals" },
      { label: "Daily feel", value: "Coach-led and active" },
      { label: "Season", value: "June 15 - August 21" },
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
        eyebrow: "Launch first",
        title: "Intro Camp Week",
        bullets: [
          "First release week designed to set standards and rhythm correctly",
          "Best for families who want a clean introduction to the camp format",
          "Useful for students who need structure more than intensity right away",
        ],
        meta: "Founding camp release",
        note: "Runs during the summer season",
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
        note: "Ask about current availability",
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
    chips: ["Advanced players", "Focused training", "Summer 2026"],
    portraitCaption:
      "Advanced camp should feel sharper than general camp: more game review, cleaner goals, and stronger daily focus.",
    asideTag: "Prep camp fit",
    asideTitle: "This is for players who already care about performance",
    asideText:
      "The goal is not to keep the room busy. The goal is to help students leave camp more prepared, more accurate, and more stable over the board.",
    asideFacts: [
      { label: "Best for", value: "Active competitors" },
      { label: "Works well for", value: "Game review and prep" },
      { label: "Season", value: "June 15 - August 21" },
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
        eyebrow: "Launch first",
        title: "Weekend Prep Block",
        bullets: [
          "Short first-release format for players who want a concentrated prep experience",
          "Good first version while the broader prep calendar is still opening",
          "Useful for families who want something sharper than a general camp week",
        ],
        meta: "Short prep release",
        note: "Available during the summer season",
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
        note: "Ask about competitive camp dates",
        cta: "Ask about pre-event weeks",
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
    chips: ["Remote format", "Structured days", "Summer 2026"],
    portraitCaption:
      "Online camp should not feel passive. The right setup keeps the student engaged, moving, and accountable through the day.",
    asideTag: "Online camp fit",
    asideTitle: "Remote should still feel active and coach-led",
    asideText:
      "The screen should not lower the standard. The structure should still create pace, real work, and a meaningful week for the student.",
    asideFacts: [
      { label: "Best for", value: "Remote families" },
      { label: "Works well for", value: "Review and guided practice" },
      { label: "Season", value: "June 15 - August 21" },
    ],
    cards: [
      { title: "Cleaner than random online time", text: "A camp week should give students structure, not more disconnected chess activity." },
      { title: "Useful for guided review", text: "Strong format for game review, live puzzles, training themes, and coach feedback." },
      { title: "No city commute", text: "Good for families who want strong chess work without the daily travel commitment." },
    ],
    pathSection: {
      eyebrow: "Online camp paths",
      title: "Three ways remote camp can launch well",
      intro: "The format should stay simple and well explained before dates go live.",
    },
    pathCards: [
      {
        eyebrow: "Launch first",
        title: "Mini Online Camp",
        bullets: [
          "Short first-release format to establish pacing and parent expectations clearly",
          "Best for families who want to test the remote camp structure first",
          "Useful when a student benefits from shorter, more controlled camp blocks",
        ],
        meta: "Short online release",
        note: "Available during the summer season",
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
      "A format that respects family logistics before launch",
    ],
    ctaTitle: "Ask about online camp spots",
    ctaText:
      "If remote camp is the best fit for your family, contact us now and we will send details and next steps.",
    ctaLabel: "Contact about online camps",
  },
};

export const aboutPage = {
  eyebrow: "About CHESS AND TRUCK",
  title: "A New York City chess program built around clarity.",
  intro:
    "CHESS AND TRUCK is being built for families who want organized chess camps, useful lessons, and direct communication.",
  heroFacts: [
    { label: "Focus", value: "Scholastic chess" },
    { label: "City", value: "New York City" },
    { label: "Programs", value: "Camps + lessons" },
    { label: "Status", value: "Launching soon" },
  ],
  introSection: {
    eyebrow: "What this is",
    title: "A chess-first program, not a vague concept site",
    intro: "Parents should understand what is being built and why it matters before they ever register.",
  },
  pillars: [
    {
      title: "Camps with visible structure",
      text: "Parents should be able to see dates, location, schedule, and what the day includes before reaching out.",
    },
    {
      title: "Lessons with real coaching value",
      text: "Lessons should feel specific, practical, and tied to actual improvement instead of generic chess activity.",
    },
    {
      title: "Camps with a chess-first rhythm",
      text: "School-break camps should look organized from day one, with clear schedule, training blocks, and level guidance.",
    },
  ],
  founderSection: {
    eyebrow: "Why this exists",
    title: "Why this business is being built this way",
    intro: "The goal is simple: parents should understand the offer quickly and know the next step without chasing details.",
  },
  founderCards: [
    {
      title: "What kept getting in the way",
      text: "Too many chess pages sounded polished but still made parents dig for the basics: fit, schedule, level, and what to do next.",
    },
    {
      title: "Why CHESS AND TRUCK exists",
      text: "This brand is being built so camps and lessons feel organized before a family ever commits time, money, or a week of summer.",
    },
    {
      title: "What families should get",
      text: "Parents should know what the program is, who it fits, and how to move forward without sending three emails first.",
    },
  ],
  experienceSection: {
    eyebrow: "What shapes the standards",
    title: "The standards behind the program",
    intro: "The business is being shaped around the things that matter most on event day, in coaching, and in parent communication.",
  },
  experienceCards: [
    {
      title: "Program structure",
      text: "The program is being built around the details parents look for first: dates, location, schedule, fit, and next step.",
    },
    {
      title: "Coaching standards",
      text: "The lesson side is shaped around game review, level-appropriate work, and training that connects from one session to the next.",
    },
    {
      title: "Parent communication",
      text: "Important details should be visible before sign-up, so families do not have to chase timing, fit, or next steps by email.",
    },
  ],
  whySection: {
    eyebrow: "Why families care",
    title: "What this should lead to for NYC parents and students",
    intro: "The standard is simple: practical information, organized programs, and direct communication.",
  },
  standards: [
    "Clear level fit before sign-up",
    "Direct contact without confusion",
    "Honest launch updates instead of vague promises",
    "Programs that feel structured from the first page",
  ],
  ctaTitle: "Want to see the first launch updates as they open?",
  ctaText:
    "Use Contact now if you want early access notices for camps or lessons as the first public openings go live.",
};

export const eventsPage = {
  eyebrow: "Events & Tournaments",
  title: "NYC scholastic tournaments with a clear Saturday service.",
  intro:
    "Open and Beginner sections, a 9:00 AM start, and a morning schedule that wraps by lunch. Families can review the structure now and join early access before dates go live.",
  heroFacts: [
    { label: "Location", value: "Brick Church, 62 E 92nd Street" },
    { label: "Service", value: "Open + Beginner" },
    { label: "Status", value: "First dates coming soon" },
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
    { title: "Location", text: "Brick Church, 62 E 92nd Street" },
    { title: "Dates", text: "Dates coming soon" },
    { title: "Time", text: "Saturday mornings, 9:00 AM to lunch" },
    { title: "Service", text: "Rated and beginner-friendly divisions" },
    { title: "Entry", text: "Registration from $55 planned" },
    { title: "Enrollment", text: "Early access list open now" },
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
      text: "USCF requirements, launch timing, and the basic registration path are visible before checkout ever opens.",
    },
    {
      title: "Simple next step",
      text: "Families can use Contact now and get the first release notice as soon as the opening date goes live.",
    },
  ],
  ctaTitle: "Want the first tournament date as soon as it drops?",
  ctaText:
    "Join early access now and we will send the first event release, section guidance, and registration details as soon as public enrollment opens.",
};

export const tournamentPage = {
  eyebrow: "Featured Tournament",
  title: "Chess & Truck Tournament",
  intro: "The format is set. The first public tournament date is being finalized now.",
  atAGlance: [
    { label: "Location", value: "Brick Church, 62 E 92nd Street" },
    { label: "Service", value: "Open & Beginner sections" },
    { label: "Schedule", value: "Saturday mornings, 9:00 AM to lunch" },
    { label: "Launch status", value: "First dates announced soon" },
  ],
  checklist: [
    "Open section players will still need an active USCF ID",
    "Beginner players will still have a simpler entry path",
    "The Saturday morning structure is already set",
    "Use Contact if you want first notice when dates go live",
  ],
};

export const faqPage = {
  eyebrow: "FAQ",
  title: "Clear answers before registration.",
  intro: "Camp fit, lesson options, what to bring, and how sign-up works.",
  heroFacts: [
    { label: "Camp dates", value: "June 15 - August 21" },
    { label: "Location", value: "Central Park" },
    { label: "Lessons", value: "Online + in person" },
    { label: "Support", value: "Contact is open now" },
  ],
  quickCards: [
    {
      title: "Beginner friendly?",
      text: "Yes. Camp and lesson formats are being built to work for beginners and improving players.",
    },
    {
      title: "Grouped by level?",
      text: "Yes. Students are grouped by level so the day and the coaching pace make sense.",
    },
    {
      title: "Need help first?",
      text: "Use Contact if you want section guidance or launch updates before the first dates go live.",
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
      text: "School-age players who want camp, lessons, or a stronger summer chess routine.",
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
      text: "Start with camps or lessons first so you can see the format, schedule, and fit.",
    },
    {
      title: "Send one message",
      text: "Tell us the student age, current level, and whether you want camp or lessons.",
    },
    {
      title: "Get the next step",
      text: "We reply with availability, pricing, and the cleanest next move for your family.",
    },
  ],
  ctaTitle: "Still have a question before launch?",
  ctaText: "If the answer is not here yet, send a message and we will point you in the right direction.",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Contact the team for camps and lessons.",
  intro:
    "Use the contact form, call or text (646) 251-7087 or (646) 494-5363, or email info@chessandtruck.com for camp questions, lesson inquiries, pricing, or help choosing the right program.",
  heroFacts: [
    { label: "Phone lines", value: "(646) 251-7087 / (646) 494-5363" },
    { label: "Email", value: "info@chessandtruck.com" },
    { label: "Reply type", value: "Direct response" },
    { label: "Best for", value: "Questions + early access" },
  ],
  topicSection: {
    eyebrow: "What to contact us about",
    title: "Three common reasons families reach out",
    intro: "If the right page still leaves a question, this is the next step.",
  },
  topicCards: [
    {
      title: "Camp questions",
      text: "Ask about dates, Central Park location, daily format, pricing, or whether camp fits your family.",
    },
    {
      title: "Lesson inquiries",
      text: "Ask about online or in-person lessons, student fit, weekly coaching, or the first lesson openings.",
    },
    {
      title: "Camp updates",
      text: "Ask about school-break camp plans, launch timing, age fit, or whether your family should join the waitlist now.",
    },
  ],
  supportCards: [
    {
      title: "Before launch",
      text: "Reach out if you want to understand fit, format, or timing before the next public release opens.",
    },
    {
      title: "Operational support",
      text: "Use this for launch updates, logistics, and follow-up once dates and enrollment begin to open.",
    },
    {
      title: "Best next step",
      text: "One clear message is enough. We will point you to the right program, page, or next release notice.",
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
      text: "That may mean a direct answer, the right page, or early access for the next release that fits your student best.",
    },
    {
      title: "You hear when the right opening goes live",
      text: "If you ask for early access, we keep your message tied to the correct release instead of making you start over later.",
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
  eyebrow: "Lesson programs",
  title: "Chess lessons in NYC: private, small-group, and online.",
  intro:
    "Lesson formats for NYC students who need real improvement, not random chess activity. Private coaching, small-group training, and online formats are opening soon.",
  heroChips: ["Private coaching", "Small-group options", "Online + in person"],
  quickFacts: [
    { label: "Levels", value: "Beginner to advanced" },
    { label: "Formats", value: "Private, group, online" },
    { label: "Includes", value: "Game + analysis" },
    { label: "Pricing", value: "Shared before first booking window" },
  ],
  heroNote:
    "Parents should know quickly which lesson path fits the student, what happens in a session, and how to ask for the first opening.",
  detailsSection: {
    eyebrow: "Lesson details",
    title: "The practical details families ask first",
    intro: "The lesson release is still opening, but the core structure is already clear.",
  },
  detailsCards: [
    { title: "Who it is for", text: "School-age students from beginners to advanced players who need clearer structure and real improvement." },
    { title: "Formats", text: "Private lessons, small-group coaching, and online options are all part of the lesson release." },
    { title: "Session flow", text: "Lesson time can include a real game, guided analysis, and targeted training work." },
    { title: "Game format", text: "Practice games can use 10+10 or 15+10 once the student is ready for clock work." },
    { title: "Written feedback", text: "When useful, families get a short follow-up with the key lesson points and next focus." },
    { title: "Pricing", text: "Founding lesson rates will be shared before the first booking window opens, not after an inquiry call." },
  ],
  formatCards: [
    {
      eyebrow: "Remote",
      title: "Online lessons",
      text: "Weekly coaching, game review, and clear training structure without crossing the city.",
    },
    {
      eyebrow: "Face to face",
      title: "In-person lessons",
      text: "Board-first coaching for students who focus better live and learn faster over the board.",
    },
    {
      eyebrow: "Shared training",
      title: "Group lessons",
      text: "Small groups with better level matching, stronger pace, and cleaner coaching than generic classes.",
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
    intro:
      "Lesson openings start soon. These are the first lesson paths planned for release.",
  },
  pathCards: [
    {
      eyebrow: "Launch first",
      title: "Starter Lesson",
      bullets: [
        "One private session to assess level, pace, and coach fit",
        "Best for families who want to meet the coach before choosing a longer rhythm",
        "A clean first step for students who are just entering structured training",
      ],
      meta: "Single-session inquiry",
      note: "First private lesson openings announced soon",
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
      note: "Priority scheduling opens with launch",
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
        note: "Available after the first lesson release",
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
      title: "Tell us the student and the goal",
      text: "Age, level, schedule, and whether you want online or in person are enough to start the conversation well.",
    },
    {
      step: "02",
      title: "We point you to the cleanest format",
      text: "Some students need a starter lesson first. Others are ready for weekly coaching or a short prep block.",
    },
    {
      step: "03",
      title: "You get the first opening notice",
      text: "When the next lesson openings go live, families on the list hear first and can move quickly.",
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
  ctaTitle: "Tell us the student, the level, and the format you want.",
  ctaText:
    "Send age, current level, and whether you want online, in-person, or group lessons. We will point you to the cleanest starting path when openings go live.",
};

export const lessonDetailPages = {
  "/lessons/online": {
    eyebrow: "Online Lessons",
    title: "Serious coaching, no commute required.",
    intro:
      "A clean remote lesson path for students who want consistency, game review, and a real training rhythm from home. Full lesson launch opens soon.",
    chips: ["Zoom-based", "NYC families", "Launch spots soon"],
    portraitCaption:
      "Remote lessons should still feel demanding, personal, and sharply structured from the first session.",
    asideTag: "Remote standard",
    asideTitle: "Online should still feel like real coaching",
    asideText:
      "The screen should never lower the standard. The right online setup keeps the pace clear, the student engaged, and the lesson specific.",
    asideFacts: [
      { label: "Best for", value: "Weekly rhythm" },
      { label: "Works well for", value: "Game review and calculation" },
      { label: "Launch status", value: "Opening soon" },
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
      intro: "Simple choices, clear rhythm, and launch-first availability.",
    },
    pathCards: [
      {
        eyebrow: "Launch first",
        title: "Starter Session",
        bullets: [
          "One remote lesson to assess level, pace, and coach fit",
          "Best for families who want to test the format before committing to a weekly slot",
          "A clean first step for students entering structured online work",
        ],
        meta: "Single online inquiry",
        note: "First online openings will be released soon",
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
        note: "Priority scheduling opens with launch",
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
        note: "Available after the first online release",
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
    ctaTitle: "Ask about online lesson launch spots",
    ctaText: "If online coaching is the right fit, contact us now and we will reply first when those openings go live.",
    ctaLabel: "Contact about online lessons",
  },
  "/lessons/in-person": {
    eyebrow: "In Person Lessons",
    title: "Board work feels different in the room.",
    intro:
      "For students who focus better face to face, in-person coaching keeps the board, the pace, and the lesson energy sharper. Full lesson launch opens soon.",
    chips: ["NYC-based", "Face-to-face", "Launch spots soon"],
    portraitCaption:
      "Some students understand more quickly when the coach is right there at the board and the lesson pace can shift in real time.",
    asideTag: "In-person fit",
    asideTitle: "Direct coaching can change the pace fast",
    asideText:
      "For certain students, over-the-board instruction creates better focus, stronger habits, and more immediate course correction than a remote setup.",
    asideFacts: [
      { label: "Best for", value: "Board-first learners" },
      { label: "Works well for", value: "Habits and fundamentals" },
      { label: "Launch status", value: "Opening soon" },
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
        eyebrow: "Launch first",
        title: "Board Assessment",
        bullets: [
          "One in-person lesson to see how the student focuses, calculates, and responds live",
          "Best for families who want to evaluate coach fit before choosing a longer rhythm",
          "Useful first step for younger students and board-first learners",
        ],
        meta: "Single in-person inquiry",
        note: "First in-person openings announced soon",
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
        note: "Priority live scheduling opens with launch",
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
        note: "Available after the first live lesson release",
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
    ctaTitle: "Ask about in-person lesson launch spots",
    ctaText: "If face-to-face coaching is the right fit, contact us now and we will let you know when the first in-person openings are released.",
    ctaLabel: "Contact about in-person lessons",
  },
  "/lessons/group": {
    eyebrow: "Group Lessons",
    title: "Small group training, not crowded filler.",
    intro:
      "The right group lesson creates pace, energy, and accountability without losing clarity. Group formats are part of our lesson launch plan and will open soon.",
    chips: ["Small groups", "Better level matching", "Launch spots soon"],
    portraitCaption:
      "A good group lesson does not feel generic. It feels fast, focused, and matched to the students actually in the room.",
    asideTag: "Group standard",
    asideTitle: "Group lessons need better structure than most programs give them",
    asideText:
      "The students should be close enough in level for the lesson to move as one group, but varied enough for the room to stay alive.",
    asideFacts: [
      { label: "Best for", value: "Shared pace" },
      { label: "Works well for", value: "Peer energy and repetition" },
      { label: "Launch status", value: "Opening soon" },
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
        eyebrow: "Launch first",
        title: "Founding Group",
        bullets: [
          "Small first-release group used to set pace and level standards correctly",
          "Best for families who want to join the first clean version of the format",
          "Strong fit for students who like peer energy but still need structure",
        ],
        meta: "Early group interest",
        note: "First small groups will be announced soon",
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
        note: "Priority access opens with launch",
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
        note: "Released after the first group launch",
        cta: "Ask about advanced groups",
      },
    ],
    checklistTitle: "What a strong group format needs",
    checklist: [
      "Students who are close enough in level to move together",
      "A coach who can keep the room active and clean",
      "Clear themes instead of random activity blocks",
      "A launch plan that protects quality before scale",
    ],
    ctaTitle: "Ask about group lesson launch updates",
    ctaText: "If you want early notice on small-group coaching, contact us and we will include you when the first group format opens.",
    ctaLabel: "Contact about group lessons",
  },
  "/lessons/manage": {
    eyebrow: "Manage Your Lessons",
    title: "Current-family lesson support starts here.",
    intro:
      "We are still in launch mode, so the lesson desk is being built now. Until the full system opens, this page is the cleanest path for scheduling, support, and next-step questions.",
    chips: ["Schedule help", "Support requests", "Launch desk soon"],
    portraitCaption:
      "A lesson program feels stronger when support is easy to reach before things become messy.",
    asideTag: "Lesson desk",
    asideTitle: "Direct support first. Full portal after launch.",
    asideText:
      "Until the dedicated lesson management system opens, current and incoming families can use direct support for scheduling changes, coach questions, and coordination.",
    asideFacts: [
      { label: "For", value: "Current and incoming families" },
      { label: "Use it for", value: "Schedule and support" },
      { label: "Launch status", value: "Desk expanding soon" },
    ],
    cards: [
      {
        title: "Scheduling requests",
        text: "Need to ask about lesson timing, availability, or a future slot? This is the right contact path.",
      },
      {
        title: "Coach-fit questions",
        text: "If a family needs to talk through lesson style, level fit, or the right format, support should be easy to reach.",
      },
      {
        title: "Program next steps",
        text: "Use this path for launch questions, continuing lesson interest, or help understanding the best next move.",
      },
    ],
    pathSection: {
      eyebrow: "Support paths",
      title: "Three clean ways to use the lesson desk",
      intro: "Support should feel direct, useful, and easy to route before the full portal opens.",
    },
    pathCards: [
      {
        eyebrow: "New family",
        title: "First Lesson Inquiry",
        bullets: [
          "Use this path if you are choosing between online, in-person, or group lessons",
          "Best for families who want help picking the cleanest starting format",
          "Send age, level, and preferred schedule window to speed up the reply",
        ],
        meta: "New family support",
        note: "Best first contact while lessons are still launching",
        cta: "Ask about lesson fit",
      },
      {
        eyebrow: "Current family",
        title: "Schedule & Coordination",
        bullets: [
          "Use this for timing questions, upcoming availability, and lesson logistics",
          "Helpful when a family needs clarity before the lesson desk fully expands",
          "Strongest path for practical coordination and next-step questions",
        ],
        meta: "Lesson desk support",
        note: "Direct scheduling help available now",
        cta: "Ask about scheduling",
      },
      {
        eyebrow: "Program support",
        title: "Coaching Direction Check-In",
        bullets: [
          "Use this when the family wants to talk about pace, fit, or lesson direction",
          "Good for players moving between formats or preparing for a new training phase",
          "Lets us point the family to the right coach path before things get messy",
        ],
        meta: "Guidance and next steps",
        note: "Support desk continues expanding with launch",
        cta: "Ask for guidance",
      },
    ],
    checklistTitle: "Best use of the lesson support page",
    checklist: [
      "Send the student's age and level",
      "Mention whether the question is about online, in-person, or group lessons",
      "Include scheduling constraints if timing matters",
      "Use Contact and we will route the request properly",
    ],
    ctaTitle: "Contact the lesson desk",
    ctaText: "Use the contact page and tell us whether you need scheduling help, launch information, or private lesson guidance.",
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
  summary: "A planned premium add-on for players who want more than the base event.",
  bullets: [
    "Review critical positions with coach guidance during the tournament day",
    "Turn the event into both a competition experience and a training block",
    "Give ambitious players more value than a standard entry alone",
  ],
  highlight: "Planned as an add-on when the first tournament release opens.",
};

export const upcomingTournaments = [
  {
    id: "first-release",
    dateLabel: "First release",
    statusLabel: "Launching soon",
    timeLabel: "Saturday mornings",
    title: "First tournament date",
    meta: "Open & Beginner format already confirmed",
    summary: "The first public tournament date is being finalized now. Families who reach out early will hear first.",
    availabilityLabel: "Dates announced soon",
    ctaLabel: "Get Notified",
    path: "/contact",
  },
  {
    id: "early-access",
    dateLabel: "Early access",
    statusLabel: "Priority list",
    timeLabel: "9:00 AM to lunch",
    title: "Launch notice for first families",
    meta: "Direct update before the public drop",
    summary: "If you want first notice before the public announcement, contact the team now and we will put you on the early list.",
    availabilityLabel: "Early list open",
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
    text: "Dojo players can add coached work between rounds once the add-on opens.",
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
  "Families can use Contact now if they want first notice when launch opens.",
  "Full registration and payment happen after the first date release.",
];

export const faqItems = [
  {
    question: "Is this good for beginners?",
    answer:
      "Yes. Camp and lesson formats are being built to work for beginners as well as improving students.",
  },
  {
    question: "Are students grouped by level?",
    answer:
      "Yes. Students are grouped by level so the coaching pace and the work make sense for the room.",
  },
  {
    question: "What should my child bring?",
    answer:
      "Bring a water bottle, lunch or snack if needed, and anything staff should know medically.",
  },
  {
    question: "Is prior experience required?",
    answer:
      "No. Beginners are welcome, and we can help point families to the right camp or lesson format.",
  },
  {
    question: "How do lessons work?",
    answer:
      "Lessons can be online, in person, or in small groups. Most sessions are built around real games, analysis, and a clear next step.",
  },
  {
    question: "Is lunch included?",
    answer:
      "Families should plan for lunch or snack needs during camp. Final day notes will confirm the exact schedule and lunch handling.",
  },
  {
    question: "How do I register?",
    answer:
      "Use the Contact page now and we will reply with availability, pricing, and the cleanest next step for your family.",
  },
  {
    question: "How do I join early access?",
    answer:
      "Use the Contact page and ask for camp or lesson early access. We will send the next release information as soon as it opens.",
  },
  {
    question: "What should I include in my message?",
    answer:
      "Include the student age, current level, and whether you are asking about camp or lessons.",
  },
];

export const contactNumbers = [
  {
    label: "Call or text",
    display: "(646) 251-7087",
    href: "tel:+16462517087",
  },
  {
    label: "Alternate line",
    display: "(646) 494-5363",
    href: "tel:+16464945363",
  },
];

export const contactEmails = [
  {
    label: "General inquiries",
    display: "info@chessandtruck.com",
    href: "mailto:info@chessandtruck.com",
  },
];

export const termsPage = {
  eyebrow: "Terms of Service",
  title: "Program terms for families and students",
  intro:
    "These terms explain how CHESS AND TRUCK handles camp and lesson inquiries, payments, cancellations, and participation expectations.",
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
        "Families should choose the most appropriate camp or lesson format before paying. CHESS AND TRUCK may contact a family if a selected option appears inconsistent with the student's level, age, or program fit.",
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
    "CHESS AND TRUCK collects only the information needed to operate camps and lessons, communicate with families, and process secure payments.",
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
