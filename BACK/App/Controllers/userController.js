const { Product, User } = require('../../Models');
const bcrypt = require('bcrypt');
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
      // Créer token unique (jwt ou autre(chaine de caractères)) ok
      // Rajouter  un champ (dans la table) token associé au user null défaut ok
      // Stocker ce token dans ce champ
      // Dynamiser url htmlContent ok
      const user_id = user.id.toString();
      const randomString = Math.random().toString(36).slice(-8);
      const password_token = user_id + randomString;

      // Update user with the generated token
      await User.update({ password_token }, { where: { id: user.id } });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adoptareborn.contactus@gmail.com',
          pass: 'dxkv dkwr ykda olax',
        },
      });

      const htmlContent = `<a href='http://localhost:5173/resetpassword/${password_token}'> generate new password</a>`;

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

  async resetPassword(req, res) {
    try {
      const { newPassword } = req.body;
      const { token } = req.params; // Correct way to extract token
      const user_id = parseInt(token, 10);

      console.log('Token:', token);
      console.log('New password', newPassword);

      const user = await User.findOne({
        where: { id: user_id, password_token: token },
      });

      // Check if the token is valid
      if (user) {
        // Update password and reset the token
        await User.update(
          { password: newPassword, password_token: null },
          { where: { id: user_id } }
        );

        res.status(200).json({ message: 'Password reset successfully' });
      } else {
        res.status(401).json({ message: 'Invalid token or user provided' });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Failed to reset password' });
    }
  },
};

module.exports = userController;
