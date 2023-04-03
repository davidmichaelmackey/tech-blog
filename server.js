// importing node.js module path, providing utilities for working with file and directory paths
const path = require("path");

// importing node.js module express, a web application framework for Node.js
const express = require("express");

// middleware for handling multipart/form-data, which is primarily used for uploading files
const session = require("express-session");

// importing node.js module handlebars, a template engine for Node.js
const exphbs = require("express-handlebars");

// importing routes from controllers folder
const routes = require("./controllers");

// importing helpers from utils folder
const helpers = require("./utils/helpers");

// importing sequelize connection from config folder
const sequelize = require("./config/connection");

// importing connect-session-sequelize, a session store for Express and Connect based on Sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// creating an instance of express
const app = express();

// setting the port to 3001
const PORT = process.env.PORT || 3001;

// creating a handlebars instance with custom helpers
const hbs = exphbs.create({ helpers });

// creating a session with a secret, resave, saveUninitialized, and store
const sess = {
  secret: "Super duper secret WOW",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// using the session
app.use(session(sess));

// setting the view engine to handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// using express.json and express.urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using express.static to serve static files
app.use(express.static(path.join(__dirname, "public")));

// using routes
app.use(routes);

// syncing sequelize models to the database, then starting the express.js server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});