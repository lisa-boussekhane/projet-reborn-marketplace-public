const { user } = require('../Models/user');
const { product } = require('../Models/product');
const verifyToken = require('../Middlewares/authMiddleware');

const userController = {
  async getUserInfos(req, res) {
    try {
      const userId = req.params.id;
      const targetedUser = await user.findByPk(userId);

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

  async getOrdersReturns(req, res) {
    try {
      const userId = req.user.id;

      const userOrders = await user.findByPk(userId, {
        include: [
          {
            model: product,
            attributes: ['id', 'title', 'kit_name', 'price', 'created_at'],
          },
        ],
      });

      // accéder aux pdts qui sont associés à l'utilisateur
      const orders = userOrders.product;

      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  },
};

module.exports = userController;
