export const siteBrand = {
  name: "CHESS AND TRUCK",
  short: "CT",
  city: "New York City",
  tagline: "New York City scholastic chess tournaments",
  footerNote:
    "Scholastic chess tournaments with clear family communication, organized event-day structure, and secure online registration.",
};

export const navigationItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export const featuredTournament = {
  slug: "chess-and-truck-tournament",
  title: "Chess & Truck Tournament",
  city: "New York City",
  scheduleLabel: "Saturday mornings, 9:00 AM to approximately 12:00 PM",
  formatLabel: "Open and Beginner sections",
  pricingLabel: "Registration from $55",
  venueLabel: "New York City venue details shared with registered families",
  shortSummary:
    "A Saturday-format New York City tournament with Open and Beginner sections, direct family support, and a clean registration process.",
  longSummary:
    "Families can review section fit, requirements, pricing, schedule, and support contacts before completing registration.",
  basePrice: 55,
  dojoPrice: 155,
};

export const heroStats = [
  {
    value: "Two divisions",
    label: "Open for rated players and Beginner for players who are still building tournament experience.",
  },
  {
    value: "Saturday format",
    label: "A focused morning schedule that feels competitive without turning into an all-day event.",
  },
  {
    value: "Secure checkout",
    label: "Families complete the form first and move to Stripe only after the registration details are complete.",
  },
];

export const homePage = {
  eyebrow: "New York City scholastic chess tournaments",
  title: "Competitive chess events for ambitious players and families who value clarity",
  intro:
    "CHESS AND TRUCK presents New York City tournament mornings with clearer sections, stronger communication, and a more polished registration experience.",
  valueCards: [
    {
      title: "Serious competition",
      text: "Open and Beginner sections are presented clearly, so the tournament feels competitive without becoming confusing for parents.",
    },
    {
      title: "Family-ready communication",
      text: "Support details, eligibility notes, and contact channels are visible early so families know where to go for answers.",
    },
    {
      title: "Cleaner registration flow",
      text: "Player details, parent contacts, and payment steps are structured in a way that feels calm and professional.",
    },
  ],
  pageCards: [
    {
      title: "Rated division",
      text: "For players who are ready for the Open section and already understand tournament pace and responsibility.",
      path: "/events/chess-and-truck-tournament",
    },
    {
      title: "Beginner division",
      text: "For players who need a more welcoming first tournament step without the pressure of rated entry.",
      path: "/events/chess-and-truck-tournament",
    },
    {
      title: "Tournament schedule",
      text: "A Saturday structure that respects family time while still feeling like a serious competitive morning.",
      path: "/events",
    },
    {
      title: "Parent communication",
      text: "Before-event logistics, WhatsApp support, and eligibility questions all have a clear path.",
      path: "/contact",
    },
    {
      title: "Direct registration",
      text: "Families can move from event details into a full registration form and then complete secure Stripe payment.",
      path: "/register",
    },
    {
      title: "Tournament support",
      text: "When a family is unsure about fit, requirements, or timing, support channels are already in place.",
      path: "/faq",
    },
  ],
  processCards: [
    {
      title: "Review the event",
      text: "Families see the format, divisions, service levels, and what to prepare before they ever open the form.",
    },
    {
      title: "Choose the right section",
      text: "The difference between Open and Beginner is explained clearly enough that the decision feels simple.",
    },
    {
      title: "Complete registration and payment",
      text: "Player details are collected first. Stripe handles the payment step only after the form is complete.",
    },
  ],
};

export const carouselSlides = [
  {
    label: "Open Section",
    title: "For players who are ready for rated competition",
    text: "The Open division is built for players with an active USCF membership who are ready for a stronger competitive environment.",
  },
  {
    label: "Beginner Section",
    title: "A friendlier first step into tournament play",
    text: "The Beginner division lowers the barrier for newer players while still giving families a real tournament-day experience.",
  },
  {
    label: "Tournament Morning",
    title: "A schedule that feels serious without taking over the whole day",
    text: "Saturday rounds begin at 9:00 AM and are structured to keep the event focused, organized, and family-manageable.",
  },
  {
    label: "Family Support",
    title: "Direct communication stays part of the experience",
    text: "WhatsApp, email, and the contact form remain easy to reach before registration and before tournament day.",
  },
];

