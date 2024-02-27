const { Product, User } = require('../../Models');
const { sequelize } = require('../../Models/index'); // Import Sequelize instance
const nodemailer = require('nodemailer');

const userController = {
  async getUserInfos(req, res) {
    try {
      const userId = req.params?.id || req.userId;
      const targetedUser = await User.findByPk(userId);

      if (!targetedUser) {
        return res
          .status(404)
          .json({ message: `user with id ${userId} not found.` });
      }

      return res.status(200).json({ targetedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  },

  async requestNewPassword(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    // Créer token unique (jwt ou autre(chaine de caractères))
    // Rajouter  un champ (dans la table) token associé au user
    // Stocker ce token dans ce champ
    // Dynamiser url htmlContent

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'adoptareborn.contactus@gmail.com',
        pass: 'dxkv dkwr ykda olax ',
      },
    });

    try {
      const htmlContent = `<a href=''> generate new password</a>`;
      // Send mail with defined transport object
      const mailOptions = await transporter.sendMail({
        from: 'adoptareborn.contactus@gmail.com',
        to: email,
        subject: 'new password request',
        html: htmlContent,
      });

      console.log('Link sent:', mailOptions.messageId);
      res.status(200).json({ message: 'Link sent successfully' });
    } catch (error) {
      console.error('Error sending link:', error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  },
};

module.exports = userController;
