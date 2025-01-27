const commands = require("../SQLCommands/commands");

class URLRepository {
  async handleUrlRedirect(shortUrl) {
    // Find the short URL in the database
    const result = await commands.urlRedirect(shortUrl);
    if (!result) {
      throw new Error("Short URL not found");
    }
    return result.longURL;
  }

  async handleGenerateShortUrl(longUrl) {
    const url = await commands.findLongUrl(longUrl);

    // Check if the url is already inside the database
    if (url) {
      return url.shortURL;
    } else {
      const shortUrl = commands.hashValueGenerate(longUrl);

      // Insert the short url into the database
      const result = await commands.generateShortURL(shortUrl, longUrl);
      return result;
    }
  }
}

module.exports = new URLRepository();
