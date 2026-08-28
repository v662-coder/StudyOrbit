const express = require("express");
const router = express.Router();

const { contactUsController } = require("../controllers/reach");

// BUGFIX: this route previously did not exist at all, so contact-form
// submissions from the frontend always 404'd. See controllers/reach.js.
router.post("/contact", contactUsController);

module.exports = router;
