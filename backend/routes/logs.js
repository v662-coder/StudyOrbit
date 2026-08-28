const express = require("express");
const router = express.Router();

const { logClientError } = require("../controllers/logs");

// Intentionally unauthenticated - errors (including ones that happen before
// login, or because auth itself broke) all need to reach this endpoint.
router.post("/client-error", logClientError);

module.exports = router;
