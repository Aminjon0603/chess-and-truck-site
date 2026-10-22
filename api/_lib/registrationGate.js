// Server-side registration gate. Every checkout handler calls this before it
// does anything else, including QA pricing and Stripe.
import { getLaunchReadiness, PROGRAM_REQUIREMENTS } from "../../src/lib/launchReadiness.js";
import { getConfiguredStatus } from "../../src/lib/programs.js";
import { programLaunchConfig } from "./launchConfig.js";
import { getServerPriceCatalog } from "./priceCatalog.js";

// The single place the launch configuration is read. It is async so it can
// later load from a database (for example a Supabase table keyed by programId)
// without changing any caller.
export const loadLaunchConfig = async (programId) => {
  const config = programLaunchConfig[programId];
  return config ? structuredClone(config) : null;
};

export const checkRegistrationGate = async (programId, { now = new Date(), log = true } = {}) => {
  const config = await loadLaunchConfig(programId);
  const readiness = getLaunchReadiness({
    programId,
    status: getConfiguredStatus(programId),
    config,
    priceCatalog: getServerPriceCatalog(programId),
    now,
  });

  // Details go to the server log only. Visitors get a generic "not open yet" message.
  if (!readiness.ready && log && getConfiguredStatus(programId) === "open") {
    console.warn(
      `[launch-gate] ${programId} is marked open but blocked:`,
      readiness.issues.map((item) => item.code).join(", ")
    );
  }

  return readiness;
};

// Public availability: one yes/no per program and nothing else.
export const getPublicAvailability = async ({ now = new Date() } = {}) => {
  const entries = await Promise.all(
    Object.keys(PROGRAM_REQUIREMENTS).map(async (programId) => {
      const { ready } = await checkRegistrationGate(programId, { now, log: false });
      return [programId, ready];
    })
  );

  return Object.fromEntries(entries);
};
