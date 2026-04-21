import { useEffect, useMemo, useRef, useState } from "react";
import {
  aboutPage,
  campBookingPage,
  campDetailPages,
  campMenuFeature,
  campMenuItems,
  campOverviewPage,
  contactEmails,
  contactNumbers,
  contactPage,
  faqItems,
  faqPage,
  featuredTournament,
  footerLegalLinks,
  homePage,
  lessonDetailPages,
  lessonCarouselSlides,
  lessonMenuFeature,
  lessonMenuItems,
  masterTrainingDojo,
  navigationItems,
  privateLessonsPage,
  privacyPage,
  registerPage,
  routeMeta,
  serviceLevels,
  siteBrand,
  termsPage,
  upcomingTournaments,
} from "./siteData";
import brandLogo from "./assets/chess-truck-logo.png";
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
import {
  validateCampBookingFields,
  validateContactFields,
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
};

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
  notes: "",
  website: "",
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

const knownRoutes = new Set([
  "/",
  "/camps",
  "/camps/book",
  "/camps/confirmed",
  "/camps/training",
  "/camps/prep",
  "/camps/online",
  "/about",
  "/events",
  "/events/chess-and-truck-tournament",
  "/private-lessons",
  "/lessons/online",
  "/lessons/in-person",
  "/lessons/group",
  "/lessons/manage",
  "/faq",
  "/contact",
  "/register",
  "/terms",
  "/privacy",
]);

const isCampsPath = (path) => path === "/camps" || path.startsWith("/camps/");
const isLessonsPath = (path) => path === "/private-lessons" || path.startsWith("/lessons/");

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const lessonCarouselImages = {
  online: lessonOnlineVisual,
  inperson: lessonInPersonVisual,
  group: lessonGroupVisual,
  manage: lessonManageVisual,
};

const campMenuImages = {
  overview: campOverviewVisual,
  training: campTrainingVisual,
  prep: campPrepVisual,
  online: campOnlineVisual,
};

const readLocation = () => ({
  pathname: normalizePath(window.location.pathname),
  search: window.location.search,
});

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

function AppLink({ to, navigate, children, className = "", currentPath, onNavigate, ...rest }) {
  const isActive = normalizePath(to) === currentPath;

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
            <AppLink to="/private-lessons" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Lesson Overview
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

      <div className="shell lesson-hero-carousel-wrap">
        <LessonSignalCarousel currentPath={currentPath} navigate={navigate} intro={page.portraitCaption} />
      </div>
    </section>
  );
}

