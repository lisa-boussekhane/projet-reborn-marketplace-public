require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const multer = require('multer');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const router = require('./BACK/Router/router');
const app = express();
const port = process.env.PORT;

// app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.static('/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(router);
app.use(passport.initialize());
app.use(passport.session());
// https://www.npmjs.com/package/passport //

app.listen(port, () => {
  console.log(`Adopt a Reborn REST API is running on http://localhost:${port}`);
});
