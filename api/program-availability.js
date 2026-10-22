import { getPublicAvailability, PROGRAM_IDS } from "./_lib/registrationGate.js";

export const runtime = "nodejs";

const allClosed = () => Object.fromEntries(PROGRAM_IDS.map((programId) => [programId, false]));

// Public endpoint: says only whether each program can take registrations.
// Launch details and validation reasons are never returned, and any failure
// reports every program as closed.
export default {
  async fetch(request) {
    if (request.method !== "GET") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    let programs;

    try {
      programs = await getPublicAvailability();
    } catch {
      programs = allClosed();
    }

    return Response.json(
      { programs },
      { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  },
};