function LessonSignalCarousel({ currentPath, navigate, intro = "Lesson launch opens soon." }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlideIndex((current) => (current + 1) % lessonCarouselSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = lessonCarouselSlides[activeSlideIndex];
  const activeImage = lessonCarouselImages[activeSlide.imageKey];

  return (
    <article className="surface carousel-card lesson-signal-carousel">
      <div className="carousel-copy">
            <span className="mini-tag">Services</span>
        <h3>{activeSlide.title}</h3>
        <p>{activeSlide.text}</p>
        <small className="carousel-intro">{intro}</small>
        <div className="cta-row">
          <AppLink to={activeSlide.path} navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
            Open {activeSlide.label}
          </AppLink>
          <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="text-link">
            Ask About Lessons
          </AppLink>
        </div>
        <div className="carousel-dots" role="tablist" aria-label="Lesson formats">
          {lessonCarouselSlides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              className={`carousel-dot${index === activeSlideIndex ? " is-active" : ""}`}
              aria-label={`Show ${slide.label}`}
              aria-selected={index === activeSlideIndex}
              onClick={() => setActiveSlideIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="carousel-side">
        <div className="carousel-image-frame">
          <img src={activeImage} alt={activeSlide.label} className="carousel-image lesson-carousel-image" />
        </div>
      </div>
    </article>
  );
}

function PageHero({ eyebrow, title, intro, actions, aside, asideLink, portraitCaption, heroFacts, currentPath, navigate }) {
  const asideContent = aside || (
    <>
      <span className="mini-tag mini-tag-dark">Camp focus</span>
      <h2>{featuredTournament.title}</h2>
      <p>{featuredTournament.shortSummary}</p>
      <div className="fact-list">
        <div>
          <span>Location</span>
          <strong>{featuredTournament.city}</strong>
        </div>
        <div>
          <span>Service</span>
          <strong>{featuredTournament.formatLabel}</strong>
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
          <p className="page-intro">{intro}</p>
          {actions ? <div className="cta-row">{actions}</div> : null}
          {heroFacts?.length ? (
            <div className="fact-list fact-list-hero page-hero-facts">
              {heroFacts.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
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
          <LessonSignalCarousel currentPath={currentPath} navigate={navigate} intro={portraitCaption} />
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
        <strong>+$100 with tournament entry</strong>
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

function SiteFooter({ currentPath, navigate }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="surface footer-panel">
          <div className="footer-top">
            <div className="footer-brand-block">
              <div className="footer-brand-row">
                <div className="footer-logo-wrap">
                  <img src={brandLogo} alt={`${siteBrand.name} logo`} className="footer-logo" />
                </div>
              </div>
              <p>{siteBrand.footerNote}</p>
              <AppLink
                to="/contact"
                navigate={navigate}
                currentPath={currentPath}
                className="btn btn-primary footer-cta"
              >
                Contact us
              </AppLink>
            </div>

            <div className="footer-column">
              <span className="mini-tag">Explore</span>
              <div className="footer-nav">
                {navigationItems.map((item) => (
                  <AppLink
                    key={item.path}
                    to={item.path}
                    navigate={navigate}
                    currentPath={currentPath}
                    className="footer-link"
                  >
                    {item.label}
                  </AppLink>
                ))}
                <AppLink
                  to="/contact"
                  navigate={navigate}
                  currentPath={currentPath}
                  className="footer-link"
                >
                  Contact us
                </AppLink>
              </div>
              <div className="footer-legal-links">
                {footerLegalLinks.map((item) => (
                  <AppLink
                    key={item.path}
                    to={item.path}
                    navigate={navigate}
                    currentPath={currentPath}
                    className="footer-link footer-link-legal"
                  >
                    {item.label}
                  </AppLink>
                ))}
              </div>
            </div>

            <div className="footer-column">
              <span className="mini-tag">Support</span>
              <div className="footer-contact-stack">
                {footerContactMethods.map((item) => (
                  <a href={item.href} key={item.display} className="footer-contact-link">
                    <span>{item.label}</span>
                    <strong>{item.display}</strong>
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-column footer-event-column">
              <span className="mini-tag">Featured camps</span>
              <h3>{campOverviewPage.title}</h3>
              <p>{campOverviewPage.intro}</p>
              <div className="footer-meta">
                <span>{campOverviewPage.heroFacts.find((item) => item.label === "Location")?.value || "Upper East Side, NYC"}</span>
                <strong>{campOverviewPage.heroFacts.find((item) => item.label === "Dates")?.value || "Summer 2026"}</strong>
              </div>
              <AppLink
                to="/camps"
                navigate={navigate}
                currentPath={currentPath}
                className="text-link"
              >
                View Camp Details
              </AppLink>
            </div>
          </div>

          <div className="footer-bottom">
            <span>{siteBrand.city}</span>
            <small>&copy; {new Date().getFullYear()} {siteBrand.name}</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LegalPage({ eyebrow, title, intro, sections, currentPath, navigate }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} currentPath={currentPath} navigate={navigate} />

      <section className="page-section">
        <div className="shell legal-stack">
          {sections.map((item) => (
            <article className="surface" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
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

function ContactForm({ contactState, contactSubmitState, updateContactField, handleContactSubmit }) {
  return (
    <form className="surface contact-form" onSubmit={handleContactSubmit}>
      <span className="mini-tag">Message the team</span>
      <h3>Ask before the first release</h3>
      <p>
        Use this form for early-access interest, section fit, launch timing, logistics, or anything
        you want confirmed before the dates go live.
      </p>

      <label className="field">
        <span>Name *</span>
        <input
          name="name"
          value={contactState.name}
          onChange={updateContactField}
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </label>

      <label className="field">
        <span>Email *</span>
        <input
          name="email"
          type="email"
          value={contactState.email}
          onChange={updateContactField}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </label>

      <label className="field">
        <span>Phone</span>
        <input
          name="phone"
          type="tel"
          value={contactState.phone}
          onChange={updateContactField}
          placeholder="+1 ..."
          autoComplete="tel"
          inputMode="tel"
        />
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

      <label className="field">
        <span>Message *</span>
        <textarea
          name="message"
          value={contactState.message}
          onChange={updateContactField}
          rows="5"
          placeholder="Tell us what you want to know before the first release opens."
          autoComplete="off"
          required
        />
      </label>

      <button type="submit" className="btn btn-primary btn-full" disabled={contactSubmitState.status === "loading"}>
        {contactSubmitState.status === "loading" ? "Sending..." : "Send Message"}
      </button>

      <small className={`status-copy status-${contactSubmitState.status}`} aria-live="polite">
        {contactSubmitState.status === "idle"
          ? "Messages go directly to the launch and program support team."
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
        portraitCaption={campOverviewPage.portraitCaption}
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
  const selectedLabel =
    selectedOption.id === "full-week" ? "Preferred week" : "Preferred day";
  const selectedPlaceholder =
    selectedOption.id === "full-week"
      ? "Example: Week of June 15"
      : "Example: June 18";
  const selectedSchedule =
    campBookingState.schedulePreference?.trim() || selectedOption.defaultSchedulePreference || "";
  const bookingSupportMethods = [...contactNumbers, emailContact].filter(Boolean);

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
          {campOverviewPage.bookingCards.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`booking-option-chip${selectedOption.id === item.id ? " is-active" : ""}`}
              onClick={() => openCampBooking(item.id, item.defaultSchedulePreference)}
            >
              <span>{item.eyebrow}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>

        <div className="form-section">
          <div className="form-section-head">
            <div className="section-count">01</div>
            <div>
              <h3>{campBookingPage.sections[0].title}</h3>
              <p>{campBookingPage.sections[0].intro}</p>
            </div>
          </div>
          <div className="field-grid">
            <label className="field">
              <span>Parent first name</span>
              <input
                type="text"
                name="parentFirstName"
                value={campBookingState.parentFirstName}
                onChange={(event) => updateCampBookingField("parentFirstName", event.target.value)}
                autoComplete="given-name"
              />
              {campBookingErrors.parentFirstName ? (
                <span className="field-error">{campBookingErrors.parentFirstName}</span>
              ) : null}
            </label>
            <label className="field">
              <span>Parent last name</span>
              <input
                type="text"
                name="parentLastName"
                value={campBookingState.parentLastName}
                onChange={(event) => updateCampBookingField("parentLastName", event.target.value)}
                autoComplete="family-name"
              />
              {campBookingErrors.parentLastName ? (
                <span className="field-error">{campBookingErrors.parentLastName}</span>
              ) : null}
            </label>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={campBookingState.email}
                onChange={(event) => updateCampBookingField("email", event.target.value)}
                autoComplete="email"
                inputMode="email"
              />
              {campBookingErrors.email ? (
                <span className="field-error">{campBookingErrors.email}</span>
              ) : null}
            </label>
            <label className="field">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={campBookingState.phone}
                onChange={(event) => updateCampBookingField("phone", event.target.value)}
                autoComplete="tel"
                inputMode="tel"
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
            <label className="field">
              <span>Student name</span>
              <input
                type="text"
                name="studentName"
                value={campBookingState.studentName}
                onChange={(event) => updateCampBookingField("studentName", event.target.value)}
                autoComplete="off"
              />
              {campBookingErrors.studentName ? (
                <span className="field-error">{campBookingErrors.studentName}</span>
              ) : null}
            </label>
            <label className="field">
              <span>Student age or grade</span>
              <input
                type="text"
                name="studentAge"
                value={campBookingState.studentAge}
                onChange={(event) => updateCampBookingField("studentAge", event.target.value)}
                placeholder="Example: Age 9 or Grade 4"
                autoComplete="off"
              />
              {campBookingErrors.studentAge ? (
                <span className="field-error">{campBookingErrors.studentAge}</span>
              ) : null}
            </label>
            <label className="field field-span-2">
              <span>Current level</span>
              <input
                type="text"
                name="studentLevel"
                value={campBookingState.studentLevel}
                onChange={(event) => updateCampBookingField("studentLevel", event.target.value)}
                placeholder="Example: Beginner, improving, tournament player"
                autoComplete="off"
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
            <label className="field">
              <span>{selectedLabel}</span>
              <input
                type="text"
                name="schedulePreference"
                value={campBookingState.schedulePreference}
                onChange={(event) => updateCampBookingField("schedulePreference", event.target.value)}
                placeholder={selectedPlaceholder}
                autoComplete="off"
              />
              {campBookingErrors.schedulePreference ? (
                <span className="field-error">{campBookingErrors.schedulePreference}</span>
              ) : null}
            </label>
            <label className="field field-span-2">
              <span>Notes</span>
              <textarea
                name="notes"
                value={campBookingState.notes}
                onChange={(event) => updateCampBookingField("notes", event.target.value)}
                placeholder="Anything we should know before you continue to payment?"
              />
            </label>
          </div>
        </div>

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
            <p className="camp-booking-price">{selectedOption.price}</p>
            <div className="summary-list summary-list-booking">
              <div>
                <span>Dates</span>
                <strong>June 15 - August 21 (weekdays)</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>House of Chess and Checkers, Central Park</strong>
              </div>
              <div>
                <span>Selected slot</span>
                <strong>{selectedSchedule || "Choose a day above"}</strong>
              </div>
              <div>
                <span>Service</span>
                <strong>{selectedOption.id === "full-week" ? "Half-day camp week" : "Half-day camp session"}</strong>
              </div>
            </div>
            <ul className="camp-booking-list">
              {selectedOption.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
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

function AboutPage({ currentPath, navigate }) {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        intro={aboutPage.intro}
        heroFacts={aboutPage.heroFacts}
        currentPath={currentPath}
        navigate={navigate}
        portraitCaption="Families should understand the offer quickly and know the next step without digging."
        actions={
          <>
            <AppLink to="/camps" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              View Camps
            </AppLink>
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
                Contact us
              </AppLink>
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow={aboutPage.introSection.eyebrow}
            title={aboutPage.introSection.title}
            intro={aboutPage.introSection.intro}
          />
          <div className="card-grid card-grid-three">
            {aboutPage.pillars.map((item) => (
              <article className="surface" key={item.title}>
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
            eyebrow={aboutPage.whySection.eyebrow}
            title={aboutPage.whySection.title}
            intro={aboutPage.whySection.intro}
          />
          <div className="surface checklist-surface">
            <ul className="checklist">
              {aboutPage.standards.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <article className="surface lesson-detail-cta">
            <span className="section-tag">Contact us</span>
            <h3>{aboutPage.ctaTitle}</h3>
            <p>{aboutPage.ctaText}</p>
            <div className="cta-row">
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                Contact us
              </AppLink>
              <AppLink to="/private-lessons" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
                Review Lessons
              </AppLink>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function PrivateLessonsPage({ currentPath, navigate }) {
  return (
    <>
      <section className="page-hero lesson-page-hero">
        <div className="shell lesson-hero-grid">
          <div className="lesson-hero-copy">
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
        <div className="shell lesson-hero-carousel-wrap">
          <LessonSignalCarousel
            currentPath={currentPath}
            navigate={navigate}
            intro="Online, in-person, and group lesson services all launch soon."
          />
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
              <span className="section-tag">Lesson inquiry</span>
              <h2>{privateLessonsPage.ctaTitle}</h2>
              <p>{privateLessonsPage.ctaText}</p>
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
  selectedCampOptionId = campOverviewPage.bookingCards[0]?.id,
  isCampBookingFormVisible = false,
  openCampBooking = () => {},
}) {
  const selectedOption =
    campOverviewPage.bookingCards.find((item) => item.id === selectedCampOptionId) ||
    campOverviewPage.bookingCards[0];
  const weeklyOption =
    campOverviewPage.bookingCards.find((item) => item.id === "full-week") ||
    campOverviewPage.bookingCards[0];
  const activeSchedulePreference =
    campBookingState.schedulePreference?.trim() || selectedOption?.defaultSchedulePreference || "";

  return (
    <>
      <section className="page-hero lesson-page-hero">
        <div className="shell lesson-hero-grid lesson-detail-hero-grid">
          <div className="lesson-hero-copy lesson-detail-hero-copy">
            <span className="section-tag">{campOverviewPage.eyebrow}</span>
            <h1>{campOverviewPage.title}</h1>
            <p className="page-intro">{campOverviewPage.intro}</p>

            <div className="lesson-chip-row">
              {campOverviewPage.chips.map((item) => (
                <span key={item} className="lesson-chip">
                  {item}
                </span>
              ))}
            </div>

            <div className="cta-row">
              <a href="#camp-booking" className="btn btn-primary">
                Book Camp
              </a>
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
                Ask a Question
              </AppLink>
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

          <article className="surface surface-dark lesson-hero-panel lesson-detail-hero-panel">
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

      <section className="page-section" id="camp-booking">
        <div className="shell">
          <SectionIntro
            eyebrow={campOverviewPage.bookingSection.eyebrow}
            title={campOverviewPage.bookingSection.title}
            intro={campOverviewPage.bookingSection.intro}
          />
          <p className="camp-booking-note">{campOverviewPage.bookingSection.note}</p>
          <div className="camp-booking-board">
            <div className="camp-booking-days">
              {campOverviewPage.bookingSchedule.map((item) => {
                const isLoading =
                  campCheckoutState.status === "loading" && campCheckoutState.activeOption === item.optionId;
                const isSelected =
                  selectedCampOptionId === item.optionId && activeSchedulePreference === item.schedulePreference;

                return (
                  <article className={`surface camp-booking-slot${isSelected ? " is-selected" : ""}`} key={item.id}>
                    <div className="camp-booking-slot-header">
                      <strong>{item.date}</strong>
                      <span>{item.relativeLabel}</span>
                    </div>
                    <div className="camp-booking-slot-body">
                      <div className="camp-booking-slot-media">
                        <img src={brandLogo} alt={`${siteBrand.name} logo`} className="camp-booking-slot-image camp-booking-slot-logo" />
                      </div>
                      <div className="camp-booking-slot-copy">
                        <strong className="camp-booking-slot-time">{item.time}</strong>
                        <h3>{item.title}</h3>
                        <p>
                          {item.subtitle} @ {item.price}
                        </p>
                      </div>
                      <div className="camp-booking-slot-side">
                        <button
                          type="button"
                          className="btn btn-primary camp-booking-button camp-booking-slot-button"
                          onClick={() => openCampBooking(item.optionId, item.schedulePreference)}
                          disabled={campCheckoutState.status === "loading"}
                        >
                          {isLoading ? "Opening..." : "Book"}
                        </button>
                        <span>{item.spotsLeft}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <article
              className={`surface surface-dark camp-booking-week-card${
                selectedCampOptionId === weeklyOption.id ? " is-selected" : ""
              }`}
            >
              <span className="mini-tag mini-tag-dark">{weeklyOption.eyebrow}</span>
              <h3>{weeklyOption.title}</h3>
              <p className="camp-booking-price">{weeklyOption.price}</p>
              <ul className="camp-booking-list">
                {weeklyOption.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <p className="camp-booking-availability">{weeklyOption.availability}</p>
              <button
                type="button"
                className="btn btn-primary camp-booking-button"
                onClick={() => openCampBooking(weeklyOption.id, weeklyOption.defaultSchedulePreference)}
                disabled={campCheckoutState.status === "loading"}
              >
                {campCheckoutState.status === "loading" && campCheckoutState.activeOption === weeklyOption.id
                  ? "Opening checkout..."
                  : weeklyOption.cta}
              </button>
            </article>
          </div>

          {isCampBookingFormVisible || campCheckoutState.status !== "idle" ? (
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
          ) : (
            <article className="surface camp-booking-hint" id="camp-booking-form">
              <span className="mini-tag">Registration form</span>
              <h3>Click Book to open the registration form.</h3>
              <p>Choose any day or the full week option above and the form will open here.</p>
            </article>
          )}
        </div>
      </section>

      <section className="page-section">
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

      <section className="page-section">
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
}) {
  const searchParams = new URLSearchParams(routeSearch);
  const requestedOptionId = searchParams.get("option");
  const selectedOption =
    campOverviewPage.bookingCards.find((item) => item.id === requestedOptionId) ||
    campOverviewPage.bookingCards[0];

  const selectedLabel =
    selectedOption.id === "full-week" ? "Preferred week" : "Preferred day";
  const selectedPlaceholder =
    selectedOption.id === "full-week"
      ? "Example: Week of June 16"
      : "Example: June 18";
  const bookingSupportMethods = [...contactNumbers, emailContact].filter(Boolean);

  return (
    <>
      <section className="page-hero lesson-page-hero">
        <div className="shell booking-page-hero">
          <div className="booking-page-copy">
            <span className="section-tag">{campBookingPage.eyebrow}</span>
            <h1>{campBookingPage.title}</h1>
            <p className="page-intro">{campBookingPage.intro}</p>
            <div className="lesson-chip-row">
              {campBookingPage.chips.map((item) => (
                <span key={item} className="lesson-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="cta-row">
            {campOverviewPage.bookingCards.map((item) => (
              <AppLink
                key={item.id}
                to={`/camps/book?option=${item.id}`}
                navigate={navigate}
                currentPath={currentPath}
                className={`btn ${
                  selectedOption.id === item.id ? "btn-primary" : "btn-secondary"
                }`}
              >
                {item.cta}
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell register-layout camp-booking-layout">
          <form
            className="surface registration-form camp-booking-form"
            onSubmit={(event) => handleCampBookingSubmit(event, selectedOption.id)}
          >
            <div className="form-header">
              <span className="mini-tag">{selectedOption.eyebrow}</span>
              <h2>{campBookingPage.formTitle}</h2>
              <p>{campBookingPage.formIntro}</p>
            </div>

            {campCheckoutState.status !== "idle" && (
              <article className={`surface status-banner status-banner-${campCheckoutState.status}`}>
                <strong>
                  {campCheckoutState.status === "loading" && "Opening secure checkout"}
                  {campCheckoutState.status === "success" && "Payment confirmed"}
                  {campCheckoutState.status === "cancelled" && "Checkout cancelled"}
                  {campCheckoutState.status === "error" && "Camp checkout could not start"}
                </strong>
                <p>{campCheckoutState.message}</p>
              </article>
            )}

            <div className="form-section">
              <div className="form-section-head">
                <div className="section-count">01</div>
                <div>
                  <h3>{campBookingPage.sections[0].title}</h3>
                  <p>{campBookingPage.sections[0].intro}</p>
                </div>
              </div>
              <div className="field-grid">
                <label className="field">
                  <span>Parent first name</span>
                  <input
                    type="text"
                    name="parentFirstName"
                    value={campBookingState.parentFirstName}
                    onChange={(event) => updateCampBookingField("parentFirstName", event.target.value)}
                    autoComplete="given-name"
                  />
                  {campBookingErrors.parentFirstName ? (
                    <span className="field-error">{campBookingErrors.parentFirstName}</span>
                  ) : null}
                </label>
                <label className="field">
                  <span>Parent last name</span>
                  <input
                    type="text"
                    name="parentLastName"
                    value={campBookingState.parentLastName}
                    onChange={(event) => updateCampBookingField("parentLastName", event.target.value)}
                    autoComplete="family-name"
                  />
                  {campBookingErrors.parentLastName ? (
                    <span className="field-error">{campBookingErrors.parentLastName}</span>
                  ) : null}
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={campBookingState.email}
                    onChange={(event) => updateCampBookingField("email", event.target.value)}
                    autoComplete="email"
                    inputMode="email"
                  />
                  {campBookingErrors.email ? (
                    <span className="field-error">{campBookingErrors.email}</span>
                  ) : null}
                </label>
                <label className="field">
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={campBookingState.phone}
                    onChange={(event) => updateCampBookingField("phone", event.target.value)}
                    autoComplete="tel"
                    inputMode="tel"
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
                <label className="field">
                  <span>Student name</span>
                  <input
                    type="text"
                    name="studentName"
                    value={campBookingState.studentName}
                    onChange={(event) => updateCampBookingField("studentName", event.target.value)}
                    autoComplete="off"
                  />
                  {campBookingErrors.studentName ? (
                    <span className="field-error">{campBookingErrors.studentName}</span>
                  ) : null}
                </label>
                <label className="field">
                  <span>Student age or grade</span>
                  <input
                    type="text"
                    name="studentAge"
                    value={campBookingState.studentAge}
                    onChange={(event) => updateCampBookingField("studentAge", event.target.value)}
                    placeholder="Example: Age 9 or Grade 4"
                    autoComplete="off"
                  />
                  {campBookingErrors.studentAge ? (
                    <span className="field-error">{campBookingErrors.studentAge}</span>
                  ) : null}
                </label>
                <label className="field field-span-2">
                  <span>Current level</span>
                  <input
                    type="text"
                    name="studentLevel"
                    value={campBookingState.studentLevel}
                    onChange={(event) => updateCampBookingField("studentLevel", event.target.value)}
                    placeholder="Example: Beginner, improving, tournament player"
                    autoComplete="off"
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
                <label className="field">
                  <span>{selectedLabel}</span>
                  <input
                    type="text"
                    name="schedulePreference"
                    value={campBookingState.schedulePreference}
                    onChange={(event) => updateCampBookingField("schedulePreference", event.target.value)}
                    placeholder={selectedPlaceholder}
                    autoComplete="off"
                  />
                  {campBookingErrors.schedulePreference ? (
                    <span className="field-error">{campBookingErrors.schedulePreference}</span>
                  ) : null}
                </label>
                <label className="field field-span-2">
                  <span>Notes</span>
                  <textarea
                    name="notes"
                    value={campBookingState.notes}
                    onChange={(event) => updateCampBookingField("notes", event.target.value)}
                    placeholder="Anything we should know before you continue to payment?"
                  />
                </label>
              </div>
            </div>

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
                <p className="camp-booking-price">{selectedOption.price}</p>
                <div className="summary-list summary-list-booking">
                  <div>
                    <span>Dates</span>
                    <strong>June 15 - August 21 (weekdays)</strong>
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>House of Chess and Checkers, Central Park</strong>
                  </div>
                  <div>
                    <span>Service</span>
                    <strong>{selectedOption.id === "full-week" ? "Half-day camp week" : "Half-day camp session"}</strong>
                  </div>
                </div>
                <ul className="camp-booking-list">
                  {selectedOption.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
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
      </section>
    </>
  );
}

function CampConfirmationPage({ currentPath, navigate, campCheckoutState }) {
  const isSuccess = campCheckoutState.status === "success" && campCheckoutState.details;
  const isLoading = campCheckoutState.status === "loading";
  const isError = campCheckoutState.status === "error";

  const title = isSuccess
    ? "Thank you. Your camp spot is confirmed."
    : isLoading
      ? "Confirming your camp payment..."
      : isError
        ? "We could not confirm the camp payment yet."
        : "Camp confirmation";

  const intro = isSuccess
    ? `A Stripe receipt was sent to ${campCheckoutState.details.customerEmail || "your email"}. We will follow up with the next camp details shortly.`
    : isLoading
      ? "Please wait a moment while we verify the Stripe checkout session."
      : isError
        ? campCheckoutState.message || "Please contact us if you were charged but do not see a confirmation."
        : "This page shows your camp confirmation after checkout finishes.";

  return (
    <>
      <section className="page-hero lesson-page-hero">
        <div className="shell">
          <article className="surface camp-confirmation-card">
            <span className="section-tag">{isSuccess ? "Camp confirmed" : "Camp checkout"}</span>
            <h1>{title}</h1>
            <p className="page-intro">{intro}</p>

            {campCheckoutState.status !== "idle" ? (
              <article className={`status-banner status-banner-${campCheckoutState.status}`}>
                <strong>
                  {isSuccess && "Payment confirmed"}
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
                      : "$100"}
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
                Back to Camps
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
            <p>We will review the booking and send the next camp details after the Stripe confirmation.</p>
          </article>
          <article className="surface">
            <h3>Need to change something?</h3>
            <p>Reply to the receipt email or use the contact page if you need to update the day, week, or family details.</p>
          </article>
          <article className="surface">
            <h3>Prefer direct contact?</h3>
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
                Contact Us
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

      <section className="page-section">
        <div className="shell">
          <SectionIntro eyebrow="What matters most" title="What this service does well" intro="Short, clear signals for families who want the fast version." />
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
                Contact Us
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

function EventsPage({ currentPath, navigate }) {
  return <CampsOverviewPage currentPath={currentPath} navigate={navigate} />;
}

function TournamentDetailPage({ currentPath, navigate }) {
  return <CampsOverviewPage currentPath={currentPath} navigate={navigate} />;
}

function FaqPage({ currentPath, navigate }) {
  return (
    <>
      <PageHero
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        intro={faqPage.intro}
        heroFacts={faqPage.heroFacts}
        currentPath={currentPath}
        navigate={navigate}
        portraitCaption="Families ask better questions when the launch already feels thoughtful, organized, and player-centered."
        actions={
          <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
            Ask a Question
          </AppLink>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro eyebrow="Quick answers" title="The fastest things to know" />
          <div className="card-grid card-grid-three">
            {faqPage.quickCards.map((item) => (
              <article className="surface" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell faq-stack">
          <SectionIntro
            eyebrow={faqPage.prepSection.eyebrow}
            title={faqPage.prepSection.title}
            intro={faqPage.prepSection.intro}
          />
          <div className="card-grid card-grid-three">
            {faqPage.prepCards.map((item) => (
              <article className="surface" key={item.title}>
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
            eyebrow={faqPage.flowSection.eyebrow}
            title={faqPage.flowSection.title}
            intro={faqPage.flowSection.intro}
          />
          <div className="card-grid card-grid-three">
            {faqPage.flowSteps.map((item) => (
              <article className="surface stat-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell faq-stack">
          <SectionIntro eyebrow="Full FAQ" title="Direct answers to the common questions" />
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <article className="surface lesson-detail-cta">
            <span className="section-tag">Still unsure?</span>
            <h3>{faqPage.ctaTitle}</h3>
            <p>{faqPage.ctaText}</p>
            <div className="cta-row">
              <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
                Contact Us
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

function ContactPage({ currentPath, navigate, contactState, contactSubmitState, updateContactField, handleContactSubmit }) {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={contactPage.intro}
        heroFacts={contactPage.heroFacts}
        currentPath={currentPath}
        navigate={navigate}
        portraitCaption="Quick, direct support helps families feel ready before camp starts and before lessons open."
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow={contactPage.topicSection.eyebrow}
            title={contactPage.topicSection.title}
            intro={contactPage.topicSection.intro}
          />
          <div className="card-grid card-grid-three">
            {contactPage.topicCards.map((item) => (
              <article className="surface" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <div className="card-grid card-grid-three">
            {contactPage.supportCards.map((item) => (
              <article className="surface" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <article className="surface">
            <SectionIntro eyebrow="Before you send" title="What helps us reply faster" intro="A few details in your message make it easier to point you to the right program." />
            <ul className="checklist">
              {contactPage.messageChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow={contactPage.responseSection.eyebrow}
            title={contactPage.responseSection.title}
            intro={contactPage.responseSection.intro}
          />
          <div className="card-grid card-grid-three">
            {contactPage.responseSteps.map((item) => (
              <article className="surface stat-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell two-column contact-layout">
          <ContactDirectory />
          <ContactForm
            contactState={contactState}
            contactSubmitState={contactSubmitState}
            updateContactField={updateContactField}
            handleContactSubmit={handleContactSubmit}
          />
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <article className="surface lesson-detail-cta">
            <span className="section-tag">Contact the team</span>
            <h3>{contactPage.ctaTitle}</h3>
            <p>{contactPage.ctaText}</p>
            <div className="cta-row">
              <a href={phoneContact.href} className="btn btn-primary">
                Call / Text {phoneContact.display}
              </a>
              <AppLink to="/camps" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
                Review Camps
              </AppLink>
            </div>
          </article>
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
                  <label className="field">
                    <span>First Name *</span>
                    <input
                      name="firstName"
                      value={registrationState.firstName}
                      onChange={updateRegistrationField}
                      placeholder="First name"
                      autoComplete="given-name"
                    />
                    {registrationErrors.firstName ? (
                      <small className="field-error">{registrationErrors.firstName}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Last Name *</span>
                    <input
                      name="lastName"
                      value={registrationState.lastName}
                      onChange={updateRegistrationField}
                      placeholder="Last name"
                      autoComplete="family-name"
                    />
                    {registrationErrors.lastName ? (
                      <small className="field-error">{registrationErrors.lastName}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Phone *</span>
                    <input
                      name="phone"
                      value={registrationState.phone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
                    />
                    {registrationErrors.phone ? (
                      <small className="field-error">{registrationErrors.phone}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Email *</span>
                    <input
                      name="email"
                      type="email"
                      value={registrationState.email}
                      onChange={updateRegistrationField}
                      placeholder="family@example.com"
                      autoComplete="email"
                    />
                    {registrationErrors.email ? (
                      <small className="field-error">{registrationErrors.email}</small>
                    ) : null}
                  </label>

                  <label className="field field-span-2">
                    <span>Additional Emails</span>
                    <input
                      name="additionalEmails"
                      value={registrationState.additionalEmails}
                      onChange={updateRegistrationField}
                      placeholder="Add any other addresses that should receive confirmations"
                      autoComplete="off"
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
                  <label className="field">
                    <span>Player First Name *</span>
                    <input
                      name="playerFirstName"
                      value={registrationState.playerFirstName}
                      onChange={updateRegistrationField}
                      placeholder="Player first name"
                      autoComplete="off"
                    />
                    {registrationErrors.playerFirstName ? (
                      <small className="field-error">{registrationErrors.playerFirstName}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Player Last Name *</span>
                    <input
                      name="playerLastName"
                      value={registrationState.playerLastName}
                      onChange={updateRegistrationField}
                      placeholder="Player last name"
                      autoComplete="off"
                    />
                    {registrationErrors.playerLastName ? (
                      <small className="field-error">{registrationErrors.playerLastName}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Player Grade *</span>
                    <input
                      name="playerGrade"
                      value={registrationState.playerGrade}
                      onChange={updateRegistrationField}
                      placeholder="Grade"
                      autoComplete="off"
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

                  <label className="field">
                    <span>Section *</span>
                    <select name="section" value={registrationState.section} onChange={updateRegistrationField}>
                      <option value="">Select section</option>
                      <option value="Open">Open</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                    {registrationErrors.section ? (
                      <small className="field-error">{registrationErrors.section}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Service Level *</span>
                    <select
                      name="serviceLevel"
                      value={registrationState.serviceLevel}
                      onChange={updateRegistrationField}
                    >
                      <option value="">Select service level</option>
                      {serviceLevels.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label} - {formatCurrency(item.amount)}
                        </option>
                      ))}
                    </select>
                    {registrationErrors.serviceLevel ? (
                      <small className="field-error">{registrationErrors.serviceLevel}</small>
                    ) : null}
                  </label>

                  <label className="field field-span-2">
                    <span>USCF ID</span>
                    <input
                      name="uscfId"
                      value={registrationState.uscfId}
                      onChange={updateRegistrationField}
                      placeholder="Required for the Open section"
                      autoComplete="off"
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
                  <label className="field">
                    <span>Parent / Guardian Name *</span>
                    <input
                      name="parentName"
                      value={registrationState.parentName}
                      onChange={updateRegistrationField}
                      placeholder="Parent or guardian name"
                      autoComplete="name"
                    />
                    {registrationErrors.parentName ? (
                      <small className="field-error">{registrationErrors.parentName}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Parent Email *</span>
                    <input
                      name="parentEmail"
                      type="email"
                      value={registrationState.parentEmail}
                      onChange={updateRegistrationField}
                      placeholder="parent@example.com"
                      autoComplete="email"
                    />
                    {registrationErrors.parentEmail ? (
                      <small className="field-error">{registrationErrors.parentEmail}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Parent Phone *</span>
                    <input
                      name="parentPhone"
                      value={registrationState.parentPhone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
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
                  <label className="field">
                    <span>Emergency Contact Name *</span>
                    <input
                      name="emergencyName"
                      value={registrationState.emergencyName}
                      onChange={updateRegistrationField}
                      placeholder="Emergency contact name"
                      autoComplete="off"
                    />
                    {registrationErrors.emergencyName ? (
                      <small className="field-error">{registrationErrors.emergencyName}</small>
                    ) : null}
                  </label>

                  <label className="field">
                    <span>Emergency Contact Phone *</span>
                    <input
                      name="emergencyPhone"
                      value={registrationState.emergencyPhone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
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
                  <label className="field field-span-2">
                    <span>Medical Information *</span>
                    <textarea
                      name="medicalInfo"
                      value={registrationState.medicalInfo}
                      onChange={updateRegistrationField}
                      rows="4"
                      placeholder="Allergies, medical conditions, medications, or notes for staff"
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
                  {serviceLevels.map((item) => (
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
        <h1>This page does not exist yet</h1>
        <p>
          The route you opened is not part of the live site. Use the navigation or go back to the
          home page.
        </p>
        <AppLink to="/" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
          Back to Home
        </AppLink>
      </div>
    </section>
  );
}

function ChessTruckApp() {
  const [route, setRoute] = useState(readLocation);
  const [registrationState, setRegistrationState] = useState(registrationInitialState);
  const [registrationErrors, setRegistrationErrors] = useState({});
  const [paymentState, setPaymentState] = useState({ status: "idle", message: "", details: null });
  const [campCheckoutState, setCampCheckoutState] = useState(campCheckoutInitialState);
  const [campBookingState, setCampBookingState] = useState(campBookingInitialState);
  const [campBookingErrors, setCampBookingErrors] = useState({});
  const [isCampBookingFormVisible, setIsCampBookingFormVisible] = useState(false);
  const [selectedCampOptionId, setSelectedCampOptionId] = useState(
    campOverviewPage.bookingCards.find((item) => item.id === "single-day")?.id ||
      campOverviewPage.bookingCards[0]?.id ||
      ""
  );
  const [contactState, setContactState] = useState(contactInitialState);
  const [contactSubmitState, setContactSubmitState] = useState({ status: "idle", message: "" });
  const [hasLoadedRegistrationDraft, setHasLoadedRegistrationDraft] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeRegistrationStep, setActiveRegistrationStep] = useState(0);
  const mainRef = useRef(null);
  const currentPath = route.pathname;

  const selectedServiceLevel = useMemo(
    () => serviceLevels.find((item) => item.id === registrationState.serviceLevel) || null,
    [registrationState.serviceLevel]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 780px)");
    const handleViewportChange = (event) => {
      setIsCompactViewport(event.matches);
    };

    setIsCompactViewport(media.matches);

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleViewportChange);
      return () => media.removeEventListener("change", handleViewportChange);
    }

    media.addListener(handleViewportChange);
    return () => media.removeListener(handleViewportChange);
  }, []);

  useEffect(() => {
    if (!isCompactViewport) {
      setIsMobileNavOpen(false);
    }
  }, [isCompactViewport]);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!isCompactViewport) {
      return undefined;
    }

    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCompactViewport, isMobileNavOpen]);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(readLocation());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    try {
      const storedDraft = window.localStorage.getItem(REGISTRATION_DRAFT_KEY);

      if (!storedDraft) {
        setHasLoadedRegistrationDraft(true);
        return;
      }

      const parsedDraft = JSON.parse(storedDraft);

      if (!parsedDraft || typeof parsedDraft !== "object") {
        return;
      }

      setRegistrationState((current) => ({
        ...current,
        ...Object.fromEntries(
          Object.keys(registrationInitialState).map((key) => [key, parsedDraft[key] ?? current[key]])
        ),
      }));
    } catch {
      // Ignore malformed local drafts.
    } finally {
      setHasLoadedRegistrationDraft(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedRegistrationDraft) {
      return;
    }

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
  }, [hasLoadedRegistrationDraft, registrationState]);

  useEffect(() => {
    const meta = routeMeta[currentPath] || routeMeta["/"];
    document.title = meta.title;
    updateMetaTag("meta[name='description']", meta.description);
    updateMetaTag("meta[property='og:title']", meta.title);
    updateMetaTag("meta[property='og:description']", meta.description);
    updateMetaTag("meta[name='twitter:title']", meta.title);
    updateMetaTag("meta[name='twitter:description']", meta.description);
  }, [currentPath]);

  useEffect(() => {
    const focusTimer = window.requestAnimationFrame(() => {
      mainRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusTimer);
  }, [currentPath]);

  useEffect(() => {
    if (
      currentPath !== "/" &&
      currentPath !== "/camps" &&
      currentPath !== "/camps/book" &&
      currentPath !== "/camps/confirmed"
    ) {
      return;
    }

    const currentUrl = new URL(window.location.href);
    const payment = currentUrl.searchParams.get("payment");
    const sessionId = currentUrl.searchParams.get("session_id");

    if (!payment) {
      return;
    }

    currentUrl.searchParams.delete("payment");
    currentUrl.searchParams.delete("session_id");
    const cleanedSearch = currentUrl.searchParams.toString();
    const cleanedUrl = `${currentPath}${cleanedSearch ? `?${cleanedSearch}` : ""}`;

    window.history.replaceState({}, "", cleanedUrl);
    setRoute({ pathname: currentPath, search: cleanedSearch ? `?${cleanedSearch}` : "" });

    if (payment === "cancel") {
      window.sessionStorage.removeItem(CAMP_CONFIRMATION_STORAGE_KEY);
      setIsCampBookingFormVisible(true);
      setCampCheckoutState({
        status: "cancelled",
        message:
          "Checkout was cancelled. You can return to camp booking whenever you are ready.",
        details: null,
        activeOption: "",
      });
      return;
    }

    if (payment === "success" && sessionId) {
      setCampCheckoutState({ status: "loading", message: "", details: null, activeOption: "" });

      fetch("/api/checkout-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then(async (response) => {
          const payload = await response.json().catch(() => ({}));

          if (!response.ok || payload.status !== "paid") {
            throw new Error(payload.error || "Payment confirmation could not be verified yet.");
          }

          setCampCheckoutState({
            status: "success",
            message:
              payload.message ||
              "Camp payment confirmed. We will follow up with the next registration details.",
            details: payload,
            activeOption: "",
          });
          window.sessionStorage.setItem(
            CAMP_CONFIRMATION_STORAGE_KEY,
            JSON.stringify({
              status: "success",
              message:
                payload.message ||
                "Camp payment confirmed. We will follow up with the next registration details.",
              details: payload,
              activeOption: "",
            })
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
    }
  }, [currentPath, route.search]);

  useEffect(() => {
    if (currentPath !== "/camps/confirmed" || campCheckoutState.status !== "idle") {
      return;
    }

    try {
      const storedConfirmation = window.sessionStorage.getItem(CAMP_CONFIRMATION_STORAGE_KEY);

      if (!storedConfirmation) {
        return;
      }

      const parsedConfirmation = JSON.parse(storedConfirmation);

      if (
        parsedConfirmation &&
        typeof parsedConfirmation === "object" &&
        parsedConfirmation.status === "success"
      ) {
        setCampCheckoutState({
          status: parsedConfirmation.status,
          message: parsedConfirmation.message || "",
          details: parsedConfirmation.details || null,
          activeOption: "",
        });
      }
    } catch {
      window.sessionStorage.removeItem(CAMP_CONFIRMATION_STORAGE_KEY);
    }
  }, [currentPath, campCheckoutState.status]);

  useEffect(() => {
    if (currentPath !== "/" && currentPath !== "/camps" && currentPath !== "/camps/book") {
      return;
    }

    const requestedOptionId = new URLSearchParams(route.search).get("option");
    const matchedOption = campOverviewPage.bookingCards.find((item) => item.id === requestedOptionId);

    if (!matchedOption) {
      return;
    }

    setSelectedCampOptionId(matchedOption.id);
    setIsCampBookingFormVisible(true);

    if (!campBookingState.schedulePreference.trim() && matchedOption.defaultSchedulePreference) {
      setCampBookingState((current) => ({
        ...current,
        schedulePreference: matchedOption.defaultSchedulePreference,
      }));
    }
  }, [currentPath, route.search, campBookingState.schedulePreference]);

  useEffect(() => {
    if (currentPath !== "/register") {
      return;
    }

    const currentUrl = new URL(window.location.href);
    const payment = currentUrl.searchParams.get("payment");
    const sessionId = currentUrl.searchParams.get("session_id");

    if (!payment) {
      return;
    }

    window.history.replaceState({}, "", "/register");
    setRoute({ pathname: "/register", search: "" });

    if (payment === "cancel") {
      setPaymentState({
        status: "cancelled",
        message:
          "Checkout was cancelled. Your registration details are still here, so you can continue whenever you are ready.",
        details: null,
      });
      return;
    }

    if (payment === "success" && sessionId) {
      setPaymentState({ status: "loading", message: "", details: null });

      fetch("/api/checkout-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then(async (response) => {
          const payload = await response.json().catch(() => ({}));

          if (!response.ok || payload.status !== "paid") {
            throw new Error(payload.error || "Payment confirmation could not be verified yet.");
          }

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
    }
  }, [currentPath, route.search]);

  const navigate = (to) => {
    const nextUrl = new URL(to, window.location.origin);
    const nextRoute = {
      pathname: normalizePath(nextUrl.pathname),
      search: nextUrl.search,
    };

    if (nextRoute.pathname === route.pathname && nextRoute.search === route.search) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({}, "", `${nextRoute.pathname}${nextRoute.search}`);
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const focusRegistrationField = (fieldName) => {
    window.requestAnimationFrame(() => {
      const field = document.querySelector(`[name="${fieldName}"]`);

      if (field instanceof HTMLElement) {
        field.focus();
      }
    });
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

    return Object.keys(errors).length === 0;
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
      const firstField = Object.keys(stepErrors)[0];
      focusRegistrationField(firstField);
      return;
    }

    setActiveRegistrationStep((current) =>
      Math.min(registrationStepDefinitions.length - 1, current + 1)
    );
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    if (!validateRegistration()) {
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
    const selectedOption = campOverviewPage.bookingCards.find((item) => item.id === optionId);
    setSelectedCampOptionId(optionId);
    setIsCampBookingFormVisible(true);

    const nextSchedulePreference = schedulePreference || selectedOption?.defaultSchedulePreference || "";

    if (nextSchedulePreference) {
      updateCampBookingField("schedulePreference", nextSchedulePreference);
    }

    window.requestAnimationFrame(() => {
      document.getElementById("camp-booking-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleCampBookingSubmit = async (event, optionId) => {
    event.preventDefault();

    const nextErrors = validateCampBookingFields(campBookingState);
    setCampBookingErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
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

    if (Object.keys(contactErrors).length > 0) {
      setContactSubmitState({
        status: "error",
        message: Object.values(contactErrors)[0] || "Please review the contact form and try again.",
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
        throw new Error(payload.error || "Your message could not be sent right now.");
      }

      setContactSubmitState({ status: "success", message: payload.message || "Message sent." });
      setContactState(contactInitialState);
    } catch (error) {
      setContactSubmitState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Your message could not be sent right now.",
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
          return (
            <CampsOverviewPage
              currentPath={currentPath}
              navigate={navigate}
              campCheckoutState={campCheckoutState}
              campBookingState={campBookingState}
              campBookingErrors={campBookingErrors}
              updateCampBookingField={updateCampBookingField}
              handleCampBookingSubmit={handleCampBookingSubmit}
              selectedCampOptionId={selectedCampOptionId}
              isCampBookingFormVisible={isCampBookingFormVisible}
              openCampBooking={openCampBooking}
            />
          );
        case "/camps":
          return (
            <CampsOverviewPage
              currentPath={currentPath}
              navigate={navigate}
              campCheckoutState={campCheckoutState}
              campBookingState={campBookingState}
              campBookingErrors={campBookingErrors}
              updateCampBookingField={updateCampBookingField}
              handleCampBookingSubmit={handleCampBookingSubmit}
              selectedCampOptionId={selectedCampOptionId}
              isCampBookingFormVisible={isCampBookingFormVisible}
              openCampBooking={openCampBooking}
            />
          );
        case "/camps/book":
          return (
            <CampsOverviewPage
              currentPath={currentPath}
              navigate={navigate}
              campCheckoutState={campCheckoutState}
              campBookingState={campBookingState}
              campBookingErrors={campBookingErrors}
              updateCampBookingField={updateCampBookingField}
              handleCampBookingSubmit={handleCampBookingSubmit}
              selectedCampOptionId={selectedCampOptionId}
              isCampBookingFormVisible={isCampBookingFormVisible}
              openCampBooking={openCampBooking}
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
          return (
            <CampDetailPage
              page={campDetailPages[currentPath]}
              currentPath={currentPath}
              navigate={navigate}
            />
          );
        case "/about":
          return <AboutPage currentPath={currentPath} navigate={navigate} />;
      case "/events":
        return <EventsPage currentPath={currentPath} navigate={navigate} />;
      case "/events/chess-and-truck-tournament":
        return <TournamentDetailPage currentPath={currentPath} navigate={navigate} />;
      case "/private-lessons":
        return <PrivateLessonsPage currentPath={currentPath} navigate={navigate} />;
      case "/lessons/online":
      case "/lessons/in-person":
      case "/lessons/group":
      case "/lessons/manage":
        return (
          <LessonDetailPage
            page={lessonDetailPages[currentPath]}
            currentPath={currentPath}
            navigate={navigate}
          />
        );
      case "/faq":
        return <FaqPage currentPath={currentPath} navigate={navigate} />;
      case "/terms":
        return <LegalPage {...termsPage} currentPath={currentPath} navigate={navigate} />;
      case "/privacy":
        return <LegalPage {...privacyPage} currentPath={currentPath} navigate={navigate} />;
      case "/contact":
        return (
          <ContactPage
            currentPath={currentPath}
            navigate={navigate}
            contactState={contactState}
            contactSubmitState={contactSubmitState}
            updateContactField={updateContactField}
            handleContactSubmit={handleContactSubmit}
          />
        );
      case "/register":
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

      <header className="site-header">
        <div className={`shell header-row${isMobileNavOpen ? " nav-open" : ""}`}>
          <AppLink
            to="/"
            navigate={navigate}
            currentPath={currentPath}
            className="brand-link"
            aria-label={`${siteBrand.name} home`}
            onNavigate={() => setIsMobileNavOpen(false)}
          >
            <span className="brand-mark">
              <img src={brandLogo} alt={`${siteBrand.name} logo`} className="brand-mark-image" />
            </span>
          </AppLink>

          <nav
            id="primary-navigation"
            className={`site-nav${isMobileNavOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
            >
            {navigationItems.map((item) => {
              if (item.label === "Camps") {
                return (
                  <CampsMenu
                    key={`${item.label}-${currentPath}-${isCompactViewport ? "mobile" : "desktop"}`}
                    currentPath={currentPath}
                    navigate={navigate}
                    isCompactViewport={isCompactViewport}
                    closeNavigation={() => setIsMobileNavOpen(false)}
                  />
                );
              }

              if (item.label === "Lessons") {
                return (
                  <LessonsMenu
                    key={`${item.label}-${currentPath}-${isCompactViewport ? "mobile" : "desktop"}`}
                    currentPath={currentPath}
                    navigate={navigate}
                    isCompactViewport={isCompactViewport}
                    closeNavigation={() => setIsMobileNavOpen(false)}
                  />
                );
              }

              return (
                <AppLink
                  key={item.path}
                  to={item.path}
                  navigate={navigate}
                  currentPath={currentPath}
                  className="nav-link"
                  onNavigate={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </AppLink>
              );
            })}
          </nav>

          <div className="header-actions">
            <AppLink
              to="/contact"
              navigate={navigate}
              currentPath={currentPath}
              className="btn btn-primary header-button"
              onNavigate={() => setIsMobileNavOpen(false)}
            >
              {isCompactViewport ? "Contact" : "Contact us"}
            </AppLink>
            <button
              type="button"
              className={`nav-toggle${isMobileNavOpen ? " is-open" : ""}`}
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
