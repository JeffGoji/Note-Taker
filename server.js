const path = require("path");
//API Routes:
// const apiRoutes = require("./apiRoutes");
// const htmlRoutes = require("./htmlRoutes");

//Installed NPM Dependencies:
const express = require("express");
const router = express.Router();
const nodemon = require("nodemon");
const { Server } = require("tls");

//Express app:
const app = express();

//This is needed for Heroku:
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

//Middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API and HTML routes:
app.use(require("./apiRoutes"));

app.use(require("./htmlRoutes"));

// Access files in "public" folder
app.use(express.static(path.join(`${__dirname}/public`)));
