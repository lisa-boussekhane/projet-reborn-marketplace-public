require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');

const express = require('express');
const router = require('./BACK/App/Router/router');

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(passport.initialize());
app.use(passport.session());
// https://www.npmjs.com/package/passport //

app.listen(port, () => {
  console.log(`Adopt a Reborn REST API is running on http://localhost:${port}`);
});
