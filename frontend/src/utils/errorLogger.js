// Sends frontend errors to the backend so they land in server logs, instead
// of only existing in a user's browser console where nobody on the team
// will ever see them (which is exactly what happened with the reported
// authSlice crash).
const LOG_ENDPOINT =
  (import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000") +
  "/api/v1/logs/client-error";

export function reportClientError(payload) {
  const body = JSON.stringify({
    ...payload,
    url: typeof window !== "undefined" ? window.location.href : undefined,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    timestamp: new Date().toISOString(),
  });

  try {
    // sendBeacon is more reliable for errors happening during page
    // unload/crash than a normal fetch, and it's fire-and-forget so it can
    // never itself throw and cause a second error.
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(LOG_ENDPOINT, blob);
      return;
    }
  } catch (_) {
    // fall through to fetch
  }

  try {
    fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* never let logging failures cause more errors */
    });
  } catch (_) {
    /* swallow - logging must never break the app further */
  }
}
