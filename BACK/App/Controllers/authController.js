const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const validator = require('validator');
const User = require('../Models/user');
const verifyToken = require('../Middlewares/authMiddleware');
const { sendEmail } = require('./contactController');

const authController = {
  validatePassword(password) {
    try {
      return schema.validate(password);
    } catch (error) {
      // If there's an error, return an error message
      res.status(500).json({
        message: 'Non accepted password',
        error: error.message,
      });
    }
  },

  async createUserAccount(req, res) {
    // Create a password schema with password-validator
    const passwordSchema = new passwordValidator();
    passwordSchema
      .is()
      .min(8) // Minimum length 8 characters
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(2) // Must have at least 2 digits
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(['Passw0rd', 'Password123', '1234']); // Blocklist common passwords
    try {
      const { first_name, last_name, email, password } = req.body;

      // Validate the email
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          message: 'Invalid email address.',
        });
      }

      // Validate the password
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({
          message: 'Password does not meet the requirements.',
        });
      }

      const newUser = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      });

      // Respond with the created user (excluding the password for security)
      res.status(201).json({
        id: newUser.id,
      });
    } catch (error) {
      console.error('Account creation failed:', error);
      res.status(500).json({ message: 'Failed to create account' });
    }
  },

  async logAccount(req, res) {
    try {
      const { email, password } = req.body;
      console.log('Email reçu :', email);

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Nom d'utilisateur et mot de passe requis" });
      }

      const user = await User.findOne({ where: { email: email } });
      console.log('Utilisateur trouvé dans la base de données :', user);

      if (user && user.validPassword(password)) {
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET, {
          expiresIn: '1h',
        });
        return res.status(200).json({
          success: true,
          token,
          user: { id: user.id, password: user.password, email: user.email },
        });
      }
      console.log('Utilisateur non trouvé');

      return res.status(401).json({ message: 'Identifiants invalides' });
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      return res
        .status(500)
        .json({ message: "Erreur lors de l'authentification" });
    }
  },

  async updateAccount(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: `user with id ${userId} not found.` });
      }

      const { name } = req.body;

      if (name !== undefined && name === '') {
        return res
          .status(400)
          .json({ message: 'name should not be an empty string' });
      }

      if (name === undefined && !name) {
        return res
          .status(400)
          .json({ message: 'you should provide at least a name' });
      }

      if (name) {
        user.first_name = name;
      }

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
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
};

module.exports = authController;
