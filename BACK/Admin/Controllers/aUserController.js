const { Product, User } = require('../../Models');
const { sequelize } = require('../../Models'); // Import Sequelize instance

const aUserController = {
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
  },

async updateUser(req, res) {
    try {
      const userId = req.params?.id || req.userId; // Get the user ID from URL parameters or request object
      const updates = req.body; // Assuming all updates are passed in the request body
  
      const [updatedRows] = await User.update(updates, {
        where: { id: userId },
        returning: true, // For PostgreSQL, returns the updated object
      });
  
      if (!updatedRows) {
        return res.status(404).json({ message: `User with id ${userId} not found.` });
      }
  
      const updatedUser = await User.findByPk(userId); // Fetch the updated user details
      return res.status(200).json(updatedUser); // Return the updated user details
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  },
  
};

module.exports = aUserController;
