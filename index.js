require('dotenv').config();
const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = require('./BACK/App/Router/router');
const path = require('path');
const multer = require('multer');

const app = express();
const port = process.env.PORT;

// const authRoutes = require('./BACK/App/Controllers/authController');
// const protectedRoute = require('./BACK/App/Router/router');
// app.use(express.json());
// app.use('/router', authRoutes);
// app.use('/protected', protectedRoute);

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/sellmyreborn', upload.single('image'), (req, res) => {
  res.send('Image uploaded');
});

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
