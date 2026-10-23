// Server-side registration gate. Every checkout handler calls this before it
// does anything else, including QA pricing and Stripe. It always fails closed:
// any error while loading or checking launch details means "not ready".
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

const blocked = (code) => ({
  ready: false,
  config: null,
  issues: [{ code, field: "config", message: "Launch details could not be loaded or validated." }],
});

/**
 * @returns {Promise<{ ready: boolean, issues: Array, config: object | null }>}
 * `config` is the approved launch configuration, returned only when ready, so
 * checkout can use the approved venue and dates instead of hard-coded ones.
 */
export const checkRegistrationGate = async (programId, { now = new Date(), log = true } = {}) => {
  let readiness;
  let config;

  try {
    config = await loadLaunchConfig(programId);
    readiness = getLaunchReadiness({
      programId,
      status: getConfiguredStatus(programId),
      config,
      priceCatalog: getServerPriceCatalog(programId),
      now,
    });
  } catch {
    readiness = blocked("GATE_ERROR");
  }

  // Details go to the server log only. Visitors get a generic "not open yet" message.
  if (!readiness.ready && log && getConfiguredStatus(programId) === "open") {
    console.warn(
      `[launch-gate] ${programId} is marked open but blocked:`,
      readiness.issues.map((item) => item.code).join(", ")
    );
  }

  return { ready: readiness.ready === true, issues: readiness.issues, config: readiness.ready === true ? config : null };
};

export const PROGRAM_IDS = Object.keys(PROGRAM_REQUIREMENTS);

// Public availability: one yes/no per program and nothing else. Any failure is "no".
export const getPublicAvailability = async ({ now = new Date() } = {}) => {
  const entries = await Promise.all(
    PROGRAM_IDS.map(async (programId) => {
      try {
        const { ready } = await checkRegistrationGate(programId, { now, log: false });
        return [programId, ready === true];
      } catch {
        return [programId, false];
      }
    })
  );

  return Object.fromEntries(entries);
};
