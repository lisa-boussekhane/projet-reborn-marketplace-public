const { Product, User } = require('../../App/Models');
const { sequelize } = require('../../App/Models'); // Import Sequelize instance

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
  }
};

module.exports = userController;
