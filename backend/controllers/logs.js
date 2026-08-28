// Receives error reports from the frontend (see frontend/src/utils/errorLogger.js
// and the inline pre-boot script in frontend/index.html) and writes them to
// the server logs, so client-side crashes are no longer invisible outside
// whoever's browser hit them.
exports.logClientError = async (req, res) => {
    try {
        const {
            type,
            message,
            stack,
            componentStack,
            source,
            line,
            column,
            url,
            userAgent,
            timestamp,
            phase,
            extra,
        } = req.body || {};

        console.error(
            "\n========== FRONTEND ERROR ==========\n" +
            `Time:      ${timestamp || new Date().toISOString()}\n` +
            `Type:      ${type || "unknown"}${phase ? ` (${phase})` : ""}\n` +
            `Message:   ${message || "(no message)"}\n` +
            `Page URL:  ${url || "(unknown)"}\n` +
            (source ? `Source:    ${source}:${line}:${column}\n` : "") +
            (userAgent ? `Browser:   ${userAgent}\n` : "") +
            (stack ? `Stack:\n${stack}\n` : "") +
            (componentStack ? `Component stack:\n${componentStack}\n` : "") +
            (extra ? `Extra: ${JSON.stringify(extra)}\n` : "") +
            "====================================="
        );

        // sendBeacon requests don't wait for/read a response body, so keep
        // this response minimal and fast either way.
        return res.status(204).end();
    } catch (error) {
        // Logging must never itself become a source of 500s that then need
        // to be logged.
        console.error("Error while logging a client-side error report:", error);
        return res.status(204).end();
    }
};
