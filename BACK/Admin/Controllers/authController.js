const express = require('express');
const passwordValidator = require('password-validator');
const validator = require('validator');
const User = require('../../App/Models/user');
const { sendEmail } = require('../../App/Controllers/contactController');

const authController = {
  async requestPasswordReset(req, res) {
    try {
      // check if user's email exists
      const { userId, email } = req.body;
      const user = await User.findOne({ where: { userId, email } });

      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
        expiresIn: '1h',
      });

      // Send reset link to user
      const resetLink = `http://localhost:3000/resetrequest?token=${token}`;
      const emailContent = `<p>Please click <a href='${resetLink}'>here</a> to reset your password.</p>`;
      await sendEmail(email, 'Password Reset Request', emailContent);
      return res
        .status(200)
        .json({ message: 'Reset link sent successfully', token });
    } catch (error) {
      console.error('Cannot reset password :', error);
      return res.status(500).json({ message: 'Cannot reset password' });
    }
  },

  async updatePassword(req, res) {
    try {
      const { userId, currentPassword, newPassword } = req.body;

      // Find the user by ID
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verify the current password
      const isMatch = user.validPassword(currentPassword);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Current password is incorrect' });
      }

      // Update the user's password
      await User.update({ password: newPassword });

      // Return a success response
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      // If there's an error, return an error message
      res.status(500).json({
        message: 'Failed to update password',
        error: error.message,
      });
    }
  },

  async deleteAccount(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: `user with id ${userId} not found.` });
      }

      await user.destroy();

      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },
};

module.exports = authController;
