const express = require("express");
const dotenv = require("dotenv");
const urlRoutes = require("./src/routes/urlRoutes");
const commands = require("./src/SQLCommands/commands");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

commands.createDatabase();

//Routes
app.use("/api/v1", urlRoutes);

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
