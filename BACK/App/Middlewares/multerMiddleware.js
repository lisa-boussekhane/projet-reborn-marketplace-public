const express = require('express');
const multer = require('multer');
const path = require('path');

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadInvoice = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname) !== '.pdf') {
      return cb(new Error('Only PDF files are allowed!'));
    }
    cb(null, true);
  },
});

const uploadPhotoVideo = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only photos (JPEG, PNG) and videos (MP4, MPEG) are allowed!'));
    }
    cb(null, true);
  },
});

module.exports = { upload, uploadInvoice, uploadPhotoVideo };
