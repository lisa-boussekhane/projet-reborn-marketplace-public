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

const app = express();
const port = process.env.PORT;

app.use(express.static('/public'));
app.use(
  cors({
    origin: ['https://adoptareborn.com', 'https://www.adoptareborn.com'],
  })
);

console.log(process.env.REACT_APP_API_URL);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, '127.0.0.1', () => {
  console.log(`Adopt a Reborn REST API is running on http://localhost:${port}`);
});
