import { checkRegistrationGate, getPublicAvailability, PROGRAM_IDS } from "./_lib/registrationGate.js";

export const runtime = "nodejs";

const allClosed = () => Object.fromEntries(PROGRAM_IDS.map((programId) => [programId, false]));

// Approved camp dates are public once camps are open, so the booking form can
// offer exactly those days. Only start and end dates are returned.
const getPublicCampSessions = async () => {
  const gate = await checkRegistrationGate("camps", { log: false });

  if (!gate.ready || !Array.isArray(gate.config?.sessions)) {
    return [];
  }

  return gate.config.sessions.map((session) => ({ startDate: session.startDate, endDate: session.endDate }));
};

// Public endpoint: says only whether each program can take registrations (plus
// approved camp dates when camps are open). Launch approvals, prices, and
// validation reasons are never returned, and any failure reports every program
// as closed.
export default {
  async fetch(request) {
    if (request.method !== "GET") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    let programs;
    let campSessions;

    try {
      programs = await getPublicAvailability();
      campSessions = programs.camps ? await getPublicCampSessions() : [];
    } catch {
      programs = allClosed();
      campSessions = [];
    }

    return Response.json(
      { programs, sessions: { camps: campSessions } },
      { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  },
};
