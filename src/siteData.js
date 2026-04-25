export const siteBrand = {
  name: "CHESS AND TRUCK",
  short: "CT",
  city: "New York City",
  tagline: "NYC summer chess camps at 62 E 92nd Street, New York, NY 10128",
  footerNote:
    "Our summer chess program is held June 15 through August 21, with weekday sessions at 62 E 92nd Street, New York, NY 10128.",
};

export const navigationItems = [
  { label: "Home", path: "/" },
  { label: "Camps", path: "/camps" },
  { label: "About", path: "/about" },
  { label: "FAQ", path: "/faq" },
];

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
    signal: "Summer 2026",
    imageKey: "overview",
  },
];

export const campMenuFeature = {
  eyebrow: "Summer camp",
  title: "June 15 - August 21 · Weekdays",
  text:
    "Our summer chess program is held June 15 through August 21, with weekday sessions at 62 E 92nd Street, New York, NY 10128.",
  ctaLabel: "View Full Camp Details",
  ctaPath: "/camps",
};

export const routeMeta = {
  "/": {
    title: "CHESS AND TRUCK | NYC Chess Camps",
    description:
    "NYC summer chess camps at 62 E 92nd Street, New York, NY 10128 from June 15 to August 21, with weekday half-day sessions and practical details for families.",
  },
  "/about": {
    title: "About | CHESS AND TRUCK",
    description:
      "Learn why CHESS AND TRUCK is built for NYC families and how summer camp and direct parent communication are being structured.",
  },
  "/camps": {
    title: "Camps | CHESS AND TRUCK",
    description:
    "See summer camp dates, the 62 E 92nd Street, New York, NY 10128 location, daily format, and what students will do at CHESS AND TRUCK camps.",
  },
  "/camps/book": {
    title: "Camp Booking | CHESS AND TRUCK",
    description:
    "Choose a summer camp option, add family details, and continue to secure checkout for CHESS AND TRUCK camps at 62 E 92nd Street, New York, NY 10128.",
  },
  "/camps/confirmed": {
    title: "Camp Confirmation | CHESS AND TRUCK",
    description:
      "Review your CHESS AND TRUCK camp payment confirmation, receipt details, and the next step after Stripe checkout.",
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
    "NYC summer chess camps at 62 E 92nd Street, New York, NY 10128 with dates, format, daily structure, and clear next steps for families.",
  },
  "/events/chess-and-truck-tournament": {
    title: "Summer Camp | CHESS AND TRUCK",
    description:
    "See the summer camp format, 62 E 92nd Street, New York, NY 10128 location, daily structure, and camp details for CHESS AND TRUCK.",
  },
  "/private-lessons": {
    title: "Lessons | CHESS AND TRUCK",
    description:
      "Chess lessons in NYC and online with game review, structured coaching, and clear lesson options for beginner and improving students.",
  },
  "/lessons/online": {
    title: "Online Lessons | CHESS AND TRUCK",
    description:
      "Online chess lessons for students who want focused coaching, cleaner structure, and a clear private lesson path.",
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
      "Get answers about summer camp, student fit, what to bring, and how to get the next step.",
  },
  "/contact": {
    title: "Contact | CHESS AND TRUCK",
    description:
      "Reach the CHESS AND TRUCK team by phone, email, or the contact form for camp questions.",
  },
  "/register": {
    title: "Contact | CHESS AND TRUCK",
    description:
      "Contact CHESS AND TRUCK for camp availability, pricing, and the next step.",
  },
  "/terms": {
    title: "Terms of Service | CHESS AND TRUCK",
    description:
      "Review CHESS AND TRUCK terms covering camp inquiries, payments, cancellations, and program participation.",
  },
  "/privacy": {
    title: "Privacy Policy | CHESS AND TRUCK",
    description:
      "See how CHESS AND TRUCK uses contact and payment-related information for camp and family communication.",
  },
};

