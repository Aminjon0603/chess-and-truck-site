export const siteBrand = {
  name: "CHESS AND TRUCK",
  short: "CT",
  city: "New York City",
  tagline: "NYC scholastic chess events launching soon",
  footerNote:
    "Open & Beginner Saturday tournaments for New York City players. First public dates are being finalized now.",
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
      "Open and Beginner scholastic chess tournaments launching soon in New York City, with clear format details and direct family support.",
  },
  "/about": {
    title: "About | CHESS AND TRUCK",
    description:
      "Learn how CHESS AND TRUCK is building a cleaner New York City tournament experience for ambitious players and families.",
  },
  "/events": {
    title: "Events | CHESS AND TRUCK",
    description:
      "See the CHESS AND TRUCK launch format, division structure, and what is already confirmed before the first dates are announced.",
  },
  "/events/chess-and-truck-tournament": {
    title: "Chess & Truck Tournament | CHESS AND TRUCK",
    description:
      "See the confirmed format, Saturday schedule, sections, and launch details for the Chess & Truck Tournament.",
  },
  "/faq": {
    title: "FAQ | CHESS AND TRUCK",
    description:
      "Get answers about USCF requirements, Open and Beginner sections, payment, medical details, and tournament support.",
  },
  "/contact": {
    title: "Contact | CHESS AND TRUCK",
    description:
      "Reach the CHESS AND TRUCK tournament team by email or the contact form before registration or tournament day.",
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
  scheduleLabel: "Saturday mornings, 9:00 AM to lunch",
  formatLabel: "Open & Beginner",
  pricingLabel: "Registration from $55",
  venueLabel: "New York City venue details shared with registered families",
  shortSummary: "Open & Beginner. Saturday mornings. First dates announced soon.",
  longSummary: "The format is locked in. The first public release is next.",
  basePrice: 55,
  dojoPrice: 155,
};

export const footerLegalLinks = [
  { label: "Terms of Service", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

export const heroStats = [
  {
    value: "2 sections",
    label: "Open & Beginner",
  },
  {
    value: "9 AM to lunch",
    label: "Saturday morning format",
  },
  {
    value: "Launching soon",
    label: "First dates released soon",
  },
];

export const homePage = {
  eyebrow: "NYC scholastic chess launch",
  title: "Launch is close. Be early.",
  intro: "Open & Beginner Saturday tournaments for New York City players. The first dates drop soon.",
  valueCards: [
    {
      title: "Open Section",
      text: "Rated play for competitors who already hold an active USCF ID.",
    },
    {
      title: "Beginner Section",
      text: "A cleaner first tournament step for players who are still building confidence.",
    },
    {
      title: "Dojo Option",
      text: "An additional coached layer around the tournament morning for ambitious players.",
    },
  ],
  pageCards: [
    {
      title: "See the Format",
      text: "What is already confirmed before launch.",
      path: "/events/chess-and-truck-tournament",
    },
    {
      title: "Get Early Access",
      text: "Reach out now and hear first when dates go live.",
      path: "/contact",
    },
    {
      title: "Ask First",
      text: "Email the team or use the contact form.",
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
    text: "Email and the contact form stay easy to reach.",
  },
];

export const aboutPage = {
  eyebrow: "About CHESS AND TRUCK",
  title: "Serious chess. Clear communication.",
  intro: "Built for families who want a serious tournament launch without chaos.",
  pillars: [
    {
      title: "Clear communication",
      text: "Fast answers. No guessing.",
    },
    {
      title: "Format-first",
      text: "Families can understand the structure before the first date is released.",
    },
    {
      title: "Parent confidence",
      text: "Families know what is locked in before they commit.",
    },
  ],
  storyBlocks: [
    {
      title: "Who this is for",
      text: "Scholastic players and families who want a serious, organized event from day one.",
    },
    {
      title: "What families should feel",
      text: "Clear. Prepared. Ready to join as soon as dates open.",
    },
  ],
  standards: [
    "Clear division guidance before public launch",
    "Direct support channels before and after sign-up",
    "Tournament expectations explained before families pay",
    "Copy written for families, not internal jargon",
  ],
};

export const eventsPage = {
  eyebrow: "Events & Tournaments",
  title: "The format is ready. The dates are next.",
  intro: "We are in launch mode now. The first public release is coming soon.",
  supportCards: [
    {
      title: "What is already confirmed?",
      text: "Open & Beginner sections, a Saturday morning window, and a cleaner family flow.",
    },
    {
      title: "What opens first?",
      text: "The first tournament date, early-access notice, and a full registration window.",
    },
    {
      title: "How do families hear first?",
      text: "Use Contact now and we will notify you as soon as the first release is live.",
    },
  ],
};

export const tournamentPage = {
  eyebrow: "Featured Tournament",
  title: "Chess & Truck Tournament",
  intro: "The format is set. The first public tournament date is being finalized now.",
  atAGlance: [
    { label: "Location", value: "New York City" },
    { label: "Format", value: "Open & Beginner sections" },
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
  title: "Fast answers before launch",
  intro: "USCF, sections, schedule, launch timing.",
};

export const contactPage = {
  eyebrow: "Contact",
  title: "Get on the list fast",
  intro: "Email the team or use the contact form. We will update early families first.",
  supportCards: [
    {
      title: "Before launch",
      text: "Questions about fit, section, USCF, or first-release timing.",
    },
    {
      title: "Operational support",
      text: "Launch updates, logistics, and follow-up.",
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
      "Once the first date is released, the family completes the registration form first and then moves to Stripe for payment.",
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
      "Use the contact email or the contact form for support, logistics, and early-access questions.",
  },
];

export const contactNumbers = [];

export const contactEmails = [
  {
    label: "General inquiries",
    display: "info@chessandtruck.com",
    href: "mailto:info@chessandtruck.com",
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
