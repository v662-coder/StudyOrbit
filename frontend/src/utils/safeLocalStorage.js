// BUGFIX (root cause of the "Uncaught SyntaxError: Unexpected non-whitespace
// character after JSON..." crash reported): five different Redux slices
// (auth, cart x3, profile) called `JSON.parse(localStorage.getItem(...))`
// directly inside their `initialState`, which runs the instant the module is
// imported - i.e. before React even mounts, before any try/catch in App
// code can help, and before the ErrorBoundary below can catch it (it only
// catches errors thrown during render, not during module evaluation).
//
// If localStorage ever holds a value that isn't valid JSON for one of these
// keys - a leftover value from an older app version that stored the token as
// a raw (non-JSON.stringify'd) string, a value written by hand in devtools,
// a corrupted value from browser storage sync, another extension writing to
// the same key, etc. - JSON.parse throws, the whole module fails to
// evaluate, the whole import chain (main.jsx -> store -> this slice) fails,
// and the entire app fails to boot with a blank white screen. This exactly
// matches the reported bug, and explains why it didn't reproduce locally:
// it only happens for whichever browser/profile has a bad value already
// sitting in localStorage under these keys.
//
// This helper never throws: on bad JSON it logs a clear message, reports it
// to the backend logger (see utils/errorLogger.js) so it's visible on the
// server, removes the corrupted key so the user isn't stuck forever, and
// returns the given fallback instead.
import { reportClientError } from "./errorLogger";

export function safeParseLocalStorage(key, fallback = null) {
  const raw = localStorage.getItem(key);
  if (raw === null || raw === undefined) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(`[safeParseLocalStorage] Corrupted localStorage["${key}"], clearing it.`, error);
    reportClientError({
      type: "corrupted-localstorage",
      message: `Failed to JSON.parse localStorage["${key}"]: ${error.message}`,
      extra: { key, rawValuePreview: String(raw).slice(0, 100) },
    });
    localStorage.removeItem(key);
    return fallback;
  }
}
