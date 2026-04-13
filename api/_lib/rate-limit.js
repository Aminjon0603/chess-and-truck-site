const rateLimitStore = globalThis.__chessTruckRateLimitStore || new Map();
globalThis.__chessTruckRateLimitStore = rateLimitStore;

const getIpFromHeader = (request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
};

export function applyRateLimit(request, bucket, { limit, windowMs, message }) {
  const now = Date.now();
  const ip = getIpFromHeader(request);
  const key = `${bucket}:${ip}`;
  const existing = rateLimitStore.get(key) || [];
  const recentHits = existing.filter((stamp) => now - stamp < windowMs);

  if (recentHits.length >= limit) {
    return Response.json(
      { error: message || "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  recentHits.push(now);
  rateLimitStore.set(key, recentHits);
  return null;
}