export const featuredTournament = {
  slug: "summer-camp",
  title: "Summer Chess Camp",
  city: "62 E 92nd Street, New York, NY 10128",
  scheduleLabel: "June 15 - August 21 · Weekdays",
  formatLabel: "9:00 AM - 12:00 PM",
  pricingLabel: "Camp details available now",
  venueLabel: "62 E 92nd Street, New York, NY 10128",
  shortSummary: "Summer camp at 62 E 92nd Street, New York, NY 10128. Daily lessons, guided games, and clear structure.",
  longSummary:
    "Our summer chess program is held June 15 through August 21, with weekday sessions at 62 E 92nd Street, New York, NY 10128.",
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
  intro: "Weekday summer camp with FIDE Masters at 62 E 92nd Street, New York, NY 10128.",
  heroFacts: [
    { label: "Dates", value: "June 15 - August 21 (weekdays)" },
    { label: "Location", value: "62 E 92nd Street, New York, NY 10128" },
    { label: "Age range", value: "Ages 4 - 17" },
    { label: "Levels", value: "Beginner and Advance Players" },
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
    { label: "Dates", value: "June 15 - August 21 (weekdays)" },
    { label: "Location", value: "62 E 92nd Street, New York, NY 10128" },
    { label: "Levels", value: "Beginner and Advance Players" },
    { label: "Age range", value: "Ages 4 - 17" },
  ],
  portraitCaption: "Simple camp booking with real chess structure.",
  asideTag: "Summer 2026",
  asideTitle: "Camp plan",
  asideText:
    "Morning camp at 62 E 92nd Street, New York, NY 10128 with FIDE Masters, warm-up games, snack time, rated matches, and chess activities.",
  asideFacts: [
    { label: "Schedule", value: "9:00 AM to 12:00 PM" },
    { label: "Coaches", value: "FIDE Masters" },
    { label: "Contact", value: "Contact us" },
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
    { title: "Dates", text: "June 15 - August 21 (weekdays)" },
    { title: "Time", text: "9:00 AM to 12:00 PM" },
    { title: "Age range", text: "Ages 4 - 17" },
    { title: "Rated matches", text: "Included during camp sessions" },
    { title: "Skill levels", text: "Beginner-friendly with level grouping" },
    { title: "Contact", text: "Contact us for availability and next steps" },
  ],
  bookingSection: {
    eyebrow: "Camp booking",
    title: "Book now",
    intro: "",
    note: "",
  },
  bookingCards: [
    {
      id: "full-week",
      eyebrow: "Weekly camp",
      title: "Full Week Camp",
      price: "$450 per week",
      defaultSchedulePreference: "Week of June 15",
      details: [
        "Five camp days from 9:00 AM to 12:00 PM",
        "Best value for a full block",
      "Lessons, rated matches, and chess activities at 62 E 92nd Street, New York, NY 10128",
      ],
      availability: "Limited group size",
      cta: "Book full week",
    },
    {
      id: "single-day",
      eyebrow: "Flexible option",
      title: "Single Day",
      price: "$100 per day",
      defaultSchedulePreference: "Monday, June 15",
      details: [
        "One camp session from 9:00 AM to 12:00 PM",
        "Easy for changing summer schedules",
      "Lessons, rated matches, and chess activities at 62 E 92nd Street, New York, NY 10128",
      ],
      availability: "Limited group size",
      cta: "Book single day",
    },
  ],
  bookingSchedule: [
    {
      id: "camp-day-1",
      date: "Monday, June 15th, 2026",
      relativeLabel: "Weekday session",
      time: "9:00 AM",
      title: "Summer Camp Day",
    subtitle: "3 hours of camp at 62 E 92nd Street, New York, NY 10128",
      price: "$100.00",
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
    subtitle: "3 hours of camp at 62 E 92nd Street, New York, NY 10128",
      price: "$100.00",
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
    subtitle: "3 hours of camp at 62 E 92nd Street, New York, NY 10128",
      price: "$100.00",
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
    subtitle: "3 hours of camp at 62 E 92nd Street, New York, NY 10128",
      price: "$100.00",
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
    subtitle: "3 hours of camp at 62 E 92nd Street, New York, NY 10128",
      price: "$100.00",
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
    eyebrow: "Sample day",
    title: "Schedule",
    intro: "9:00 AM to 12:00 PM structure for camp days.",
  },
  sampleSchedule: [
    {
      time: "9:00 AM",
      title: "Drop off and warm up games",
      text: "Students arrive, settle in, and start with warm-up games.",
    },
    {
      time: "9:30 AM",
      title: "Chess lesson with FIDE Masters",
      text: "Coach-led instruction with FIDE Masters.",
    },
    {
      time: "10:15 AM",
      title: "Playground and park play / activities",
      text: "Outdoor break with playground and park activities.",
    },
    {
      time: "11:00 AM",
      title: "Snack time",
      text: "Quick reset and snack break.",
    },
    {
      time: "11:15 AM",
      title: "Chess lessons, rated games, and chess activities",
      text: "Lessons with FIDE Masters, rated games, puzzles, bughouse, and online play through 12:00 PM.",
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
    eyebrow: "Camp FAQ",
    title: "Quick answers",
    intro: "The basics parents ask first.",
  },
  faqs: [
    {
      question: "Is this good for beginners?",
      answer: "Yes. Beginners are welcome, and students are grouped as cleanly as possible by level.",
    },
    {
      question: "Who teaches the camp?",
      answer: "Chess lessons are taught with FIDE Masters.",
    },
    {
      question: "What should students bring?",
      answer: "Bring a water bottle, a snack, and anything listed in the registration note.",
    },
    {
      question: "Can I book one day instead of a full week?",
      answer: "Yes. You can book a single day or reserve a full week directly on the page.",
    },
  ],
  ctaTitle: "Ask about summer camp",
  ctaText: "Contact us for availability, pricing, and the next step.",
};

export const campBookingPage = {
  eyebrow: "Camp booking",
  title: "Choose an option and continue to secure checkout",
  intro: "Pick an option, add family details, and continue to Stripe.",
  chips: ["Date selection", "Additional services", "Secure checkout"],
  formTitle: "Camp booking details",
  formIntro: "Pick your date, add extras, and continue to secure checkout.",
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
  supportText: "Contact us if you have any questions, reservations or concerns.",
  siblingNote: "Booking for more than one student? Please submit a separate booking for each child.",
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
        eyebrow: "Start here",
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
        eyebrow: "Start here",
        title: "Weekend Prep Block",
        bullets: [
          "Short focused format for players who want a concentrated prep experience",
          "A clean first option for families who want something sharper than a general camp week",
          "Useful for players who want a more competitive training focus",
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
    "Chess and Truck makes it easy for New York City families to find a high-quality chess camp -- without the guesswork. Clear options, seamless communication, and expert coaching your child will actually benefit from.",
    "Our handpicked team of premium coaches brings 25+ years of combined NYC experience, blending structured learning with a genuinely fun, engaging approach kids love.",
    "Real progress. Real coaches. Real results.",
  ],
  heroFacts: [
    { label: "Focus", value: "Scholastic chess" },
    { label: "City", value: "New York City" },
    { label: "Programs", value: "Summer camps" },
    { label: "Status", value: "Now open" },
  ],
  introSection: {
    eyebrow: "What matters most to families",
    title: "What Matters Most to Families",
    intro: "We prioritize clarity, structure, and meaningful instruction -- before anything else.",
  },
  pillars: [
    {
      title: "Transparent program design",
      text: "All essential details -- schedule, setting, and daily structure -- are clear from the outset.",
    },
    {
      title: "Substantive instruction",
      text: "Each camp day is designed to develop analytical thinking and measurable improvement.",
    },
    {
      title: "Clear lines of communication",
      text: "Parents stay informed and supported, without needing to chase information.",
    },
  ],
  whySection: {
    eyebrow: "Why parents trust it",
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
    { title: "Dates", text: "Contact us for current tournament dates" },
    { title: "Time", text: "Saturday mornings, 9:00 AM to lunch" },
    { title: "Service", text: "Rated and beginner-friendly divisions" },
    { title: "Entry", text: "Registration from $55 planned" },
    { title: "Contact", text: "Contact us now" },
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
      text: "Families can use Contact us now for current tournament information and next steps.",
    },
  ],
  ctaTitle: "Want tournament details?",
  ctaText:
    "Contact us now and we will send section guidance, registration details, and the next step.",
};

export const tournamentPage = {
  eyebrow: "Featured Tournament",
  title: "Chess & Truck Tournament",
  intro: "The format is set. Contact us for current tournament details and the next step.",
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
    { label: "Camp dates", value: "June 15 - August 21 (weekdays)" },
    { label: "Location", value: "62 E 92nd Street, New York, NY 10128" },
    { label: "Camp time", value: "9:00 AM - 12:00 PM" },
    { label: "Support", value: "Call, text, or email" },
  ],
  quickCards: [
    {
      title: "Beginner friendly?",
      text: "Yes. Camp works well for beginners and improving players.",
    },
    {
      title: "Grouped by level?",
      text: "Yes. Students are grouped by level so the pace and games make sense.",
    },
    {
      title: "Not sure yet?",
      text: "Call, text, or email us and we will help you decide if camp is the right fit.",
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
  title: "Contact the team about camp.",
  intro: "",
  heroFacts: [
    { label: "Phone lines", value: "(646) 251-7087 / (646) 494-5363" },
    { label: "Email", value: "info@chessandtruck.com" },
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
  eyebrow: "Services",
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
      "Contact us for lesson scheduling, coach questions, or help choosing the right next step.",
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
    dateLabel: "Contact us",
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
  "Families can use Contact us now if they want the latest tournament details.",
  "Full registration and payment happen after the date and section are confirmed.",
];

export const faqItems = [
  {
    question: "What ages is camp for?",
    answer:
      "Camp is designed for ages 4 - 17.",
  },
  {
    question: "Is this good for beginners?",
    answer:
      "Yes. Camp is built for beginners as well as improving players who want stronger structure.",
  },
  {
    question: "Are students grouped by level?",
    answer:
      "Yes. Students are grouped by level so the coaching, games, and activities feel right for the group.",
    },
  {
    question: "What is a typical camp day like?",
    answer:
      "Camp runs from 9:00 AM to 12:00 PM and includes coach-led instruction, rated games, park activities, snack time, and structured chess work.",
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
