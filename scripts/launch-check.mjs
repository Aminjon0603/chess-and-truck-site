// Launch check for program owners. Prints whether each program could accept
// registrations, every blocking issue, and the fingerprint to use when approving.
//
//   npm run launch:check              (all programs)
//   npm run launch:check -- camps     (one program)
//
// This script only reads configuration. It never changes a program's status.
import { fingerprintLaunchConfig, PROGRAM_REQUIREMENTS } from "../src/lib/launchReadiness.js";
import { getConfiguredStatus } from "../src/lib/programs.js";
import { checkRegistrationGate, loadLaunchConfig } from "../api/_lib/registrationGate.js";
import { getServerPriceCatalog } from "../api/_lib/priceCatalog.js";

const requested = process.argv[2];
const programIds = requested ? [requested] : Object.keys(PROGRAM_REQUIREMENTS);

if (requested && !PROGRAM_REQUIREMENTS[requested]) {
  console.error(`Unknown program "${requested}". Use one of: ${Object.keys(PROGRAM_REQUIREMENTS).join(", ")}`);
  process.exit(1);
}

for (const programId of programIds) {
  const config = await loadLaunchConfig(programId);
  const readiness = await checkRegistrationGate(programId, { log: false });
  const catalog = getServerPriceCatalog(programId);

  console.log(`\n=== ${programId} ===`);
  console.log(`Status: ${getConfiguredStatus(programId)}`);
  console.log(`Ready to accept registrations: ${readiness.ready ? "YES" : "NO"}`);
  console.log(`Required fields: ${PROGRAM_REQUIREMENTS[programId].join(", ")}`);

  if (catalog) {
    console.log(`Checkout prices (cents), reviewed=${catalog.reviewed}:`);
    Object.entries(catalog.prices).forEach(([optionId, amount]) => console.log(`  ${optionId}: ${amount}`));
  } else {
    console.log("Checkout: none (this program has no server-side checkout yet)");
  }

  if (readiness.issues.length) {
    console.log("Blocking issues:");
    readiness.issues.forEach((item) => console.log(`  - [${item.code}] ${item.field}: ${item.message}`));
  }

  console.log(`Fingerprint for approval: ${fingerprintLaunchConfig(config)}`);
}
