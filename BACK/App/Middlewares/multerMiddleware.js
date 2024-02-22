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

// Fonction asynchrone pour gérer les téléchargements multiples
const handleMultipleFileUploads = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          console.error('Erreur de téléchargement des fichiers :', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
    next();
  } catch (error) {
    console.error(
      'Une erreur est survenue lors du traitement des fichiers :',
      error
    );
    // Gérer les erreurs de téléchargement ici
    res
      .status(500)
      .send('Une erreur est survenue lors du téléchargement des fichiers.');
  }
};

module.exports = handleMultipleFileUploads;
