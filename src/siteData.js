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

export const routeMeta = {
  "/": {
    title: "CHESS AND TRUCK | NYC Scholastic Chess Tournaments",
    description:
      "Open and Beginner scholastic chess tournaments in New York City with direct family support, clear event details, and secure online registration.",
  },
  "/about": {
    title: "About | CHESS AND TRUCK",
    description:
      "Learn how CHESS AND TRUCK structures New York City chess tournaments for ambitious players and families who want clarity before tournament day.",
  },
  "/events": {
    title: "Events | CHESS AND TRUCK",
    description:
      "View upcoming CHESS AND TRUCK tournaments, event dates, division details, and the registration path for New York City families.",
  },
  "/events/chess-and-truck-tournament": {
    title: "Chess & Truck Tournament | CHESS AND TRUCK",
    description:
      "See tournament format, schedule, sections, pricing, Master Training Dojo options, and registration details for the Chess & Truck Tournament.",
  },
  "/faq": {
    title: "FAQ | CHESS AND TRUCK",
    description:
      "Get answers about USCF requirements, Open and Beginner sections, payment, medical details, and tournament support.",
  },
  "/contact": {
    title: "Contact | CHESS AND TRUCK",
    description:
      "Reach the CHESS AND TRUCK tournament team by phone, WhatsApp, email, or the contact form before registration or tournament day.",
  },
  "/register": {
    title: "Register | CHESS AND TRUCK",
    description:
      "Complete player, parent, emergency, and medical details first, then continue to secure Stripe checkout for CHESS AND TRUCK.",
  },
  "/terms": {
    title: "Terms of Service | CHESS AND TRUCK",
    description:
      "Review tournament registration terms, payment terms, cancellations, transfers, and event participation rules for CHESS AND TRUCK.",
  },
  "/privacy": {
    title: "Privacy Policy | CHESS AND TRUCK",
    description:
      "See how CHESS AND TRUCK uses registration, contact, and payment-related information for tournament operations and family communication.",
  },
};

export const featuredTournament = {
  slug: "chess-and-truck-tournament",
  title: "Chess & Truck Tournament",
  city: "New York City",
  scheduleLabel: "Saturday, 9:00 AM to lunch",
  formatLabel: "Open & Beginner",
  pricingLabel: "Registration from $55",
  venueLabel: "New York City venue details shared with registered families",
  shortSummary: "Open & Beginner. Saturday, 9:00 AM to lunch.",
  longSummary: "Serious NYC scholastic tournaments with clear sections and fast registration.",
  basePrice: 55,
  dojoPrice: 155,
};

