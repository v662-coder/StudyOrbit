// FEATURE: previously every operation file called toast.loading("Loading...")
// with no explicit id, so react-hot-toast generated a brand-new toast each
// time. If more than one API call happened to be in flight at once (very
// common - e.g. categories + course data fetching together on page load),
// multiple "Loading..." toasts stacked up on screen at the same time.
//
// Passing this SAME id to every toast.loading(...) call means a new call
// updates/replaces the existing toast instead of stacking a new one, so at
// most one loading toast is ever visible - exactly one at a time.
export const LOADING_TOAST_ID = "global-loading"
