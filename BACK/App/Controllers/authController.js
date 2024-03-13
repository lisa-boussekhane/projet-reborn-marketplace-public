const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const validator = require('validator');
const User = require('../../Models/user');
const verifyToken = require('../Middlewares/authMiddleware');
const { sendEmail } = require('./contactController');
const nodemailer = require('nodemailer');

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
      const { first_name, last_name, email, password, username } = req.body;

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
      const existingUser = await User.findOne({ where: { email: email } });

      if (existingUser) {
        // User already exists, send a message to the front-end
        return res.status(400).json({
          message: 'User with this email already has an account. Please login.',
        });
      }
      const newUser = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        username: username,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adoptareborn.contactus@gmail.com',
          pass: 'dxkv dkwr ykda olax',
        },
      });

      const mailOptions = {
        from: 'adoptareborn.contactus@gmail.com',
        to: email,
        subject: 'Welcome to the Adopt a Reborn Family !',
        text: `Dear ${username},\n\nWe are thrilled to welcome you to our community!
        \n\nYour decision to bring a reborn into your life is a journey we are so excited to be a part of.
        \n\nThank you for choosing Adopt a Reborn. We are honored to be a part of this special time in your life. If you have any questions or need assistance, please don't hesitate to reach out to us at adoptareborn.contactus@gmail.com.
        \n\nWelcome to the family!\n\nSell or buy your first reborn now !\n\nOn our site: http://localhost:5173/ 
        \n\nWarm regards,
        \n\nAdopt a Reborn team.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Erreur lors de l'envoi de l'e-mail:", error);
        } else {
          console.log('E-mail envoyé avec succès:', info.response);
        }
      });

      // Respond with the created user (excluding the password for security)
      res.status(201).json({
        user: { id: newUser.id },
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
          expiresIn: '2h',
        });
        return res.status(200).json({
          success: true,
          token,

          user: { id: user.id, email: user.email, role: user.role },
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
      const user_id = req.user_id;

      if (!user_id) {
        return res
          .status(404)
          .json({ message: `User with id ${user_id} not found.` });
      }

      const UserData = req.body;
      console.log('UserData :', UserData);

      if (UserData.date_of_birth === '' || UserData.date_of_birth === null) {
        delete UserData.date_of_birth; // ne pas inclure le champ dans la requête
      }

      if (UserData.duns === '' || UserData.duns === null) {
        delete UserData.duns; // ne pas inclure le champ dans la requête
      }

      // modifier l'utilisateur
      await User.update(UserData, { where: { id: user_id } });

      res.status(200).json({
        message: 'user updated successfully',
        UserData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occurred...' });
    }
  },

  async deleteAccount(req, res) {
    try {
      const user_id = req.user_id;
      const user = await User.findByPk(user_id);

      if (!user) {
        return res
          .status(404)
          .json({ message: `user with id ${user_id} not found.` });
      }

      await user.destroy();

      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },

  async updatePassword(req, res) {
    try {
      const { user_id, currentPassword, newPassword } = req.body;

      // Find the user by ID
      const user = await User.findByPk(user_id);
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

      // mettre à jour le mot de passe
      await User.update({ password: newPassword }, { where: { id: user_id } });

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
