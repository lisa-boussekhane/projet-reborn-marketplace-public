const nodemailer = require('nodemailer');

const contactus = {
  async sendEmail(req, res) {
    const { name, email, message } = req.body;

    // configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'adoptareborn.contactus@gmail.com',
        pass: 'dxkv dkwr ykda olax ',
      },
    });

    const contenuEmail = `
      De: ${name}
      Adresse e-mail: ${email}
      Message:
      ${message}
    `;

    const optionsMessage = {
      from: email,
      to: 'adoptareborn.contactus@gmail.com',
      subject: 'Nouveau message de contact',
      text: contenuEmail,
    };

    try {
      // Utiliser la méthode sendMail du transporteur
      const info = await transporter.sendMail(optionsMessage);

      console.log('Courriel envoyé :', info.response);
      res.status(200).json({ message: 'Courriel envoyé avec succès.' });
    } catch (erreur) {
      console.error(erreur);
      res.status(500).json({ erreur: "Erreur lors de l'envoi du courriel." });
    }
  },
};

module.exports = contactus;
