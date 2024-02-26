const { Product, Shop, Media, User, User_Order_Product,Detail_product} = require('../Models/');
const { sequelize } = require('../Models/index'); // Import Sequelize instance
const multer = require('multer');
const fs = require('fs');
const path = require('path');
//  JavaScript statements that import Node.js built-in modules fs and path, respectively. These modules provide utilities for file system operations and handling file paths, which are essential for many Node.js applications, especially those dealing with file manipulation and directory management.

const shopController = {
  // ne touche pas à showShop stp
async showShop(req, res) {
    try {
      const userId = req.params.id;
      console.log(userId);
      // Trouver le shop associé à l'utilisateur connecté
      const shop = await Shop.findOne({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Product,
            as: 'Products',
            include: [
              {
                model: Media,
                as: 'Media',
                attributes: ['photo'],
              },
            ],
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

      const userId = req.params.id;

      // Add user_id to shopData
      shopData.user_id = userId;
      // Create the shop record in the database
      const newShop = await Shop.create(shopData);

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
      const userId = req.params.id;
      console.log(userId);

      // trouver le shop associé au user
      const shop = await Shop.findOne({
        where: {
          user_id: userId,
        },
      });

      if (!shop) {
        return res.status(404).json({
          message: 'Shop not found',
        });
      }

      // Delete the shop from the database
      await shop.destroy();

      // Return a success response
      return res.status(200).json({
        message: 'Shop deleted successfully',
      });
    } catch (error) {
      // If there's an error during the deletion, return an error message
      return res.status(500).json({
        message: 'Failed to delete shop',
        error: error.message,
      });
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
            as: 'Seller',
            attributes: ['title', 'price', 'shipping_fees'],
            include: [
              {
                model: User,
                as: 'Creator',
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

async uploadInvoiceInOrder(req, res) {
  try {
    const orderId = req.query.order_id || req.body.order_id;

    if (!req.file) {
        return res.status(400).send({ message: "No invoice file uploaded." });
    }

    const invoicePath = req.file.path; // Path where the uploaded file is saved

    // Update the order with the invoice file path using Sequelize
    // Assuming you have an Order model and an 'invoicePath' field in your orders table
    await User_Order_Product.update({ invoice: invoicePath }, { where: { id: orderId } });

    res.json({ message: "Invoice uploaded successfully.", invoice: invoicePath });
} catch (error) {
    console.error('Error uploading invoice:', error.message);
    res.status(500).json({ error: "An error occurred while uploading the invoice." });
}
},

async createOrder(req, res) {
    try {
      const { userId, productIds } = req.body;
      console.log('user id', userId);
      console.log('product id', productIds);

      const orderNumbers = [];
      // Create a new entry in User_Order_Product
      const orders = await Promise.all(
        productIds.map(async (productId) => {
          // Create a new order for the current product
          const order = await User_Order_Product.create({
            user_id: userId,
            product_id: productId,
            date: new Date(),
            status: 'Paid',
          });
          console.log('Après la création de la commande', order);

          // marquer le produit comme "vendu" uniquement si la commande est réussie
          await Product.markAsSold(productId);

          return order.id.toString();
        })
      );
      orderNumbers.push(...orders);

      res.status(201).json({
        message: 'commande crée :',
        order_numbers: orderNumbers,
      });

      console.log('Order placed successfully:', orders);
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({
        message: 'Échec de la création de la commande',
        error: error.message,
        stack: error.stack, // Ajoutez la pile d'erreurs pour un débogage plus approfondi
      });
    }
  },
};

module.exports = shopController;
