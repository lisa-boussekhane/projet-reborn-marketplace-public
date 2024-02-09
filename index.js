require('dotenv').config();

const express = require('express');
const router = require('./BACK/App/Router/router');

const app = express();
const port = process.env.PORT;

app.use(urlencoded({ extended: true}));
app.use(json());

app.use(router);

app.listen(port, () => {
  console.log(`Adopt a Reborn REST API is running on http://localhost:${port}`);
});