require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const multer = require('multer');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./BACK/Router/router');
const bodySanitizer = require('./BACK/App/Middlewares/bodySanitizer');
const app = express();
const session = require('express-session');
const Sequelize = require('sequelize');
// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const expressSessionSecret = process.env.EXPRESS_SESSION_SECRET;
const dbPort = process.env.DB_PORT;

app.use(express.static('/public'));
app.use(
  cors({
    origin: ['*']
    //['https://adoptareborn.com', 'https://www.adoptareborn.com'],
  })
);

// create database, 'postgresql' in your package.json
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: host, // L'adresse du serveur de base de données
  dialect: 'postgres', // Indique que vous utilisez PostgreSQL comme système de gestion de base de données
  port: dbPort, // Le port
});

app.use(
  session({
    secret: expressSessionSecret,
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // Determines whether the session should be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false, // Controls whether a new session that has not been modified (i.e., no data added to the session object) should be saved to the store.
    //This reduces the load on the database.
    proxy: true, // SSL outside of node
  })
);


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodySanitizer);
app.use(router);

app.listen(port, '127.0.0.1', () => {
  console.log(`Adopt a Reborn REST API is running on http://localhost:${port}`);
});

