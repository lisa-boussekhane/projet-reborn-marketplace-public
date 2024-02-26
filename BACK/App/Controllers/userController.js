const { Product, User } = require('../Models/');
const { sequelize } = require('../Models/index'); // Import Sequelize instance

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
};

module.exports = userController;
