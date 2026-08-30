import axios from "axios";
import toast from "react-hot-toast";

// Flag to prevent multiple toast notifications and redirects when several
// API calls fail with 401 simultaneously (e.g., parallel requests).
let isHandling401 = false;

// BUGFIX: Added a 20-second timeout to prevent infinite hanging when the
// backend is unresponsive (e.g., sleeping Render instance or network drops).
// This ensures failures fail fast and visibly instead of silently stalling the UI.
export const axiosInstance = axios.create({
    timeout: 20000,
});

// FEATURE: Global interceptor to handle expired JWT tokens (401 responses).
// Previously, every API call showed a generic error, leaving users confused.
// This interceptor catches all 401s, cleans up stale local storage, shows
// a single clear session-expired message, and redirects to the login page.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // Prevent duplicate toasts/redirects if multiple 401 errors occur
            // in a short span (e.g., concurrent API calls).
            if (isHandling401) {
                return Promise.reject(error);
            }
            isHandling401 = true;

            const alreadyOnLogin = window.location.pathname === "/login";

            // Clear all stale user session data from local storage.
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");

            if (!alreadyOnLogin) {
                toast.error("Your session has expired. Please log in again.");
                // Hard redirect is intentional to completely reset Redux state
                // and avoid rendering stale logged-in UI components.
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// Centralized API connector function.
// Accepts method, URL, request body, headers, and query parameters.
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || undefined,
        headers: headers || undefined,
        params: params || undefined,
    });
};