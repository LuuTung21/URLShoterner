const express = require("express");
const router = express.Router();
const cacheMiddleware = require("../middlewares/cacheMiddleware");
const UrlControllers = require("../controllers/urlControllers");

// Redirect to long URL
router.get("/:shortUrl", cacheMiddleware(300), UrlControllers.urlRedirect);

// Generate short URL
router.post("/data/shorten", UrlControllers.generateShortUrl);

module.exports = router;
