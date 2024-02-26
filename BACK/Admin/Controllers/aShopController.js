<<<<<<< HEAD:BACK/Admin/Controllers/aShopController.js
const { Product, User, Detail_product, Media, Shop, User_Order_Product } = require('../../Models');
const { sequelize } = require('../../Models'); // Import Sequelize instance

const aShopController = {
async getOneShop(req, res) {
=======
const {
  Product,
  User,
  Detail_product,
  Media,
  Shop,
  User_Order_Product,
} = require('../../App/Models');
const { sequelize } = require('../../App/Models'); // Import Sequelize instance

const shopController = {
  async getOneShop(req, res) {
>>>>>>> 0a1f0ba55da3a54fef1993d1174cdfbcff775a3b:BACK/Admin/Controllers/shopController.js
    try {
      const shopId = req.params.id;
      const shop = await Shop.findByPk(shopId, {
        include: [
          {
            model: Product,
            as: 'Products',
            include: [
              {
                model: Detail_product,
                as: 'Detail Product',
              },
              {
                model: Media,
                as: 'Medias',
              },
            ],
          },
          {
            model: User,
            as: 'Creator',
            attributes: ['id', 'first_name', 'last_name', 'email'],
          },
        ],
      });

      if (!shop) {
        return res.status(404).json({ message: 'Shop not found' });
      }

      res.status(200).json(shop);
    } catch (error) {
      console.error('Failed to retrieve shop:', error);
      res.status(500).json({
        message: 'Failed to retrieve shop details',
        error: error.message,
      });
    }
  },

  async getAllShops(req, res) {
    try {
      const shops = await Shop.findAll({
        include: [
          {
            model: Product,
            as: 'Products',
            include: [
              {
                model: Detail_product,
                as: 'Detail Product',
              },
              {
                model: Media,
                as: 'Medias',
              },
            ],
          },
          {
            model: User,
            as: 'Creator',
            attributes: ['id', 'first_name', 'last_name', 'email'],
          },
        ],
      });

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

  async createShop(req, res) {
    const userId = req.params.id;
    try {
      // First, verify the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Prepare the shop data from request body
      const shopData = {
        user_id: userId,
        ...req.body,
      };

      // Create the shop associated with the user
      const newShop = await Shop.create(shopData);

      // Respond with the newly created shop details
      return res.status(201).json(newShop);
    } catch (error) {
      console.error('Error creating shop:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateShop(req, res) {
    const shopId = req.params.id; // Assuming the shop ID is passed as a URL parameter
    const userId = req.userId; // Assuming userId is available from authenticated user

    try {
      // Verify the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify the shop exists and belongs to the user
      const shop = await Shop.findOne({
        where: { id: shopId, user_id: userId },
      });
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
    const shopId = req.params.id; // Assuming the shop ID is passed as a URL parameter
    const userId = req.userId; // Assuming userId is available from authenticated user

    try {
      // Verify the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify the shop exists and belongs to the user
      const shop = await Shop.findOne({
        where: { id: shopId, user_id: userId },
      });
      if (!shop) {
        return res
          .status(404)
          .json({ error: 'Shop not found or does not belong to the user' });
      }

      // Delete the shop
      await Shop.destroy({ where: { id: shopId } });

      // Respond with success message
      return res.status(200).json({ message: 'Shop deleted successfully' });
    } catch (error) {
      console.error('Error deleting shop:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getAllUserOrdersWithDetails(req, res) {
    try {
      const userId = req.params.id;

      const ordersWithDetails = await User_Order_Product.findAll({
        where: { user_id: userId },
        include: [
          {
            model: User,
            as: 'Buyer',
            attributes: ['first_name', 'last_name', 'address', 'phone'],
          },
          {
            model: Product,
            as: 'Product',
            attributes: ['title', 'price', 'shipping_fees'],
            include: [
              {
                model: User,
                as: 'Seller',
                attributes: ['username'],
              },
            ],
          },
        ],
        attributes: ['status', 'id', 'date', 'order_number', 'invoice'],
      });

      res.status(200).json({
        ordersWithDetails,
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