export const aboutPage = {
  eyebrow: "About CHESS AND TRUCK",
  title: "Structured for families who want serious competition, direct support, and a polished tournament-day experience",
  intro:
    "CHESS AND TRUCK is positioned around serious scholastic competition while staying clear and approachable for parents.",
  pillars: [
    {
      title: "Professional communication",
      text: "The tone stays direct, composed, and useful. Families should feel informed, not overwhelmed.",
    },
    {
      title: "Tournament-first planning",
      text: "Important details are organized around division fit, preparation, support, and event-day logistics.",
    },
    {
      title: "Stronger parent confidence",
      text: "Clear requirements and visible support channels help parents commit without second-guessing what happens next.",
    },
  ],
  storyBlocks: [
    {
      title: "Who this is for",
      text: "The program is designed for scholastic players, tournament-ready families, and parents who want strong organization before tournament day arrives.",
    },
    {
      title: "What families should feel",
      text: "The experience should feel prepared, responsive, and credible from the first visit through payment confirmation.",
    },
  ],
  standards: [
    "Clear division guidance before registration begins",
    "Direct support channels before and after sign-up",
    "Tournament expectations explained before payment",
    "Copy written for families, not internal jargon",
  ],
};

export const eventsPage = {
  eyebrow: "Events & Tournaments",
  title: "Upcoming tournaments should make the next step obvious",
  intro:
    "Families should quickly understand the format, player fit, schedule, and registration path before committing to an event.",
  supportCards: [
    {
      title: "Who is this event for?",
      text: "The tournament clearly explains the difference between the Open and Beginner sections in plain language.",
    },
    {
      title: "What has to be ready?",
      text: "USCF requirements, emergency details, parent contact information, and medical notes are all explained before checkout.",
    },
    {
      title: "How does payment work?",
      text: "Registration is completed through the form first, then the family moves into a secure Stripe payment flow.",
    },
  ],
};

export const tournamentPage = {
  eyebrow: "Featured Tournament",
  title: "Chess & Truck Tournament",
  intro:
    "A Saturday-format tournament for ambitious scholastic players and families stepping into tournament chess for the first time.",
  atAGlance: [
    { label: "Location", value: "New York City" },
    { label: "Format", value: "Open and Beginner sections" },
    { label: "Schedule", value: "Saturday mornings from 9:00 AM" },
    { label: "Payment", value: "Stripe checkout after registration" },
  ],
  checklist: [
    "Choose the correct section before payment",
    "Prepare a USCF ID if registering for the Open section",
    "Include parent, emergency, and medical details in the form",
    "Use Contact if you want to confirm fit before registering",
  ],
};

export const faqPage = {
  eyebrow: "FAQ",
  title: "Answers families usually want before they register",
  intro:
    "Keep the practical questions in one place so players and parents do not have to guess their way through the process.",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Reach the tournament team without hunting for the right person",
  intro:
    "Use WhatsApp, email, or the message form if you want help with section fit, registration details, eligibility, or tournament logistics.",
  supportCards: [
    {
      title: "Before registration",
      text: "Best for questions about division fit, USCF requirements, or whether the event suits a player's current level.",
    },
    {
      title: "Operational support",
      text: "Use contact channels for timing, follow-up, or practical issues that should not wait until tournament morning.",
    },
    {
      title: "Direct response paths",
      text: "Phone, WhatsApp, and email stay visible so families can choose the fastest path for their question.",
    },
  ],
};

export const registerPage = {
  eyebrow: "Registration",
  title: "Complete the form first, then continue to secure checkout",
  intro:
    "The registration form gathers player, parent, emergency, and medical details before sending the family to Stripe for payment.",
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
    description:
      "For players who are ready for rated competition and already have experience with structured tournament play.",
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
    description:
      "For players who are newer to tournament chess and need a calmer, more accessible first competitive experience.",
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
    description:
      "Tournament registration with section placement, pairings, and event-day participation.",
    amount: 55,
  },
  {
    id: "entry-dojo",
    label: "Tournament Entry + Master Training Dojo",
    description:
      "Tournament entry plus guided analysis and structured chess work around the event.",
    amount: 155,
  },
];

export const masterTrainingDojo = {
  eyebrow: "Master Training Dojo",
  title: "A focused training layer around tournament day",
  summary:
    "Master Training Dojo adds guided analysis, structured work between rounds, and a stronger learning rhythm around the event.",
  bullets: [
    "Review critical positions with coach guidance during the tournament day",
    "Turn the event into both a competition experience and a training block",
    "Give ambitious players more value than a standard entry alone",
  ],
  highlight: "Available as part of the premium tournament package.",
};

