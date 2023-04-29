const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const entriesRoutes = require("./routes/entries");
const userRoutes = require("./routes/user");
const categoriesRoutes = require("./routes/categoryRouter");
const contractsRoutes = require("./routes/contractRouter");
//const { sequelize } = require("./modernDBConnection");

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// routes
app.use("/api/entries", entriesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/contracts", contractsRoutes);
module.exports = app;