export const footerLegalLinks = [
  { label: "Terms of Service", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

export const heroStats = [
  {
    value: "2 tracks",
    label: "Open and Beginner",
  },
  {
    value: "9 AM start",
    label: "Saturday morning format",
  },
  {
    value: "From $55",
    label: "Secure online registration",
  },
];

export const homePage = {
  eyebrow: "New York City scholastic chess tournaments",
  title: "Serious chess tournaments. No confusion.",
  intro: "Open and Beginner sections. Saturday mornings. Fast registration.",
  valueCards: [
    {
      title: "Open Section",
      text: "Rated play for competitors with an active USCF ID.",
    },
    {
      title: "Beginner Section",
      text: "A cleaner first step for newer tournament players.",
    },
    {
      title: "Dojo Add-On",
      text: "Extra coached work around the tournament day.",
    },
  ],
  pageCards: [
    {
      title: "See the Event",
      text: "Format, schedule, sections, pricing.",
      path: "/events/chess-and-truck-tournament",
    },
    {
      title: "Register",
      text: "Fill the form first. Pay after.",
      path: "/register",
    },
    {
      title: "Ask First",
      text: "Phone, WhatsApp, email, or contact form.",
      path: "/contact",
    },
  ],
  processCards: [
    {
      title: "Review the event",
      text: "See the essentials fast.",
    },
    {
      title: "Choose the right section",
      text: "Open or Beginner.",
    },
    {
      title: "Complete registration and payment",
      text: "Form first. Checkout after.",
    },
  ],
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
    text: "WhatsApp, email, and contact stay easy to reach.",
  },
];

export const aboutPage = {
  eyebrow: "About CHESS AND TRUCK",
  title: "Serious chess. Clear communication.",
  intro: "Built for families who want competition without chaos.",
  pillars: [
    {
      title: "Clear communication",
      text: "Fast answers. No guessing.",
    },
    {
      title: "Tournament-first",
      text: "Sections, schedule, and pricing are easy to see.",
    },
    {
      title: "Parent confidence",
      text: "Families know what happens before they pay.",
    },
  ],
  storyBlocks: [
    {
      title: "Who this is for",
      text: "Scholastic players and families who want a serious, organized event.",
    },
    {
      title: "What families should feel",
      text: "Clear. Prepared. Worth registering for.",
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
  title: "Pick a date. Register fast.",
  intro: "Same structure. Same sections. Same clean process.",
  supportCards: [
    {
      title: "Who is this event for?",
      text: "Open for rated players. Beginner for newer players.",
    },
    {
      title: "What has to be ready?",
      text: "USCF ID for Open. Parent, emergency, and medical details for the form.",
    },
    {
      title: "How does payment work?",
      text: "Form first. Secure payment after.",
    },
  ],
};

export const tournamentPage = {
  eyebrow: "Featured Tournament",
  title: "Chess & Truck Tournament",
  intro: "Saturday tournament play for serious competitors and newer players alike.",
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
  title: "Fast answers before you register",
  intro: "USCF, sections, payment, schedule.",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Reach the team fast",
  intro: "Phone, WhatsApp, email, or the contact form.",
  supportCards: [
    {
      title: "Before registration",
      text: "Questions about fit, section, or USCF.",
    },
    {
      title: "Operational support",
      text: "Timing, logistics, and follow-up.",
    },
    {
      title: "Direct response paths",
      text: "Choose the fastest way to reach us.",
    },
  ],
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
  summary: "Add guided work and analysis between rounds.",
  bullets: [
    "Review critical positions with coach guidance during the tournament day",
    "Turn the event into both a competition experience and a training block",
    "Give ambitious players more value than a standard entry alone",
  ],
  highlight: "Available with the premium tournament package.",
};

export const upcomingTournaments = [
  {
    id: "apr-18-2026",
    dateLabel: "Saturday, April 18th, 2026",
    statusLabel: "Registration Open",
    timeLabel: "9:00 AM",
    title: "Chess & Truck Tournament",
    meta: "3 hours @ $55.00",
    summary: "Open and Beginner sections. Done by lunch.",
    availabilityLabel: "Registration available",
  },
  {
    id: "may-02-2026",
    dateLabel: "Saturday, May 2nd, 2026",
    statusLabel: "Next cycle",
    timeLabel: "9:00 AM",
    title: "Chess & Truck Tournament",
    meta: "3 hours @ $55.00",
    summary: "Same structure. Same price. Same clean format.",
    availabilityLabel: "Next registration cycle open",
  },
  {
    id: "may-16-2026",
    dateLabel: "Saturday, May 16th, 2026",
    statusLabel: "New date",
    timeLabel: "9:00 AM",
    title: "Chess & Truck Tournament",
    meta: "3 hours @ $55.00",
    summary: "Another Saturday date for the same event format.",
    availabilityLabel: "New date available",
  },
];

export const scheduleItems = [
  {
    title: "Arrival and check-in",
    text: "Arrive early for check-in and pairings.",
  },
  {
    title: "Round start",
    text: "Rounds begin at 9:00 AM.",
  },
  {
    title: "Between-round support",
    text: "Dojo players get coached work between rounds.",
  },
  {
    title: "Wrap-up",
    text: "Most tournament mornings end around noon.",
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

export const termsPage = {
  eyebrow: "Terms of Service",
  title: "Tournament registration terms for families and players",
  intro:
    "These terms explain how CHESS AND TRUCK handles event registration, payment, cancellations, and participation expectations.",
  sections: [
    {
      title: "Registration accuracy",
      body:
        "Families are responsible for submitting accurate player, parent, emergency, and medical information. Open section players must provide a valid active USCF ID at registration time.",
    },
    {
      title: "Payment and confirmation",
      body:
        "Registration is submitted through the website first and payment is completed through Stripe. A registration is treated as paid only after Stripe confirms payment successfully.",
    },
    {
      title: "Section placement",
      body:
        "Families should choose the most appropriate section before paying. CHESS AND TRUCK may contact a family if the selected section appears inconsistent with the player's tournament readiness or eligibility.",
    },
    {
      title: "Cancellations and changes",
      body:
        "Requests to cancel or change a registration should be sent to the tournament team as early as possible. Approved changes depend on timing, event capacity, and operational feasibility.",
    },
    {
      title: "Tournament conduct",
      body:
        "Players, parents, and guests are expected to follow event-day instructions, respect tournament staff, and maintain an environment that supports fair competition and player focus.",
    },
    {
      title: "Contact",
      body:
        "Questions about registration, eligibility, or tournament terms may be sent through the Contact page before payment is made.",
    },
  ],
};

export const privacyPage = {
  eyebrow: "Privacy Policy",
  title: "How registration and contact information is used",
  intro:
    "CHESS AND TRUCK collects only the information needed to operate tournaments, communicate with families, and process secure payments.",
  sections: [
    {
      title: "Information collected",
      body:
        "The site may collect contact details, player information, parent and emergency contact information, and medical notes that are relevant to tournament-day safety and communication.",
    },
    {
      title: "How information is used",
      body:
        "Registration information is used for event operations, support, eligibility review, emergency readiness, and tournament communication. Contact form submissions are used to respond to family questions and support needs.",
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
        "Registration and contact records may be retained for tournament operations, support follow-up, and event administration. Families can contact the tournament team if they need help reviewing or correcting submitted information.",
    },
  ],
};
