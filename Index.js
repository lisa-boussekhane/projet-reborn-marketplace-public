require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const app = express();
const port = process.env.PORT;

app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Adopt a Reborn REST API is running on http://localhost:${port}`);
});