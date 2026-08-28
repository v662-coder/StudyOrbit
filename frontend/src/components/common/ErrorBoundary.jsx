import React from "react";
import { reportClientError } from "../../utils/errorLogger";

// BUGFIX: previously there was no ErrorBoundary anywhere in the app, so any
// error thrown during React's render/lifecycle unmounted the whole tree and
// left a blank white screen with nothing but a console error the user (or
// you) would never see. This catches those errors, reports them to the
// backend so they're visible in server logs, and shows a recoverable
// fallback instead of a blank page.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary] Caught a render error:", error, errorInfo);
    reportClientError({
      type: "react-render-error",
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-richblack-900 px-4 text-center">
          <div>
            <p className="text-2xl font-semibold text-richblack-5">
              Something went wrong.
            </p>
            <p className="mt-2 text-richblack-300">
              This has been reported automatically. Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-md bg-yellow-50 px-4 py-2 font-medium text-richblack-900"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
