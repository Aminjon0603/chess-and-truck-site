import { getPublicAvailability } from "./_lib/registrationGate.js";

export const runtime = "nodejs";

// Public endpoint: says only whether each program can take registrations.
// Launch details and validation reasons are never returned.
export default {
  async fetch(request) {
    if (request.method !== "GET") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    const programs = await getPublicAvailability();

    return Response.json(
      { programs },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  },
};
