import { useEffect, useMemo, useState } from "react";
import {
  aboutPage,
  contactEmails,
  contactNumbers,
  contactPage,
  eventsPage,
  faqItems,
  faqPage,
  featuredTournament,
  heroStats,
  homePage,
  navigationItems,
  policyItems,
  registerPage,
  scheduleItems,
  sectionOptions,
  serviceLevels,
  siteBrand,
  tournamentPage,
} from "./siteData";

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
};

const contactInitialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const knownRoutes = new Set([
  "/",
  "/about",
  "/events",
  "/events/chess-and-truck-tournament",
  "/faq",
  "/contact",
  "/register",
]);

const pageTitles = {
  "/": `${siteBrand.name} | ${siteBrand.tagline}`,
  "/about": `About | ${siteBrand.name}`,
  "/events": `Events | ${siteBrand.name}`,
  "/events/chess-and-truck-tournament": `${featuredTournament.title} | ${siteBrand.name}`,
  "/faq": `FAQ | ${siteBrand.name}`,
  "/contact": `Contact | ${siteBrand.name}`,
  "/register": `Register | ${siteBrand.name}`,
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const splitAdditionalEmails = (value) =>
  value
    .split(/[,\n;]+/)
    .map((item) => item.trim())
    .filter(Boolean);

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

function AppLink({ to, navigate, children, className = "", currentPath, ...rest }) {
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

function PageHero({ eyebrow, title, intro, actions, aside }) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div className="page-hero-copy">
          <span className="section-tag">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="page-intro">{intro}</p>
          {actions ? <div className="cta-row">{actions}</div> : null}
        </div>
        {aside ? <aside className="surface surface-dark hero-aside">{aside}</aside> : null}
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

function BoardArt() {
  return (
    <div className="board-art" aria-hidden="true">
      <div className="board-squares" />
      <div className="board-piece board-piece-light">K</div>
      <div className="board-piece board-piece-accent">N</div>
      <div className="board-piece board-piece-dark">R</div>
    </div>
  );
}

function ContactDirectory() {
  return (
    <div className="stack-grid">
      <article className="surface">
        <span className="mini-tag">Phone / WhatsApp</span>
        <div className="link-stack">
          {contactNumbers.map((item) => (
            <a href={item.href} key={item.display} className="contact-link" target="_blank" rel="noreferrer">
              <span>{item.label}</span>
              <strong>{item.display}</strong>
            </a>
          ))}
        </div>
      </article>

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
      <h3>Send a question before tournament day</h3>
      <p>
        Use this form for section fit, logistics, registration help, or anything you would rather
        confirm before paying.
      </p>

      <label className="field">
        <span>Name *</span>
        <input
          name="name"
          value={contactState.name}
          onChange={updateContactField}
          placeholder="Your name"
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
          required
        />
      </label>

      <label className="field">
        <span>Phone</span>
        <input
          name="phone"
          value={contactState.phone}
          onChange={updateContactField}
          placeholder="+1 ..."
        />
      </label>

      <label className="field">
        <span>Message *</span>
        <textarea
          name="message"
          value={contactState.message}
          onChange={updateContactField}
          rows="5"
          placeholder="Tell us what you want to confirm before registering."
          required
        />
      </label>

      <button type="submit" className="btn btn-primary btn-full" disabled={contactSubmitState.status === "loading"}>
        {contactSubmitState.status === "loading" ? "Sending..." : "Send Message"}
      </button>

      <small className={`status-copy status-${contactSubmitState.status}`} aria-live="polite">
        {contactSubmitState.status === "idle"
          ? "Messages are routed to the tournament support team."
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
        actions={
          <>
            <AppLink to="/events/chess-and-truck-tournament" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              View Tournament Page
            </AppLink>
            <AppLink to="/register" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Start Registration
            </AppLink>
          </>
        }
        aside={
          <>
            <span className="mini-tag mini-tag-dark">Featured event</span>
            <h2>{featuredTournament.title}</h2>
            <p>{featuredTournament.longSummary}</p>
            <div className="fact-list">
              <div>
                <span>Format</span>
                <strong>{featuredTournament.formatLabel}</strong>
              </div>
              <div>
                <span>Schedule</span>
                <strong>{featuredTournament.scheduleLabel}</strong>
              </div>
              <div>
                <span>Pricing</span>
                <strong>{featuredTournament.pricingLabel}</strong>
              </div>
            </div>
            <BoardArt />
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="At a glance"
            title="The first screen should already answer the big questions"
            intro="These are the signals families should understand within seconds, not after they scroll through a long landing page."
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
            eyebrow="Why this structure"
            title="A better tournament site is mostly about better decisions"
            intro="The new structure makes the site easier to trust, easier to scan, and easier to use when a parent is trying to register quickly."
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
            eyebrow="Site map"
            title="This version is multi-page on purpose"
            intro="Instead of hiding everything in one scroll, the site now gives each important part of the experience its own page."
          />
          <div className="card-grid card-grid-three">
            {homePage.pageCards.map((item) => (
              <article className="surface card-link-card" key={item.path}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <AppLink to={item.path} navigate={navigate} currentPath={currentPath} className="text-link">
                  Open page
                </AppLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Registration flow"
            title="What a clean registration journey looks like"
            intro="The goal is simple: remove uncertainty before payment and make the next step obvious."
          />
          <div className="card-grid card-grid-three">
            {homePage.processCards.map((item) => (
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

function AboutPage({ currentPath, navigate }) {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        intro={aboutPage.intro}
        actions={
          <>
            <AppLink to="/events" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              View Events
            </AppLink>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Contact the Team
            </AppLink>
          </>
        }
      />

      <section className="page-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Positioning"
            title="The tone is sharper, calmer, and more specific"
            intro="The copy is written to sound trustworthy and prepared, not like a placeholder template."
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
              <span className="mini-tag">Perspective</span>
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
            title="What the site now does better"
            intro="These are the practical improvements that make the website feel more credible and more useful."
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
        actions={
          <AppLink to="/events/chess-and-truck-tournament" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
            Open Tournament Page
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
                <span>Starting price</span>
                <strong>{featuredTournament.pricingLabel}</strong>
              </div>
            </div>
            <AppLink to="/events/chess-and-truck-tournament" navigate={navigate} currentPath={currentPath} className="text-link">
              View full event page
            </AppLink>
          </article>

          <article className="surface">
            <span className="mini-tag">Before families register</span>
            <h3>What should be obvious on the events page</h3>
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
            eyebrow="Divisions"
            title="A clear difference between Open and Beginner"
            intro="Parents should not need to infer the difference from scattered notes inside a long form."
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
            title="What families should understand before they pay"
            intro="This content belongs on its own page, not buried near the bottom of a generic landing page."
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
        actions={
          <>
            <AppLink to="/register" navigate={navigate} currentPath={currentPath} className="btn btn-primary">
              Register Now
            </AppLink>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="btn btn-secondary">
              Ask a Question
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
            intro="The event page should make section choice easier before the parent reaches the form."
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
            title="A Saturday flow that is easy for families to follow"
            intro="The event page now reads like an organized schedule rather than a loose collection of notes."
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
        <div className="shell two-column">
          <article className="surface">
            <SectionIntro
              eyebrow="Service levels"
              title="Pricing before checkout"
              intro="Families should understand the options and the pricing before they ever click continue."
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
              intro="This list helps the parent prepare before opening the registration form."
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
      <PageHero eyebrow={faqPage.eyebrow} title={faqPage.title} intro={faqPage.intro} />

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
      <PageHero eyebrow={contactPage.eyebrow} title={contactPage.title} intro={contactPage.intro} />

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

function RegisterPage({
  currentPath,
  navigate,
  registrationState,
  registrationErrors,
  updateRegistrationField,
  handleRegistrationSubmit,
  paymentState,
  selectedServiceLevel,
}) {
  return (
    <>
      <PageHero
        eyebrow={registerPage.eyebrow}
        title={registerPage.title}
        intro={registerPage.intro}
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
                    <input name="firstName" value={registrationState.firstName} onChange={updateRegistrationField} placeholder="First name" />
                    {registrationErrors.firstName ? <small className="field-error">{registrationErrors.firstName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Last Name *</span>
                    <input name="lastName" value={registrationState.lastName} onChange={updateRegistrationField} placeholder="Last name" />
                    {registrationErrors.lastName ? <small className="field-error">{registrationErrors.lastName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Phone *</span>
                    <input name="phone" value={registrationState.phone} onChange={updateRegistrationField} placeholder="+1 ..." />
                    {registrationErrors.phone ? <small className="field-error">{registrationErrors.phone}</small> : null}
                  </label>

                  <label className="field">
                    <span>Email *</span>
                    <input name="email" type="email" value={registrationState.email} onChange={updateRegistrationField} placeholder="family@example.com" />
                    {registrationErrors.email ? <small className="field-error">{registrationErrors.email}</small> : null}
                  </label>

                  <label className="field field-span-2">
                    <span>Additional Emails</span>
                    <input
                      name="additionalEmails"
                      value={registrationState.additionalEmails}
                      onChange={updateRegistrationField}
                      placeholder="Add any other addresses that should receive confirmations"
                    />
                    {registrationErrors.additionalEmails ? <small className="field-error">{registrationErrors.additionalEmails}</small> : null}
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
                  {registrationErrors.acceptSms ? <small className="field-error field-span-2">{registrationErrors.acceptSms}</small> : null}
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
                    <input name="playerFirstName" value={registrationState.playerFirstName} onChange={updateRegistrationField} placeholder="Player first name" />
                    {registrationErrors.playerFirstName ? <small className="field-error">{registrationErrors.playerFirstName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Player Last Name *</span>
                    <input name="playerLastName" value={registrationState.playerLastName} onChange={updateRegistrationField} placeholder="Player last name" />
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
                    <input name="parentName" value={registrationState.parentName} onChange={updateRegistrationField} placeholder="Parent or guardian name" />
                    {registrationErrors.parentName ? <small className="field-error">{registrationErrors.parentName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Parent Email *</span>
                    <input name="parentEmail" type="email" value={registrationState.parentEmail} onChange={updateRegistrationField} placeholder="parent@example.com" />
                    {registrationErrors.parentEmail ? <small className="field-error">{registrationErrors.parentEmail}</small> : null}
                  </label>

                  <label className="field">
                    <span>Parent Phone *</span>
                    <input name="parentPhone" value={registrationState.parentPhone} onChange={updateRegistrationField} placeholder="+1 ..." />
                    {registrationErrors.parentPhone ? <small className="field-error">{registrationErrors.parentPhone}</small> : null}
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
                    <input name="emergencyName" value={registrationState.emergencyName} onChange={updateRegistrationField} placeholder="Emergency contact name" />
                    {registrationErrors.emergencyName ? <small className="field-error">{registrationErrors.emergencyName}</small> : null}
                  </label>

                  <label className="field">
                    <span>Emergency Contact Phone *</span>
                    <input name="emergencyPhone" value={registrationState.emergencyPhone} onChange={updateRegistrationField} placeholder="+1 ..." />
                    {registrationErrors.emergencyPhone ? <small className="field-error">{registrationErrors.emergencyPhone}</small> : null}
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
                    {registrationErrors.medicalInfo ? <small className="field-error">{registrationErrors.medicalInfo}</small> : null}
                  </label>
                </div>
              </section>

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
  const [contactState, setContactState] = useState(contactInitialState);
  const [contactSubmitState, setContactSubmitState] = useState({ status: "idle", message: "" });
  const currentYear = new Date().getFullYear();
  const currentPath = route.pathname;

  const selectedServiceLevel = useMemo(
    () => serviceLevels.find((item) => item.id === registrationState.serviceLevel) || null,
    [registrationState.serviceLevel]
  );

  useEffect(() => {
    const handlePopState = () => {
      setRoute(readLocation());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.title = pageTitles[currentPath] || `${siteBrand.name} | ${siteBrand.tagline}`;
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
    const errors = {};
    const extraEmails = splitAdditionalEmails(registrationState.additionalEmails);

    if (!registrationState.firstName.trim()) errors.firstName = "First name is required.";
    if (!registrationState.lastName.trim()) errors.lastName = "Last name is required.";
    if (!registrationState.phone.trim()) errors.phone = "Phone is required.";
    if (!registrationState.email.trim()) errors.email = "Email is required.";
    if (registrationState.email && !isValidEmail(registrationState.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (extraEmails.some((email) => !isValidEmail(email))) {
      errors.additionalEmails = "One or more additional email addresses are invalid.";
    }
    if (!registrationState.acceptSms) errors.acceptSms = "You must accept the terms.";
    if (!registrationState.playerFirstName.trim()) errors.playerFirstName = "Required.";
    if (!registrationState.playerLastName.trim()) errors.playerLastName = "Required.";
    if (!registrationState.playerGrade.trim()) errors.playerGrade = "Required.";
    if (!registrationState.section) errors.section = "Choose a section.";
    if (!registrationState.serviceLevel) errors.serviceLevel = "Choose a service level.";
    if (registrationState.section === "Open" && !registrationState.uscfId.trim()) {
      errors.uscfId = "USCF ID is required for the Open section.";
    }
    if (!registrationState.parentName.trim()) errors.parentName = "Required.";
    if (!registrationState.parentEmail.trim()) errors.parentEmail = "Required.";
    if (registrationState.parentEmail && !isValidEmail(registrationState.parentEmail.trim())) {
      errors.parentEmail = "Enter a valid parent email address.";
    }
    if (!registrationState.parentPhone.trim()) errors.parentPhone = "Required.";
    if (!registrationState.emergencyName.trim()) errors.emergencyName = "Required.";
    if (!registrationState.emergencyPhone.trim()) errors.emergencyPhone = "Required.";
    if (!registrationState.medicalInfo.trim()) errors.medicalInfo = "Medical information is required.";

    setRegistrationErrors(errors);
    return Object.keys(errors).length === 0;
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
          />
        );
      default:
        return knownRoutes.has(currentPath) ? null : <NotFoundPage currentPath={currentPath} navigate={navigate} />;
    }
  })();

  return (
    <div className="app-shell">
      <div className="page-aura page-aura-left" />
      <div className="page-aura page-aura-right" />

      <header className="site-header">
        <div className="shell header-row">
          <AppLink to="/" navigate={navigate} currentPath={currentPath} className="brand-link" aria-label={`${siteBrand.name} home`}>
            <span className="brand-mark">{siteBrand.short}</span>
            <span className="brand-copy">
              <strong>{siteBrand.name}</strong>
              <small>{siteBrand.tagline}</small>
            </span>
          </AppLink>

          <nav className="site-nav" aria-label="Primary navigation">
            {navigationItems.map((item) => (
              <AppLink
                key={item.path}
                to={item.path}
                navigate={navigate}
                currentPath={currentPath}
                className="nav-link"
              >
                {item.label}
              </AppLink>
            ))}
          </nav>

          <AppLink to="/register" navigate={navigate} currentPath={currentPath} className="btn btn-primary header-button">
            Register
          </AppLink>
        </div>
      </header>

      <main>{pageContent}</main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <strong>{siteBrand.name}</strong>
            <p>{siteBrand.footerNote}</p>
          </div>
          <div className="footer-links">
            <AppLink to="/" navigate={navigate} currentPath={currentPath} className="footer-link">Home</AppLink>
            <AppLink to="/about" navigate={navigate} currentPath={currentPath} className="footer-link">About</AppLink>
            <AppLink to="/events" navigate={navigate} currentPath={currentPath} className="footer-link">Events</AppLink>
            <AppLink to="/faq" navigate={navigate} currentPath={currentPath} className="footer-link">FAQ</AppLink>
            <AppLink to="/contact" navigate={navigate} currentPath={currentPath} className="footer-link">Contact</AppLink>
            <AppLink to="/register" navigate={navigate} currentPath={currentPath} className="footer-link">Register</AppLink>
          </div>
          <small>&copy; {currentYear} {siteBrand.name}</small>
        </div>
      </footer>
    </div>
  );
}

export default ChessTruckApp;
