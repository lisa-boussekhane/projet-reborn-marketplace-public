const express = require('express');
const multer = require('multer');

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).array('photo', 12);


module.exports = storage;
