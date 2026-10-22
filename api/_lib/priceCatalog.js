// Server-side checkout prices (in cents). The checkout handlers charge exactly
// these amounts, and the launch gate compares a program's approved pricing to them.
//
// These are HISTORICAL DRAFT values from the original camp and tournament setup.
// They are not approved for launch. The line-item descriptions also mention an
// unconfirmed venue. `reviewed` stays false until prices and text are reviewed,
// which keeps the launch gate closed even if a program is marked "open".

export const campOptions = {
  "full-week": {
    label: "Full Week Camp",
    amount: 70000,
    description: "Five full camp days in one week at 62 E 92nd Street, New York, NY 10128.",
    campTime: "9:00 AM - 3:00 PM",
  },
  "single-day": {
    label: "Single Day Camp",
    amount: 15000,
    description: "One full camp day with Chess Masters, rated games, lunch, outdoor park time, and fun activities at 62 E 92nd Street, New York, NY 10128.",
    campTime: "9:00 AM - 3:00 PM",
  },
  "half-day-am": {
    label: "Half Day AM",
    amount: 9500,
    description: "One half-day AM chess camp session at 62 E 92nd Street, New York, NY 10128.",
    campTime: "9:00 AM - 12:00 PM",
  },
  "half-day-pm": {
    label: "Half Day PM",
    amount: 9500,
    description: "One half-day PM chess camp session at 62 E 92nd Street, New York, NY 10128.",
    campTime: "12:00 PM - 3:00 PM",
  },
};

export const campAddOns = {
  "early-drop-off": {
    label: "Early Drop-Off (8:30 AM)",
    amount: 3000,
  },
  "extended-day": {
    label: "Late Pick-Up (until 3:30 PM)",
    amount: 3000,
  },
};

export const campExtraServices = {
  pizza: {
    label: "Pizza",
    description: "Pizza / lunch happens at 11:30",
    amount: 700,
  },
  "ice-cream": {
    label: "Ice-Cream",
    description: "Ice-cream happens at 3:00",
    amount: 500,
  },
};

export const tournamentServiceLevels = {
  entry: { label: "Tournament Entry", amount: 5500 },
  "entry-dojo": { label: "Tournament Entry + Master Training Dojo", amount: 15500 },
};

// Set to true only after the amounts and line-item text above are reviewed for launch.
const CHECKOUT_REVIEWED = {
  camps: false,
  tournaments: false,
};

const flatten = (prefix, table) =>
  Object.fromEntries(Object.entries(table).map(([id, item]) => [`${prefix}${id}`, item.amount]));

// Flat map of everything a program's checkout can charge, keyed the same way
// as the approved pricing in the launch configuration.
// Programs without a server checkout return null, which keeps them closed.
export const getServerPriceCatalog = (programId) => {
  switch (programId) {
    case "camps":
      return {
        reviewed: CHECKOUT_REVIEWED.camps,
        prices: {
          ...flatten("", campOptions),
          ...flatten("addon:", campAddOns),
          ...flatten("extra:", campExtraServices),
        },
      };
    case "tournaments":
      return { reviewed: CHECKOUT_REVIEWED.tournaments, prices: flatten("", tournamentServiceLevels) };
    default:
      return null;
  }
};
