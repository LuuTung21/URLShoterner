const express = require("express");
const dotenv = require("dotenv");
const urlRoutes = require("./src/routes/urlRoutes");
const commands = require("./src/SQLCommands/commands");
const rateLimit = require("express-rate-limit");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Configure the rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  keyGenerator: (req) => {
    return req.ip; // Use the IP address as the key
  },
  message: "Too many requests from this IP, please try again later.", // Optional message
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(express.json());

// Initialize the database
commands.createDatabase();

// Routes
app.use("/api/v1", urlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
