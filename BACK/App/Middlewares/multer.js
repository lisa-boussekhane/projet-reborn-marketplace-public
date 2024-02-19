const express = require('express');
const multer = require('multer');

const app = express();
const path = require('path');

const router = express.Router();

app.set('view engine', 'ejs');

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/upload/create', upload.single('image'), (req, res, next) => {
  // req.file is the `myFile` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  res.send('Images uploaded successfully!');
});

module.exports = router;
