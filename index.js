require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = require('./BACK/App/Router/router');

const app = express();
const port = process.env.PORT;

// const authRoutes = require('./BACK/App/Controllers/authController');
// const protectedRoute = require('./BACK/App/Router/router');
// app.use(express.json());
// app.use('/router', authRoutes);
// app.use('/protected', protectedRoute);
app.use(cors());

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
