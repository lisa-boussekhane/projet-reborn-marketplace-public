const {
  Product,
  User,
  Detail_product,
  Media,
  Shop,
  User_Order_Product,
} = require('../../Models');
const { sequelize } = require('../../Models'); // Import Sequelize instance

const aShopController = {
  async getAllShops(req, res) {
    try {
      const shops = await Shop.findAll();

      if (!shops || shops.length === 0) {
        return res.status(404).json({ message: 'No shops found' });
      }

      res.status(200).json(shops);
    } catch (error) {
      console.error('Failed to retrieve shops:', error);
      res.status(500).json({
        message: 'Failed to retrieve shop details',
        error: error.message,
      });
    }
  },

  async updateShop(req, res) {
    const shopId = req.params.id;

    try {
      const shop = await Shop.findByPk(shopId);
      if (!shop) {
        return res
          .status(404)
          .json({ error: 'Shop not found or does not belong to the user' });
      }

      // Prepare the data to be updated from request body
      const updateData = { ...req.body };

      // Update the shop with new data
      await Shop.update(updateData, { where: { id: shopId } });

      // Retrieve the updated shop details
      const updatedShop = await Shop.findByPk(shopId);

      // Respond with the updated shop details
      return res.status(200).json(updatedShop);
    } catch (error) {
      console.error('Error updating shop:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteShop(req, res) {
    const shopId = req.body.id;

    try {
      const shop = await Shop.findByPk(shopId);

      if (!shop) {
        return res
          .status(404)
          .json({ message: `product with id ${shopId} not found.` });
      }
      // Delete the shop
      await shop.destroy();

      return res.status(200).json({ message: 'Shop deleted successfully' });
    } catch (error) {
      console.error('Error deleting shop:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getAllUserOrdersWithDetails(req, res) {
    try {
      const orders = await User_Order_Product.findAll({
        include: [
          {
            model: User,
            as: 'buyer',
            attributes: [
              'id',
              'first_name',
              'last_name',
              'address',
              'phone',
              'city',
              'zip_code',
              'state',
            ],
          },
          {
            model: Product,
            attributes: ['title', 'price', 'shipping_fees'],
            include: [
              { model: User, as: 'seller', attributes: ['username', 'id'] },
            ],
          },
        ],
        attributes: ['status', 'id', 'date', 'order_number', 'invoice'],
      });

      res.status(200).json({
        orders,
      });
    } catch (error) {
      console.error('Failed to retrieve user orders with details:', error);
      res.status(500).json({
        message: 'Failed to create order',
        error: error.message,
      });
    }
  },
};

module.exports = aShopController;