export const upcomingTournaments = [
  {
    id: "apr-18-2026",
    dateLabel: "Saturday, April 18th, 2026",
    statusLabel: "Registration Open",
    timeLabel: "9:00 AM",
    title: "Chess & Truck Tournament",
    meta: "3 hours @ $55.00",
    summary:
      "Open and Beginner sections. Saturday morning format designed to finish around lunch.",
    spotsLeft: "71 spots left",
  },
  {
    id: "may-02-2026",
    dateLabel: "Saturday, May 2nd, 2026",
    statusLabel: "Next cycle",
    timeLabel: "9:00 AM",
    title: "Chess & Truck Tournament",
    meta: "3 hours @ $55.00",
    summary:
      "A repeat tournament date for families who want the same structure, support, and pricing.",
    spotsLeft: "78 spots left",
  },
  {
    id: "may-16-2026",
    dateLabel: "Saturday, May 16th, 2026",
    statusLabel: "New date",
    timeLabel: "9:00 AM",
    title: "Chess & Truck Tournament",
    meta: "3 hours @ $55.00",
    summary:
      "Another Saturday event date for players who prefer a later registration window.",
    spotsLeft: "64 spots left",
  },
];

export const scheduleItems = [
  {
    title: "Arrival and check-in",
    text: "Families arrive before round one so pairings, section placement, and tournament-day logistics stay smooth.",
  },
  {
    title: "Round start",
    text: "Play begins at 9:00 AM with a morning format designed to stay focused and efficient.",
  },
  {
    title: "Between-round support",
    text: "Players enrolled in the Master Training Dojo receive guided chess work and analysis during the event.",
  },
  {
    title: "Wrap-up",
    text: "Most tournament mornings finish around noon, keeping the experience serious but manageable for families.",
  },
];

export const policyItems = [
  "Open section players must have an active USCF membership before the event.",
  "Beginner section players do not need a USCF membership.",
  "Medical information is required so staff have the safety details they need on tournament day.",
  "Stripe is used for secure online payment after the registration form is completed.",
  "Support questions can be sent through the contact team before registration.",
];

export const faqItems = [
  {
    question: "Do I need a USCF membership to register?",
    answer:
      "Only players in the Open section need an active USCF membership. Beginner section players do not need one.",
  },
  {
    question: "How do I choose between Open and Beginner?",
    answer:
      "Choose Open if the player is already ready for rated competition and has an active USCF ID. Choose Beginner if the player is newer to tournament chess and needs an easier first step.",
  },
  {
    question: "Is the school name required?",
    answer:
      "No. School name is optional and is used only if team scoring becomes relevant.",
  },
  {
    question: "What does the Master Training Dojo include?",
    answer:
      "It adds guided analysis and structured chess work around the tournament, making the day feel more like a combined competition and training experience.",
  },
  {
    question: "When is payment collected?",
    answer:
      "The family completes the registration form first. After the form is validated, they are sent to Stripe to complete payment.",
  },
  {
    question: "Can I add more than one email address?",
    answer:
      "Yes. The form includes an optional field for additional confirmation or follow-up email addresses.",
  },
  {
    question: "What should I include in medical information?",
    answer:
      "Include allergies, medical conditions, medications, or anything tournament staff should know to support the player responsibly.",
  },
  {
    question: "What if I am not sure the player belongs in Open?",
    answer:
      "Contact the tournament team before registering. It is better to confirm fit first than to guess during checkout.",
  },
  {
    question: "How can I reach the tournament team quickly?",
    answer:
      "Use the WhatsApp numbers for the fastest practical communication, or use email and the contact form for support and logistics.",
  },
];

export const contactNumbers = [
  {
    label: "WhatsApp / Phone",
    display: "+1 (718) 314-9084",
    href: "https://wa.me/17183149084",
  },
  {
    label: "WhatsApp / Phone",
    display: "+1 (332) 345-0632",
    href: "https://wa.me/13323450632",
  },
  {
    label: "Phone",
    display: "+1 (917) 394-6147",
    href: "tel:+19173946147",
  },
];

export const contactEmails = [
  {
    label: "Tournament inquiries",
    display: "ikrom.chess@gmail.com",
    href: "mailto:ikrom.chess@gmail.com",
  },
  {
    label: "Operations",
    display: "alexnorth615@gmail.com",
    href: "mailto:alexnorth615@gmail.com",
  },
  {
    label: "Registration support",
    display: "andrea.lamanna1@gmail.com",
    href: "mailto:andrea.lamanna1@gmail.com",
  },
];
