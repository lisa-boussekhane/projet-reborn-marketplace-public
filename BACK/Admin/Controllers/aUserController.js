const { Product, User } = require('../../Models');
const { sequelize } = require('../../Models'); // Import Sequelize instance

const aUserController = {
  async getAllUsers(req, res) {
    try {
      // Fetch all users from the database
      const users = await User.findAll();

      // If there are no users found, return an appropriate message
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found.' });
      }

      // Return the list of users
      return res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updates = req.body;

      // Vérifiez si l'objet d'updates est vide
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No fields to update.' });
      }

      const [updatedRows] = await User.update(updates, {
        where: { id: userId },
        returning: true,
      });

      if (!updatedRows[0]) {
        return res
          .status(404)
          .json({ message: `User with id ${userId} not found.` });
      }

      const updatedUser = await User.findByPk(userId);
      return res.status(200).json('user update', updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.body.id;
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

module.exports = aUserController;
