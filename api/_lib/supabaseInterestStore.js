// Server-only Supabase access for the interest list, via the Supabase REST API
// (PostgREST) and plain fetch, so no extra package is needed.
//
// Uses SUPABASE_SECRET_KEY (or the legacy SUPABASE_SERVICE_ROLE_KEY). That key
// bypasses Row Level Security and must only ever be set as a server
// environment variable in Vercel. It is never sent to the browser.

export class DuplicateSignupError extends Error {}

export const getSupabaseConfig = (env = process.env) => {
  const url = String(env.SUPABASE_URL || "").replace(/\/+$/, "");
  const key = String(env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || "");

  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) || key.length < 20) {
    return null;
  }

  return { url, key };
};

const TABLE = "interest_signups";

// Only these columns are ever written, whatever the request contained.
const WRITABLE_COLUMNS = [
  "email",
  "program_id",
  "status",
  "consent_at",
  "consent_version",
  "confirm_token_hash",
  "confirm_token_expires_at",
  "confirmation_sent_at",
  "confirmed_at",
  "unsubscribed_at",
];

const pickWritable = (row) =>
  Object.fromEntries(Object.entries(row).filter(([column]) => WRITABLE_COLUMNS.includes(column)));

export const createSupabaseInterestStore = ({ url, key }, fetchImpl = (...args) => fetch(...args)) => {
  const headers = {
    apikey: key,
    "Content-Type": "application/json",
    Accept: "application/json",
    // New "sb_secret_" keys go only in the apikey header; legacy JWT keys also use Authorization.
    ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
  };

  const request = async (path, { method = "GET", body, prefer } = {}) => {
    const response = await fetchImpl(`${url}/rest/v1/${path}`, {
      method,
      headers: prefer ? { ...headers, Prefer: prefer } : headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (response.status === 409) {
      throw new DuplicateSignupError("Duplicate signup");
    }

    if (!response.ok) {
      throw new Error(`Supabase request failed (${response.status})`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  };

  const selectOne = async (filters) => {
    const query = Object.entries(filters)
      .map(([column, value]) => `${column}=eq.${encodeURIComponent(value)}`)
      .join("&");
    const rows = await request(`${TABLE}?select=*&${query}&limit=1`);
    return Array.isArray(rows) && rows.length ? rows[0] : null;
  };

  return {
    findByEmailAndProgram: (email, programId) => selectOne({ email, program_id: programId }),
    findById: (id) => selectOne({ id }),
    findByConfirmTokenHash: (hash) => selectOne({ confirm_token_hash: hash }),

    async insert(row) {
      const rows = await request(TABLE, { method: "POST", body: pickWritable(row), prefer: "return=representation" });
      return rows?.[0] || null;
    },

    async update(id, patch) {
      const rows = await request(`${TABLE}?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: pickWritable(patch),
        prefer: "return=representation",
      });
      return rows?.[0] || null;
    },

    async consumeRateLimit(rateKey, limit, windowSeconds) {
      const allowed = await request("rpc/consume_interest_rate_limit", {
        method: "POST",
        body: { p_key: rateKey, p_limit: limit, p_window_seconds: windowSeconds },
      });
      return allowed === true;
    },
  };
};
