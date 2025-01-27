const mysql = require("mysql2");
const dotenv = require("dotenv");
const URLModel = require("../models/urlModel");

dotenv.config();

// 2 external packages for base 62
const base62 = require("base-62");
const crypto = require("crypto");

// Configurate the pool
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

// Defining the Commands Class
class sqlCommands {
  // Generate the hashed shortURL
  hashValueGenerate(longUrl) {
    // Generate short ID for long URL based on 62-base conversion method
    const hash = crypto.createHash("sha256").update(longUrl).digest("hex");
    const shortHash = hash.slice(0, 8);
    const decimal = parseInt(shortHash, 16);

    const shortID = base62.encode(decimal);

    // Generate short URL
    const shortUrl = "www.tinyUrl.com/" + shortID;

    return shortUrl;
  }

  // Create a new database
  async createDatabase() {
    try {
      await pool.query(`
            CREATE DATABASE URLShortener;
            `);
      await URLModel.initalizeTable();
      // No need to return anything here
    } catch (error) {
      // Check if the error is due to database already existing
      if (error.code === "ER_DB_CREATE_EXISTS") {
        return; // Return nothing if database already exists
      } else {
        throw error; // Re-throw the error for other cases
      }
    }
  }

  // Retrieve the newly created shortURL
  async retrieveUrlById(id) {
    const [result] = await pool.query(
      `
      SELECT shortURL, longURL 
      FROM urlTable
      WHERE id = ?;
      `,
      [id]
    );

    return result[0];
  }

  // Check whether the longURL is already existed
  async findLongUrl(longURL) {
    await pool.query("USE URLShortener");
    const [result] = await pool.query(
      `
      SELECT shortURL 
      FROM urltable
      WHERE longURL = ?;
      `,
      [longURL]
    );

    return result[0];
  }

  // Redirect shortURL to longURL
  async urlRedirect(shortURL) {
    await pool.query("USE URLShortener");
    const convertedShortURL = "www.tinyUrl.com/" + shortURL;
    const [result] = await pool.query(
      `
      SELECT longURL 
      FROM urlTable
      WHERE shortURL = ?;
      `,
      [convertedShortURL]
    );
    return result[0];
  }

  // Generate new shortURL
  async generateShortURL(hashedURL, longURL) {
    await pool.query("USE URLShortener");

    const result = await pool.query(
      `
      INSERT INTO urlTable (shortURL, longURL)
      VALUES (?, ?);
      `,
      [hashedURL, longURL]
    );

    const id = result[0].insertId;
    return this.retrieveUrlById(id);
  }
}

module.exports = new sqlCommands();
