import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  aboutPage,
  academyHomePage,
  afterSchoolPageContent,
  campBookingPage,
  campMenuFeature,
  campMenuItems,
  campOverviewPage,
  campsPageContent,
  coaches,
  comingSoonLessonPages,
  contactEmails,
  contactNumbers,
  contactPage,
  faqPage,
  featuredTournament,
  footerLegalLinks,
  homePage,
  lessonsPageContent,
  lessonMenuFeature,
  lessonMenuItems,
  masterTrainingDojo,
  navigationItems,
  onlineLessonsPage,
  ourTeamPage,
  privateLessonsPage,
  programOverview,
  programPages,
  programs,
  privacyPage,
  registerPage,
  routeMeta,
  sectionOptions,
  serviceLevels,
  siteBrand,
  termsPage,
  tournamentsPageContent,
  upcomingTournaments,
} from "./siteData";
import brandLogo from "./assets/chess-truck-logo.png";
import brandCrest from "./assets/chess-truck-crest.png";
import goldKnight from "./assets/gold-knight.svg";
import heroVideoDesktop from "./assets/hero/hero-chess-1280.mp4";
import heroVideoMobile from "./assets/hero/hero-chess-720sq.mp4";
import heroPosterDesktop from "./assets/hero/hero-chess-1280-poster.webp";
import heroPosterMobile from "./assets/hero/hero-chess-720sq-poster.webp";
import {
  CAMP_REGISTRATION_CLOSED_MESSAGE,
  PROGRAM_STATUS,
  getProgramStatus,
  getRegistrationUnavailableMessage,
  hasOpenConfiguredStatus,
  isProgramOpen,
  programStatuses,
  setRegistrationAvailability,
} from "./lib/programs.js";
import {
  getInterestConsentText,
  validateInterestRequest,
} from "./lib/interestValidation.js";
import {
  getCampDayOptions,
  getCampDayOrder,
  getCampWeekOptions,
  parseAvailabilityResponse,
  setApprovedCampSessions,
} from "./lib/registrationAvailability.js";
import campOnlineVisual from "./assets/camp-online.svg";
import campOverviewVisual from "./assets/camp-overview.svg";
import campPrepVisual from "./assets/camp-prep.svg";
import campTrainingVisual from "./assets/camp-training.svg";
import lessonGroupVisual from "./assets/lesson-group.svg";
import lessonInPersonVisual from "./assets/lesson-inperson.svg";
import lessonManageVisual from "./assets/lesson-manage.svg";
import lessonOnlineVisual from "./assets/lesson-online.svg";
import lessonPhoto from "./assets/private-lesson-visual.svg";
import dojoMark from "./assets/dojo-mark.svg";
import trophyBadge from "./assets/trophy-badge.svg";
import andreaPhoto from "./assets/andrea.jpg";
import onlineHero720 from "./assets/lessons/online-hero-720.webp";
import onlineHero1200 from "./assets/lessons/online-hero-1200.webp";
import onlineHero1800 from "./assets/lessons/online-hero-1800.webp";
import amirPlaceholder400 from "./assets/lessons/coach-amir-placeholder-400.webp";
import amirPlaceholder640 from "./assets/lessons/coach-amir-placeholder-640.webp";
import ctaChess900 from "./assets/lessons/cta-chess-900.webp";
import ctaChess1800 from "./assets/lessons/cta-chess-1800.webp";
import {
  LESSON_LEVELS,
  validateCampBookingFields,
  validateContactFields,
  validateLessonCheckoutFields,
  validateRegistrationFields,
} from "./lib/validation.js";

const REGISTRATION_DRAFT_KEY = "ct-registration-draft-v2";
const CAMP_CONFIRMATION_STORAGE_KEY = "ct-camp-confirmation-v1";
const phoneContact = contactNumbers[0];
const emailContact = contactEmails[0];
const footerContactMethods = [...contactNumbers, emailContact].filter(Boolean);

const registrationInitialState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  additionalEmails: "",
  acceptSms: false,
  playerFirstName: "",
  playerLastName: "",
  playerGrade: "",
  schoolName: "",
  section: "",
  serviceLevel: "",
  uscfId: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  emergencyName: "",
  emergencyPhone: "",
  medicalInfo: "",
  website: "",
};

const contactInitialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
  topic: "",
};

// Contact topics a page can preselect with /contact?topic=... (the API accepts only these).
const CONTACT_TOPICS = {
  "financial-aid": "Financial Aid & Discounts",
};

const getContactTopic = (search) => {
  const topic = new URLSearchParams(search || "").get("topic") || "";
  return CONTACT_TOPICS[topic] ? topic : "";
}

const campCheckoutInitialState = {
  status: "idle",
  message: "",
  details: null,
  activeOption: "",
};

const campBookingInitialState = {
  parentFirstName: "",
  parentLastName: "",
  email: "",
  phone: "",
  studentName: "",
  studentAge: "",
  studentLevel: "",
  schedulePreference: "",
  selectedDays: [],
  addOns: [],
  serviceSelections: {
    pizza: {
      option: "",
    },
    "ice-cream": {
      option: "",
    },
  },
  notes: "",
  website: "",
};

const CAMP_OPTION_BASE_AMOUNTS = {
  "full-week": 700,
  "single-day": 150,
  "half-day-am": 95,
  "half-day-pm": 95,
};

const CAMP_WEEKLY_OPTION_IDS = new Set(["full-week"]);
const CAMP_DATE_SELECTION_OPTION_IDS = new Set(["single-day", "half-day-am", "half-day-pm"]);
const CAMP_FLEX_PACK_OPTION_IDS = new Set();
const CAMP_OPTIONS_WITH_ADD_ONS = new Set([
  "full-week",
  "single-day",
  "half-day-am",
  "half-day-pm",
]);

const CAMP_ADD_ONS = [
  {
    id: "early-drop-off",
    label: "Early Drop-Off (8:30 AM)",
    amount: 30,
  },
  {
    id: "extended-day",
    label: "Late Pick-Up (until 3:30 PM)",
    amount: 30,
  },
];

const CAMP_EXTRA_SERVICES = [
  {
    id: "pizza",
    label: "Pizza",
    optionLabel: "Yes",
    amount: 7,
  },
  {
    id: "ice-cream",
    label: "Ice-Cream",
    optionLabel: "Yes",
    amount: 5,
  },
];

// Camp day and week options come only from approved sessions confirmed by the
// server (see src/lib/registrationAvailability.js). Until then there are none.
const buildCampPurchaseOptions = (cards = []) =>
  cards.flatMap((card) => {
    if (Array.isArray(card.actions) && card.actions.length) {
      return card.actions.map((action) => ({
        id: action.optionId,
        groupId: card.id,
        eyebrow: action.eyebrow || card.eyebrow,
        title: action.title || card.title,
        switcherTitle: action.switcherTitle || action.title || card.title,
        price: action.price || card.price,
        scheduleText: action.scheduleText || card.scheduleText,
        details: action.details || card.details,
        availability: action.availability || card.availability,
        defaultSchedulePreference: action.defaultSchedulePreference || card.defaultSchedulePreference || "",
        cta: action.label || card.cta,
        campTime: action.campTime || card.campTime || card.scheduleText,
      }));
    }

    return [
      {
        ...card,
        groupId: card.id,
        switcherTitle: card.switcherTitle || card.title,
        campTime: card.campTime || card.scheduleText,
      },
    ];
  });

const CAMP_PURCHASE_OPTIONS = buildCampPurchaseOptions(campOverviewPage.bookingCards);
const CAMP_PURCHASE_OPTION_MAP = new Map(CAMP_PURCHASE_OPTIONS.map((item) => [item.id, item]));

const formatApprovedCampDateRange = () => {
  const days = getCampDayOptions();
  return days.length ? `${days[0].shortLabel} - ${days[days.length - 1].shortLabel} | Weekdays` : "To be announced";
};

const getCampScheduleOptions = (optionId) =>
  CAMP_WEEKLY_OPTION_IDS.has(optionId)
    ? getCampWeekOptions()
    : CAMP_DATE_SELECTION_OPTION_IDS.has(optionId)
      ? getCampDayOptions()
      : [];

const getSelectedCampWeekOption = (schedulePreference) =>
  getCampWeekOptions().find((item) => item.value === schedulePreference) || null;

const getWeekDaysForSchedulePreference = (schedulePreference) =>
  getSelectedCampWeekOption(schedulePreference)?.days || [];

const sortCampDays = (days = []) =>
  [...days].sort((left, right) => (getCampDayOrder().get(left) ?? 0) - (getCampDayOrder().get(right) ?? 0));

const calculateCampAddOnTotal = (addOnIds = []) =>
  CAMP_ADD_ONS.filter((item) => addOnIds.includes(item.id)).reduce(
    (sum, item) => sum + item.amount,
    0
  );

const normalizeCampServiceSelections = (value) => {
  const current = value && typeof value === "object" ? value : {};

  return CAMP_EXTRA_SERVICES.reduce((accumulator, item) => {
    const existing = current[item.id] && typeof current[item.id] === "object" ? current[item.id] : {};

    accumulator[item.id] = {
      option: existing.option === "selected" ? "selected" : "",
    };

    return accumulator;
  }, {});
};

const calculateCampExtraServicesTotal = (serviceSelections = {}) =>
  CAMP_EXTRA_SERVICES.reduce((sum, item) => {
    const selection = serviceSelections[item.id];

    if (!selection || selection.option !== "selected") {
      return sum;
    }

    return sum + item.amount;
  }, 0);

const hasSelectedCampExtraServices = (serviceSelections = {}) =>
  CAMP_EXTRA_SERVICES.some((item) => {
    const selection = serviceSelections[item.id];
    return selection && selection.option === "selected";
  });

const getCampAddOnChargeMode = (optionId) => {
  if (CAMP_FLEX_PACK_OPTION_IDS.has(optionId)) {
    return "saved-preference";
  }

  if (CAMP_DATE_SELECTION_OPTION_IDS.has(optionId)) {
    return "per-selected-day";
  }

  if (CAMP_WEEKLY_OPTION_IDS.has(optionId)) {
    return "per-week";
  }

  return "none";
};

const registrationStepDefinitions = [
  {
    id: "contact",
    number: "01",
    title: "Contact Information",
    shortTitle: "Contact",
    description: "The primary account details for the family completing the registration.",
    fields: ["firstName", "lastName", "phone", "email", "additionalEmails", "acceptSms"],
  },
  {
    id: "player",
    number: "02",
    title: "Player Information",
    shortTitle: "Player",
    description: "Choose the correct division and service level for the player.",
    fields: [
      "playerFirstName",
      "playerLastName",
      "playerGrade",
      "schoolName",
      "section",
      "serviceLevel",
      "uscfId",
    ],
  },
  {
    id: "parent",
    number: "03",
    title: "Parent / Guardian Information",
    shortTitle: "Parent",
    description: "The primary adult contact for tournament communications.",
    fields: ["parentName", "parentEmail", "parentPhone"],
  },
  {
    id: "emergency",
    number: "04",
    title: "Emergency Contact",
    shortTitle: "Emergency",
    description: "Backup contact details for tournament-day communication.",
    fields: ["emergencyName", "emergencyPhone"],
  },
  {
    id: "medical",
    number: "05",
    title: "Medical Information",
    shortTitle: "Medical",
    description: "List allergies, medications, conditions, or anything staff should know.",
    fields: ["medicalInfo"],
  },
];

const getStepErrors = (errors, stepDefinition) =>
  Object.fromEntries(stepDefinition.fields.flatMap((field) => (errors[field] ? [[field, errors[field]]] : [])));

const findFirstStepWithErrors = (errors) =>
  registrationStepDefinitions.findIndex(
    (stepDefinition) => Object.keys(getStepErrors(errors, stepDefinition)).length > 0
  );

const getFieldClassName = (hasError, baseClassName = "field") =>
  hasError ? `${baseClassName} has-error` : baseClassName;

const knownRoutes = new Set([
  "/",
  "/camps",
  "/camps/book",
  "/camps/confirmed",
  "/camps/training",
  "/camps/prep",
  "/camps/online",
  "/about",
  "/tournaments",
  "/lessons/online",
  "/lessons/online/checkout",
  "/lessons/online/thank-you",
  "/lessons/in-person",
  "/lessons/group",
  "/our-team",
  "/our-team/amir",
  "/our-team/andrea",
  "/after-school",
  "/faq",
  "/contact",
  "/register",
  "/terms",
  "/privacy",
  "/interest/confirm",
  "/interest/unsubscribe",
]);

const legacyRouteRedirects = {
  // Chess Dojo was removed from the public site; old links land on the homepage.
  "/dojo": "/",
  "/events": "/tournaments",
  "/events/chess-and-truck-tournament": "/tournaments",
  // The old private lessons page now leads to the online lessons page.
  "/private-lessons": "/lessons/online",
  "/lessons": "/lessons/online",
  "/lessons/manage": "/lessons/online",
  "/camps/training": "/camps",
  "/camps/prep": "/camps",
  "/camps/online": "/camps",
};

const isCampsPath = (path) => path === "/camps" || path.startsWith("/camps/");
const isLessonsPath = (path) => path === "/private-lessons" || path.startsWith("/lessons/");

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
};

// The Notify Me form stays hidden until the interest backend (Supabase, Resend,
// secrets) is configured and tested. Set VITE_INTEREST_FORM_ENABLED=true in
// Vercel to show it. See SUPABASE_SETUP.md.
const INTEREST_FORM_ENABLED = import.meta.env.VITE_INTEREST_FORM_ENABLED === "true";

// Evaluated at render time: availability can change after the server check loads.
const isCampRegistrationOpen = () => isProgramOpen("camps");

const PROGRAM_STATUS_LABELS = {
  [PROGRAM_STATUS.OPEN]: "Registration Open",
  [PROGRAM_STATUS.COMING_SOON]: "Registration Opening Soon",
  [PROGRAM_STATUS.CLOSED]: "Registration Closed",
};

const PROGRAM_STATUS_SHORT_LABELS = {
  [PROGRAM_STATUS.OPEN]: "Open",
  [PROGRAM_STATUS.COMING_SOON]: "Opening soon",
  [PROGRAM_STATUS.CLOSED]: "Closed",
};

// The header switches to the menu button below this width so it stays one row.
const NAV_COMPACT_QUERY = "(max-width: 1179px)";

const getProgramById = (programId) => programs.find((item) => item.id === programId);

const getProgramStatusMessage = (programId) => {
  if (programId === "camps" && getProgramStatus("camps") === PROGRAM_STATUS.CLOSED) {
    return CAMP_REGISTRATION_CLOSED_MESSAGE;
  }

  return getRegistrationUnavailableMessage(getProgramById(programId)?.name || "Program");
};

// The Dojo tournament add-on can only be bought once the Dojo itself is open.
const getAvailableServiceLevels = () =>
  serviceLevels.filter((item) => item.id !== "entry-dojo" || isProgramOpen("dojo"));

const lessonCarouselImages = {
  online: lessonOnlineVisual,
  inperson: lessonInPersonVisual,
  group: lessonGroupVisual,
  manage: lessonManageVisual,
};

// One line-icon set for the program cards: same 24px grid, stroke, and color.
const programIconPaths = {
  camps: (
    <>
      <path d="M3 20h18" />
      <path d="M4.5 20 12 6l7.5 14" />
      <path d="M9.5 20 12 15l2.5 5" />
      <path d="M12 6V3l3 1-3 1" />
    </>
  ),
  tournaments: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5.5a2 2 0 0 0 0 4H8" />
      <path d="M16 6h2.5a2 2 0 0 1 0 4H16" />
      <path d="M12 13v4" />
      <path d="M9 17h6" />
      <path d="M8 20h8" />
    </>
  ),
  lessons: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M12 16v4" />
      <path d="M8.5 20h7" />
      <circle cx="12" cy="8.2" r="1.6" />
      <path d="M9.8 13.5c.4-1.7 1.1-2.7 2.2-3.3 1.1.6 1.8 1.6 2.2 3.3Z" />
    </>
  ),
  afterSchool: (
    <>
      <path d="M7 9.5a5 5 0 0 1 10 0V19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9.5Z" />
      <path d="M10 4.8V4.5a2 2 0 0 1 4 0v.3" />
      <path d="M7 12.5h10" />
      <path d="M9.5 15h5v3h-5z" />
    </>
  ),
  dojo: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
      <path d="M12 12l6-6" />
      <path d="M16 5.5h2.5V8" />
    </>
  ),
};

function ProgramIcon({ iconKey }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {programIconPaths[iconKey]}
    </svg>
  );
}

const campMenuImages = {
  overview: campOverviewVisual,
  training: campTrainingVisual,
  prep: campPrepVisual,
  online: campOnlineVisual,
};

const readLocation = () => {
  const pathname = normalizePath(window.location.pathname);
  const redirectPath = legacyRouteRedirects[pathname];

  if (redirectPath) {
    window.history.replaceState({}, "", redirectPath);
    return { pathname: redirectPath, search: "" };
  }

  return { pathname, search: window.location.search };
};

const COMPACT_VIEWPORT_QUERY = "(max-width: 780px)";

const readRegistrationDraft = () => {
  try {
    const parsedDraft = JSON.parse(window.localStorage.getItem(REGISTRATION_DRAFT_KEY) || "null");

    if (!parsedDraft || typeof parsedDraft !== "object") {
      return registrationInitialState;
    }

    return Object.fromEntries(
      Object.keys(registrationInitialState).map((key) => [
        key,
        parsedDraft[key] ?? registrationInitialState[key],
      ])
    );
  } catch {
    // Ignore malformed local drafts.
    return registrationInitialState;
  }
};

const CAMP_PAYMENT_RETURN_PATHS = new Set(["/", "/camps", "/camps/book", "/camps/confirmed"]);
const CAMP_OPTION_REQUEST_PATHS = new Set(["/", "/camps", "/camps/book"]);

// Stripe sends families back with ?payment=...&session_id=... on a full page load,
// so those params are read and stripped from the URL once, before the first render.
const consumePaymentReturn = () => {
  const currentUrl = new URL(window.location.href);
  const pathname = normalizePath(currentUrl.pathname);
  const payment = currentUrl.searchParams.get("payment");
  const scope =
    pathname === "/register" ? "register" : CAMP_PAYMENT_RETURN_PATHS.has(pathname) ? "camp" : "";

  if (!payment || !scope) {
    return null;
  }

  const sessionId = currentUrl.searchParams.get("session_id");

  if (scope === "register") {
    window.history.replaceState({}, "", "/register");
  } else {
    currentUrl.searchParams.delete("payment");
    currentUrl.searchParams.delete("session_id");
    const cleanedSearch = currentUrl.searchParams.toString();
    window.history.replaceState({}, "", `${pathname}${cleanedSearch ? `?${cleanedSearch}` : ""}`);
  }

  return { scope, payment, sessionId };
};

const initialPaymentReturn = consumePaymentReturn();
let isInitialPaymentReturnHandled = false;

const isPaymentReturnPending = (scope) =>
  initialPaymentReturn?.scope === scope &&
  initialPaymentReturn.payment === "success" &&
  Boolean(initialPaymentReturn.sessionId);

const isPaymentReturnCancelled = (scope) =>
  initialPaymentReturn?.scope === scope && initialPaymentReturn.payment === "cancel";

const readStoredCampConfirmation = () => {
  try {
    const parsedConfirmation = JSON.parse(
      window.sessionStorage.getItem(CAMP_CONFIRMATION_STORAGE_KEY) || "null"
    );

    if (
      parsedConfirmation &&
      typeof parsedConfirmation === "object" &&
      parsedConfirmation.status === "success"
    ) {
      return {
        status: parsedConfirmation.status,
        message: parsedConfirmation.message || "",
        details: parsedConfirmation.details || null,
        activeOption: "",
      };
    }
  } catch {
    window.sessionStorage.removeItem(CAMP_CONFIRMATION_STORAGE_KEY);
  }

  return null;
};

const getInitialCampCheckoutState = () => {
  if (isPaymentReturnCancelled("camp")) {
    return {
      status: "cancelled",
      message: "Checkout was cancelled. You can return to camp booking whenever you are ready.",
      details: null,
      activeOption: "",
    };
  }

  if (isPaymentReturnPending("camp")) {
    return { status: "loading", message: "", details: null, activeOption: "" };
  }

  if (normalizePath(window.location.pathname) === "/camps/confirmed") {
    return readStoredCampConfirmation() || campCheckoutInitialState;
  }

  return campCheckoutInitialState;
};

const getInitialPaymentState = () => {
  if (isPaymentReturnCancelled("register")) {
    return {
      status: "cancelled",
      message:
        "Checkout was cancelled. Your registration details are still here, so you can continue whenever you are ready.",
      details: null,
    };
  }

  if (isPaymentReturnPending("register")) {
    return { status: "loading", message: "", details: null };
  }

  return { status: "idle", message: "", details: null };
};

const findRequestedCampOption = (nextRoute) => {
  if (!isCampRegistrationOpen() || !CAMP_OPTION_REQUEST_PATHS.has(nextRoute.pathname)) {
    return null;
  }

  return CAMP_PURCHASE_OPTION_MAP.get(new URLSearchParams(nextRoute.search).get("option")) || null;
};

