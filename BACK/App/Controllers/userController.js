const { Product, User } = require('../../Models');

const nodemailer = require('nodemailer');
const { sequelize } = require('../../Models/index'); // Import Sequelize instance


const userController = {
  async getUserInfos(req, res) {
    try {
      const user_id = req.user_id;
      const targetedUser = await User.findByPk(user_id);

      if (!targetedUser) {
        return res
          .status(404)
          .json({ message: `user with id ${user_id} not found.` });
      }

      return res.status(200).json({ targetedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  },

  async requestNewPassword(req, res) {

    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      // Créer token unique (jwt ou autre(chaine de caractères))
      // Rajouter  un champ (dans la table) token associé au user
      // Stocker ce token dans ce champ
      // Dynamiser url htmlContent

      const passwordToken = Math.random().toString(36).slice(-8);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adoptareborn.contactus@gmail.com',
          pass: 'dxkv dkwr ykda olax ',
        },
      });
      const htmlContent = `<a href='http://localhost:5173/resetpassword/${passwordToken}'> generate new password</a>`;

      // Send mail with defined transport object
      const mailOptions = await transporter.sendMail({
        from: 'adoptareborn.contactus@gmail.com',
        to: email,

        subject: 'New password request',

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
