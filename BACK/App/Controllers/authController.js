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
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new authUser({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  async logAccount(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authUser.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },
};

module.exports = authController;
