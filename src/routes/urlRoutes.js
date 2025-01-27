const express = require("express");
const router = express.Router();

const UrlControllers = require("../controllers/urlControllers");

// Redirect to long URL
router.get("/:shortUrl", UrlControllers.urlRedirect);

// Generate short URL
router.post("/data/shorten", UrlControllers.generateShortUrl);

module.exports = router;
