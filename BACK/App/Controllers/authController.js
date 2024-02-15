const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authUser = require('../Models/user');
const verifyToken = require('../Middlewares/authMiddleware');

const authController = {
  async updateAccount(req, res) {
    try {
      const userId = req.params.id;
      const user = await authUser.findByPk(userId);

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
      const user = await authUser.findByPk(userId);

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

  async createUserAccount(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      // Vérification des champs requis
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Mot de passe haché :', hashedPassword);
      const user = await authUser.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });
      await user.save();

      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);

      res.status(500).json({ error: `L'inscription a échoué` });
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

      const user = await authUser.findOne({ where: { email: email } });
      console.log('Utilisateur trouvé dans la base de données :', user);

      if (user) {
        console.log('Mot de passe correct');
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET, {
          expiresIn: '1h',
        });
        return res.status(200).json({ token });
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
};

module.exports = authController;