const withFallbackCampSchedule = (bookingState, option) => {
  const fallbackSchedule =
    getCampScheduleOptions(option.id)[0]?.value || option.defaultSchedulePreference;

  if (bookingState.schedulePreference.trim() || !fallbackSchedule) {
    return bookingState;
  }

  return {
    ...bookingState,
    schedulePreference: fallbackSchedule,
    selectedDays:
      CAMP_WEEKLY_OPTION_IDS.has(option.id)
        ? getWeekDaysForSchedulePreference(fallbackSchedule)
        : CAMP_DATE_SELECTION_OPTION_IDS.has(option.id) && bookingState.selectedDays.length
          ? bookingState.selectedDays
          : CAMP_DATE_SELECTION_OPTION_IDS.has(option.id) && fallbackSchedule
            ? [fallbackSchedule]
            : [],
  };
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const updateMetaTag = (selector, content) => {
  const element = document.querySelector(selector);

  if (element && content) {
    element.setAttribute("content", content);
  }
};

const SITE_ORIGIN = "https://www.chessandtruck.com";

// Pages that show another page's content point search engines at that page.
const canonicalPathAliases = {
  "/camps/book": "/camps",
  "/register": "/tournaments",
};

// Private, one-time pages that should never appear in search results.
const isNoIndexPath = (path) =>
  path === "/camps/confirmed" ||
  path === "/lessons/online/checkout" ||
  path === "/lessons/online/thank-you" ||
  path.startsWith("/interest/");

// Scroll reveals: these blocks fade and rise into place once, as they enter the
// viewport. Siblings are staggered. Hero content is animated by CSS instead.
const REVEAL_SELECTORS = [
  ".ac-section-heading",
  ".ac-program-grid > *",
  ".ac-pillars > li",
  ".ac-steps > li",
  ".ac-coach",
  ".ac-faq-list",
  ".ac-contact-card",
  ".pg-timeline > li",
  ".pg-skill-grid > li",
  ".pg-section-cards > *",
  ".pg-morning > li",
  ".pg-flow > li",
  ".pg-format-list > li",
  ".pg-audiences > *",
  ".pg-status",
  ".faq-group",
  ".ol-reveal",
].join(",");

const useRevealOnScroll = (routeKey) => {
  // Runs before paint, so content is never shown and then hidden again.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("ct-motion");
      return undefined;
    }

    // Content is hidden only after this class is set, so it stays visible if scripts fail.
    root.classList.add("ct-motion");

    const targets = [...document.querySelectorAll(REVEAL_SELECTORS)].filter(
      (element) => !element.closest(".ac-hero, .pg-hero, .page-hero")
    );
    const siblingCounts = new Map();

    targets.forEach((element) => {
      const index = siblingCounts.get(element.parentElement) || 0;
      siblingCounts.set(element.parentElement, index + 1);
      element.style.setProperty("--ct-reveal-delay", `${Math.min(index, 5) * 70}ms`);
      element.classList.add("ct-reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    targets.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [routeKey]);
};

const updateCanonicalLink = (href) => {
  const element = document.querySelector("link[rel='canonical']");

  if (element) {
    element.setAttribute("href", href);
  }
};

function AppLink({ to, navigate, children, className = "", currentPath, onNavigate, matchSection = false, ...rest }) {
  // matchSection: the link also counts as current on its sub-pages (Our Team -> a profile).
  const target = normalizePath(to);
  const isActive = target === currentPath || (matchSection && target !== "/" && currentPath?.startsWith(`${target}/`));

  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
    onNavigate?.();
  };

  return (
    <a
      href={to}
      className={`${className}${isActive ? " is-active" : ""}`.trim()}
      aria-current={isActive ? "page" : undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}

function FeatureMenu({
  label,
  currentPath,
  navigate,
  isCompactViewport,
  closeNavigation,
  isActive,
  feature,
  items,
  imageMap,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hasSinglePrimaryDestination =
    items.length === 1 && items[0]?.path && feature?.ctaPath && items[0].path === feature.ctaPath;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen((current) => !current);
  };

  const handleNavigate = () => {
    setIsOpen(false);
    closeNavigation?.();
  };

  if (isCompactViewport && hasSinglePrimaryDestination) {
    return (
      <AppLink
        to={feature.ctaPath}
        navigate={navigate}
        currentPath={currentPath}
        className={`nav-link${isActive ? " is-active" : ""}`}
        onNavigate={handleNavigate}
      >
        {label}
      </AppLink>
    );
  }

  return (
    <div
      className={`nav-dropdown${isOpen ? " is-open" : ""}${isActive ? " is-active" : ""}`}
      ref={menuRef}
      onMouseEnter={() => {
        if (!isCompactViewport) {
          setIsOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (!isCompactViewport) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={`nav-link nav-dropdown-trigger${isActive ? " is-active" : ""}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={handleTriggerClick}
      >
        <span>{label}</span>
        <span className="nav-dropdown-caret" aria-hidden="true" />
      </button>

      <div className="nav-dropdown-menu">
        {!isCompactViewport ? (
          <div className="nav-dropdown-feature">
            <span className="mini-tag mini-tag-dark">{feature.eyebrow}</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <AppLink
              to={feature.ctaPath}
              navigate={navigate}
              currentPath={currentPath}
              className="btn btn-primary nav-dropdown-feature-cta"
              onNavigate={handleNavigate}
            >
              {feature.ctaLabel}
            </AppLink>
          </div>
        ) : null}

        <div className="nav-dropdown-links">
          <div className="nav-dropdown-copy">
            <strong>{isCompactViewport ? label : `${label} formats`}</strong>
            <small>{isCompactViewport ? feature.title : `${feature.eyebrow} opens soon.`}</small>
          </div>
          {items.map((item) => (
            <AppLink
              key={item.path}
              to={item.path}
              navigate={navigate}
              currentPath={currentPath}
              className="nav-dropdown-link"
              onNavigate={handleNavigate}
            >
              <div className="nav-dropdown-thumb">
                <img src={imageMap[item.imageKey]} alt="" className="nav-dropdown-thumb-image" />
              </div>
              <div className="nav-dropdown-link-copy">
                <span className="nav-dropdown-link-kicker">{item.signal}</span>
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </div>
              <span className="nav-dropdown-link-arrow" aria-hidden="true">
                {"->"}
              </span>
            </AppLink>
          ))}
          {isCompactViewport ? (
            <AppLink
              to={feature.ctaPath}
              navigate={navigate}
              currentPath={currentPath}
              className="btn btn-secondary nav-dropdown-mobile-cta"
              onNavigate={handleNavigate}
            >
              {feature.ctaLabel}
            </AppLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CampsMenu({ currentPath, navigate, isCompactViewport, closeNavigation }) {
  return (
    <FeatureMenu
      label="Camps"
      currentPath={currentPath}
      navigate={navigate}
      isCompactViewport={isCompactViewport}
      closeNavigation={closeNavigation}
      isActive={isCampsPath(currentPath)}
      feature={campMenuFeature}
      items={campMenuItems}
      imageMap={campMenuImages}
    />
  );
}

function LessonsMenu({ currentPath, navigate, isCompactViewport, closeNavigation }) {
  return (
    <FeatureMenu
      label="Lessons"
      currentPath={currentPath}
      navigate={navigate}
      isCompactViewport={isCompactViewport}
      closeNavigation={closeNavigation}
      isActive={isLessonsPath(currentPath)}
      feature={lessonMenuFeature}
      items={lessonMenuItems}
      imageMap={lessonCarouselImages}
    />
  );
}

function LessonDetailHero({ page, currentPath, navigate }) {
  const heroImageMap = {
    "Online Lessons": lessonOnlineVisual,
    "In Person Lessons": lessonInPersonVisual,
    "Group Lessons": lessonGroupVisual,
    "Manage Your Lessons": lessonManageVisual,
  };

  const heroImage = heroImageMap[page.eyebrow] || lessonPhoto;

  return (
    <section className="page-hero lesson-page-hero">
      <div className="shell lesson-hero-grid lesson-detail-hero-grid">
        <div className="lesson-hero-copy lesson-detail-hero-copy">
          <span className="section-tag">{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p className="page-intro">{page.intro}</p>

          <div className="lesson-chip-row">
            {page.chips.map((item) => (
              <span key={item} className="lesson-chip">
                {item}
              </span>
            ))}
          </div>

          <div className="cta-row">
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              {page.ctaLabel}
            </AppLink>
            <AppLink to="/lessons/manage" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Manage Lessons
            </AppLink>
          </div>
        </div>

        <article className="surface surface-dark lesson-hero-panel lesson-detail-hero-panel">
          <div className="lesson-hero-top">
            <div className="lesson-photo-shell">
              <img src={heroImage} alt={page.eyebrow} className="lesson-photo lesson-detail-photo" />
            </div>

            <div className="lesson-hero-note">
              <span className="mini-tag mini-tag-dark">{page.asideTag}</span>
              <h2>{page.asideTitle}</h2>
              <p>{page.asideText}</p>
            </div>
          </div>

          <div className="fact-list lesson-fact-grid">
            {page.asideFacts.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>

    </section>
  );
}

function PageHero({ eyebrow, title, intro, actions, aside, asideLink, heroFacts, currentPath, navigate }) {
  const asideContent = aside || (
    <>
      <span className="mini-tag mini-tag-dark">Questions?</span>
      <h2>Talk to us</h2>
      <p>Online private lessons are open now; our other programs are opening soon. Call, text, or email with any question.</p>
      <div className="fact-list">
        <div>
          <span>{phoneContact.label}</span>
          <strong>{phoneContact.display}</strong>
        </div>
        <div>
          <span>{emailContact.label}</span>
          <strong>{emailContact.display}</strong>
        </div>
      </div>
    </>
  );

  return (
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div className="page-hero-copy">
            <span className="section-tag">{eyebrow}</span>
            <h1>{title}</h1>
            {Array.isArray(intro)
              ? intro.map((paragraph) => (
                  <p className="page-intro" key={paragraph}>
                    {paragraph}
                  </p>
                ))
              : intro
                ? <p className="page-intro">{intro}</p>
                : null}
            {actions ? <div className="cta-row">{actions}</div> : null}
            {heroFacts?.length ? (
            <div className="fact-list fact-list-hero page-hero-facts">
              {heroFacts.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  {Array.isArray(item.lines) ? (
                    <div className="hero-fact-lines">
                      {item.lines.map((line, index) => (
                        <strong key={`${item.label}-${line}`} className={index === 0 ? "hero-fact-lead" : ""}>
                          {line}
                        </strong>
                      ))}
                    </div>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="hero-visual">
          {asideLink ? (
            <AppLink
              to={asideLink}
              navigate={navigate}
              currentPath={currentPath}
              className="surface surface-dark hero-aside hero-aside-link"
              aria-label="Open featured page"
            >
              {asideContent}
            </AppLink>
          ) : (
            <aside className="surface surface-dark hero-aside">
              {asideContent}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, intro }) {
  return (
    <div className="section-intro">
      {eyebrow ? <span className="section-tag">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function UpcomingTournamentList({ currentPath, navigate, compact = false }) {
  const items = compact ? upcomingTournaments.slice(0, 2) : upcomingTournaments;

  return (
    <div className="tournament-list">
      {items.map((item) => (
        <article className="surface tournament-slot" key={item.id}>
          <div className="tournament-slot-head">
            <span className="slot-status-badge">{item.statusLabel}</span>
            <strong>{item.dateLabel}</strong>
          </div>

          <div className="tournament-slot-body">
            <div className="tournament-trophy-wrap">
              <img src={trophyBadge} alt="" className="tournament-trophy" />
            </div>

            <div className="tournament-slot-copy">
              <h3>{item.timeLabel}</h3>
              <p className="slot-title">{item.title}</p>
              <p className="slot-meta">{item.meta}</p>
              <p>{item.summary}</p>
            </div>

            <div className="tournament-slot-side">
              <AppLink
                to={item.path || "/contact"}
                navigate={navigate}
                currentPath={currentPath}
                className="btn btn-primary tournament-slot-button"
              >
                {item.ctaLabel || "Open"}
              </AppLink>
              <strong>{item.availabilityLabel}</strong>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function DojoFeature({ currentPath, navigate }) {
  return (
    <article className="surface dojo-feature">
      <div className="dojo-mark-shell">
        <img src={dojoMark} alt="" className="dojo-mark-image" />
      </div>

      <div className="dojo-copy">
        <span className="section-tag">{masterTrainingDojo.eyebrow}</span>
        <h3>{masterTrainingDojo.title}</h3>
        <p>{masterTrainingDojo.summary}</p>
        <ul className="checklist">
          {masterTrainingDojo.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="dojo-side">
        <span className="mini-tag">Add-on option</span>
        <strong>
          {isProgramOpen("dojo")
            ? "+$100 with tournament entry"
            : PROGRAM_STATUS_LABELS[getProgramStatus("dojo")]}
        </strong>
        <p>{masterTrainingDojo.highlight}</p>
        <AppLink
          to="/contact"
          navigate={navigate}
          currentPath={currentPath}
          className="btn btn-secondary"
        >
          Ask About Dojo
        </AppLink>
      </div>
    </article>
  );
}

function ProgramStatusBadge({ programId, openLabel }) {
  const status = getProgramStatus(programId);

  return (
    <span className={`slot-status-badge program-status-badge is-${status}`}>
      {status === PROGRAM_STATUS.OPEN && openLabel ? openLabel : PROGRAM_STATUS_LABELS[status]}
    </span>
  );
}

function ProgramStatusNotice({ programId, currentPath, navigate }) {
  const status = getProgramStatus(programId);

  if (status === PROGRAM_STATUS.OPEN) {
    return null;
  }

  return (
    <article className="surface status-banner program-status-notice">
      <strong>{PROGRAM_STATUS_LABELS[status]}</strong>
      <p>{getProgramStatusMessage(programId)}</p>
      <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
        Contact us
      </AppLink>
    </article>
  );
}

function ProgramsOverview({ currentPath, navigate }) {
  return (
    <section className="page-section" id="programs">
      <div className="shell">
        <SectionIntro
          eyebrow={programOverview.eyebrow}
          title={programOverview.title}
          intro={programOverview.intro}
        />
        <div className="card-grid card-grid-three">
          {programs.map((item) => (
            <article className="surface card-link-card program-card" key={item.id}>
              <ProgramStatusBadge programId={item.id} />
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <AppLink to={item.path} navigate={navigate} currentPath={currentPath} className="text-link">
                Learn more
              </AppLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramPage({ programId, currentPath, navigate }) {
  const page = programPages[programId];
  const program = getProgramById(programId);
  const status = getProgramStatus(programId);
  const canRegister = status === PROGRAM_STATUS.OPEN && Boolean(program.registrationPath);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        heroFacts={page.heroFacts}
        currentPath={currentPath}
        navigate={navigate}
        actions={
          <>
            {canRegister ? (
              <AppLink
                to={program.registrationPath}
                navigate={navigate}
                currentPath={currentPath}
                className="btn btn-primary"
              >
                Register Now
              </AppLink>
            ) : null}
            <AppLink
              to="/contact"
              navigate={navigate}
              currentPath={currentPath}
              className={`btn ${canRegister ? "btn-secondary" : "btn-primary"}`}
            >
              Contact Us
            </AppLink>
            <AppLink to="/" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              See All Programs
            </AppLink>
          </>
        }
        aside={
          <>
            <span className="mini-tag mini-tag-dark">Program status</span>
            <h2>{PROGRAM_STATUS_LABELS[status]}</h2>
            <p>
              {status === PROGRAM_STATUS.OPEN
                ? `${program.name} registration is open.`
                : getProgramStatusMessage(programId)}
            </p>
            <div className="fact-list">
              <div>
                <span>Program</span>
                <strong>{program.name}</strong>
              </div>
              <div>
                <span>Next step</span>
                <strong>{canRegister ? "Register online" : "Contact us"}</strong>
              </div>
            </div>
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow={page.highlightSection.eyebrow}
            title={page.highlightSection.title}
            intro={page.highlightSection.intro}
          />
          <div className="card-grid card-grid-three">
            {page.highlights.map((item) => (
              <article className="surface stat-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.usesSectionOptions ? (
        <section className="page-section">
          <div className="shell">
            <SectionIntro
              eyebrow={page.sectionsSection.eyebrow}
              title={page.sectionsSection.title}
              intro={page.sectionsSection.intro}
            />
            <div className="card-grid card-grid-two">
              {sectionOptions.map((item) => (
                <article className="surface stat-card" key={item.id}>
                  <span className="mini-tag">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="checklist">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.schedule ? (
        <section className="page-section">
          <div className="shell">
            <SectionIntro
              eyebrow={page.scheduleSection.eyebrow}
              title={page.scheduleSection.title}
              intro={page.scheduleSection.intro}
            />
            <div className="card-grid card-grid-three">
              {page.schedule.map((item) => (
                <article className="surface stat-card" key={item.title}>
                  <span className="mini-tag">{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.showsDojoFeature ? (
        <section className="page-section">
          <div className="shell">
            <DojoFeature currentPath={currentPath} navigate={navigate} />
          </div>
        </section>
      ) : null}

      <section className="page-section">
        <div className="shell">
          <article className="surface lesson-cta-panel">
            <div className="lesson-cta-copy">
              <span className="section-tag">{PROGRAM_STATUS_LABELS[status]}</span>
              <h2>
                {canRegister
                  ? `${program.name} registration is open.`
                  : `Want to hear when ${program.name} opens?`}
              </h2>
              <p>
                {canRegister
                  ? "Complete the registration form and continue to secure checkout."
                  : getProgramStatusMessage(programId)}
              </p>
            </div>
            <div className="cta-row lesson-cta-actions">
              <AppLink
                to={canRegister ? program.registrationPath : "/contact"}
                navigate={navigate}
                currentPath={currentPath}
                className="btn btn-primary"
              >
                {canRegister ? "Register Now" : "Contact Us"}
              </AppLink>
              <a href={phoneContact.href} className="btn btn-secondary">
                Call / Text {phoneContact.display}
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function BrandMark({ tone = "light" }) {
  return (
    <span className={`ac-brandmark ac-brandmark-${tone}`}>
      <img src={brandCrest} alt="" className="ac-brandmark-crest" width="48" height="51" />
      <span className="ac-brandmark-text">
        <span className="ac-brandmark-name">{siteBrand.name}</span>
        <span className="ac-brandmark-tagline">{siteBrand.slogan}</span>
      </span>
    </span>
  );
}

function ProgramCard({ program, summary = program.summary, currentPath, navigate }) {
  return (
    <AppLink to={program.path} navigate={navigate} currentPath={currentPath} className="ac-program-card">
      <span className="ac-program-icon">
        <ProgramIcon iconKey={program.iconKey} />
      </span>
      <ProgramStatusBadge programId={program.statusProgramId || program.id} openLabel={program.openLabel} />
      <h3>{program.name}</h3>
      <p>{summary}</p>
      <span className="ac-program-link">
        Learn more
        <span className="ac-program-arrow" aria-hidden="true">
          &rarr;
        </span>
      </span>
    </AppLink>
  );
}

function AcademySectionHeading({ id, eyebrow, title, titleAccent, intro }) {
  return (
    <div className="ac-section-heading">
      <span className="ac-eyebrow">{eyebrow}</span>
      <h2 id={id}>
        {title}
        {titleAccent ? <span className="ac-title-accent ac-title-accent-line">{titleAccent}</span> : null}
      </h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

/// Homepage hero background: a 12-second stock clip (Anastasia Shuraeva, Pexels).
// Phones get a square crop that keeps the children and the board in view.
// Reduced-motion and Data Saver visitors get the still poster only, and the
// video never downloads for them.
const heroMedia = {
  desktop: { video: heroVideoDesktop, poster: heroPosterDesktop },
  mobile: { video: heroVideoMobile, poster: heroPosterMobile },
};

function HeroVideo() {
  const videoRef = useRef(null);
  // Set when the visitor pauses, or when the browser refuses autoplay: from then on
  // only the button starts the video, never scrolling back to the hero.
  const userPausedRef = useRef(false);
  const [media] = useState(() =>
    window.matchMedia("(max-width: 640px)").matches ? heroMedia.mobile : heroMedia.desktop
  );
  const [canPlay] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !navigator.connection?.saveData
  );
  const [isPaused, setIsPaused] = useState(false);
  // The file could not load: show the poster with no play button, since it could not work.
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    // React sets `muted` as a property only; iOS needs it before autoplay will start.
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch((error) => {
      if (video.error) {
        setHasFailed(true);
      } else if (error.name === "NotAllowedError") {
        // Autoplay refused (for example Low Power Mode): poster plus a manual Play button.
        userPausedRef.current = true;
        setIsPaused(true);
      }
    });

    // Save battery and data: stop while the hero is off screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (userPausedRef.current) {
        return;
      }

      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      userPausedRef.current = false;
      setIsPaused(false);
      video.play().catch(() => {
        userPausedRef.current = true;
        setIsPaused(true);
      });
    } else {
      userPausedRef.current = true;
      video.pause();
      setIsPaused(true);
    }
  };

  const showVideo = canPlay && !hasFailed;

  return (
    <>
      <div className="ac-hero-media" aria-hidden="true">
        {showVideo ? (
          <video
            ref={videoRef}
            src={media.video}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setHasFailed(true)}
          />
        ) : (
          <img src={media.poster} alt="" />
        )}
      </div>
      {showVideo ? (
        <div className="ac-shell ac-hero-media-bar">
          <button
            type="button"
            className={`ac-hero-video-toggle${isPaused ? " is-paused" : ""}`}
            onClick={togglePlayback}
            aria-label={isPaused ? "Play background video" : "Pause background video"}
          >
            <span aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}

// One set of simple line icons for the homepage blocks and the footer.
const UI_ICON_PATHS = {
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c0-3.1 2.5-5.3 5.5-5.3s5.5 2.2 5.5 5.3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16.2 14.4c2.5.2 4.3 2.1 4.3 4.6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.1-6.5-11.1a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.3c.9 1.3 2.1 2 3.5 2s2.6-.7 3.5-2" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 16v-3M12 16V9M17 16V5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.4 2.6 3.7 5.6 3.7 9s-1.3 6.4-3.7 9c-2.4-2.6-3.7-5.6-3.7-9S9.6 5.6 12 3z" />
    </>
  ),
  flag: (
    <>
      <path d="M5.5 21V4" />
      <path d="M5.5 4.5h11.5l-2.2 4 2.2 4H5.5" />
    </>
  ),
  school: (
    <>
      <path d="M2.5 9.5 12 4.5l9.5 5-9.5 5-9.5-5z" />
      <path d="M6.5 11.7v4.4c0 1.6 2.5 3.1 5.5 3.1s5.5-1.5 5.5-3.1v-4.4" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.6" />
    </>
  ),
  message: <path d="M4.5 5h15a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H10l-4.5 3.5v-3.5h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />,
  clipboard: (
    <>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
      <path d="M9 4.5h6v3H9z" />
      <path d="M9 12h6M9 15.5h4" />
    </>
  ),
  phone: (
    <path d="M5.2 4h3.3l1.6 4.1-2.1 1.3a10.6 10.6 0 0 0 6.6 6.6l1.3-2.1 4.1 1.6v3.3a1.2 1.2 0 0 1-1.2 1.2A15.8 15.8 0 0 1 4 5.2 1.2 1.2 0 0 1 5.2 4z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M7.5 13h1.5M11.25 13h1.5M15 13h1.5M7.5 16.5h1.5M11.25 16.5h1.5" />
    </>
  ),
  heart: <path d="M12 20s-8-4.9-8-10.6A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8 2.8C20 15.1 12 20 12 20z" />,
  barChart: <path d="M5 20V13M10 20V9M15 20V5M20 20H3.5" />,
  monitor: (
    <>
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.6" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  document: (
    <>
      <path d="M7 3.5h7l4 4v12.5a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z" />
      <path d="M14 3.5V8h4" />
      <path d="M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  chat: (
    <path d="M12 4.5c4.7 0 8.5 3 8.5 6.8s-3.8 6.8-8.5 6.8c-1 0-2-.1-2.9-.4L5 19.5l1.2-3.4c-1.7-1.2-2.7-2.9-2.7-4.8 0-3.8 3.8-6.8 8.5-6.8z" />
  ),
};

// Solid glyphs, used where the client's mockups show filled icons.
const UI_ICON_FILLED = {
  users: (
    <>
      <circle cx="9" cy="7.5" r="3.2" />
      <path d="M2.8 19.5c0-3.6 2.8-6.1 6.2-6.1s6.2 2.5 6.2 6.1v.5H2.8z" />
      <circle cx="17.2" cy="8.6" r="2.6" />
      <path d="M16.4 13.6c3 .1 5 2.3 5 5.4v1h-4.6v-.6c0-2.3-.9-4.3-2.4-5.6.6-.1 1.3-.2 2-.2z" />
    </>
  ),
  pin: (
    <path
      fillRule="evenodd"
      d="M12 2.5a7 7 0 0 0-7 7c0 5.3 7 12 7 12s7-6.7 7-12a7 7 0 0 0-7-7zm0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2z"
    />
  ),
  phone: (
    <path d="M6.6 3.5h2.6c.5 0 .9.3 1 .8l.9 3.5c.1.4 0 .8-.3 1.1l-1.7 1.4a12.3 12.3 0 0 0 4.6 4.6l1.4-1.7c.3-.3.7-.4 1.1-.3l3.5.9c.5.1.8.5.8 1v2.6c0 .9-.7 1.6-1.6 1.6C10.5 20.5 3.5 13.5 3.5 5.1c0-.9.7-1.6 1.6-1.6z" />
  ),
  mail: (
    <>
      <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v.4l-9 5.6-9-5.6z" />
      <path d="M3 8.9l9 5.6 9-5.6v8.6a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
    </>
  ),
  heart: <path d="M12 20.5s-8.5-5.1-8.5-11a4.8 4.8 0 0 1 8.5-3 4.8 4.8 0 0 1 8.5 3c0 5.9-8.5 11-8.5 11z" />,
  cap: (
    <>
      <path d="M12 4 1.5 9 12 14l10.5-5z" />
      <path d="M5.5 11.6v4.2c0 1.7 2.9 3.2 6.5 3.2s6.5-1.5 6.5-3.2v-4.2L12 14.8z" />
      <path d="M20.9 9.6h1.3V15h-1.3z" />
    </>
  ),
  barChart: (
    <>
      <rect x="5" y="12" width="3.4" height="7" rx="0.8" />
      <rect x="10.3" y="8" width="3.4" height="11" rx="0.8" />
      <rect x="15.6" y="4.5" width="3.4" height="14.5" rx="0.8" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m7.4 12.4 3 3 6.2-6.4" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 2.5a6.6 6.6 0 0 0-4 11.8c.7.6 1 1.3 1 2.1v.4h6v-.4c0-.8.3-1.5 1-2.1a6.6 6.6 0 0 0-4-11.8z" />
      <rect x="9" y="17.6" width="6" height="1.8" rx="0.9" />
      <rect x="10" y="20.2" width="4" height="1.6" rx="0.8" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 3h10v5.5a5 5 0 0 1-10 0z" />
      <path d="M7 5H4.3v1.8A3.6 3.6 0 0 0 7.6 10.4M17 5h2.7v1.8a3.6 3.6 0 0 1-3.3 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="10.8" y="13" width="2.4" height="4" />
      <path d="M7.5 21a3 3 0 0 1 3-3.6h3a3 3 0 0 1 3 3.6z" />
    </>
  ),
  personStar: (
    <>
      <circle cx="9.5" cy="7" r="3.6" />
      <path d="M2.5 20.5c0-4.2 3.1-7.2 7-7.2 1.5 0 2.9.4 4 1.2l-1.3 6z" />
      <path d="m17.5 11.6 1.5 3.1 3.3.4-2.4 2.3.6 3.3-3-1.6-3 1.6.6-3.3-2.4-2.3 3.3-.4z" />
    </>
  ),
  puzzle: (
    <path d="M4 7.5h3.6a2.6 2.6 0 1 1 5 0H16v3.6a2.6 2.6 0 1 1 0 5V20h-3.4a2.6 2.6 0 1 0-5 0H4v-3.9a2.6 2.6 0 1 0 0-5z" />
  ),
  learner: (
    <>
      <circle cx="12" cy="8" r="4.2" />
      <path d="M4 21c0-4.3 3.6-7 8-7s8 2.7 8 7z" />
    </>
  ),
  rook: (
    <>
      <path d="M6.5 3h2.6v2h1.6V3h2.6v2h1.6V3h2.6v4.6l-2 1.9v5.6l1.7 2.9H6.8l1.7-2.9V9.5l-2-1.9z" />
      <rect x="5.5" y="18.4" width="13" height="2.6" rx="0.7" />
    </>
  ),
  chartUp: (
    <>
      <rect x="4" y="14" width="3.6" height="6" rx="0.8" />
      <rect x="9.6" y="11.5" width="3.6" height="8.5" rx="0.8" />
      <rect x="15.2" y="9" width="3.6" height="11" rx="0.8" />
      <path d="M4 9.5 9.5 6l3 2 5.8-4.6M15.6 3.2h3.2v3.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

function UiIcon({ name, size = 24, filled = false }) {
  if (filled && UI_ICON_FILLED[name]) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
        {UI_ICON_FILLED[name]}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {UI_ICON_PATHS[name]}
    </svg>
  );
}

const getContactIcon = (item) => (item.href?.startsWith("tel:") ? "phone" : "mail");

function AcademyHomePage({ currentPath, navigate }) {
  const { hero, programsSection, whySection, coachSection, howSection, faqSection, contactCard } =
    academyHomePage;
  const homeContactMethods = [contactNumbers[0], emailContact].filter(Boolean);

  const scrollToPrograms = (event) => {
    const section = document.getElementById("programs");

    if (!section) {
      return;
    }

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="ac-home">
      <section className="ac-hero ac-hero-cinematic" aria-labelledby="home-title">
        <HeroVideo />
        <div className="ac-shell ac-hero-grid">
          <div className="ac-hero-copy">
            <span className="ac-eyebrow">{hero.eyebrow}</span>
            <h1 id="home-title">
              {hero.titleLead} <span className="ac-title-accent">{hero.titleAccent}</span>
            </h1>
            <p className="ac-hero-tagline">{hero.tagline}</p>
            <p className="ac-lead">{hero.intro}</p>
            <div className="ac-actions">
              <a href="#programs" className="ac-btn ac-btn-gold" onClick={scrollToPrograms}>
                See our programs
              </a>
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn pg-btn-on-dark">
                Contact us
              </AppLink>
            </div>
            <ul className="ac-hero-facts">
              {hero.facts.map((item) => (
                <li key={item.text}>
                  <UiIcon name={item.icon} size={18} filled />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="ac-hero-visual" aria-hidden="true">
            <img src={brandCrest} alt="" className="ac-hero-crest" width="336" height="357" />
          </div>
        </div>
      </section>

      <section className="ac-section ac-section-programs" id="programs" aria-labelledby="programs-title">
        <div className="ac-shell">
          <AcademySectionHeading id="programs-title" {...programsSection} />
          <div className="ac-program-grid">
            {programs.map((item) => (
              <ProgramCard
                key={item.id}
                program={item}
                summary={item.homeSummary ?? item.summary}
                currentPath={currentPath}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ac-section ac-section-tint" aria-labelledby="why-title">
        <div className="ac-shell ac-why-grid">
          <AcademySectionHeading id="why-title" {...whySection} />
          <ul className="ac-pillars ac-pillars-icons">
            {whySection.pillars.map((item) => (
              <li key={item.title}>
                <span className="ac-icon-badge">
                  <UiIcon name={item.icon} filled />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ac-section" aria-labelledby="coach-title">
        <div className="ac-shell">
          <AcademySectionHeading
            id="coach-title"
            eyebrow={coachSection.eyebrow}
            title={coachSection.title}
            intro={coachSection.intro}
          />
          <article className="ac-coach">
            <img
              src={andreaPhoto}
              alt="Andrea at an outdoor chess table"
              className="ac-coach-photo"
              width="647"
              height="480"
              loading="lazy"
            />
            <div className="ac-coach-copy">
              <span className="ac-coach-role">{coachSection.role}</span>
              <p>{coachSection.summary}</p>
              <dl className="ac-coach-facts ac-coach-facts-icons">
                {coachSection.facts.map((item) => (
                  <div key={item.value}>
                    <span className="ac-coach-fact-icon">
                      <UiIcon name={item.icon} size={30} filled />
                    </span>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <AppLink to="/about" navigate={navigate} currentPath={currentPath} className="ac-text-link">
                More about Andrea <span aria-hidden="true">&rarr;</span>
              </AppLink>
            </div>
          </article>
        </div>
      </section>

      <section className="ac-section ac-section-tint" aria-labelledby="how-title">
        <div className="ac-shell">
          <AcademySectionHeading
            id="how-title"
            eyebrow={howSection.eyebrow}
            title={howSection.title}
            intro={howSection.intro}
          />
          <ol className="ac-steps ac-steps-icons">
            {howSection.steps.map((item, index) => (
              <li key={item.title}>
                <div className="ac-step-head">
                  <span className="ac-step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="ac-step-line" aria-hidden="true" />
                </div>
                <span className="ac-icon-badge">
                  <UiIcon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ac-section" aria-labelledby="faq-title">
        <div className="ac-shell ac-faq-grid">
          <div>
            <AcademySectionHeading
              id="faq-title"
              eyebrow={faqSection.eyebrow}
              title={faqSection.title}
              intro={faqSection.intro}
            />
            <div className="ac-faq-list">
              {faqSection.items.map((item) => (
                <details className="ac-faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <aside className="ac-contact-card" aria-labelledby="contact-card-title">
            <h2 id="contact-card-title">{contactCard.title}</h2>
            <p>{contactCard.text}</p>
            <ul className="ac-contact-list ac-contact-list-icons">
              {homeContactMethods.map((item) => (
                <li key={item.display}>
                  <span className="ac-contact-icon">
                    <UiIcon name={getContactIcon(item)} size={26} filled />
                  </span>
                  <div>
                    <span>{item.label}</span>
                    <a href={item.href}>{item.display}</a>
                  </div>
                </li>
              ))}
              <li>
                <span className="ac-contact-icon">
                  <UiIcon name="pin" size={26} filled />
                </span>
                <div>
                  <span>Based in</span>
                  <strong>{siteBrand.city}</strong>
                </div>
              </li>
            </ul>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-gold">
              Send a message <UiIcon name="arrow" size={18} />
            </AppLink>
            <img src={goldKnight} alt="" className="ac-contact-knight" width="200" height="300" loading="lazy" />
          </aside>
        </div>
      </section>
    </div>
  );
}

const scrollToSection = (sectionId) => (event) => {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};

function InnerHero({ eyebrow, title, intro, programId, actions, aside, variant }) {
  return (
    <section className={`pg-hero pg-hero-${variant}`} aria-labelledby="page-title">
      <div className="ac-shell pg-hero-grid">
        <div className="pg-hero-copy">
          <div className="pg-hero-kicker">
            <span className="ac-eyebrow">{eyebrow}</span>
            {programId ? <ProgramStatusBadge programId={programId} /> : null}
          </div>
          <h1 id="page-title">{title}</h1>
          <p className="ac-lead">{intro}</p>
          <div className="ac-actions">{actions}</div>
        </div>
        {aside}
      </div>
    </section>
  );
}

// Program page photos: Pexels stock images (see src/assets/programs/SOURCES.md).
// They illustrate the activity only; alt text describes the scene, not our students.
const programPhotoFiles = import.meta.glob("./assets/programs/*.webp", { eager: true, import: "default" });
const PROGRAM_PHOTO_WIDTHS = [480, 800, 1200];

const programPhotos = {
  camps: { file: "camps", alt: "Children playing chess together at a classroom table" },
  tournaments: { file: "tournaments", alt: "Hands pressing a chess clock beside a chessboard" },
  lessons: { file: "lessons", alt: "An adult and a child studying a chess position together" },
  afterSchool: { file: "after-school", alt: "A small group of children playing chess at a long table" },
};

const getProgramPhotoSrc = (file, width) => programPhotoFiles[`./assets/programs/${file}-${width}.webp`];

// Photo on the right with the program's panel overlapping its lower edge;
// on phones they stack under the text.
function ProgramHeroMedia({ programId, children }) {
  const photo = programPhotos[programId];

  return (
    <div className="pg-hero-media">
      <figure className="pg-hero-photo">
        <img
          src={getProgramPhotoSrc(photo.file, 800)}
          srcSet={PROGRAM_PHOTO_WIDTHS.map((width) => `${getProgramPhotoSrc(photo.file, width)} ${width}w`).join(", ")}
          sizes="(max-width: 1023px) calc(100vw - 32px), 520px"
          width="1200"
          height="900"
          alt={photo.alt}
          decoding="async"
          fetchPriority="high"
        />
      </figure>
      {children}
    </div>
  );
}

function FactPanel({ title, iconKey, icon, items, tone }) {
  return (
    <aside className={`pg-fact-panel pg-fact-panel-${tone}`} aria-label={title}>
      <div className="pg-fact-panel-head">
        <span className="ac-program-icon">
          {icon || <ProgramIcon iconKey={iconKey} />}
        </span>
        <h2>{title}</h2>
      </div>
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function FaqBlock({ id, eyebrow, title, items }) {
  return (
    <section className="ac-section" aria-labelledby={id}>
      <div className="ac-shell pg-faq">
        <AcademySectionHeading id={id} eyebrow={eyebrow} title={title} />
        <div className="ac-faq-list">
          {items.map((item) => (
            <details className="ac-faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegistrationStatusPanel({ id, programId, title, text, currentPath, navigate, openAction }) {
  const isOpen = isProgramOpen(programId);

  return (
    <section className="ac-section pg-status-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="ac-shell">
        <div className="pg-status">
          <div className="pg-status-copy">
            <ProgramStatusBadge programId={programId} />
            <h2 id={`${id}-title`}>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="pg-status-actions">
            {isOpen && openAction ? openAction : null}
            <AppLink
              to="/contact"
              navigate={navigate}
              currentPath={currentPath}
              className={`ac-btn ${isOpen && openAction ? "pg-btn-on-dark" : "ac-btn-gold"}`}
            >
              Contact us
            </AppLink>
            <a href={phoneContact.href} className="ac-btn pg-btn-on-dark">
              Call or text {phoneContact.display}
            </a>
          </div>
          {INTEREST_FORM_ENABLED && !isOpen ? (
            <NotifyMeForm programId={programId} currentPath={currentPath} navigate={navigate} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

const NOTIFY_FALLBACK_SUCCESS =
  "Thanks! Check your inbox for a link to confirm your email.";
const NOTIFY_FALLBACK_ERROR = "Sorry, something went wrong. Please try again later.";

function NotifyMeForm({ programId, currentPath, navigate }) {
  const programName = getProgramById(programId)?.name || "this program";
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState({ status: "idle", message: "", errors: {} });
  const idBase = `notify-${programId}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, errors, value } = validateInterestRequest({ email, programId, consent });

    if (!ok) {
      setState({ status: "error", message: "", errors });
      return;
    }

    setState({ status: "sending", message: "", errors: {} });

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "subscribe", email: value.email, programId, consent: true, website }),
      });
      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        setState({ status: "sent", message: payload.message || NOTIFY_FALLBACK_SUCCESS, errors: {} });
        setEmail("");
        setConsent(false);
      } else {
        setState({ status: "error", message: payload.error || NOTIFY_FALLBACK_ERROR, errors: payload.fieldErrors || {} });
      }
    } catch {
      setState({ status: "error", message: NOTIFY_FALLBACK_ERROR, errors: {} });
    }
  };

  if (state.status === "sent") {
    return (
      <div className="pg-notify" role="status">
        <h3>Check your inbox</h3>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form className="pg-notify" onSubmit={handleSubmit} noValidate aria-labelledby={`${idBase}-title`}>
      <h3 id={`${idBase}-title`}>Get an email when registration opens</h3>
      <p className="pg-notify-note">Just your email. We'll send a link to confirm it first.</p>
      <div className="pg-notify-row">
        <label htmlFor={`${idBase}-email`} className="pg-notify-label">
          Email address
        </label>
        <input
          id={`${idBase}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={state.errors.email ? "true" : "false"}
          aria-describedby={state.errors.email ? `${idBase}-email-error` : undefined}
        />
        <button type="submit" className="ac-btn ac-btn-gold" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending..." : "Notify me"}
        </button>
      </div>
      {state.errors.email ? (
        <p id={`${idBase}-email-error`} className="pg-notify-error">
          {state.errors.email}
        </p>
      ) : null}
      <label className="pg-notify-consent" htmlFor={`${idBase}-consent`}>
        <input
          id={`${idBase}-consent`}
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          aria-invalid={state.errors.consent ? "true" : "false"}
        />
        <span>
          {getInterestConsentText(programName)}{" "}
          <AppLink to="/privacy" navigate={navigate} currentPath={currentPath}>
            Privacy Policy
          </AppLink>
        </span>
      </label>
      {state.errors.consent ? <p className="pg-notify-error">{state.errors.consent}</p> : null}
      <div className="pg-notify-trap" aria-hidden="true">
        <label htmlFor={`${idBase}-website`}>Leave this field empty</label>
        <input
          id={`${idBase}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      {state.status === "error" && state.message ? (
        <p className="pg-notify-error" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

const INTEREST_ACTION_COPY = {
  confirm: {
    title: "Confirm your email",
    intro: "Click below to confirm. We'll email you once, when registration opens.",
    button: "Confirm my email",
  },
  unsubscribe: {
    title: "Unsubscribe",
    intro: "Click below to stop emails about this program.",
    button: "Unsubscribe",
  },
};

// Confirmation and unsubscribe links land here. The action runs only when the
// visitor presses the button, so email link scanners cannot trigger it, and the
// token is removed from the address bar right away.
function InterestActionPage({ action, currentPath, navigate }) {
  const copy = INTEREST_ACTION_COPY[action];
  const [token] = useState(() => new URLSearchParams(window.location.search).get("token") || "");
  const [state, setState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleAction = async () => {
    setState({ status: "sending", message: "" });

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, token }),
      });
      const payload = await response.json().catch(() => ({}));
      setState({
        status: response.ok ? "done" : "error",
        message: response.ok ? payload.message : payload.error || NOTIFY_FALLBACK_ERROR,
      });
    } catch {
      setState({ status: "error", message: NOTIFY_FALLBACK_ERROR });
    }
  };

  return (
    <div className="ac-home pg-page">
      <section className="pg-hero pg-interest-hero" aria-labelledby="interest-title">
        <div className="ac-shell">
          <div className="pg-interest-card">
            <span className="ac-eyebrow">Chess &amp; Truck</span>
            <h1 id="interest-title">{copy.title}</h1>
            {!token ? (
              <p className="ac-lead">This link is missing part of the address. Please use the link in your email.</p>
            ) : state.status === "done" || state.status === "error" ? (
              <p className="ac-lead" role="status">
                {state.message}
              </p>
            ) : (
              <>
                <p className="ac-lead">{copy.intro}</p>
                <button
                  type="button"
                  className="ac-btn ac-btn-primary"
                  onClick={handleAction}
                  disabled={state.status === "sending"}
                >
                  {state.status === "sending" ? "Working..." : copy.button}
                </button>
              </>
            )}
            <AppLink to="/" navigate={navigate} currentPath={currentPath} className="ac-text-link">
              Back to the home page <span aria-hidden="true">&rarr;</span>
            </AppLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function CampsPage({ currentPath, navigate, bookingProps }) {
  const content = campsPageContent;

  return (
    <div className="ac-home pg-page">
      <InnerHero
        variant="camps"
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        intro={content.hero.intro}
        programId="camps"
        actions={
          <>
            <a href="#camp-day" className="ac-btn ac-btn-primary" onClick={scrollToSection("camp-day")}>
              See the daily schedule
            </a>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-secondary">
              Ask a question
            </AppLink>
          </>
        }
        aside={
          <ProgramHeroMedia programId="camps">
            <FactPanel title="Camp details" iconKey="camps" items={content.glance} tone="dark" />
          </ProgramHeroMedia>
        }
      />

      <section className="ac-section pg-day-section" id="camp-day" aria-labelledby="camp-day-title">
        <div className="ac-shell pg-day-grid">
          <AcademySectionHeading id="camp-day-title" {...content.daySection} />
          <ol className="pg-timeline">
            {campOverviewPage.sampleSchedule.map((item) => (
              <li key={item.time}>
                <span className="pg-timeline-time">{item.time}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ac-section ac-section-tint" aria-labelledby="camp-learn-title">
        <div className="ac-shell">
          <AcademySectionHeading id="camp-learn-title" {...content.learnSection} />
          <ul className="pg-skill-grid">
            {campOverviewPage.learningCards.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqBlock id="camp-faq-title" {...content.faqSection} items={content.faqs} />

      {isProgramOpen("camps") ? (
        <CampsOverviewPage currentPath={currentPath} navigate={navigate} {...bookingProps} bookingOnly />
      ) : (
        <RegistrationStatusPanel
          id="camp-registration"
          programId="camps"
          title={content.status.title}
          text={content.status.text}
          currentPath={currentPath}
          navigate={navigate}
        />
      )}
    </div>
  );
}

function TournamentsPage({ currentPath, navigate }) {
  const content = tournamentsPageContent;

  return (
    <div className="ac-home pg-page">
      <InnerHero
        variant="tournaments"
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        intro={content.hero.intro}
        programId="tournaments"
        actions={
          <>
            <a href="#sections" className="ac-btn ac-btn-primary" onClick={scrollToSection("sections")}>
              See the sections
            </a>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-secondary">
              Contact us
            </AppLink>
          </>
        }
        aside={
          <ProgramHeroMedia programId="tournaments">
            <FactPanel title="Planned format" iconKey="tournaments" items={content.plannedFormat} tone="light" />
          </ProgramHeroMedia>
        }
      />

      <section className="ac-section pg-dark-section" id="sections" aria-labelledby="sections-title">
        <div className="ac-shell">
          <AcademySectionHeading id="sections-title" {...content.sectionsSection} />
          <div className="pg-section-cards">
            {content.sectionCards.map((item) => (
              <article className="pg-section-card" key={item.id}>
                <span className="pg-section-tag">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ac-section" aria-labelledby="morning-title">
        <div className="ac-shell">
          <AcademySectionHeading id="morning-title" {...content.morningSection} />
          <ol className="pg-morning">
            {content.morning.map((item) => (
              <li key={item.time}>
                <span className="pg-morning-time">{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ac-section ac-section-tint" aria-labelledby="registration-steps-title">
        <div className="ac-shell">
          <AcademySectionHeading id="registration-steps-title" {...content.registrationSection} />
          <ol className="ac-steps">
            {content.registrationSteps.map((item, index) => (
              <li key={item.title}>
                <span className="ac-step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqBlock id="tournament-faq-title" {...content.faqSection} items={content.faqs} />

      <RegistrationStatusPanel
        id="tournament-registration"
        programId="tournaments"
        title={content.status.title}
        text={content.status.text}
        currentPath={currentPath}
        navigate={navigate}
        openAction={
          <AppLink to="/register" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-gold">
            Register now
          </AppLink>
        }
      />
    </div>
  );
}

function LessonsPage({ currentPath, navigate }) {
  const content = lessonsPageContent;

  return (
    <div className="ac-home pg-page">
      <InnerHero
        variant="lessons"
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        intro={content.hero.intro}
        programId="lessons"
        actions={
          <>
            <a href="#lesson-flow" className="ac-btn ac-btn-primary" onClick={scrollToSection("lesson-flow")}>
              How a lesson works
            </a>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-secondary">
              Ask a question
            </AppLink>
          </>
        }
        aside={
          <ProgramHeroMedia programId="lessons">
            <aside className="pg-includes" aria-labelledby="lesson-includes-title">
              <h2 id="lesson-includes-title">{content.includesTitle}</h2>
              <ul>
                {content.includes.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </ProgramHeroMedia>
        }
      />

      <section className="ac-section" id="lesson-flow" aria-labelledby="lesson-flow-title">
        <div className="ac-shell">
          <AcademySectionHeading id="lesson-flow-title" {...content.sessionSection} />
          <ol className="pg-flow">
            {content.session.map((item, index) => (
              <li key={item.title}>
                <span className="pg-flow-step" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ac-section ac-section-tint" aria-labelledby="lesson-formats-title">
        <div className="ac-shell pg-two-col">
          <div>
            <AcademySectionHeading id="lesson-formats-title" {...content.formatsSection} />
            <ul className="pg-format-list">
              {privateLessonsPage.formatCards.map((item) => (
                <li key={item.title}>
                  <span className="pg-section-tag">{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <AcademySectionHeading id="lesson-fit-title" {...content.fitSection} />
            <ul className="ac-pillars">
              {content.fit.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ac-section" aria-labelledby="lesson-steps-title">
        <div className="ac-shell">
          <AcademySectionHeading id="lesson-steps-title" {...content.stepsSection} />
          <ol className="ac-steps">
            {content.steps.map((item, index) => (
              <li key={item.title}>
                <span className="ac-step-number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RegistrationStatusPanel
        id="lesson-registration"
        programId="lessons"
        title={content.status.title}
        text={content.status.text}
        currentPath={currentPath}
        navigate={navigate}
      />
    </div>
  );
}

function AfterSchoolPage({ currentPath, navigate }) {
  const content = afterSchoolPageContent;

  return (
    <div className="ac-home pg-page">
      <InnerHero
        variant="after-school"
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        intro={content.hero.intro}
        programId="afterSchool"
        actions={
          <>
            <a href="#audiences" className="ac-btn ac-btn-primary" onClick={scrollToSection("audiences")}>
              For parents and schools
            </a>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-secondary">
              Contact us
            </AppLink>
          </>
        }
        aside={
          <ProgramHeroMedia programId="afterSchool">
            <FactPanel title="Program details" iconKey="afterSchool" items={content.glance} tone="light" />
          </ProgramHeroMedia>
        }
      />

      <section className="ac-section" id="audiences" aria-labelledby="audiences-title">
        <div className="ac-shell">
          <AcademySectionHeading id="audiences-title" {...content.audienceSection} />
          <div className="pg-audiences">
            {content.audiences.map((item) => (
              <article className={`pg-audience pg-audience-${item.id}`} key={item.id}>
                <span className="pg-section-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <AppLink
                  to="/contact"
                  navigate={navigate}
                  currentPath={currentPath}
                  className={`ac-btn ${item.id === "schools" ? "ac-btn-gold" : "ac-btn-primary"}`}
                >
                  {item.cta}
                </AppLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ac-section ac-section-tint" aria-labelledby="benefits-title">
        <div className="ac-shell">
          <AcademySectionHeading id="benefits-title" {...content.benefitsSection} />
          <ul className="pg-skill-grid pg-skill-grid-four">
            {content.benefits.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ac-section" aria-labelledby="session-title">
        <div className="ac-shell">
          <AcademySectionHeading id="session-title" {...content.sessionSection} />
          <ol className="pg-morning">
            {content.session.map((item) => (
              <li key={item.title}>
                <span className="pg-morning-time">{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqBlock id="after-school-faq-title" {...content.faqSection} items={content.faqs} />

      <RegistrationStatusPanel
        id="after-school-registration"
        programId="afterSchool"
        title={content.status.title}
        text={content.status.text}
        currentPath={currentPath}
        navigate={navigate}
      />
    </div>
  );
}

function SiteFooter({ currentPath, navigate }) {
  const academyLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="ac-footer">
      <div className="ac-shell">
        <div className="ac-footer-grid">
          <div className="ac-footer-brand">
            <BrandMark tone="dark" />
            <p>{siteBrand.brandNote}</p>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-gold">
              Contact us
            </AppLink>
          </div>

          <nav className="ac-footer-col" aria-label="Programs">
            <h2 className="ac-footer-heading">Programs</h2>
            <ul className="ac-footer-programs">
              {programs.map((item) => {
                // Private lessons are on sale online, so the footer shows that status.
                const status = getProgramStatus(item.id === "lessons" ? "onlineLessons" : item.id);
                const label = item.id === "lessons" && status === PROGRAM_STATUS.OPEN ? "Online lessons open" : PROGRAM_STATUS_SHORT_LABELS[status];

                return (
                  <li key={item.id}>
                    <AppLink to={item.path} navigate={navigate} currentPath={currentPath} className="ac-footer-link">
                      {item.name}
                    </AppLink>
                    <span className={`ac-footer-status is-${status}`}>{label}</span>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav className="ac-footer-col" aria-label="Explore">
            <h2 className="ac-footer-heading">Explore</h2>
            <ul>
              {academyLinks.map((item) => (
                <li key={item.path}>
                  <AppLink to={item.path} navigate={navigate} currentPath={currentPath} className="ac-footer-link">
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ac-footer-col">
            <h2 className="ac-footer-heading">Contact</h2>
            <ul className="ac-footer-contact">
              {footerContactMethods.map((item) => (
                <li key={item.display}>
                  <UiIcon name={getContactIcon(item)} size={18} filled />
                  <div>
                    <span>{item.label}</span>
                    <a href={item.href} className="ac-footer-link">
                      {item.display}
                    </a>
                  </div>
                </li>
              ))}
              <li>
                <UiIcon name="pin" size={18} filled />
                <div>
                  <span>Based in</span>
                  {siteBrand.city}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="ac-footer-bottom">
          <small>
            &copy; {new Date().getFullYear()} {siteBrand.name}. All rights reserved.
          </small>
          <ul>
            {footerLegalLinks.map((item) => (
              <li key={item.path}>
                <AppLink to={item.path} navigate={navigate} currentPath={currentPath} className="ac-footer-link">
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

const asParagraphs = (value) => (Array.isArray(value) ? value : value ? [value] : []);

function LegalPage({ eyebrow, title, intro, updated, sections, currentPath, navigate }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} currentPath={currentPath} navigate={navigate} />

      <section className="page-section">
        <div className="shell legal-stack">
          {updated ? <p className="legal-updated">Last updated: {updated}</p> : null}
          {sections.map((item) => (
            <article className="surface" key={item.title} id={item.id}>
              <h3>{item.title}</h3>
              {asParagraphs(item.body).map((text) => (
                <p key={text}>{text}</p>
              ))}
              {item.items ? (
                <ul className="legal-list">
                  {item.items.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              ) : null}
              {asParagraphs(item.after).map((text) => (
                <p key={text}>{text}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactDirectory() {
  return (
    <div className="stack-grid">
      {contactNumbers.length ? (
        <article className="surface">
          <span className="mini-tag">Phone</span>
          <div className="link-stack">
            {contactNumbers.map((item) => (
              <a href={item.href} key={item.display} className="contact-link">
                <span>{item.label}</span>
                <strong>{item.display}</strong>
              </a>
            ))}
          </div>
        </article>
      ) : null}
      {contactEmails.length ? (
        <article className="surface">
          <span className="mini-tag">Email</span>
          <div className="link-stack">
            {contactEmails.map((item) => (
              <a href={item.href} key={item.display} className="contact-link">
                <span>{item.label}</span>
                <strong>{item.display}</strong>
              </a>
            ))}
          </div>
        </article>
      ) : null}
    </div>
  );
}

function ContactForm({
  contactState,
  contactErrors,
  contactSubmitState,
  updateContactField,
  handleContactSubmit,
}) {
  return (
    <form className="surface contact-form" onSubmit={handleContactSubmit}>
      <span className="mini-tag">Send a message</span>
      <h3>Ask us anything</h3>
      {contactState.topic ? (
        <p className="contact-topic">
          Topic: <strong>{CONTACT_TOPICS[contactState.topic]}</strong>
        </p>
      ) : null}
      <p>Fields marked * are required.</p>

      <label className={getFieldClassName(contactErrors.name)}>
        <span>Name *</span>
        <input
          name="name"
          value={contactState.name}
          onChange={updateContactField}
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={contactErrors.name ? "true" : "false"}
          required
        />
        {contactErrors.name ? <small className="field-error">{contactErrors.name}</small> : null}
      </label>

      <label className={getFieldClassName(contactErrors.email)}>
        <span>Email *</span>
        <input
          name="email"
          type="email"
          value={contactState.email}
          onChange={updateContactField}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={contactErrors.email ? "true" : "false"}
          required
        />
        {contactErrors.email ? <small className="field-error">{contactErrors.email}</small> : null}
      </label>

      <label className={getFieldClassName(contactErrors.phone)}>
        <span>Phone (optional)</span>
        <input
          name="phone"
          type="tel"
          value={contactState.phone}
          onChange={updateContactField}
          placeholder="(212) 555-0123"
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={contactErrors.phone ? "true" : "false"}
        />
        {contactErrors.phone ? <small className="field-error">{contactErrors.phone}</small> : null}
      </label>

      <label className="field honeypot-field" aria-hidden="true" tabIndex="-1">
        <span>Website</span>
        <input
          name="website"
          value={contactState.website}
          onChange={updateContactField}
          autoComplete="off"
          tabIndex="-1"
        />
      </label>

      <label className={getFieldClassName(contactErrors.message)}>
        <span>Message *</span>
        <textarea
          name="message"
          value={contactState.message}
          onChange={updateContactField}
          rows="5"
          placeholder="Your question, plus your child's age and chess level if you know it."
          autoComplete="off"
          aria-invalid={contactErrors.message ? "true" : "false"}
          required
        />
        {contactErrors.message ? <small className="field-error">{contactErrors.message}</small> : null}
      </label>

      <button type="submit" className="btn btn-primary btn-full" disabled={contactSubmitState.status === "loading"}>
        {contactSubmitState.status === "loading" ? "Sending..." : "Send message"}
      </button>

      <small className={`status-copy status-${contactSubmitState.status}`} aria-live="polite">
        {contactSubmitState.status === "idle"
          ? "We'll reply by email or phone."
          : contactSubmitState.message}
      </small>
    </form>
  );
}

function HomePage({ currentPath, navigate }) {
  return (
    <>
      <PageHero
        eyebrow={homePage.eyebrow}
        title={homePage.title}
        intro={homePage.intro}
        heroFacts={homePage.heroFacts}
        currentPath={currentPath}
        navigate={navigate}
        asideLink="/camps"
        actions={
          <>
            <AppLink to="/camps" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              See Camp Overview
            </AppLink>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Ask About Summer Camp
            </AppLink>
          </>
        }
        aside={
          <>
            <span className="mini-tag mini-tag-dark">{campOverviewPage.asideTag}</span>
            <h2>{campOverviewPage.asideTitle}</h2>
            <p>{campOverviewPage.asideText}</p>
            <div className="fact-list fact-list-hero">
              {campOverviewPage.asideFacts.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow={homePage.offerSection.eyebrow}
            title={homePage.offerSection.title}
            intro={homePage.offerSection.intro}
          />
          <div className="card-grid card-grid-three">
            {homePage.offerCards.map((item) => (
              <article className="surface card-link-card" key={item.path}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <AppLink to={item.path} navigate={navigate} currentPath={currentPath} className="text-link">
                  Open
                </AppLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow={homePage.processSection.eyebrow}
            title={homePage.processSection.title}
            intro={homePage.processSection.intro}
          />
          <div className="card-grid card-grid-three">
            {homePage.processCards.map((item) => (
              <article className="surface stat-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <article className="surface lesson-cta-panel">
            <div className="lesson-cta-copy">
              <span className="section-tag">Join waitlist</span>
              <h2>{homePage.ctaTitle}</h2>
              <p>{homePage.ctaText}</p>
            </div>
            <div className="cta-row lesson-cta-actions">
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                Ask About Summer Camp
              </AppLink>
              <AppLink to="/camps" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
                See Camp Details
              </AppLink>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function CampCheckoutStatusBanner({ campCheckoutState }) {
  if (campCheckoutState.status === "idle") {
    return null;
  }

  return (
    <article className={`surface status-banner status-banner-${campCheckoutState.status}`}>
      <strong>
        {campCheckoutState.status === "loading" && "Opening secure checkout"}
        {campCheckoutState.status === "success" && "Payment confirmed"}
        {campCheckoutState.status === "cancelled" && "Checkout cancelled"}
        {campCheckoutState.status === "error" && "Camp checkout could not start"}
      </strong>
      <p>{campCheckoutState.message}</p>
    </article>
  );
}

function CampBookingFormPanel({
  selectedOption,
  campBookingState,
  campBookingErrors,
  updateCampBookingField,
  handleCampBookingSubmit,
  campCheckoutState,
  openCampBooking,
}) {
  const isWeeklyOption = CAMP_WEEKLY_OPTION_IDS.has(selectedOption.id);
  const isDateSelectionOption = CAMP_DATE_SELECTION_OPTION_IDS.has(selectedOption.id);
  const isFlexiblePackOption = CAMP_FLEX_PACK_OPTION_IDS.has(selectedOption.id);
  const allowsAddOns = CAMP_OPTIONS_WITH_ADD_ONS.has(selectedOption.id);
  const addOnChargeMode = getCampAddOnChargeMode(selectedOption.id);
  const selectedLabel = isWeeklyOption ? "Week" : "Dates";
  const selectedScheduleOptions = getCampScheduleOptions(selectedOption.id);
  const selectedSchedule =
    campBookingState.schedulePreference?.trim() || selectedOption.defaultSchedulePreference || "";
  const selectedDayOption = getCampDayOptions().find((item) => item.value === selectedSchedule) || null;
  const selectedSingleDays =
    isDateSelectionOption
      ? Array.isArray(campBookingState.selectedDays) && campBookingState.selectedDays.length
        ? sortCampDays(campBookingState.selectedDays)
        : selectedDayOption
          ? [selectedDayOption.value]
          : []
      : [];
  const selectedWeekOption =
    isWeeklyOption ? getSelectedCampWeekOption(selectedSchedule) : null;
  const selectedWeekDays =
    isWeeklyOption
      ? Array.isArray(campBookingState.selectedDays) && campBookingState.selectedDays.length
        ? campBookingState.selectedDays
        : selectedWeekOption?.days || []
      : [];
  const selectedAddOns = Array.isArray(campBookingState.addOns) ? campBookingState.addOns : [];
  const selectedServiceSelections = normalizeCampServiceSelections(campBookingState.serviceSelections);
  const addOnUnitTotal = calculateCampAddOnTotal(selectedAddOns);
  const extraServicesTotal = calculateCampExtraServicesTotal(selectedServiceSelections);
  const hasExtraServicesSelected = hasSelectedCampExtraServices(selectedServiceSelections);
  const selectedDayCount =
    isDateSelectionOption
      ? selectedSingleDays.length
      : selectedWeekDays.length || 1;
  const baseAmount =
    (CAMP_OPTION_BASE_AMOUNTS[selectedOption.id] || 0) *
    (isDateSelectionOption ? selectedDayCount : 1);
  const addOnTotal = !allowsAddOns
    ? 0
    : addOnChargeMode === "per-selected-day"
      ? addOnUnitTotal * selectedDayCount
      : addOnChargeMode === "per-week"
        ? addOnUnitTotal
        : 0;
  const totalAmount = baseAmount + addOnTotal + extraServicesTotal;
  const bookingSupportMethods = [...contactNumbers, emailContact].filter(Boolean);

  const toggleCampAddOn = (addOnId) => {
    const currentAddOns = Array.isArray(campBookingState.addOns) ? campBookingState.addOns : [];
    const nextAddOns = currentAddOns.includes(addOnId)
      ? currentAddOns.filter((item) => item !== addOnId)
      : [...currentAddOns, addOnId];

    updateCampBookingField("addOns", nextAddOns);
  };

  const updateCampExtraServiceOption = (serviceId, option) => {
    const nextSelections = {
      ...selectedServiceSelections,
      [serviceId]: {
        ...selectedServiceSelections[serviceId],
        option,
      },
    };

    updateCampBookingField("serviceSelections", nextSelections);
  };

  const toggleSelectedSingleDay = (day) => {
    const currentDays = Array.isArray(campBookingState.selectedDays) ? campBookingState.selectedDays : [];
    const nextDays = currentDays.includes(day)
      ? currentDays.filter((item) => item !== day)
      : sortCampDays([...currentDays, day]);

    updateCampBookingField("selectedDays", nextDays);
    updateCampBookingField("schedulePreference", nextDays[0] || "");
  };

  return (
    <div className="register-layout camp-booking-layout" id="camp-booking-form">
      <form
        className="surface registration-form camp-booking-form"
        onSubmit={(event) => handleCampBookingSubmit(event, selectedOption.id)}
      >
        <div className="form-header">
          <span className="mini-tag">{selectedOption.eyebrow}</span>
          <h2>{campBookingPage.formTitle}</h2>
          <p>{campBookingPage.formIntro}</p>
        </div>

        <div className="booking-option-switcher" aria-label="Camp booking options">
          {CAMP_PURCHASE_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`booking-option-chip${selectedOption.id === item.id ? " is-active" : ""}`}
              onClick={() => openCampBooking(item.id, item.defaultSchedulePreference)}
            >
              <span>{item.eyebrow}</span>
              <strong>{item.switcherTitle || item.title}</strong>
            </button>
          ))}
        </div>

        {!isFlexiblePackOption ? (
          <div className="field-grid camp-date-picker-grid">
            <label
              className={getFieldClassName(
                Boolean(campBookingErrors.schedulePreference),
                "field field-span-2"
              )}
            >
              <span>{selectedLabel}</span>
              <select
                name="schedulePreference"
                value={campBookingState.schedulePreference}
                aria-invalid={campBookingErrors.schedulePreference ? "true" : "false"}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  if (isWeeklyOption) {
                    updateCampBookingField("schedulePreference", nextValue);
                    updateCampBookingField("selectedDays", getWeekDaysForSchedulePreference(nextValue));
                    return;
                  }

                  const currentDays = Array.isArray(campBookingState.selectedDays) ? campBookingState.selectedDays : [];
                  const nextDays = nextValue
                    ? currentDays.includes(nextValue)
                      ? currentDays
                      : sortCampDays([...currentDays, nextValue])
                    : currentDays;

                  updateCampBookingField("schedulePreference", nextValue);
                  updateCampBookingField("selectedDays", nextDays);
                }}
              >
                <option value="">
                  {isWeeklyOption ? "Select week" : "Add date"}
                </option>
                {selectedScheduleOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {campBookingErrors.schedulePreference ? (
              <span className="field-error">{campBookingErrors.schedulePreference}</span>
            ) : null}
          </label>
        </div>
        ) : null}

        {isDateSelectionOption ? (
          <article
            className={`surface camp-week-preview camp-day-preview${
              campBookingErrors.selectedDays ? " has-error" : ""
            }`}
            data-error-target="selectedDays"
          >
            <div className="camp-week-preview-head">
              <div>
                <span className="mini-tag">Selected days</span>
                <h3>
                  {selectedSingleDays.length
                    ? `${
                        selectedSingleDays.length
                      } ${selectedSingleDays.length === 1 ? "session" : "sessions"} selected`
                    : `Choose one or more ${selectedOption.id === "single-day" ? "camp days" : "half-day sessions"}`}
                </h3>
              </div>
              <strong>{selectedSingleDays.length ? "Weekdays only" : "No dates selected yet"}</strong>
            </div>
            <div className="camp-week-days camp-day-chip-grid">
              {getCampDayOptions().map((day) => {
                const isSelected = selectedSingleDays.includes(day.value);

                return (
                  <button
                    key={day.value}
                    type="button"
                    className={`camp-week-day-chip${isSelected ? " is-selected" : ""}`}
                    onClick={() => toggleSelectedSingleDay(day.value)}
                    title={day.value}
                  >
                    {day.compactLabel}
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="selectedDays" value={selectedSingleDays.join(", ")} />
            <p className="field-note">
              {selectedOption.id === "single-day"
                ? "Click every weekday you want to book. We will charge $150 for each selected day."
                : "Click every weekday you want to book. We will charge $95 for each selected half-day session."}
            </p>
            {campBookingErrors.selectedDays ? (
              <span className="field-error">{campBookingErrors.selectedDays}</span>
            ) : null}
          </article>
        ) : null}

        <div className="form-section">
          <div className="form-section-head">
            <div className="section-count">01</div>
            <div>
              <h3>{campBookingPage.sections[0].title}</h3>
              <p>{campBookingPage.sections[0].intro}</p>
            </div>
          </div>
          <div className="field-grid">
            <label className={getFieldClassName(campBookingErrors.parentFirstName)}>
              <span>Parent first name</span>
              <input
                type="text"
                name="parentFirstName"
                value={campBookingState.parentFirstName}
                onChange={(event) => updateCampBookingField("parentFirstName", event.target.value)}
                autoComplete="given-name"
                aria-invalid={campBookingErrors.parentFirstName ? "true" : "false"}
              />
              {campBookingErrors.parentFirstName ? (
                <span className="field-error">{campBookingErrors.parentFirstName}</span>
              ) : null}
            </label>
            <label className={getFieldClassName(campBookingErrors.parentLastName)}>
              <span>Parent last name</span>
              <input
                type="text"
                name="parentLastName"
                value={campBookingState.parentLastName}
                onChange={(event) => updateCampBookingField("parentLastName", event.target.value)}
                autoComplete="family-name"
                aria-invalid={campBookingErrors.parentLastName ? "true" : "false"}
              />
              {campBookingErrors.parentLastName ? (
                <span className="field-error">{campBookingErrors.parentLastName}</span>
              ) : null}
            </label>
            <label className={getFieldClassName(campBookingErrors.email)}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={campBookingState.email}
                onChange={(event) => updateCampBookingField("email", event.target.value)}
                autoComplete="email"
                inputMode="email"
                aria-invalid={campBookingErrors.email ? "true" : "false"}
              />
              {campBookingErrors.email ? (
                <span className="field-error">{campBookingErrors.email}</span>
              ) : null}
            </label>
            <label className={getFieldClassName(campBookingErrors.phone)}>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={campBookingState.phone}
                onChange={(event) => updateCampBookingField("phone", event.target.value)}
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={campBookingErrors.phone ? "true" : "false"}
              />
              {campBookingErrors.phone ? (
                <span className="field-error">{campBookingErrors.phone}</span>
              ) : null}
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-head">
            <div className="section-count">02</div>
            <div>
              <h3>{campBookingPage.sections[1].title}</h3>
              <p>{campBookingPage.sections[1].intro}</p>
            </div>
          </div>
          <div className="field-grid">
            <label className={getFieldClassName(campBookingErrors.studentName)}>
              <span>Student name</span>
              <input
                type="text"
                name="studentName"
                value={campBookingState.studentName}
                onChange={(event) => updateCampBookingField("studentName", event.target.value)}
                autoComplete="off"
                aria-invalid={campBookingErrors.studentName ? "true" : "false"}
              />
              {campBookingErrors.studentName ? (
                <span className="field-error">{campBookingErrors.studentName}</span>
              ) : null}
            </label>
            <label className={getFieldClassName(campBookingErrors.studentAge)}>
              <span>Student age</span>
              <input
                type="text"
                name="studentAge"
                value={campBookingState.studentAge}
                onChange={(event) => updateCampBookingField("studentAge", event.target.value)}
                placeholder="Example: Age 9 or Grade 4"
                autoComplete="off"
                aria-invalid={campBookingErrors.studentAge ? "true" : "false"}
              />
              {campBookingErrors.studentAge ? (
                <span className="field-error">{campBookingErrors.studentAge}</span>
              ) : null}
            </label>
            <label className={getFieldClassName(campBookingErrors.studentLevel, "field field-span-2")}>
              <span>Current level</span>
              <input
                type="text"
                name="studentLevel"
                value={campBookingState.studentLevel}
                onChange={(event) => updateCampBookingField("studentLevel", event.target.value)}
                placeholder="Example: Beginner, improving, tournament player"
                autoComplete="off"
                aria-invalid={campBookingErrors.studentLevel ? "true" : "false"}
              />
              {campBookingErrors.studentLevel ? (
                <span className="field-error">{campBookingErrors.studentLevel}</span>
              ) : null}
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-head">
            <div className="section-count">03</div>
            <div>
              <h3>{campBookingPage.sections[2].title}</h3>
              <p>{campBookingPage.sections[2].intro}</p>
            </div>
          </div>
          <div className="field-grid">
            <label className={getFieldClassName(false, "field field-span-2")}>
              <span>Allergies/anything we need to know</span>
              <textarea
                name="notes"
                value={campBookingState.notes}
                onChange={(event) => updateCampBookingField("notes", event.target.value)}
                placeholder="Allergies/anything we need to know"
              />
            </label>
          </div>
        </div>

        {allowsAddOns ? (
          <div className="form-section">
            <div className="form-section-head">
              <div className="section-count">04</div>
              <div>
                <h3>Additional services</h3>
                <p>
                  {isFlexiblePackOption
                    ? "Optional add-ons to request now. Meal services are charged now; scheduling add-ons are finalized with your dates later."
                    : isWeeklyOption
                      ? "Optional add-ons for the selected camp week."
                      : "Optional add-ons for each selected camp day."}
                </p>
              </div>
            </div>
            <div className="camp-addons-grid">
              {CAMP_ADD_ONS.map((item) => {
                const isChecked = selectedAddOns.includes(item.id);

                return (
                  <label className={`camp-addon-option${isChecked ? " is-selected" : ""}`} key={item.id}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCampAddOn(item.id)}
                    />
                    <span className="camp-addon-copy">
                      <strong>{item.label}</strong>
                    </span>
                    <span className="camp-addon-price">+ {formatCurrency(item.amount)}</span>
                  </label>
                );
              })}
            </div>
            <div className="camp-service-request-grid">
              {CAMP_EXTRA_SERVICES.map((item) => {
                const selection = selectedServiceSelections[item.id];

                return (
                  <div className="camp-service-request-row" key={item.id}>
                    <label className="field">
                      <span>{item.label}</span>
                      <select
                        value={selection.option}
                        onChange={(event) => updateCampExtraServiceOption(item.id, event.target.value)}
                      >
                        <option value="">No</option>
                        <option value="selected">
                          {item.optionLabel} (+{formatCurrency(item.amount)})
                        </option>
                      </select>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <label className="honeypot-field" aria-hidden="true">
          Website
          <input
            type="text"
            tabIndex="-1"
            autoComplete="off"
            value={campBookingState.website}
            onChange={(event) => updateCampBookingField("website", event.target.value)}
          />
        </label>

        <div className="submit-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={campCheckoutState.status === "loading"}
          >
            {campCheckoutState.status === "loading" ? "Opening checkout..." : "Continue to secure checkout"}
          </button>
          <p className="field-note">{campBookingPage.siblingNote}</p>
        </div>
      </form>

      <aside className="register-sidebar">
        <div className="summary-card">
          <article className="surface summary-card-block">
            <span className="mini-tag">{selectedOption.eyebrow}</span>
            <h2>{selectedOption.title}</h2>
            <p className="camp-booking-price">{formatCurrency(totalAmount)}</p>
            <div className="summary-list summary-list-booking">
              <div>
                <span>Dates</span>
                <strong>{formatApprovedCampDateRange()}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>Included in your confirmation email</strong>
              </div>
              <div>
                <span>{isWeeklyOption ? "Week" : "Dates"}</span>
                <strong>
                  {isWeeklyOption
                    ? selectedSchedule || "Choose a week above"
                    : isDateSelectionOption
                      ? selectedSingleDays.length
                        ? selectedOption.id === "single-day"
                          ? `${selectedSingleDays.length} selected camp ${selectedSingleDays.length === 1 ? "day" : "days"}`
                          : `${selectedSingleDays.length} selected half-day ${selectedSingleDays.length === 1 ? "session" : "sessions"}`
                        : "Choose dates above"
                      : "Choose dates after purchase"}
                </strong>
                {selectedWeekOption ? (
                  <ul className="summary-weekday-list">
                    {selectedWeekDays.length ? (
                      selectedWeekDays.map((day) => <li key={day}>{day}</li>)
                    ) : (
                      <li>No camp days selected yet</li>
                    )}
                  </ul>
                ) : null}
                {isDateSelectionOption ? (
                  <ul className="summary-weekday-list">
                    {selectedSingleDays.length ? (
                      selectedSingleDays.map((day) => <li key={day}>{day}</li>)
                    ) : (
                      <li>No camp days selected yet</li>
                    )}
                  </ul>
                ) : null}
              </div>
              <div>
                <span>Camp time</span>
                <strong>{selectedOption.campTime || "9:00 AM - 3:00 PM"}</strong>
              </div>
              <div>
                <span>Age range</span>
                <strong>Will be announced</strong>
              </div>
              {allowsAddOns ? (
                <div>
                  <span>Additional services</span>
                  <strong>
                    {selectedAddOns.length || extraServicesTotal > 0
                      ? isFlexiblePackOption
                        ? selectedAddOns.length && hasExtraServicesSelected
                          ? "Charged extras + requested add-ons"
                          : hasExtraServicesSelected
                            ? "Charged below"
                            : "Requested for later scheduling"
                        : isDateSelectionOption
                          ? "Selected for each chosen day"
                        : "Selected below"
                      : "Available add-ons"}
                  </strong>
                  <ul className="summary-addon-list">
                    {CAMP_ADD_ONS.map((item) => {
                      const isSelected = selectedAddOns.includes(item.id);

                      return (
                        <li key={item.id} className={isSelected ? "is-selected" : ""}>
                          {item.label} (+{formatCurrency(item.amount)})
                        </li>
                      );
                    })}
                    {CAMP_EXTRA_SERVICES.map((item) => {
                      const selection = selectedServiceSelections[item.id];
                      const isSelected = selection.option === "selected";

                      return (
                        <li key={item.id} className={isSelected ? "is-selected" : ""}>
                          {item.label} {isSelected ? `(+${formatCurrency(item.amount)})` : "(not selected)"}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
            <ul className="camp-booking-list">
              {selectedOption.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            {selectedAddOns.length || extraServicesTotal > 0 ? (
              <p className="camp-booking-availability">
                {isFlexiblePackOption
                  ? selectedAddOns.length && extraServicesTotal > 0
                    ? `Charged now: ${formatCurrency(extraServicesTotal)}. Scheduling add-ons will be finalized when you choose your dates.`
                    : extraServicesTotal > 0
                      ? `Additional services total: ${formatCurrency(extraServicesTotal)}`
                      : "Additional services will be finalized when you choose your dates."
                  : `Additional services total: ${formatCurrency(addOnTotal + extraServicesTotal)}`}
              </p>
            ) : null}
            <p className="camp-booking-availability">{selectedOption.availability}</p>
          </article>

          <article className="surface summary-card-block">
            <span className="mini-tag">{campBookingPage.supportTitle}</span>
            <p>{campBookingPage.supportText}</p>
            <div className="booking-support-actions">
              {bookingSupportMethods.map((item) => (
                <a key={item.display} href={item.href} className="btn btn-secondary btn-full booking-support-action">
                  <span>{item.label}</span>
                  <strong>{item.display}</strong>
                </a>
              ))}
            </div>
          </article>
        </div>
      </aside>
    </div>
  );
}

// Dark contact panel at the end of About and FAQ; same look as the program pages' status panel.
function ContactPanel({ id, title, text, currentPath, navigate }) {
  return (
    <section className="ac-section pg-status-section" aria-labelledby={`${id}-title`}>
      <div className="ac-shell">
        <div className="pg-status">
          <div className="pg-status-copy">
            <h2 id={`${id}-title`}>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="pg-status-actions">
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-gold">
              Contact us
            </AppLink>
            <a href={phoneContact.href} className="ac-btn pg-btn-on-dark">
              Call or text {phoneContact.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage({ currentPath, navigate }) {
  const content = aboutPage;

  return (
    <div className="ac-home pg-page">
      <InnerHero
        variant="about"
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        intro={content.hero.intro}
        actions={
          <>
            <a href="#about-programs" className="ac-btn ac-btn-primary" onClick={scrollToSection("about-programs")}>
              See our programs
            </a>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-secondary">
              Contact us
            </AppLink>
          </>
        }
        aside={
          <FactPanel
            title="Chess & Truck"
            icon={<img src={brandCrest} alt="" className="pg-fact-panel-crest" width="28" height="30" />}
            items={content.facts}
            tone="dark"
          />
        }
      />

      <section className="ac-section" aria-labelledby="about-who-title">
        <div className="ac-shell ac-why-grid">
          <AcademySectionHeading id="about-who-title" {...content.whoSection} />
          <ul className="ac-pillars">
            {content.whoPoints.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ac-section ac-section-tint" id="about-programs" aria-labelledby="about-programs-title">
        <div className="ac-shell">
          <AcademySectionHeading id="about-programs-title" {...content.programsSection} />
          <div className="ac-program-grid">
            {programs.map((item) => (
              <ProgramCard key={item.id} program={item} currentPath={currentPath} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="ac-section" aria-labelledby="about-coach-title">
        <div className="ac-shell">
          <AcademySectionHeading id="about-coach-title" eyebrow={content.coach.eyebrow} title={content.coach.title} />
          <article className="ac-coach">
            <img
              src={andreaPhoto}
              alt="Andrea at an outdoor chess table"
              className="ac-coach-photo"
              width="647"
              height="480"
              loading="lazy"
            />
            <div className="ac-coach-copy">
              <span className="ac-coach-role">{content.coach.role}</span>
              <p>{content.coach.bio}</p>
              <dl className="ac-coach-facts">
                {content.coach.facts.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>
      </section>

      <ContactPanel id="about-contact" {...content.contact} currentPath={currentPath} navigate={navigate} />
    </div>
  );
}

function PrivateLessonsPage({ currentPath, navigate }) {
  return (
    <>
      <section className="page-hero lesson-page-hero">
        <div className="shell lesson-hero-grid">
          <div className="lesson-hero-copy">
            <ProgramStatusBadge programId="lessons" />
            <span className="section-tag">{privateLessonsPage.eyebrow}</span>
            <h1>{privateLessonsPage.title}</h1>
            <p className="page-intro">{privateLessonsPage.intro}</p>

            <div className="lesson-chip-row">
              {privateLessonsPage.heroChips.map((item) => (
                <span key={item} className="lesson-chip">
                  {item}
                </span>
              ))}
            </div>

            <div className="cta-row">
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                Ask About Lessons
              </AppLink>
              <AppLink to="/camps" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
                See Summer Camp
              </AppLink>
            </div>
          </div>

          <article className="surface surface-dark lesson-hero-panel">
            <div className="lesson-hero-top">
              <div className="lesson-photo-shell">
                <img
                  src={lessonPhoto}
                  alt="Original chess coaching visual with a knight piece, board grid, and launch-style club graphics"
                  className="lesson-photo"
                />
              </div>

              <div className="lesson-hero-note">
                <span className="mini-tag mini-tag-dark">Coaching focus</span>
                <p>{privateLessonsPage.heroNote}</p>
              </div>
            </div>

            <div className="fact-list lesson-fact-grid">
              {privateLessonsPage.quickFacts.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Lesson services"
            title="Private coaching should fit the student, not force the same setting every time"
            intro="Different students need different lesson services."
          />
          <div className="card-grid card-grid-three lesson-format-grid">
            {privateLessonsPage.formatCards.map((item) => (
              <article className="surface lesson-format-card" key={item.title}>
                <span className="mini-tag">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="How it starts"
            title="How families get into the first lesson opening"
            intro="The next step should feel direct and low-friction."
          />
          <div className="lesson-process-grid">
            {privateLessonsPage.processSteps.map((item) => (
              <article className="surface lesson-process-card" key={item.step}>
                <span className="lesson-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <article className="surface lesson-cta-panel">
            <div className="lesson-cta-copy">
              <span className="section-tag">{PROGRAM_STATUS_LABELS[getProgramStatus("lessons")]}</span>
              <h2>{privateLessonsPage.ctaTitle}</h2>
              <p>
                {isProgramOpen("lessons") ? privateLessonsPage.ctaText : getProgramStatusMessage("lessons")}
              </p>
            </div>
            <div className="cta-row lesson-cta-actions">
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                Contact for Lessons
              </AppLink>
              <a href={phoneContact.href} className="btn btn-secondary">
                Call / Text {phoneContact.display}
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function CampsOverviewPage({
  currentPath,
  navigate,
  campCheckoutState = campCheckoutInitialState,
  campBookingState = campBookingInitialState,
  campBookingErrors = {},
  updateCampBookingField = () => {},
  handleCampBookingSubmit = () => {},
  selectedCampOptionId = CAMP_PURCHASE_OPTIONS[0]?.id,
  isCampBookingFormVisible = false,
  openCampBooking = () => {},
  showProgramsOverview = false,
  bookingOnly = false,
}) {
  const selectedOption =
    CAMP_PURCHASE_OPTION_MAP.get(selectedCampOptionId) || CAMP_PURCHASE_OPTIONS[0];

  const scrollToCampSection = (sectionId) => (event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const bookingSection = (
      <section className="page-section" id="camp-booking">
        <div className="shell">
          <SectionIntro
            eyebrow={campOverviewPage.bookingSection.eyebrow}
            title={campOverviewPage.bookingSection.title}
            intro={campOverviewPage.bookingSection.intro}
          />
          {campOverviewPage.bookingSection.note ? (
            <p className="camp-booking-note">{campOverviewPage.bookingSection.note}</p>
          ) : null}
          {isCampRegistrationOpen() ? (
            <div className="camp-booking-grid">
              {campOverviewPage.bookingCards.map((item) => {
                const isSelected =
                  selectedCampOptionId === item.id ||
                  (Array.isArray(item.actions) &&
                    item.actions.some((action) => action.optionId === selectedCampOptionId));

                return (
                  <article
                    className={`surface camp-booking-card${isSelected ? " is-selected" : ""}`}
                    key={item.id}
                  >
                    <span className="mini-tag">{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.scheduleText}</p>
                    <p className="camp-booking-price">{item.price}</p>
                    <ul className="camp-booking-list">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    <p className="camp-booking-availability">{item.availability}</p>
                    {Array.isArray(item.actions) && item.actions.length ? (
                      <div className="camp-booking-actions">
                        {item.actions.map((action) => {
                          const isLoading =
                            campCheckoutState.status === "loading" &&
                            campCheckoutState.activeOption === action.optionId;

                          return (
                            <button
                              key={action.optionId}
                              type="button"
                              className="btn btn-primary camp-booking-button"
                              onClick={() =>
                                openCampBooking(
                                  action.optionId,
                                  action.defaultSchedulePreference || item.defaultSchedulePreference || ""
                                )
                              }
                              disabled={campCheckoutState.status === "loading"}
                            >
                              {isLoading ? "Opening..." : action.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary camp-booking-button"
                        onClick={() => openCampBooking(item.id, item.defaultSchedulePreference)}
                        disabled={campCheckoutState.status === "loading"}
                      >
                        {campCheckoutState.status === "loading" && campCheckoutState.activeOption === item.id
                          ? "Opening..."
                          : item.cta}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>

          ) : (
            <ProgramStatusNotice programId="camps" currentPath={currentPath} navigate={navigate} />
          )}

          {isCampRegistrationOpen() && (isCampBookingFormVisible || campCheckoutState.status !== "idle") ? (
            <>
              <CampCheckoutStatusBanner campCheckoutState={campCheckoutState} />
              <CampBookingFormPanel
                selectedOption={selectedOption}
                campBookingState={campBookingState}
                campBookingErrors={campBookingErrors}
                updateCampBookingField={updateCampBookingField}
                handleCampBookingSubmit={handleCampBookingSubmit}
                campCheckoutState={campCheckoutState}
                openCampBooking={openCampBooking}
              />
            </>
          ) : null}
        </div>
      </section>
  );

  if (bookingOnly) {
    return bookingSection;
  }

  return (
    <>
      <section className="page-hero lesson-page-hero camp-overview-hero">
        <div className="shell lesson-hero-grid lesson-detail-hero-grid camp-overview-hero-grid">
          <div className="lesson-hero-copy lesson-detail-hero-copy camp-overview-hero-copy">
            <span className="section-tag">{campOverviewPage.eyebrow}</span>
            <h1>{campOverviewPage.title}</h1>
            {campOverviewPage.intro ? <p className="page-intro">{campOverviewPage.intro}</p> : null}

            {campOverviewPage.chips.length ? (
              <div className="lesson-chip-row">
                {campOverviewPage.chips.map((item) => (
                  <span key={item} className="lesson-chip">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="cta-row">
              <a
                href="#camp-booking"
                className="btn btn-primary btn-emphasis"
                onClick={scrollToCampSection("camp-booking")}
              >
                {isCampRegistrationOpen() ? "Enroll Now" : PROGRAM_STATUS_LABELS[getProgramStatus("camps")]}
              </a>
              <a
                href="#camp-schedule"
                className="btn btn-secondary"
                onClick={scrollToCampSection("camp-schedule")}
              >
                View Schedule
              </a>
              <a
                href="#camp-location"
                className="btn btn-secondary"
                onClick={scrollToCampSection("camp-location")}
              >
                Camp location
              </a>
            </div>

            <div className="fact-list fact-list-hero camp-hero-facts">
              {campOverviewPage.heroFacts.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <article className="surface surface-dark lesson-hero-panel lesson-detail-hero-panel camp-overview-hero-panel">
            <div className="lesson-hero-top">
              <div className="lesson-photo-shell">
                <img src={brandLogo} alt={`${siteBrand.name} logo`} className="lesson-photo lesson-detail-photo camp-logo-photo" />
              </div>

              <div className="lesson-hero-note">
                <span className="mini-tag mini-tag-dark">{campOverviewPage.asideTag}</span>
                <h2>{campOverviewPage.asideTitle}</h2>
                <p>{campOverviewPage.asideText}</p>
              </div>
            </div>

            <div className="fact-list lesson-fact-grid">
              {campOverviewPage.asideFacts.map((item) => (
                <AppLink
                  key={item.label}
                  to="/contact"
                  navigate={navigate}
                  currentPath={currentPath}
                  className="fact-list-card-link"
                  aria-label={`Contact us about ${item.label.toLowerCase()}`}
                >
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </AppLink>
              ))}
            </div>
          </article>
        </div>
      </section>

      {showProgramsOverview ? <ProgramsOverview currentPath={currentPath} navigate={navigate} /> : null}

      {bookingSection}

      <section className="page-section" id="camp-location">
        <div className="shell">
          <div className="camp-map-grid">
            <article className="surface camp-map-copy">
              <SectionIntro
                eyebrow={campOverviewPage.mapSection.eyebrow}
                title={campOverviewPage.mapSection.title}
                intro={campOverviewPage.mapSection.intro}
              />
              <div className="camp-map-meta">
                <strong>{campOverviewPage.mapSection.address}</strong>
                <a href={campOverviewPage.mapSection.directionsHref} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  {campOverviewPage.mapSection.directionsLabel}
                </a>
              </div>
            </article>

            <article className="surface camp-map-card">
              <iframe
                title="Chess and Truck camp location map"
                src={campOverviewPage.mapSection.embedSrc}
                className="camp-map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </article>
          </div>
        </div>
      </section>

      <section className="page-section" id="camp-schedule">
        <div className="shell">
          <SectionIntro
            eyebrow={campOverviewPage.scheduleSection.eyebrow}
            title={campOverviewPage.scheduleSection.title}
            intro={campOverviewPage.scheduleSection.intro}
          />
          <div className="camp-schedule-grid">
            {campOverviewPage.sampleSchedule.map((item) => (
              <article className="surface camp-schedule-item" key={`${item.time}-${item.title}`}>
                <span className="camp-schedule-time">{item.time}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow={campOverviewPage.faqSection.eyebrow}
            title={campOverviewPage.faqSection.title}
            intro={campOverviewPage.faqSection.intro}
          />
          <div className="faq-stack">
            {campOverviewPage.faqs.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CampDetailHero({ page, currentPath, navigate }) {
  const heroImageMap = {
    "Training Camps": campTrainingVisual,
    "Advanced Training Camps": campPrepVisual,
    "Online Camps": campOnlineVisual,
  };

  return (
    <section className="page-hero lesson-page-hero">
      <div className="shell lesson-hero-grid lesson-detail-hero-grid">
        <div className="lesson-hero-copy lesson-detail-hero-copy">
          <span className="section-tag">{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p className="page-intro">{page.intro}</p>

          <div className="lesson-chip-row">
            {page.chips.map((item) => (
              <span key={item} className="lesson-chip">
                {item}
              </span>
            ))}
          </div>

          <div className="cta-row">
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              {page.ctaLabel}
            </AppLink>
            <AppLink to="/camps" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Camp Overview
            </AppLink>
          </div>
        </div>

        <article className="surface surface-dark lesson-hero-panel lesson-detail-hero-panel">
          <div className="lesson-hero-top">
            <div className="lesson-photo-shell">
              <img src={heroImageMap[page.eyebrow]} alt={page.eyebrow} className="lesson-photo lesson-detail-photo" />
            </div>

            <div className="lesson-hero-note">
              <span className="mini-tag mini-tag-dark">{page.asideTag}</span>
              <h2>{page.asideTitle}</h2>
              <p>{page.asideText}</p>
            </div>
          </div>

          <div className="fact-list lesson-fact-grid">
            {page.asideFacts.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function CampBookingPage({
  currentPath,
  navigate,
  routeSearch,
  campBookingState,
  campBookingErrors,
  updateCampBookingField,
  handleCampBookingSubmit,
  campCheckoutState,
  openCampBooking,
}) {
  const searchParams = new URLSearchParams(routeSearch);
  const requestedOptionId = searchParams.get("option");
  const selectedOption =
    CAMP_PURCHASE_OPTION_MAP.get(requestedOptionId) || CAMP_PURCHASE_OPTIONS[0];

  return (
    <>
      <section className="page-hero lesson-page-hero">
        <div className="shell booking-page-hero">
          <div className="booking-page-copy">
            <span className="section-tag">{campBookingPage.eyebrow}</span>
            <h1>{campBookingPage.title}</h1>
            <p className="page-intro">{campBookingPage.intro}</p>
            {campBookingPage.chips.length ? (
              <div className="lesson-chip-row">
                {campBookingPage.chips.map((item) => (
                  <span key={item} className="lesson-chip">
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="cta-row">
            {CAMP_PURCHASE_OPTIONS.map((item) => (
              <AppLink
                key={item.id}
                to={`/camps/book?option=${item.id}`}
                navigate={navigate}
                currentPath={currentPath}
                className={`btn ${
                  selectedOption.id === item.id ? "btn-primary" : "btn-secondary"
                }`}
              >
                {item.switcherTitle || item.title}
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell register-layout camp-booking-layout">
          <CampCheckoutStatusBanner campCheckoutState={campCheckoutState} />
          <CampBookingFormPanel
            selectedOption={selectedOption}
            campBookingState={campBookingState}
            campBookingErrors={campBookingErrors}
            updateCampBookingField={updateCampBookingField}
            handleCampBookingSubmit={handleCampBookingSubmit}
            campCheckoutState={campCheckoutState}
            openCampBooking={openCampBooking}
          />
        </div>
      </section>
    </>
  );
}

function CampConfirmationPage({ currentPath, navigate, campCheckoutState }) {
  const isSuccess = campCheckoutState.status === "success" && campCheckoutState.details;
  const isLoading = campCheckoutState.status === "loading";
  const isError = campCheckoutState.status === "error";
  // Payments for a program that is not open are received but not confirmed.
  const needsReview = Boolean(isSuccess && campCheckoutState.details.requiresReview);

  const title = needsReview
    ? "Thank you. We received your payment."
    : isSuccess
    ? "Thank you. Your camp spot is confirmed."
    : isLoading
      ? "Confirming your camp payment..."
      : isError
        ? "We could not confirm the camp payment yet."
        : "Camp confirmation";

  const intro = needsReview
    ? "Our team will contact you about your registration shortly."
    : isSuccess
    ? `A Stripe receipt was sent to ${campCheckoutState.details.customerEmail || "your email"}. We will follow up with the next camp details shortly.`
    : isLoading
      ? "Please wait a moment while we verify the Stripe checkout session."
      : isError
        ? campCheckoutState.message || "Please contact us if you were charged but do not see a confirmation."
        : "Your payment status will show here after checkout.";

  return (
    <>
      <section className="page-hero lesson-page-hero">
        <div className="shell">
          <article className="surface camp-confirmation-card">
            <span className="section-tag">{isSuccess && !needsReview ? "Camp confirmed" : "Camp checkout"}</span>
            <h1>{title}</h1>
            <p className="page-intro">{intro}</p>

            {campCheckoutState.status !== "idle" ? (
              <article className={`status-banner status-banner-${campCheckoutState.status}`}>
                <strong>
                  {isSuccess && (needsReview ? "Payment received" : "Payment confirmed")}
                  {isLoading && "Checking payment"}
                  {isError && "Confirmation needs attention"}
                </strong>
                <p>{campCheckoutState.message || intro}</p>
              </article>
            ) : null}

            {isSuccess ? (
              <div className="fact-list fact-list-hero camp-confirmation-facts">
                <div>
                  <span>Reference</span>
                  <strong>{campCheckoutState.details.reference}</strong>
                </div>
                <div>
                  <span>Amount</span>
                  <strong>
                    {typeof campCheckoutState.details.amountTotal === "number"
                      ? formatCurrency(campCheckoutState.details.amountTotal)
                      : "See Stripe receipt"}
                  </strong>
                </div>
                <div>
                  <span>Receipt email</span>
                  <strong>{campCheckoutState.details.customerEmail || "Sent by Stripe"}</strong>
                </div>
              </div>
            ) : null}

            <div className="cta-row">
              <AppLink to="/camps" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                Back to camps
              </AppLink>
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
                Contact us
              </AppLink>
            </div>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="shell card-grid card-grid-three">
          <article className="surface">
            <h3>What happens next</h3>
            <p>We'll review your registration and email you the camp details.</p>
          </article>
          <article className="surface">
            <h3>Need to change something?</h3>
            <p>Reply to your receipt email or contact us to change the day, week, or family details.</p>
          </article>
          <article className="surface">
            <h3>Rather talk to us?</h3>
            <p>
              Call or text <a href={phoneContact.href} className="inline-link">{phoneContact.display}</a> or email{" "}
              <a href={emailContact.href} className="inline-link">{emailContact.display}</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

function CampDetailPage({ page, currentPath, navigate }) {
  return (
    <>
      <CampDetailHero page={page} currentPath={currentPath} navigate={navigate} />

      {page.pathSection && page.pathCards?.length ? (
        <section className="page-section">
          <div className="shell">
            <SectionIntro eyebrow={page.pathSection.eyebrow} title={page.pathSection.title} intro={page.pathSection.intro} />
            <div className="card-grid card-grid-three lesson-plan-grid">
              {page.pathCards.map((item) => (
                <article className="surface lesson-plan-card" key={item.title}>
                  <div className="lesson-plan-top">
                    <span className="mini-tag">{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <ul className="checklist lesson-plan-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="lesson-plan-footer">
                    <strong>{item.meta}</strong>
                    <span>{item.note}</span>
                  </div>
                  <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary lesson-plan-button">
                    {item.cta}
                  </AppLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-section">
        <div className="shell">
          <SectionIntro eyebrow="What matters most" title="What this camp service does well" intro="Fast signals for families deciding which camp path fits best." />
          <div className="card-grid card-grid-three">
            {page.cards.map((item) => (
              <article className="surface" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell two-column">
          <article className="surface surface-dark">
            <SectionIntro eyebrow={page.eyebrow} title={page.checklistTitle} intro="This is the standard we want families to recognize before camps open." />
            <ul className="checklist checklist-light">
              {page.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="surface lesson-detail-cta">
            <span className="section-tag">Launch soon</span>
            <h3>{page.ctaTitle}</h3>
            <p>{page.ctaText}</p>
            <div className="cta-row">
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                Contact us
              </AppLink>
              <a href={phoneContact.href} className="btn btn-secondary">
                Call / Text {phoneContact.display}
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function LessonDetailPage({ page, currentPath, navigate }) {
  return (
    <>
      <LessonDetailHero page={page} currentPath={currentPath} navigate={navigate} />

      {page.pathSection && page.pathCards?.length ? (
        <section className="page-section">
          <div className="shell">
            <SectionIntro
              eyebrow={page.pathSection.eyebrow}
              title={page.pathSection.title}
              intro={page.pathSection.intro}
            />
            <div className="card-grid card-grid-three lesson-plan-grid">
              {page.pathCards.map((item) => (
                <article className="surface lesson-plan-card" key={item.title}>
                  <div className="lesson-plan-top">
                    <span className="mini-tag">{item.eyebrow}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <ul className="checklist lesson-plan-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="lesson-plan-footer">
                    <strong>{item.meta}</strong>
                    <span>{item.note}</span>
                  </div>
                  <AppLink
                    to="/contact"
                    navigate={navigate}
                    currentPath={currentPath}
                    className="btn btn-primary lesson-plan-button"
                  >
                    {item.cta}
                  </AppLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.cards?.length ? (
        <section className="page-section">
          <div className="shell">
            <SectionIntro
              eyebrow="What matters most"
              title="What matters most"
              intro="Short, clear signals for families who want the fast version."
            />
            <div className="card-grid card-grid-three">
              {page.cards.map((item) => (
                <article className="surface" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.checklist?.length ? (
        <section className="page-section">
          <div className="shell two-column">
            <article className="surface surface-dark">
              <SectionIntro
                eyebrow={page.eyebrow}
                title={page.checklistTitle}
                intro="This is the standard we want families to feel when lessons open."
              />
              <ul className="checklist checklist-light">
                {page.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="surface lesson-detail-cta">
              <span className="section-tag">Launch soon</span>
              <h3>{page.ctaTitle}</h3>
              <p>{page.ctaText}</p>
              <div className="cta-row">
                <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                  Contact us
                </AppLink>
                <a href={phoneContact.href} className="btn btn-secondary">
                  Call / Text {phoneContact.display}
                </a>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section className="page-section">
          <div className="shell">
            <article className="surface lesson-detail-cta">
              <span className="section-tag">Lessons</span>
              <h3>{page.ctaTitle}</h3>
              <p>{page.ctaText}</p>
              <div className="cta-row">
                <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                  Contact us
                </AppLink>
                <a href={phoneContact.href} className="btn btn-secondary">
                  Call / Text {phoneContact.display}
                </a>
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  );
}

function FaqPage({ currentPath, navigate }) {
  const content = faqPage;

  return (
    <div className="ac-home pg-page">
      <InnerHero
        variant="faq"
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        intro={content.hero.intro}
        actions={
          <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-primary">
            Ask a question
          </AppLink>
        }
        aside={
          <nav className="pg-fact-panel pg-fact-panel-light faq-topics" aria-labelledby="faq-topics-title">
            <h2 id="faq-topics-title">Jump to a topic</h2>
            <ul>
              {content.categories.map((category) => (
                <li key={category.id}>
                  <a href={`#${category.id}`} onClick={scrollToSection(category.id)}>
                    {category.title}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <section className="ac-section" aria-label="Frequently asked questions">
        <div className="ac-shell">
          <div className="faq-groups">
            {content.categories.map((category) => (
              <div className="faq-group" key={category.id}>
                <h2 id={category.id}>{category.title}</h2>
                <div className="ac-faq-list">
                  {category.items.map((item) => (
                    <details className="ac-faq-item" key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel id="faq-contact" {...content.contact} currentPath={currentPath} navigate={navigate} />
    </div>
  );
}

function ContactPage({
  currentPath,
  navigate,
  contactState,
  contactErrors,
  contactSubmitState,
  updateContactField,
  handleContactSubmit,
}) {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={contactPage.intro}
        heroFacts={contactPage.heroFacts}
        currentPath={currentPath}
        navigate={navigate}
        aside={
          <>
            <span className="mini-tag mini-tag-dark">What happens next</span>
            <h2>After you write</h2>
            <p>
              Your message comes straight to us, and we'll reply by email or phone. Telling us your child's age and
              chess level helps us answer faster.
            </p>
          </>
        }
      />

      <section className="page-section">
        <div className="shell two-column contact-layout">
          <ContactDirectory />
          <ContactForm
            contactState={contactState}
            contactErrors={contactErrors}
            contactSubmitState={contactSubmitState}
            updateContactField={updateContactField}
            handleContactSubmit={handleContactSubmit}
          />
        </div>
      </section>
    </>
  );
}

function MobileRegistrationProgress({
  activeRegistrationStep,
  setActiveRegistrationStep,
  registrationErrors,
}) {
  const activeStep = registrationStepDefinitions[activeRegistrationStep];

  return (
    <div className="surface mobile-stepper">
      <div className="mobile-stepper-head">
        <span className="mini-tag">
          Step {activeRegistrationStep + 1} of {registrationStepDefinitions.length}
        </span>
        <h3>{activeStep.title}</h3>
        <p>{activeStep.description}</p>
      </div>

      <div className="mobile-stepper-track" aria-label="Registration steps">
        {registrationStepDefinitions.map((stepDefinition, index) => {
          const hasErrors = Object.keys(getStepErrors(registrationErrors, stepDefinition)).length > 0;

          return (
            <button
              key={stepDefinition.id}
              type="button"
              className={`mobile-step-button${index === activeRegistrationStep ? " is-active" : ""}${hasErrors ? " has-error" : ""}`}
              onClick={() => setActiveRegistrationStep(index)}
              aria-current={index === activeRegistrationStep ? "step" : undefined}
            >
              <span className="mobile-step-index">{stepDefinition.number}</span>
              <span className="mobile-step-label">{stepDefinition.shortTitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RegisterPage({
  currentPath,
  navigate,
  registrationState,
  registrationErrors,
  updateRegistrationField,
  handleRegistrationSubmit,
  paymentState,
  selectedServiceLevel,
  clearRegistrationDraft,
}) {
  return (
    <>
      <PageHero
        eyebrow={registerPage.eyebrow}
        title={registerPage.title}
        intro={registerPage.intro}
        currentPath={currentPath}
        navigate={navigate}
        actions={
          <>
            <AppLink
              to="/contact"
              navigate={navigate}
              currentPath={currentPath}
              className="btn btn-secondary"
            >
              Need help before paying?
            </AppLink>
            <button type="button" className="btn btn-secondary" onClick={clearRegistrationDraft}>
              Clear Draft
            </button>
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          {paymentState.status !== "idle" ? (
            <article className={`status-banner status-banner-${paymentState.status}`}>
              <strong>
                {paymentState.status === "success"
                  ? "Payment confirmed"
                  : paymentState.status === "cancelled"
                    ? "Checkout cancelled"
                    : paymentState.status === "loading"
                      ? "Preparing checkout"
                      : "Registration needs attention"}
              </strong>
              <p>
                {paymentState.status === "success" && paymentState.details
                  ? `Payment confirmed for ${paymentState.details.playerName}. A Stripe receipt was sent to ${paymentState.details.customerEmail}.`
                  : paymentState.status === "loading"
                    ? "Preparing secure Stripe checkout..."
                    : paymentState.message}
              </p>
            </article>
          ) : null}

          <div className="register-layout">
            <form className="surface registration-form" onSubmit={handleRegistrationSubmit} noValidate>
              <div className="form-header">
                <span className="mini-tag">Tournament registration</span>
                <h2>Chess &amp; Truck Tournament Registration Form</h2>
                <p>
                  Please provide player and parent information. The tournament section and service
                  level are selected inside this form before payment.
                </p>
                <small className="field-note">{registerPage.draftNote}</small>
              </div>

              <section className="form-section">
                <div className="form-section-head">
                  <span className="step-chip">01</span>
                  <div>
                    <h3>Contact Information</h3>
                    <p>The primary account details for the family completing the registration.</p>
                  </div>
                </div>

                <div className="field-grid">
                  <label className={getFieldClassName(registrationErrors.firstName)}>
                    <span>First Name *</span>
                    <input
                      name="firstName"
                      value={registrationState.firstName}
                      onChange={updateRegistrationField}
                      placeholder="First name"
                      autoComplete="given-name"
                      aria-invalid={registrationErrors.firstName ? "true" : "false"}
                    />
                    {registrationErrors.firstName ? (
                      <small className="field-error">{registrationErrors.firstName}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.lastName)}>
                    <span>Last Name *</span>
                    <input
                      name="lastName"
                      value={registrationState.lastName}
                      onChange={updateRegistrationField}
                      placeholder="Last name"
                      autoComplete="family-name"
                      aria-invalid={registrationErrors.lastName ? "true" : "false"}
                    />
                    {registrationErrors.lastName ? (
                      <small className="field-error">{registrationErrors.lastName}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.phone)}>
                    <span>Phone *</span>
                    <input
                      name="phone"
                      value={registrationState.phone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
                      aria-invalid={registrationErrors.phone ? "true" : "false"}
                    />
                    {registrationErrors.phone ? (
                      <small className="field-error">{registrationErrors.phone}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.email)}>
                    <span>Email *</span>
                    <input
                      name="email"
                      type="email"
                      value={registrationState.email}
                      onChange={updateRegistrationField}
                      placeholder="family@example.com"
                      autoComplete="email"
                      aria-invalid={registrationErrors.email ? "true" : "false"}
                    />
                    {registrationErrors.email ? (
                      <small className="field-error">{registrationErrors.email}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.additionalEmails, "field field-span-2")}>
                    <span>Additional Emails</span>
                    <input
                      name="additionalEmails"
                      value={registrationState.additionalEmails}
                      onChange={updateRegistrationField}
                      placeholder="Add any other addresses that should receive confirmations"
                      autoComplete="off"
                      aria-invalid={registrationErrors.additionalEmails ? "true" : "false"}
                    />
                    {registrationErrors.additionalEmails ? (
                      <small className="field-error">{registrationErrors.additionalEmails}</small>
                    ) : null}
                  </label>

                  <label className="checkbox-field field-span-2">
                    <input
                      name="acceptSms"
                      type="checkbox"
                      checked={registrationState.acceptSms}
                      onChange={updateRegistrationField}
                    />
                    <span>
                      I accept the Terms of Service and Privacy Policy and agree to receive
                      transactional or informational SMS communications related to reminders,
                      customer care, and registration follow-up.
                    </span>
                  </label>
                  {registrationErrors.acceptSms ? (
                    <small className="field-error field-span-2">{registrationErrors.acceptSms}</small>
                  ) : null}
                </div>
              </section>

              <section className="form-section">
                <div className="form-section-head">
                  <span className="step-chip">02</span>
                  <div>
                    <h3>Player Information</h3>
                    <p>Choose the correct division and service level for the player.</p>
                  </div>
                </div>

                <div className="field-grid">
                  <label className={getFieldClassName(registrationErrors.playerFirstName)}>
                    <span>Player First Name *</span>
                    <input
                      name="playerFirstName"
                      value={registrationState.playerFirstName}
                      onChange={updateRegistrationField}
                      placeholder="Player first name"
                      autoComplete="off"
                      aria-invalid={registrationErrors.playerFirstName ? "true" : "false"}
                    />
                    {registrationErrors.playerFirstName ? (
                      <small className="field-error">{registrationErrors.playerFirstName}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.playerLastName)}>
                    <span>Player Last Name *</span>
                    <input
                      name="playerLastName"
                      value={registrationState.playerLastName}
                      onChange={updateRegistrationField}
                      placeholder="Player last name"
                      autoComplete="off"
                      aria-invalid={registrationErrors.playerLastName ? "true" : "false"}
                    />
                    {registrationErrors.playerLastName ? (
                      <small className="field-error">{registrationErrors.playerLastName}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.playerGrade)}>
                    <span>Player Grade *</span>
                    <input
                      name="playerGrade"
                      value={registrationState.playerGrade}
                      onChange={updateRegistrationField}
                      placeholder="Grade"
                      autoComplete="off"
                      aria-invalid={registrationErrors.playerGrade ? "true" : "false"}
                    />
                    {registrationErrors.playerGrade ? (
                      <small className="field-error">{registrationErrors.playerGrade}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>School Name</span>
                    <input
                      name="schoolName"
                      value={registrationState.schoolName}
                      onChange={updateRegistrationField}
                      placeholder="Optional, used for team scoring"
                      autoComplete="organization"
                    />
                  </label>

                  <label className={getFieldClassName(registrationErrors.section)}>
                    <span>Section *</span>
                    <select
                      name="section"
                      value={registrationState.section}
                      onChange={updateRegistrationField}
                      aria-invalid={registrationErrors.section ? "true" : "false"}
                    >
                      <option value="">Select section</option>
                      <option value="Open">Open</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                    {registrationErrors.section ? (
                      <small className="field-error">{registrationErrors.section}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.serviceLevel)}>
                    <span>Service Level *</span>
                    <select
                      name="serviceLevel"
                      value={registrationState.serviceLevel}
                      onChange={updateRegistrationField}
                      aria-invalid={registrationErrors.serviceLevel ? "true" : "false"}
                    >
                      <option value="">Select service level</option>
                      {getAvailableServiceLevels().map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label} - {formatCurrency(item.amount)}
                        </option>
                      ))}
                    </select>
                    {registrationErrors.serviceLevel ? (
                      <small className="field-error">{registrationErrors.serviceLevel}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.uscfId, "field field-span-2")}>
                    <span>USCF ID</span>
                    <input
                      name="uscfId"
                      value={registrationState.uscfId}
                      onChange={updateRegistrationField}
                      placeholder="Required for the Open section"
                      autoComplete="off"
                      aria-invalid={registrationErrors.uscfId ? "true" : "false"}
                    />
                    <small className="field-note">
                      Players in the Open section need an active USCF membership. Leave this blank
                      if the player is registering for Beginner. Join or renew at{" "}
                      <a href="https://new.uschess.org/" target="_blank" rel="noreferrer">
                        uschess.org
                      </a>
                      .
                    </small>
                    {registrationErrors.uscfId ? (
                      <small className="field-error">{registrationErrors.uscfId}</small>
                    ) : null}
                  </label>
                </div>
              </section>

              <section className="form-section">
                <div className="form-section-head">
                  <span className="step-chip">03</span>
                  <div>
                    <h3>Parent / Guardian Information</h3>
                    <p>The primary adult contact for tournament communications.</p>
                  </div>
                </div>

                <div className="field-grid">
                  <label className={getFieldClassName(registrationErrors.parentName)}>
                    <span>Parent / Guardian Name *</span>
                    <input
                      name="parentName"
                      value={registrationState.parentName}
                      onChange={updateRegistrationField}
                      placeholder="Parent or guardian name"
                      autoComplete="name"
                      aria-invalid={registrationErrors.parentName ? "true" : "false"}
                    />
                    {registrationErrors.parentName ? (
                      <small className="field-error">{registrationErrors.parentName}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.parentEmail)}>
                    <span>Parent Email *</span>
                    <input
                      name="parentEmail"
                      type="email"
                      value={registrationState.parentEmail}
                      onChange={updateRegistrationField}
                      placeholder="parent@example.com"
                      autoComplete="email"
                      aria-invalid={registrationErrors.parentEmail ? "true" : "false"}
                    />
                    {registrationErrors.parentEmail ? (
                      <small className="field-error">{registrationErrors.parentEmail}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.parentPhone)}>
                    <span>Parent Phone *</span>
                    <input
                      name="parentPhone"
                      value={registrationState.parentPhone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
                      aria-invalid={registrationErrors.parentPhone ? "true" : "false"}
                    />
                    {registrationErrors.parentPhone ? (
                      <small className="field-error">{registrationErrors.parentPhone}</small>
                    ) : null}
                  </label>
                </div>
              </section>

              <section className="form-section">
                <div className="form-section-head">
                  <span className="step-chip">04</span>
                  <div>
                    <h3>Emergency Contact</h3>
                    <p>Backup contact details for tournament-day communication.</p>
                  </div>
                </div>

                <div className="field-grid">
                  <label className={getFieldClassName(registrationErrors.emergencyName)}>
                    <span>Emergency Contact Name *</span>
                    <input
                      name="emergencyName"
                      value={registrationState.emergencyName}
                      onChange={updateRegistrationField}
                      placeholder="Emergency contact name"
                      autoComplete="off"
                      aria-invalid={registrationErrors.emergencyName ? "true" : "false"}
                    />
                    {registrationErrors.emergencyName ? (
                      <small className="field-error">{registrationErrors.emergencyName}</small>
                    ) : null}
                  </label>

                  <label className={getFieldClassName(registrationErrors.emergencyPhone)}>
                    <span>Emergency Contact Phone *</span>
                    <input
                      name="emergencyPhone"
                      value={registrationState.emergencyPhone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
                      aria-invalid={registrationErrors.emergencyPhone ? "true" : "false"}
                    />
                    {registrationErrors.emergencyPhone ? (
                      <small className="field-error">{registrationErrors.emergencyPhone}</small>
                    ) : null}
                  </label>
                </div>
              </section>

              <section className="form-section">
                <div className="form-section-head">
                  <span className="step-chip">05</span>
                  <div>
                    <h3>Medical Information</h3>
                    <p>List allergies, medications, conditions, or anything staff should know.</p>
                  </div>
                </div>

                <div className="field-grid">
                  <label className={getFieldClassName(registrationErrors.medicalInfo, "field field-span-2")}>
                    <span>Medical Information *</span>
                    <textarea
                      name="medicalInfo"
                      value={registrationState.medicalInfo}
                      onChange={updateRegistrationField}
                      rows="4"
                      placeholder="Allergies, medical conditions, medications, or notes for staff"
                      aria-invalid={registrationErrors.medicalInfo ? "true" : "false"}
                    />
                    {registrationErrors.medicalInfo ? (
                      <small className="field-error">{registrationErrors.medicalInfo}</small>
                    ) : null}
                  </label>
                </div>
              </section>

              <label className="field honeypot-field" aria-hidden="true" tabIndex="-1">
                <span>Website</span>
                <input
                  name="website"
                  value={registrationState.website}
                  onChange={updateRegistrationField}
                  autoComplete="off"
                  tabIndex="-1"
                />
              </label>

              <button type="submit" className="btn btn-primary btn-full" disabled={paymentState.status === "loading"}>
                {paymentState.status === "loading" ? "Preparing Checkout..." : "Continue to Secure Payment"}
              </button>

              <small className={`status-copy status-${paymentState.status}`} aria-live="polite">
                {paymentState.status === "idle"
                  ? "Complete the form, then continue to secure payment through Stripe."
                  : paymentState.status === "loading"
                    ? "Preparing secure Stripe checkout..."
                    : paymentState.message}
              </small>
            </form>

            <aside className="register-sidebar">
              <article className="surface summary-card">
                <span className="mini-tag">Registration summary</span>
                <h3>{featuredTournament.title}</h3>
                <p>
                  {featuredTournament.city}. {featuredTournament.scheduleLabel}. Stripe handles the
                  final payment step after the form is complete.
                </p>

                <div className="summary-list">
                  <div>
                    <span>Section</span>
                    <strong>{registrationState.section || "Not selected yet"}</strong>
                  </div>
                  <div>
                    <span>Service level</span>
                    <strong>{selectedServiceLevel?.label || "Not selected yet"}</strong>
                  </div>
                  <div>
                    <span>Player</span>
                    <strong>
                      {registrationState.playerFirstName || registrationState.playerLastName
                        ? `${registrationState.playerFirstName} ${registrationState.playerLastName}`.trim()
                        : "Player details pending"}
                    </strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>{selectedServiceLevel ? formatCurrency(selectedServiceLevel.amount) : "$0"}</strong>
                  </div>
                </div>
              </article>

              <article className="surface surface-dark sidebar-card">
                <span className="mini-tag mini-tag-dark">Before you submit</span>
                <h3>Quick reminders</h3>
                <ul className="checklist checklist-light">
                  {registerPage.sidebarNotes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="surface">
                <span className="mini-tag">Service levels</span>
                <div className="service-stack">
                  {getAvailableServiceLevels().map((item) => (
                    <article className="service-card" key={item.id}>
                      <div>
                        <h3>{item.label}</h3>
                        <p>{item.description}</p>
                      </div>
                      <strong>{formatCurrency(item.amount)}</strong>
                    </article>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function NotFoundPage({ currentPath, navigate }) {
  return (
    <section className="page-hero not-found-page">
      <div className="shell not-found-card">
        <span className="section-tag">Page not found</span>
        <h1>We can't find that page</h1>
        <p>The link may be old or mistyped. Try the menu above, or go back to the home page.</p>
        <AppLink to="/" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
          Back to home
        </AppLink>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- Lessons pages

// The serif display face is used only on the online lessons pages, so it is
// loaded when one of them opens instead of with the shared stylesheet.
const LESSONS_FONT_URL = "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap";

const useLessonsFont = () => {
  useEffect(() => {
    if (document.querySelector("link[data-lessons-font]")) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = LESSONS_FONT_URL;
    link.dataset.lessonsFont = "true";
    document.head.appendChild(link);
  }, []);
};

const scrollToElementId = (id) => {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};

const coachPhotos = {
  andrea: { src: andreaPhoto, srcSet: undefined, width: 647, height: 480 },
  amirPlaceholder: {
    src: amirPlaceholder640,
    srcSet: `${amirPlaceholder400} 400w, ${amirPlaceholder640} 640w`,
    width: 640,
    height: 480,
  },
};

const lessonCheckoutInitialState = {
  packageId: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  studentName: "",
  studentAge: "",
  studentLevel: "",
  notes: "",
  acceptTerms: false,
  website: "",
};

function LessonsBreadcrumb({ items, currentPath, navigate }) {
  return (
    <nav className="ol-breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label}>
              {item.path && !isLast ? (
                <AppLink to={item.path} navigate={navigate} currentPath={currentPath}>
                  {item.label}
                </AppLink>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function LessonCheckoutForm({ plans, state, errors, submitState, onChange, onSubmit }) {
  const content = onlineLessonsPage.checkout;

  return (
    <form className="ol-checkout" id="lesson-checkout" onSubmit={onSubmit} noValidate>
      <div className="ol-checkout-head">
        <h3>{content.title}</h3>
        <p>{content.intro}</p>
      </div>

      <fieldset className={`ol-package-choice${errors.packageId ? " has-error" : ""}`}>
        <legend>Package *</legend>
        <div className="ol-package-options">
          {plans.map((plan) => (
            <label key={plan.packageId} className={state.packageId === plan.packageId ? "is-selected" : undefined}>
              <input
                type="radio"
                name="packageId"
                value={plan.packageId}
                checked={state.packageId === plan.packageId}
                onChange={onChange}
              />
              <span className="ol-package-name">{plan.name}</span>
              <span className="ol-package-price">{plan.price}</span>
            </label>
          ))}
        </div>
        {errors.packageId ? <small className="field-error">{errors.packageId}</small> : null}
      </fieldset>

      <div className="ol-checkout-grid">
        <label className={getFieldClassName(errors.parentName)}>
          <span>Parent or guardian name *</span>
          <input name="parentName" value={state.parentName} onChange={onChange} autoComplete="name" aria-invalid={errors.parentName ? "true" : "false"} />
          {errors.parentName ? <small className="field-error">{errors.parentName}</small> : null}
        </label>
        <label className={getFieldClassName(errors.parentEmail)}>
          <span>Email *</span>
          <input name="parentEmail" type="email" value={state.parentEmail} onChange={onChange} autoComplete="email" aria-invalid={errors.parentEmail ? "true" : "false"} />
          {errors.parentEmail ? <small className="field-error">{errors.parentEmail}</small> : null}
        </label>
        <label className={getFieldClassName(errors.parentPhone)}>
          <span>Phone (optional)</span>
          <input name="parentPhone" type="tel" inputMode="tel" value={state.parentPhone} onChange={onChange} autoComplete="tel" aria-invalid={errors.parentPhone ? "true" : "false"} />
          {errors.parentPhone ? <small className="field-error">{errors.parentPhone}</small> : null}
        </label>
        <label className={getFieldClassName(errors.studentName)}>
          <span>Student's name *</span>
          <input name="studentName" value={state.studentName} onChange={onChange} autoComplete="off" aria-invalid={errors.studentName ? "true" : "false"} />
          {errors.studentName ? <small className="field-error">{errors.studentName}</small> : null}
        </label>
        <label className={getFieldClassName(errors.studentAge)}>
          <span>Student's age *</span>
          <input name="studentAge" type="number" min="3" max="99" inputMode="numeric" value={state.studentAge} onChange={onChange} aria-invalid={errors.studentAge ? "true" : "false"} />
          {errors.studentAge ? <small className="field-error">{errors.studentAge}</small> : null}
        </label>
        <label className={getFieldClassName(errors.studentLevel)}>
          <span>Chess level *</span>
          <select name="studentLevel" value={state.studentLevel} onChange={onChange} aria-invalid={errors.studentLevel ? "true" : "false"}>
            <option value="">Choose one</option>
            {LESSON_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.studentLevel ? <small className="field-error">{errors.studentLevel}</small> : null}
        </label>
        <label className="field ol-checkout-wide">
          <span>Anything the coach should know? (optional)</span>
          <textarea name="notes" rows="3" maxLength="480" value={state.notes} onChange={onChange} placeholder="Goals, experience, and days or times that usually work for you." />
        </label>
        <label className="field honeypot-field" aria-hidden="true" tabIndex="-1">
          <span>Website</span>
          <input name="website" value={state.website} onChange={onChange} autoComplete="off" tabIndex="-1" />
        </label>
      </div>

      <section className="ol-before-pay" aria-labelledby="ol-before-pay-title">
        <h4 id="ol-before-pay-title">{content.summaryTitle}</h4>
        <ul>
          {content.summary.map((point) => (
            <li key={point}>
              <UiIcon name="check" size={18} filled />
              {point}
            </li>
          ))}
        </ul>
        <p>
          Full details: <a href="/terms" target="_blank" rel="noopener">Terms of Service</a> and{" "}
          <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.
        </p>
      </section>

      <label className={`ol-consent${errors.acceptTerms ? " has-error" : ""}`}>
        <input
          type="checkbox"
          name="acceptTerms"
          checked={state.acceptTerms}
          onChange={onChange}
          aria-invalid={errors.acceptTerms ? "true" : "false"}
        />
        <span>
          I agree to the{" "}
          <a href="/terms" target="_blank" rel="noopener">
            Terms of Service
          </a>
          .
        </span>
      </label>
      <p className="ol-privacy-note">
        Read how we handle your information in our{" "}
        <a href="/privacy" target="_blank" rel="noopener">
          Privacy Policy
        </a>
        .
      </p>
      {errors.acceptTerms ? <small className="field-error">{errors.acceptTerms}</small> : null}

      <button type="submit" className="ol-btn ol-btn-gold ol-btn-block" disabled={submitState.status === "loading"}>
        {submitState.status === "loading" ? "Opening secure checkout..." : "Continue to secure payment"}
      </button>
      <small className={`ol-checkout-status status-${submitState.status}`} aria-live="polite">
        {submitState.status === "error" ? submitState.message : "Payment is processed securely by Stripe."}
      </small>
    </form>
  );
}

function OnlineLessonsPage({ currentPath, navigate, search }) {
  useLessonsFont();
  const content = onlineLessonsPage;
  const { hero, fun, special, audience, pricing, policy, aid, cta } = content;
  const coachesSection = content.coaches;
  const wasCancelled = new URLSearchParams(search).get("payment") === "cancelled";

  useEffect(() => {
    if (wasCancelled) {
      window.requestAnimationFrame(() => scrollToElementId("pricing"));
    }
  }, [wasCancelled]);

  const getStarted = () => scrollToElementId("pricing");

  return (
    <OnlineLessonsContent
      content={content}
      hero={hero}
      fun={fun}
      special={special}
      audience={audience}
      pricing={pricing}
      policy={policy}
      aid={aid}
      coachesSection={coachesSection}
      cta={cta}
      wasCancelled={wasCancelled}
      getStarted={getStarted}
      currentPath={currentPath}
      navigate={navigate}
    />
  );
}

// One checkout page for all three packages. The package chosen on a pricing
// card arrives as ?package=..., and can still be changed here.
function LessonCheckoutPage({ currentPath, navigate, search }) {
  useLessonsFont();
  const params = new URLSearchParams(search);
  const requestedPackage = params.get("package");
  const wasCancelled = params.get("payment") === "cancelled";
  const plans = onlineLessonsPage.pricing.plans;
  const [checkoutState, setCheckoutState] = useState(() => ({
    ...lessonCheckoutInitialState,
    packageId: plans.some((plan) => plan.packageId === requestedPackage) ? requestedPackage : "",
  }));
  const [checkoutErrors, setCheckoutErrors] = useState({});
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const updateField = (event) => {
    const { name, type, value, checked } = event.target;
    setCheckoutState((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const submitCheckout = async (event) => {
    event.preventDefault();
    const errors = validateLessonCheckoutFields(checkoutState);
    setCheckoutErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitState({ status: "error", message: Object.values(errors)[0] });
      const firstField = document.querySelector(`#lesson-checkout [name="${Object.keys(errors)[0]}"]`);
      firstField?.focus();
      return;
    }

    setSubmitState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/create-lesson-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkoutState),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.url) {
        setCheckoutErrors(payload.fieldErrors || {});
        throw new Error(payload.error || "Checkout could not be started. Please try again.");
      }

      window.location.assign(payload.url);
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "Checkout could not be started. Please try again.",
      });
    }
  };

  return (
    <div className="ol-page">
      <section className="ol-section ol-checkout-page">
        <div className="ol-shell">
          <LessonsBreadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Lessons" },
              { label: "Online Private Lessons", path: "/lessons/online" },
              { label: onlineLessonsPage.checkout.pageTitle },
            ]}
            currentPath={currentPath}
            navigate={navigate}
          />
          <h1 className="ol-title">{onlineLessonsPage.pricing.title}</h1>
          {wasCancelled ? (
            <p className="ol-notice" role="status">
              {onlineLessonsPage.checkout.cancelled}
            </p>
          ) : null}
          <LessonCheckoutForm
            plans={plans}
            state={checkoutState}
            errors={checkoutErrors}
            submitState={submitState}
            onChange={updateField}
            onSubmit={submitCheckout}
          />
        </div>
      </section>
    </div>
  );
}

function OnlineLessonsContent({
  content,
  hero,
  fun,
  special,
  audience,
  pricing,
  policy,
  aid,
  coachesSection,
  cta,
  wasCancelled,
  getStarted,
  currentPath,
  navigate,
}) {
  const choosePackage = (packageId) => navigate(`${content.checkout.path}?package=${packageId}`);

  return (
    <div className="ol-page">
      <section className="ol-hero" aria-labelledby="ol-hero-title">
        <img
          className="ol-hero-photo"
          src={onlineHero1200}
          srcSet={`${onlineHero720} 720w, ${onlineHero1200} 1200w, ${onlineHero1800} 1800w`}
          sizes="(max-width: 780px) 100vw, 1240px"
          alt=""
          width="1800"
          height="1125"
          fetchPriority="high"
        />
        <div className="ol-hero-inner">
          <LessonsBreadcrumb items={content.breadcrumb} currentPath={currentPath} navigate={navigate} />
          <h1 id="ol-hero-title">{hero.title}</h1>
          <p className="ol-hero-accent">{hero.accent}</p>
          <p className="ol-hero-intro">{hero.intro}</p>
          <button type="button" className="ol-btn ol-btn-gold" onClick={getStarted}>
            {hero.cta}
          </button>
          <ul className="ol-hero-features">
            {hero.features.map((item) => (
              <li key={item.text}>
                <UiIcon name={item.icon} size={30} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ol-section ol-fun" aria-labelledby="ol-fun-title">
        <div className="ol-shell ol-fun-grid">
          <div className="ol-reveal">
            <h2 id="ol-fun-title" className="ol-title">{fun.title}</h2>
            <p className="ol-text">{fun.text}</p>
          </div>
          <ul className="ol-fun-icons">
            {fun.items.map((item) => (
              <li key={item.label} className="ol-reveal">
                <span className={`ol-round-icon ol-tone-${item.tone}`}>
                  <UiIcon name={item.icon} size={34} filled />
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ol-section" aria-labelledby="ol-special-title">
        <div className="ol-shell ol-panel">
          <h2 id="ol-special-title" className="ol-title ol-reveal">{special.title}</h2>
          <div className="ol-special-grid">
            {special.cards.map((item) => (
              <article key={item.title} className="ol-special-card ol-reveal">
                <span className="ol-special-icon">
                  <UiIcon name={item.icon} size={44} filled />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ol-section" aria-labelledby="ol-audience-title">
        <div className="ol-shell ol-panel ol-panel-tint ol-audience">
          <div className="ol-reveal">
            <h2 id="ol-audience-title" className="ol-title">{audience.title}</h2>
            <p className="ol-text">{audience.intro}</p>
          </div>
          <ul className="ol-audience-list">
            {audience.items.map((item) => (
              <li key={item.text} className="ol-reveal">
                <UiIcon name={item.icon} size={34} filled />
                <p>
                  {item.title ? <strong>{item.title}</strong> : null}
                  {item.title ? " " : null}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ol-section ol-pricing" id="pricing" aria-labelledby="ol-pricing-title">
        <div className="ol-shell">
          <div className="ol-pricing-head ol-reveal">
            <span className="ol-eyebrow">{pricing.eyebrow}</span>
            <h2 id="ol-pricing-title" className="ol-title">{pricing.title}</h2>
            <p className="ol-text">{pricing.intro}</p>
          </div>

          {wasCancelled ? (
            <p className="ol-notice" role="status">
              {content.checkout.cancelled}
            </p>
          ) : null}

          <div className="ol-plans">
            {pricing.plans.map((plan) => (
              <article key={plan.packageId} className={`ol-plan ol-reveal${plan.featured ? " is-featured" : ""}`}>
                {plan.badge ? <span className="ol-plan-badge">{plan.badge}</span> : null}
                <h3>{plan.name}</h3>
                <p className="ol-plan-price">{plan.price}</p>
                <p className="ol-plan-unit">{plan.unit}</p>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>
                      <UiIcon name="check" size={20} filled />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={`${content.checkout.path}?package=${plan.packageId}`}
                  className={`ol-btn ol-btn-block ${plan.featured ? "ol-btn-gold" : "ol-btn-outline"}`}
                  onClick={(event) => {
                    event.preventDefault();
                    choosePackage(plan.packageId);
                  }}
                >
                  Get Started
                  <span className="sr-only"> with the {plan.name}</span>
                </a>
              </article>
            ))}
          </div>

          <div className="ol-terms ol-panel-tint">
            <section className="ol-policy" aria-labelledby="ol-policy-title">
              <UiIcon name="calendar" size={46} />
              <div>
                <h3 id="ol-policy-title">{policy.title}</h3>
                <ul>
                  {policy.points.map((point) => (
                    <li key={point}>
                      <UiIcon name="check" size={18} filled />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="ol-policy-note">{policy.note}</p>
                <AppLink to="/terms" navigate={navigate} currentPath={currentPath} className="ol-coach-link">
                  {policy.termsLabel}
                </AppLink>
              </div>
            </section>
            <section className="ol-aid" aria-labelledby="ol-aid-title">
              <UiIcon name="heart" size={46} />
              <div>
                <h3 id="ol-aid-title">{aid.title}</h3>
                <p>{aid.text}</p>
                <AppLink to={aid.contactPath} navigate={navigate} currentPath={currentPath} className="ol-btn ol-btn-outline ol-btn-small">
                  {aid.cta}
                </AppLink>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="ol-section" aria-labelledby="ol-coaches-title">
        <div className="ol-shell">
          <div className="ol-coaches-head ol-reveal">
            <div>
              <h2 id="ol-coaches-title" className="ol-title">{coachesSection.title}</h2>
              <p className="ol-text">{coachesSection.intro}</p>
            </div>
            <AppLink to={coachesSection.teamPath} navigate={navigate} currentPath={currentPath} className="ol-btn ol-btn-outline ol-btn-small">
              {coachesSection.teamLabel}
            </AppLink>
          </div>
          <CoachCards currentPath={currentPath} navigate={navigate} />
        </div>
      </section>

      <section className="ol-cta" aria-labelledby="ol-cta-title">
        <img
          className="ol-cta-photo"
          src={ctaChess1800}
          srcSet={`${ctaChess900} 900w, ${ctaChess1800} 1800w`}
          sizes="100vw"
          alt=""
          width="1800"
          height="771"
          loading="lazy"
        />
        <div className="ol-cta-inner ol-reveal">
          <h2 id="ol-cta-title">{cta.title}</h2>
          <p>{cta.text}</p>
          <button type="button" className="ol-btn ol-btn-gold" onClick={getStarted}>
            {cta.button}
          </button>
        </div>
      </section>
    </div>
  );
}

function CoachPhoto({ coach, sizes, loading = "lazy", className }) {
  const photo = coachPhotos[coach.photo];

  return (
    <img
      className={className}
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={photo.srcSet ? sizes : undefined}
      alt={coach.photoAlt}
      width={photo.width}
      height={photo.height}
      loading={loading}
    />
  );
}

// Coach cards in the style of the mockup's "Meet Your Online Coaches" block.
function CoachCards({ currentPath, navigate, headingLevel = "h3" }) {
  const Heading = headingLevel;

  return (
    <div className="ol-coaches">
      {coaches.map((coach) => (
        <article key={coach.id} className="ol-coach ol-reveal">
          <CoachPhoto coach={coach} sizes="(max-width: 640px) 90vw, 200px" />
          <div>
            <Heading>{coach.name}</Heading>
            <span className="ol-coach-badge">{coach.title}</span>
            <p>{coach.text}</p>
            <AppLink to={coach.profilePath} navigate={navigate} currentPath={currentPath} className="ol-coach-link">
              View full profile <span aria-hidden="true">&rarr;</span>
              <span className="sr-only"> of {coach.name}</span>
            </AppLink>
          </div>
        </article>
      ))}
    </div>
  );
}

function OurTeamPage({ currentPath, navigate }) {
  useLessonsFont();

  return (
    <div className="ol-page">
      <section className="ol-section ol-team">
        <div className="ol-shell">
          <LessonsBreadcrumb items={ourTeamPage.breadcrumb} currentPath={currentPath} navigate={navigate} />
          <div className="ol-team-head">
            <h1 className="ol-title">{ourTeamPage.title}</h1>
            <p className="ol-text">{ourTeamPage.intro}</p>
          </div>
          <CoachCards currentPath={currentPath} navigate={navigate} headingLevel="h2" />
        </div>
      </section>
    </div>
  );
}

function CoachProfilePage({ coach, currentPath, navigate }) {
  useLessonsFont();

  return (
    <div className="ol-page">
      <section className="ol-section ol-profile">
        <div className="ol-shell">
          <LessonsBreadcrumb
            items={[{ label: "Home", path: "/" }, { label: "Our Team", path: "/our-team" }, { label: coach.name }]}
            currentPath={currentPath}
            navigate={navigate}
          />
          <article className="ol-profile-card">
            <CoachPhoto coach={coach} sizes="(max-width: 780px) 92vw, 460px" loading="eager" className="ol-profile-photo" />
            <div className="ol-profile-copy">
              <h1 className="ol-title">{coach.name}</h1>
              <span className="ol-coach-badge">{coach.title}</span>
              <p className="ol-text">{coach.text}</p>
              <div className="ol-profile-actions">
                <AppLink to={ourTeamPage.profileCtaPath} navigate={navigate} currentPath={currentPath} className="ol-btn ol-btn-gold">
                  {ourTeamPage.profileCta}
                </AppLink>
                <AppLink to="/our-team" navigate={navigate} currentPath={currentPath} className="ol-back-link">
                  <span aria-hidden="true">&larr;</span> {ourTeamPage.backLabel}
                </AppLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

function LessonThankYouPage({ currentPath, navigate, search }) {
  useLessonsFont();
  const sessionId = new URLSearchParams(search).get("session_id") || "";
  const [state, setState] = useState({ status: sessionId ? "loading" : "missing", details: null });

  useEffect(() => {
    if (!sessionId) {
      return undefined;
    }

    let cancelled = false;

    fetch("/api/checkout-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));

        if (!cancelled) {
          setState(
            response.ok && payload.status === "paid" && payload.bookingType === "online_lessons"
              ? { status: "paid", details: payload }
              : { status: "unconfirmed", details: null }
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: "unconfirmed", details: null });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const { details } = state;

  return (
    <div className="ol-page">
      <section className="ol-section ol-thanks">
        <div className="ol-shell ol-thanks-card" aria-live="polite">
          {state.status === "loading" ? <p className="ol-text">Confirming your payment...</p> : null}

          {state.status === "paid" ? (
            <>
              <span className="ol-round-icon ol-tone-green">
                <UiIcon name="check" size={34} filled />
              </span>
              <h1 className="ol-title">{onlineLessonsPage.thankYou.title}</h1>
              <p className="ol-text">{onlineLessonsPage.thankYou.message}</p>
              <dl className="ol-order">
                <div>
                  <dt>Order number</dt>
                  <dd>{details.orderNumber}</dd>
                </div>
                <div>
                  <dt>Package</dt>
                  <dd>{details.packageLabel}</dd>
                </div>
                {typeof details.amountTotal === "number" ? (
                  <div>
                    <dt>Amount paid</dt>
                    <dd>${details.amountTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</dd>
                  </div>
                ) : null}
                {details.customerEmail ? (
                  <div>
                    <dt>Confirmation sent to</dt>
                    <dd>{details.customerEmail}</dd>
                  </div>
                ) : null}
              </dl>
            </>
          ) : null}

          {state.status === "unconfirmed" || state.status === "missing" ? (
            <>
              <h1 className="ol-title">We couldn't confirm a payment</h1>
              <p className="ol-text">
                If you completed checkout, your payment is safe and our team will see it. If you were charged and
                don't get a confirmation email, please contact us with your email address.
              </p>
            </>
          ) : null}

          {state.status !== "loading" ? (
            <div className="ol-thanks-actions">
              <AppLink to="/lessons/online" navigate={navigate} currentPath={currentPath} className="ol-btn ol-btn-outline ol-btn-small">
                Back to Online Lessons
              </AppLink>
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ol-btn ol-btn-gold ol-btn-small">
                Contact us
              </AppLink>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function ComingSoonLessonPage({ page, currentPath, navigate }) {
  return (
    <div className="ac-page">
      <section className="ac-section">
        <div className="ac-shell ol-soon">
          <LessonsBreadcrumb
            items={[{ label: "Home", path: "/" }, { label: "Lessons" }, { label: page.title }]}
            currentPath={currentPath}
            navigate={navigate}
          />
          <ProgramStatusBadge programId={page.programId} />
          <h1>{page.title}</h1>
          <p className="ac-lead">{page.intro}</p>
          <div className="ac-actions">
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-primary">
              Contact us
            </AppLink>
            <AppLink to="/lessons/online" navigate={navigate} currentPath={currentPath} className="ac-btn ac-btn-secondary">
              See Online Lessons
            </AppLink>
          </div>
        </div>
      </section>
    </div>
  );
}

// Lessons menu: a dropdown on desktop, an expandable group in the phone menu.
function NavDropdown({ item, currentPath, navigate, onNavigate }) {
  // Remembers the page the menu was opened on, so it closes itself after navigation.
  const [openOnPath, setOpenOnPath] = useState(null);
  const isOpen = openOnPath === currentPath;
  const setIsOpen = (open) => setOpenOnPath(open ? currentPath : null);
  const containerRef = useRef(null);
  const menuId = `nav-menu-${item.label.toLowerCase()}`;
  const isActive = item.children.some((child) => currentPath === child.path || currentPath.startsWith(`${child.path}/`));

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointer = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpenOnPath(null);
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpenOnPath(null);
        containerRef.current?.querySelector("button")?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <div className={`ac-nav-dropdown${isOpen ? " is-open" : ""}`} ref={containerRef}>
      <button
        type="button"
        className={`ac-nav-link ac-nav-trigger${isActive ? " is-active" : ""}`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <svg className="ac-nav-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul className="ac-nav-submenu" id={menuId}>
        {item.children.map((child) => (
          <li key={child.path}>
            <AppLink
              to={child.path}
              navigate={navigate}
              currentPath={currentPath}
              className="ac-nav-sublink"
              onNavigate={() => {
                setIsOpen(false);
                onNavigate();
              }}
            >
              <UiIcon name={child.icon} size={20} />
              {child.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChessTruckApp() {
  const [route, setRoute] = useState(readLocation);
  const [registrationState, setRegistrationState] = useState(readRegistrationDraft);
  const [registrationErrors, setRegistrationErrors] = useState({});
  const [paymentState, setPaymentState] = useState(getInitialPaymentState);
  const [campCheckoutState, setCampCheckoutState] = useState(getInitialCampCheckoutState);
  const [initialCampOption] = useState(() => findRequestedCampOption(route));
  const [campBookingState, setCampBookingState] = useState(() =>
    initialCampOption
      ? withFallbackCampSchedule(campBookingInitialState, initialCampOption)
      : campBookingInitialState
  );
  const [campBookingErrors, setCampBookingErrors] = useState({});
  const [isCampBookingFormVisible, setIsCampBookingFormVisible] = useState(
    () => Boolean(initialCampOption) || isPaymentReturnCancelled("camp")
  );
  const [selectedCampOptionId, setSelectedCampOptionId] = useState(
    () =>
      initialCampOption?.id ||
      CAMP_PURCHASE_OPTIONS.find((item) => item.id === "single-day")?.id ||
      CAMP_PURCHASE_OPTIONS[0]?.id ||
      ""
  );
  const [contactState, setContactState] = useState(() => ({
    ...contactInitialState,
    topic: getContactTopic(window.location.search),
  }));
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitState, setContactSubmitState] = useState({ status: "idle", message: "" });
  const [isCompactViewport, setIsCompactViewport] = useState(
    () => window.matchMedia(COMPACT_VIEWPORT_QUERY).matches
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNavCompact, setIsNavCompact] = useState(() => window.matchMedia(NAV_COMPACT_QUERY).matches);
  // Bumped when the server's registration availability arrives so the page re-renders.
  const [, setAvailabilityVersion] = useState(0);
  const [activeRegistrationStep, setActiveRegistrationStep] = useState(0);
  const mainRef = useRef(null);
  const currentPath = route.pathname;

  const selectedServiceLevel = useMemo(
    () => serviceLevels.find((item) => item.id === registrationState.serviceLevel) || null,
    [registrationState.serviceLevel]
  );

  useEffect(() => {
    const media = window.matchMedia(COMPACT_VIEWPORT_QUERY);
    const handleViewportChange = (event) => {
      setIsCompactViewport(event.matches);
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleViewportChange);
      return () => media.removeEventListener("change", handleViewportChange);
    }

    media.addListener(handleViewportChange);
    return () => media.removeListener(handleViewportChange);
  }, []);

  // Registration opens only when the server confirms a program passed its launch
  // check. Nothing is requested while no program is marked "open".
  useEffect(() => {
    if (!hasOpenConfiguredStatus()) {
      return undefined;
    }

    let cancelled = false;

    fetch("/api/program-availability", { headers: { Accept: "application/json" }, cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (cancelled) {
          return;
        }

        // Malformed or missing data parses to "everything closed".
        // Every program the site knows, including ones without a homepage card (online lessons).
        const { programs: availablePrograms, campSessions } = parseAvailabilityResponse(
          payload,
          Object.keys(programStatuses)
        );
        setApprovedCampSessions(campSessions);
        setRegistrationAvailability(availablePrograms);
        setAvailabilityVersion((version) => version + 1);
      })
      .catch(() => {
        // Stay closed if the check cannot be reached.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia(NAV_COMPACT_QUERY);
    const handleNavBreakpointChange = (event) => {
      setIsNavCompact(event.matches);

      if (!event.matches) {
        setIsMobileNavOpen(false);
      }
    };

    media.addEventListener("change", handleNavBreakpointChange);
    return () => media.removeEventListener("change", handleNavBreakpointChange);
  }, []);

  useEffect(() => {
    if (!isNavCompact || !isMobileNavOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNavCompact, isMobileNavOpen]);

  const syncStateForRoute = (nextRoute) => {
    setIsMobileNavOpen(false);

    if (nextRoute.pathname === "/contact") {
      setContactState((current) => ({ ...current, topic: getContactTopic(nextRoute.search) }));
    }

    if (nextRoute.pathname === "/camps/confirmed") {
      setCampCheckoutState((current) =>
        current.status === "idle" ? readStoredCampConfirmation() || current : current
      );
    }

    const requestedOption = findRequestedCampOption(nextRoute);

    if (requestedOption) {
      setSelectedCampOptionId(requestedOption.id);
      setIsCampBookingFormVisible(true);
      setCampBookingState((current) => withFallbackCampSchedule(current, requestedOption));
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = readLocation();
      setRoute(nextRoute);
      syncStateForRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const hasMeaningfulDraft = Object.entries(registrationState).some(([key, value]) => {
      if (key === "acceptSms") {
        return value === true;
      }

      return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
    });

    if (!hasMeaningfulDraft) {
      window.localStorage.removeItem(REGISTRATION_DRAFT_KEY);
      return;
    }

    window.localStorage.setItem(REGISTRATION_DRAFT_KEY, JSON.stringify(registrationState));
  }, [registrationState]);

  useEffect(() => {
    const meta = routeMeta[currentPath] || routeMeta["/"];
    document.title = meta.title;
    updateMetaTag("meta[name='description']", meta.description);
    updateMetaTag("meta[property='og:title']", meta.title);
    updateMetaTag("meta[property='og:description']", meta.description);
    updateMetaTag("meta[name='twitter:title']", meta.title);
    updateMetaTag("meta[name='twitter:description']", meta.description);

    const canonicalUrl = `${SITE_ORIGIN}${canonicalPathAliases[currentPath] || currentPath}`;
    updateCanonicalLink(canonicalUrl);
    updateMetaTag("meta[property='og:url']", canonicalUrl);
    updateMetaTag("meta[name='robots']", isNoIndexPath(currentPath) ? "noindex,nofollow" : "index,follow");
  }, [currentPath]);

  useRevealOnScroll(currentPath);

  useEffect(() => {
    const focusTimer = window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusTimer);
  }, [currentPath]);

  useEffect(() => {
    if (!initialPaymentReturn || isInitialPaymentReturnHandled) {
      return;
    }

    isInitialPaymentReturnHandled = true;
    const { scope, payment, sessionId } = initialPaymentReturn;

    if (scope === "camp" && payment === "cancel") {
      window.sessionStorage.removeItem(CAMP_CONFIRMATION_STORAGE_KEY);
      return;
    }

    if (payment !== "success" || !sessionId) {
      return;
    }

    const checkoutStatusRequest = fetch("/api/checkout-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).then(async (response) => {
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || payload.status !== "paid") {
        throw new Error(payload.error || "Payment confirmation could not be verified yet.");
      }

      return payload;
    });

    if (scope === "camp") {
      checkoutStatusRequest
        .then((payload) => {
          const confirmedState = {
            status: "success",
            message:
              payload.message ||
              "Camp payment confirmed. We will follow up with the next registration details.",
            details: payload,
            activeOption: "",
          };

          setCampCheckoutState(confirmedState);
          window.sessionStorage.setItem(
            CAMP_CONFIRMATION_STORAGE_KEY,
            JSON.stringify(confirmedState)
          );
        })
        .catch((error) => {
          window.sessionStorage.removeItem(CAMP_CONFIRMATION_STORAGE_KEY);
          setCampCheckoutState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Payment confirmation could not be verified yet.",
            details: null,
            activeOption: "",
          });
        });
      return;
    }

    checkoutStatusRequest
      .then((payload) => {
        setPaymentState({
          status: "success",
          message:
            payload.message ||
            "Payment confirmed. The registration has been recorded successfully.",
          details: payload,
        });
        setRegistrationState(registrationInitialState);
        setRegistrationErrors({});
        setActiveRegistrationStep(0);
        window.localStorage.removeItem(REGISTRATION_DRAFT_KEY);
      })
      .catch((error) => {
        setPaymentState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Payment confirmation could not be verified yet.",
          details: null,
        });
      });
  }, []);

  const navigate = (to) => {
    const nextUrl = new URL(to, window.location.origin);
    const nextPathname = normalizePath(nextUrl.pathname);
    const redirectPath = legacyRouteRedirects[nextPathname];
    const nextRoute = redirectPath
      ? { pathname: redirectPath, search: "" }
      : { pathname: nextPathname, search: nextUrl.search };

    syncStateForRoute(nextRoute);

    if (nextRoute.pathname === route.pathname && nextRoute.search === route.search) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({}, "", `${nextRoute.pathname}${nextRoute.search}${nextUrl.hash}`);
    setRoute(nextRoute);

    if (nextUrl.hash) {
      window.setTimeout(() => scrollToElementId(decodeURIComponent(nextUrl.hash.slice(1))), 80);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const focusFieldByName = (fieldName, frameCount = 1) => {
    const tryFocus = () => {
      const field =
        fieldName === "selectedDays"
          ? document.querySelector('[data-error-target="selectedDays"] .camp-week-day-chip')
          : document.querySelector(`[name="${fieldName}"]`);

      if (field instanceof HTMLElement) {
        field.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        field.focus({ preventScroll: true });
      }
    };

    const scheduleFocus = (remainingFrames) => {
      if (remainingFrames <= 0) {
        tryFocus();
        return;
      }

      window.requestAnimationFrame(() => scheduleFocus(remainingFrames - 1));
    };

    scheduleFocus(frameCount);
  };

  const focusFirstErrorField = (errors, options = {}) => {
    const firstField = Object.keys(errors)[0];

    if (!firstField) {
      return;
    }

    if (options.stepAware) {
      const matchingStepIndex = registrationStepDefinitions.findIndex((stepDefinition) =>
        stepDefinition.fields.includes(firstField)
      );

      if (matchingStepIndex >= 0) {
        setActiveRegistrationStep(matchingStepIndex);
        focusFieldByName(firstField, 2);
        return;
      }
    }

    focusFieldByName(firstField, 1);
  };

  const updateRegistrationField = ({ target }) => {
    const { name, type, checked, value } = target;
    const nextValue = type === "checkbox" ? checked : value;

    setRegistrationState((current) => {
      const next = { ...current, [name]: nextValue };

      if (name === "section" && value !== "Open") {
        next.uscfId = "";
      }

      return next;
    });

    setRegistrationErrors((current) => {
      const next = { ...current };
      delete next[name];

      if (name === "section" && value !== "Open") {
        delete next.uscfId;
      }

      return next;
    });

    if (paymentState.status !== "idle") {
      setPaymentState({ status: "idle", message: "", details: null });
    }
  };

  const updateContactField = ({ target }) => {
    const { name, value } = target;
    setContactState((current) => ({ ...current, [name]: value }));
    setContactErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });

    if (contactSubmitState.status !== "idle") {
      setContactSubmitState({ status: "idle", message: "" });
    }
  };

  const updateCampBookingField = (name, value) => {
    setCampBookingState((current) => ({ ...current, [name]: value }));

    setCampBookingErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });

    if (campCheckoutState.status !== "idle") {
      setCampCheckoutState(campCheckoutInitialState);
    }
  };

  const validateRegistration = () => {
    const errors = validateRegistrationFields(registrationState);
    setRegistrationErrors(errors);

    if (isCompactViewport) {
      const firstStepWithErrors = findFirstStepWithErrors(errors);

      if (firstStepWithErrors >= 0) {
        setActiveRegistrationStep(firstStepWithErrors);
      }
    }

    return errors;
  };

  const goToPreviousRegistrationStep = () => {
    setActiveRegistrationStep((current) => Math.max(0, current - 1));
  };

  const goToNextRegistrationStep = () => {
    const stepDefinition = registrationStepDefinitions[activeRegistrationStep];
    const allErrors = validateRegistrationFields(registrationState);
    const stepErrors = getStepErrors(allErrors, stepDefinition);

    setRegistrationErrors((current) => {
      const next = { ...current };
      stepDefinition.fields.forEach((field) => {
        delete next[field];
      });

      return {
        ...next,
        ...stepErrors,
      };
    });

    if (Object.keys(stepErrors).length > 0) {
      focusFirstErrorField(stepErrors, { stepAware: isCompactViewport });
      return;
    }

    setActiveRegistrationStep((current) =>
      Math.min(registrationStepDefinitions.length - 1, current + 1)
    );
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateRegistration();

    if (Object.keys(nextErrors).length > 0) {
      focusFirstErrorField(nextErrors, { stepAware: isCompactViewport });
      setPaymentState({
        status: "error",
        message: "Please fix the highlighted fields before continuing to payment.",
        details: null,
      });
      return;
    }

    setPaymentState({ status: "loading", message: "", details: null });

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationState),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.url) {
        if (payload.fieldErrors) {
          setRegistrationErrors(payload.fieldErrors);
          focusFirstErrorField(payload.fieldErrors, { stepAware: isCompactViewport });
        }
        throw new Error(payload.error || "Stripe checkout could not be created.");
      }

      window.location.assign(payload.url);
    } catch (error) {
      setPaymentState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Stripe checkout could not be created.",
        details: null,
      });
    }
  };

  const openCampBooking = (optionId, schedulePreference = "") => {
    const selectedOption = CAMP_PURCHASE_OPTION_MAP.get(optionId);
    setSelectedCampOptionId(optionId);
    setIsCampBookingFormVisible(true);

    const fallbackSchedule =
      getCampScheduleOptions(optionId)[0]?.value || selectedOption?.defaultSchedulePreference || "";
    const nextSchedulePreference = schedulePreference || fallbackSchedule;

    setCampBookingState((current) => ({
      ...current,
      schedulePreference:
        CAMP_FLEX_PACK_OPTION_IDS.has(optionId)
          ? ""
          : nextSchedulePreference || current.schedulePreference,
      selectedDays:
        CAMP_WEEKLY_OPTION_IDS.has(optionId)
          ? getWeekDaysForSchedulePreference(nextSchedulePreference || current.schedulePreference)
          : CAMP_DATE_SELECTION_OPTION_IDS.has(optionId) && nextSchedulePreference
            ? [nextSchedulePreference]
            : [],
      addOns: CAMP_OPTIONS_WITH_ADD_ONS.has(optionId) ? current.addOns || [] : [],
    }));
    setCampBookingErrors((current) => {
      const next = { ...current };
      delete next.schedulePreference;
      delete next.selectedDays;
      delete next.addOns;
      return next;
    });

    window.requestAnimationFrame(() => {
      document.getElementById("camp-booking-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleCampBookingSubmit = async (event, optionId) => {
    event.preventDefault();

    const nextErrors = validateCampBookingFields(campBookingState, optionId);
    setCampBookingErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstErrorField(nextErrors);
      setCampCheckoutState({
        status: "error",
        message: "Please review the booking details before continuing to checkout.",
        details: null,
        activeOption: "",
      });
      return;
    }

    setCampCheckoutState({ status: "loading", message: "", details: null, activeOption: optionId });

    try {
      const bookingBasePath = currentPath === "/" ? "/" : "/camps";
      const returnPath = `${bookingBasePath}?option=${optionId}`;
      const response = await fetch("/api/create-camp-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          optionId,
          returnPath,
          ...campBookingState,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.url) {
        if (payload.fieldErrors) {
          setCampBookingErrors(payload.fieldErrors);
          focusFirstErrorField(payload.fieldErrors);
        }
        throw new Error(payload.error || "Camp checkout could not be created.");
      }

      window.location.assign(payload.url);
    } catch (error) {
      setCampCheckoutState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Camp checkout could not be created.",
        details: null,
        activeOption: "",
      });
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const contactErrors = validateContactFields(contactState);
    setContactErrors(contactErrors);

    if (Object.keys(contactErrors).length > 0) {
      focusFirstErrorField(contactErrors);
      setContactSubmitState({
        status: "error",
        message: Object.values(contactErrors)[0] || "Please check the form and try again.",
      });
      return;
    }

    setContactSubmitState({ status: "loading", message: "" });

    try {
      const response = await fetch("/api/tournament-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactState),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Sorry, your message didn't go through. Please try again.");
      }

      setContactSubmitState({ status: "success", message: payload.message || "Thanks! We got your message." });
      setContactState(contactInitialState);
    } catch (error) {
      setContactSubmitState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Sorry, your message didn't go through. Please try again.",
      });
    }
  };

  const clearRegistrationDraft = () => {
    window.localStorage.removeItem(REGISTRATION_DRAFT_KEY);
    setRegistrationState(registrationInitialState);
    setRegistrationErrors({});
    setPaymentState({ status: "idle", message: "", details: null });
    setActiveRegistrationStep(0);
  };

  const pageContent = (() => {
    switch (currentPath) {
        case "/":
          return <AcademyHomePage currentPath={currentPath} navigate={navigate} />;
        case "/camps":
        case "/camps/book":
          return (
            <CampsPage
              currentPath={currentPath}
              navigate={navigate}
              bookingProps={{
                campCheckoutState,
                campBookingState,
                campBookingErrors,
                updateCampBookingField,
                handleCampBookingSubmit,
                selectedCampOptionId,
                isCampBookingFormVisible,
                openCampBooking,
              }}
            />
          );
        case "/camps/confirmed":
          return (
            <CampConfirmationPage
              currentPath={currentPath}
              navigate={navigate}
              campCheckoutState={campCheckoutState}
            />
          );
        case "/camps/training":
        case "/camps/prep":
        case "/camps/online":
          return <CampsPage currentPath={currentPath} navigate={navigate} bookingProps={{}} />;
        case "/about":
          return <AboutPage currentPath={currentPath} navigate={navigate} />;
      case "/tournaments":
        return <TournamentsPage currentPath={currentPath} navigate={navigate} />;
      case "/lessons/online":
        return <OnlineLessonsPage currentPath={currentPath} navigate={navigate} search={route.search} />;
      case "/lessons/online/checkout":
        return <LessonCheckoutPage currentPath={currentPath} navigate={navigate} search={route.search} />;
      case "/our-team":
        return <OurTeamPage currentPath={currentPath} navigate={navigate} />;
      case "/our-team/amir":
      case "/our-team/andrea":
        return (
          <CoachProfilePage
            coach={coaches.find((item) => item.profilePath === currentPath)}
            currentPath={currentPath}
            navigate={navigate}
          />
        );
      case "/lessons/online/thank-you":
        return <LessonThankYouPage currentPath={currentPath} navigate={navigate} search={route.search} />;
      case "/lessons/in-person":
      case "/lessons/group":
        return <ComingSoonLessonPage page={comingSoonLessonPages[currentPath]} currentPath={currentPath} navigate={navigate} />;
      case "/after-school":
        return <AfterSchoolPage currentPath={currentPath} navigate={navigate} />;
      case "/faq":
        return <FaqPage currentPath={currentPath} navigate={navigate} />;
      case "/terms":
        return <LegalPage {...termsPage} currentPath={currentPath} navigate={navigate} />;
      case "/interest/confirm":
        return <InterestActionPage action="confirm" currentPath={currentPath} navigate={navigate} />;
      case "/interest/unsubscribe":
        return <InterestActionPage action="unsubscribe" currentPath={currentPath} navigate={navigate} />;
      case "/privacy":
        return <LegalPage {...privacyPage} currentPath={currentPath} navigate={navigate} />;
      case "/contact":
        return (
          <ContactPage
            currentPath={currentPath}
            navigate={navigate}
            contactState={contactState}
            contactErrors={contactErrors}
            contactSubmitState={contactSubmitState}
            updateContactField={updateContactField}
            handleContactSubmit={handleContactSubmit}
          />
        );
      case "/register":
        // Tournament registration stays behind the program status, even via direct URL.
        if (!isProgramOpen("tournaments")) {
          return <TournamentsPage currentPath={currentPath} navigate={navigate} />;
        }

        return (
          <RegisterPage
            currentPath={currentPath}
            navigate={navigate}
            registrationState={registrationState}
            registrationErrors={registrationErrors}
            updateRegistrationField={updateRegistrationField}
            handleRegistrationSubmit={handleRegistrationSubmit}
            paymentState={paymentState}
            selectedServiceLevel={selectedServiceLevel}
            clearRegistrationDraft={clearRegistrationDraft}
            isCompactViewport={isCompactViewport}
            activeRegistrationStep={activeRegistrationStep}
            setActiveRegistrationStep={setActiveRegistrationStep}
            goToNextRegistrationStep={goToNextRegistrationStep}
            goToPreviousRegistrationStep={goToPreviousRegistrationStep}
          />
        );
      default:
        return knownRoutes.has(currentPath) ? null : <NotFoundPage currentPath={currentPath} navigate={navigate} />;
    }
  })();

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="page-aura page-aura-left" />
      <div className="page-aura page-aura-right" />

      <header className="ac-header">
        <div className="ac-shell ac-header-row">
          <AppLink
            to="/"
            navigate={navigate}
            currentPath={currentPath}
            className="ac-brand"
            aria-label={`${siteBrand.name} home`}
            onNavigate={() => setIsMobileNavOpen(false)}
          >
            <BrandMark />
          </AppLink>

          <nav
            id="primary-navigation"
            className={`ac-nav${isMobileNavOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
          >
            <ul className="ac-nav-list">
              {navigationItems.map((item) => (
                <li key={item.path} className={item.path === "/" ? "ac-nav-home" : undefined}>
                  {item.children ? (
                    <NavDropdown
                      item={item}
                      currentPath={currentPath}
                      navigate={navigate}
                      onNavigate={() => setIsMobileNavOpen(false)}
                    />
                  ) : (
                    <AppLink
                      to={item.path}
                      navigate={navigate}
                      currentPath={currentPath}
                      className="ac-nav-link"
                      matchSection
                      onNavigate={() => setIsMobileNavOpen(false)}
                    >
                      {item.label}
                    </AppLink>
                  )}
                </li>
              ))}
            </ul>
            <AppLink
              to="/contact"
              navigate={navigate}
              currentPath={currentPath}
              className="ac-btn ac-btn-primary ac-nav-contact"
              onNavigate={() => setIsMobileNavOpen(false)}
            >
              Contact Us
            </AppLink>
          </nav>

          <div className="ac-header-actions">
            <AppLink
              to="/contact"
              navigate={navigate}
              currentPath={currentPath}
              className="ac-btn ac-btn-primary ac-header-cta"
              onNavigate={() => setIsMobileNavOpen(false)}
            >
              Contact Us
            </AppLink>
            <button
              type="button"
              className={`ac-nav-toggle${isMobileNavOpen ? " is-open" : ""}`}
              aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileNavOpen}
              aria-controls="primary-navigation"
              onClick={() => setIsMobileNavOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" ref={mainRef} tabIndex="-1">
        {pageContent}
      </main>

      <SiteFooter currentPath={currentPath} navigate={navigate} />
    </div>
  );
}

export default ChessTruckApp;
