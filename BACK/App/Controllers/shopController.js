const shop = require('../Models/shop');
const product = require('../Models/product');
const { sequelize } = require('../Models/index'); // Import Sequelize instance

const shopController = {
  async showShop(req, res) {
    try {
      // Extract shop ID from request parameters
      const { shopId } = req.params.id;

      // Find the shop by ID and include its products
      const shop = await shop.findByPk(shopId, {
        include: [
          {
            model: product,
            as: 'products', // Use the correct association alias
          },
        ],
      });

      if (!shop) {
        // If the shop is not found, return a 404 response
        return res.status(404).json({
          message: 'Shop not found',
        });
      }

      // If the shop is found, return it along with its products
      res.status(200).json(shop);
    } catch (error) {
      // If there's an error, respond with a 500 status code and the error message
      res.status(500).json({
        message: 'Error retrieving shop details',
        error: error.message,
      });
    }
  },

  async createShop(req, res) {
    try {
      // Extract shop data from request body
      const shopData = req.body;

      // Optionally, validate the shopData here (or use middleware for validation)

      // Create the shop record in the database
      const newShop = await shop.create(shopData);

      // If the shop is successfully created, return the new shop data
      res.status(201).json({
        message: 'Shop created successfully',
        shop: newShop,
      });
    } catch (error) {
      // If there's an error during the creation, return an error message
      res.status(500).json({
        message: 'Failed to create shop',
        error: error.message,
      });
    }
  },

  async deleteShop(req, res) {
    try {
      // Extract shop ID from request parameters
      const { shopId } = req.params;

      // Find the shop by its ID
      const shop = await shop.findByPk(shopId);

      // If the shop doesn't exist, return a 404 Not Found response
      if (!shop) {
        return res.status(404).json({
          message: 'Shop not found',
        });
      }

      // Delete the shop from the database
      await shop.destroy({
        where: {
          id: shopId,
        },
      });

      // Return a success response
      res.status(200).json({
        message: 'Shop deleted successfully',
      });
    } catch (error) {
      // If there's an error during the deletion, return an error message
      res.status(500).json({
        message: 'Failed to delete shop',
        error: error.message,
      });
    }
  },
};

module.exports = shopController;
