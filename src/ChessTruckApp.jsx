import { useEffect, useMemo, useRef, useState } from "react";
import {
  aboutPage,
  contactEmails,
  contactPage,
  eventsPage,
  faqItems,
  faqPage,
  featuredTournament,
  footerLegalLinks,
  heroStats,
  homePage,
  masterTrainingDojo,
  navigationItems,
  policyItems,
  privacyPage,
  registerPage,
  routeMeta,
  scheduleItems,
  sectionOptions,
  serviceLevels,
  siteBrand,
  termsPage,
  tournamentPage,
  upcomingTournaments,
} from "./siteData";
import brandLogo from "./assets/chess-truck-logo.svg";
import dojoMark from "./assets/dojo-mark.svg";
import trophyBadge from "./assets/trophy-badge.svg";
import { validateContactFields, validateRegistrationFields } from "./lib/validation.js";

const REGISTRATION_DRAFT_KEY = "ct-registration-draft-v2";

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
  "/about",
  "/events",
  "/events/chess-and-truck-tournament",
  "/faq",
  "/contact",
  "/register",
  "/terms",
  "/privacy",
]);

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const readLocation = () => ({
  pathname: normalizePath(window.location.pathname),
  search: window.location.search,
});

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

function ChampionPortrait({ caption = "Celebrating a tournament morning that feels earned." }) {
  return (
    <article className="surface portrait-card">
      <div className="portrait-ring">
        <img src={brandLogo} alt="" className="portrait-image portrait-logo-image" />
      </div>
      <div className="portrait-copy">
        <span className="mini-tag">Launch signal</span>
        <p>{caption}</p>
        <div className="portrait-pills">
          <span>Open Section</span>
          <span>Beginner Section</span>
          <span>NYC</span>
        </div>
      </div>
    </article>
  );
}

