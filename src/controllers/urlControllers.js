const UrlRepository = require("../repositories/urlRepositories");

class UrlController {
  // Generate short URL
  async generateShortUrl(req, res) {
    try {
      const { longUrl } = req.body;
      // Check if the long url is in the request body
      if (!longUrl) {
        return res.status(400).json({ error: "URL is required" });
      }

      UrlRepository.handleGenerateShortUrl(longUrl)
        .then((shortUrl) => {
          return res.status(201).json({ shortUrl });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    } catch (error) {
      return res.status(500).json({ error: "Unable to generate short URL" });
    }
  }

  //Redirect to the long URL
  async urlRedirect(req, res) {
    try {
      const { shortUrl } = req.params;
      // Check if short url is in the request params
      if (!shortUrl) {
        return res.status(400).json({ error: "Short URL is required" });
      }

      // Fetch the long URL based on the short URL
      UrlRepository.handleUrlRedirect(shortUrl)
        .then((longUrl) => {
          return res.status(201).json({ longUrl });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    } catch (error) {
      return res.status(500).json({ error: "Unable to redirect to long URL" });
    }
  }
}

module.exports = new UrlController();
