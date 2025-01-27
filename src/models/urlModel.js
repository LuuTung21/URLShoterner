const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Configurate the pool
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

class URLModel {
  // Initialize the urLTable within the database
  async initalizeTable() {
    try {
      const result = await pool.query(`
        CREATE TABLE urlTable (
        id INT AUTO_INCREMENT PRIMARY KEY,
        shortURL VARCHAR(255),
        longURL TEXT NOT NULL)
        `);
      return result;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new URLModel();