function PageHero({ eyebrow, title, intro, actions, aside, portraitCaption }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div className="page-hero-copy">
          <span className="section-tag">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="page-intro">{intro}</p>
          {actions ? <div className="cta-row">{actions}</div> : null}
        </div>
        <div className="hero-visual">
          <aside className="surface surface-dark hero-aside">
            {aside || (
              <>
                <span className="mini-tag mini-tag-dark">Event focus</span>
                <h2>{featuredTournament.title}</h2>
                <p>{featuredTournament.shortSummary}</p>
                <div className="fact-list">
                  <div>
                    <span>Location</span>
                    <strong>{featuredTournament.city}</strong>
                  </div>
                  <div>
                    <span>Format</span>
                    <strong>{featuredTournament.formatLabel}</strong>
                  </div>
                </div>
              </>
            )}
          </aside>
          <ChampionPortrait caption={portraitCaption} />
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
                  <img src={brandLogo} alt="" className="footer-logo" />
                </div>
                <div className="footer-brand-text">
                  <strong>{siteBrand.name}</strong>
                  <span>{siteBrand.tagline}</span>
                </div>
              </div>
              <p>{siteBrand.footerNote}</p>
              <AppLink
                to="/contact"
                navigate={navigate}
                currentPath={currentPath}
                className="btn btn-primary footer-cta"
              >
                Get early access
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
                  Early Access
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
                <a href={contactEmails[0].href} className="footer-contact-link">
                  <span>Email</span>
                  <strong>{contactEmails[0].display}</strong>
                </a>
              </div>
            </div>

            <div className="footer-column footer-event-column">
              <span className="mini-tag">Featured event</span>
              <h3>{featuredTournament.title}</h3>
              <p>{featuredTournament.scheduleLabel}</p>
              <div className="footer-meta">
                <span>{featuredTournament.formatLabel}</span>
                <strong>Dates announced soon</strong>
              </div>
              <AppLink
                to="/events/chess-and-truck-tournament"
                navigate={navigate}
                currentPath={currentPath}
                className="text-link"
              >
                View Event Details
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

function LegalPage({ eyebrow, title, intro, sections }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />

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
          ? "Messages go directly to the launch and tournament support team."
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
        portraitCaption="Young players finishing the morning with something real to celebrate."
        actions={
          <>
            <AppLink to="/events/chess-and-truck-tournament" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              See Launch Format
            </AppLink>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Get Early Access
            </AppLink>
          </>
        }
        aside={
          <>
            <span className="mini-tag mini-tag-dark">Featured event</span>
            <h2>{featuredTournament.title}</h2>
            <p>{featuredTournament.shortSummary}</p>
            <div className="fact-list fact-list-hero">
              <div>
                <span>Format</span>
                <strong>{featuredTournament.formatLabel}</strong>
              </div>
              <div>
                <span>Schedule</span>
                <strong>{featuredTournament.scheduleLabel}</strong>
              </div>
            </div>
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Quick look"
            title="What matters"
          />
          <div className="stat-grid">
            {heroStats.map((item) => (
              <article className="surface stat-card" key={item.value}>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Launch sequence"
            title="What opens first"
            intro="No fake calendar. Just the pieces that are already locked in."
          />
          <UpcomingTournamentList currentPath={currentPath} navigate={navigate} compact />
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Inside the event"
            title="Choose the right path"
          />
          <div className="card-grid card-grid-three">
            {homePage.valueCards.map((item) => (
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
            eyebrow="Next step"
            title="See it. Join early. Ask."
          />
          <div className="card-grid card-grid-three">
            {homePage.pageCards.map((item) => (
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
    </>
  );
}

function AboutPage({ currentPath, navigate }) {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        intro={aboutPage.intro}
        portraitCaption="A tournament should leave players proud and parents confident in how the day was run."
        actions={
          <>
            <AppLink to="/events" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              View Launch Details
            </AppLink>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Get Early Access
            </AppLink>
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="What families notice"
            title="Communication matters as much as competition"
            intro="Organized. Responsive. Easy to trust."
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
        <div className="shell two-column">
          {aboutPage.storyBlocks.map((item) => (
            <article className="surface" key={item.title}>
              <span className="mini-tag">Focus</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Operating standards"
            title="What families can expect from the experience"
            intro="What stays clear before launch and on tournament day."
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
    </>
  );
}

function EventsPage({ currentPath, navigate }) {
  return (
    <>
      <PageHero
        eyebrow={eventsPage.eyebrow}
        title={eventsPage.title}
        intro={eventsPage.intro}
        portraitCaption="The event should feel welcoming for newer players and serious enough for experienced competitors."
        actions={
          <AppLink to="/events/chess-and-truck-tournament" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
            See Launch Format
          </AppLink>
        }
      />

      <section className="page-section">
        <div className="shell two-column">
          <article className="surface feature-event-card">
            <span className="mini-tag">Featured event</span>
            <h3>{featuredTournament.title}</h3>
            <p>{featuredTournament.shortSummary}</p>
            <div className="fact-list fact-list-compact">
              <div>
                <span>Location</span>
                <strong>{featuredTournament.city}</strong>
              </div>
              <div>
                <span>Schedule</span>
                <strong>{featuredTournament.scheduleLabel}</strong>
              </div>
              <div>
                <span>Launch status</span>
                <strong>First dates announced soon</strong>
              </div>
            </div>
            <AppLink to="/events/chess-and-truck-tournament" navigate={navigate} currentPath={currentPath} className="text-link">
              Open launch page
            </AppLink>
          </article>

          <article className="surface">
            <span className="mini-tag">Before launch opens</span>
            <h3>What families should know before the first release</h3>
            <ul className="checklist">
              {policyItems.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Launch board"
            title="What is opening first"
            intro="The structure is real. The public dates are next."
          />
          <UpcomingTournamentList currentPath={currentPath} navigate={navigate} />
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Divisions"
            title="A clear difference between Open and Beginner"
            intro="Know the fit before the first date goes live."
          />
          <div className="card-grid card-grid-two">
            {sectionOptions.map((item) => (
              <article className="surface" key={item.id}>
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

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Support"
            title="Why families can move early with confidence"
            intro="The key information is already visible before the first date drops."
          />
          <div className="card-grid card-grid-three">
            {eventsPage.supportCards.map((item) => (
              <article className="surface" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TournamentDetailPage({ currentPath, navigate }) {
  return (
    <>
      <PageHero
        eyebrow={tournamentPage.eyebrow}
        title={tournamentPage.title}
        intro={tournamentPage.intro}
        portraitCaption="Tournament mornings should end with real energy, earned confidence, and memorable moments for players."
        actions={
          <>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              Get Early Access
            </AppLink>
            <AppLink to="/faq" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Review FAQ
            </AppLink>
          </>
        }
        aside={
          <>
            <span className="mini-tag mini-tag-dark">At a glance</span>
            <h2>Event overview</h2>
            <p>{featuredTournament.longSummary}</p>
            <div className="fact-list">
              {tournamentPage.atAGlance.map((item) => (
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
            eyebrow="Sections"
            title="Two divisions, explained clearly"
            intro="Know the right fit first."
          />
          <div className="card-grid card-grid-two">
            {sectionOptions.map((item) => (
              <article className="surface" key={item.id}>
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

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Tournament morning"
            title="The Saturday flow is already clear"
            intro="The first public date is pending. The structure is not."
          />
          <div className="card-grid card-grid-two">
            {scheduleItems.map((item) => (
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
            eyebrow="Training add-on"
            title="Master Training Dojo"
            intro="Extra coaching around tournament day."
          />
          <DojoFeature currentPath={currentPath} navigate={navigate} />
        </div>
      </section>

      <section className="page-section">
        <div className="shell two-column">
          <article className="surface">
            <SectionIntro
              eyebrow="Service levels"
              title="Pricing before checkout"
              intro="See the price before you pay."
            />
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

          <article className="surface">
            <SectionIntro
              eyebrow="Registration checklist"
              title="What to have ready"
              intro="Have this ready before you start."
            />
            <ul className="checklist">
              {tournamentPage.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={faqPage.eyebrow}
        title={faqPage.title}
        intro={faqPage.intro}
        portraitCaption="Families ask better questions when the launch already feels thoughtful, organized, and player-centered."
      />

      <section className="page-section">
        <div className="shell faq-stack">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage({ contactState, contactSubmitState, updateContactField, handleContactSubmit }) {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={contactPage.intro}
        portraitCaption="Quick, direct support helps families feel ready before launch and before tournament day."
      />

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
  isCompactViewport,
  activeRegistrationStep,
  setActiveRegistrationStep,
  goToNextRegistrationStep,
  goToPreviousRegistrationStep,
}) {
  const isMobileRegistrationFlow = isCompactViewport;

  const renderSectionActions = (stepIndex) => {
    if (!isMobileRegistrationFlow || stepIndex === registrationStepDefinitions.length - 1) {
      return null;
    }

    return (
      <div className="mobile-step-actions">
        {stepIndex > 0 ? (
          <button type="button" className="btn btn-secondary" onClick={goToPreviousRegistrationStep}>
            Back
          </button>
        ) : null}
        <button type="button" className="btn btn-primary" onClick={goToNextRegistrationStep}>
          Continue to {registrationStepDefinitions[stepIndex + 1].shortTitle}
        </button>
      </div>
    );
  };

  return (
    <>
      <PageHero
        eyebrow={registerPage.eyebrow}
        title={registerPage.title}
        intro={registerPage.intro}
        portraitCaption="The registration flow should feel just as calm and clear as the event itself."
        actions={
          <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
            Need help before paying?
          </AppLink>
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
                  ? `Payment confirmed for ${paymentState.details.playerName}. Reference ${paymentState.details.reference}. A Stripe receipt was sent to ${paymentState.details.customerEmail}.`
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
                <small className="status-copy">{registerPage.draftNote}</small>
              </div>

              {isMobileRegistrationFlow ? (
                <MobileRegistrationProgress
                  activeRegistrationStep={activeRegistrationStep}
                  setActiveRegistrationStep={setActiveRegistrationStep}
                  registrationErrors={registrationErrors}
                />
              ) : null}

              {!isMobileRegistrationFlow || activeRegistrationStep === 0 ? (
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
                    {registrationErrors.firstName ? <small className="field-error">{registrationErrors.firstName}</small> : null}
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
                    {registrationErrors.lastName ? <small className="field-error">{registrationErrors.lastName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Phone *</span>
                    <input
                      name="phone"
                      type="tel"
                      value={registrationState.phone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    {registrationErrors.phone ? <small className="field-error">{registrationErrors.phone}</small> : null}
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
                    {registrationErrors.email ? <small className="field-error">{registrationErrors.email}</small> : null}
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
                    {registrationErrors.additionalEmails ? <small className="field-error">{registrationErrors.additionalEmails}</small> : null}
                  </label>

                  <label className="field field-span-2 honeypot-field" aria-hidden="true" tabIndex="-1">
                    <span>Website</span>
                    <input
                      name="website"
                      value={registrationState.website}
                      onChange={updateRegistrationField}
                      autoComplete="off"
                      tabIndex="-1"
                    />
                  </label>

                  <label className="checkbox-field field-span-2">
                    <input
                      name="acceptSms"
                      type="checkbox"
                      checked={registrationState.acceptSms}
                      onChange={updateRegistrationField}
                    />
                    <span>
                      I accept the{" "}
                      <AppLink to="/terms" navigate={navigate} currentPath={currentPath} className="inline-link">
                        Terms of Service
                      </AppLink>{" "}
                      and{" "}
                      <AppLink to="/privacy" navigate={navigate} currentPath={currentPath} className="inline-link">
                        Privacy Policy
                      </AppLink>{" "}
                      and agree to receive transactional or informational SMS communications related
                      to reminders, customer care, and registration follow-up.
                    </span>
                  </label>
                  {registrationErrors.acceptSms ? <small className="field-error field-span-2">{registrationErrors.acceptSms}</small> : null}
                </div>
                {renderSectionActions(0)}
              </section>
              ) : null}

              {!isMobileRegistrationFlow || activeRegistrationStep === 1 ? (
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
                      autoComplete="given-name"
                    />
                    {registrationErrors.playerFirstName ? <small className="field-error">{registrationErrors.playerFirstName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Player Last Name *</span>
                    <input
                      name="playerLastName"
                      value={registrationState.playerLastName}
                      onChange={updateRegistrationField}
                      placeholder="Player last name"
                      autoComplete="family-name"
                    />
                    {registrationErrors.playerLastName ? <small className="field-error">{registrationErrors.playerLastName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Player Grade *</span>
                    <input name="playerGrade" value={registrationState.playerGrade} onChange={updateRegistrationField} placeholder="Grade" />
                    {registrationErrors.playerGrade ? <small className="field-error">{registrationErrors.playerGrade}</small> : null}
                  </label>

                  <label className="field">
                    <span>School Name</span>
                    <input name="schoolName" value={registrationState.schoolName} onChange={updateRegistrationField} placeholder="Optional, used for team scoring" />
                  </label>

                  <label className="field">
                    <span>Section *</span>
                    <select name="section" value={registrationState.section} onChange={updateRegistrationField}>
                      <option value="">Select section</option>
                      <option value="Open">Open</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                    {registrationErrors.section ? <small className="field-error">{registrationErrors.section}</small> : null}
                  </label>

                  <label className="field">
                    <span>Service Level *</span>
                    <select name="serviceLevel" value={registrationState.serviceLevel} onChange={updateRegistrationField}>
                      <option value="">Select service level</option>
                      {serviceLevels.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label} - {formatCurrency(item.amount)}
                        </option>
                      ))}
                    </select>
                    {registrationErrors.serviceLevel ? <small className="field-error">{registrationErrors.serviceLevel}</small> : null}
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
                    {registrationErrors.uscfId ? <small className="field-error">{registrationErrors.uscfId}</small> : null}
                  </label>
                </div>
                {renderSectionActions(1)}
              </section>
              ) : null}

              {!isMobileRegistrationFlow || activeRegistrationStep === 2 ? (
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
                    {registrationErrors.parentName ? <small className="field-error">{registrationErrors.parentName}</small> : null}
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
                    {registrationErrors.parentEmail ? <small className="field-error">{registrationErrors.parentEmail}</small> : null}
                  </label>

                  <label className="field">
                    <span>Parent Phone *</span>
                    <input
                      name="parentPhone"
                      type="tel"
                      value={registrationState.parentPhone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    {registrationErrors.parentPhone ? <small className="field-error">{registrationErrors.parentPhone}</small> : null}
                  </label>
                </div>
                {renderSectionActions(2)}
              </section>
              ) : null}

              {!isMobileRegistrationFlow || activeRegistrationStep === 3 ? (
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
                      autoComplete="name"
                    />
                    {registrationErrors.emergencyName ? <small className="field-error">{registrationErrors.emergencyName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Emergency Contact Phone *</span>
                    <input
                      name="emergencyPhone"
                      type="tel"
                      value={registrationState.emergencyPhone}
                      onChange={updateRegistrationField}
                      placeholder="+1 ..."
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    {registrationErrors.emergencyPhone ? <small className="field-error">{registrationErrors.emergencyPhone}</small> : null}
                  </label>
                </div>
                {renderSectionActions(3)}
              </section>
              ) : null}

              {!isMobileRegistrationFlow || activeRegistrationStep === 4 ? (
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
                    {registrationErrors.medicalInfo ? <small className="field-error">{registrationErrors.medicalInfo}</small> : null}
                  </label>
                </div>
              </section>
              ) : null}

              {!isMobileRegistrationFlow || activeRegistrationStep === registrationStepDefinitions.length - 1 ? (
              <div className={`submit-actions${isMobileRegistrationFlow ? " submit-actions-mobile" : ""}`}>
                {isMobileRegistrationFlow && activeRegistrationStep > 0 ? (
                  <button type="button" className="btn btn-secondary" onClick={goToPreviousRegistrationStep}>
                    Back
                  </button>
                ) : null}
                <button type="submit" className="btn btn-primary btn-full" disabled={paymentState.status === "loading"}>
                  {paymentState.status === "loading" ? "Preparing Checkout..." : "Continue to Secure Payment"}
                </button>
              </div>
              ) : null}

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
                <button type="button" className="btn btn-secondary btn-full" onClick={clearRegistrationDraft}>
                  Clear Saved Draft
                </button>
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
      mainRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(focusTimer);
  }, [currentPath]);

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
        return <HomePage currentPath={currentPath} navigate={navigate} />;
      case "/about":
        return <AboutPage currentPath={currentPath} navigate={navigate} />;
      case "/events":
        return <EventsPage currentPath={currentPath} navigate={navigate} />;
      case "/events/chess-and-truck-tournament":
        return <TournamentDetailPage currentPath={currentPath} navigate={navigate} />;
      case "/faq":
        return <FaqPage />;
      case "/terms":
        return <LegalPage {...termsPage} />;
      case "/privacy":
        return <LegalPage {...privacyPage} />;
      case "/contact":
        return (
          <ContactPage
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
              <img src={brandLogo} alt="" className="brand-mark-image" />
            </span>
            <span className="brand-copy">
              <strong>{siteBrand.name}</strong>
              <small>{siteBrand.tagline}</small>
            </span>
          </AppLink>

          <nav
            id="primary-navigation"
            className={`site-nav${isMobileNavOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {navigationItems.map((item) => (
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
            ))}
          </nav>

          <div className="header-actions">
            <AppLink
              to="/contact"
              navigate={navigate}
              currentPath={currentPath}
              className="btn btn-primary header-button"
              onNavigate={() => setIsMobileNavOpen(false)}
            >
              Early Access
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
