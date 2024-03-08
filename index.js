require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const multer = require('multer');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./BACK/Router/router');
const app = express();
const port = process.env.PORT;

app.use(express.static('/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Adopt a Reborn REST API is running on http://localhost:${port}`);
});
