require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const bodyParser = require('body-parser');

const routerAdmin = require('./BACK/Admin/Router/routerAdmin');
const app = express();
const port = process.env.PORT;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.static('/public'));
// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.json());
app.use(routerAdmin);

app.listen(port, () => {
  console.log(`Back Office AAR REST API is running on http://localhost:${port}`);
});