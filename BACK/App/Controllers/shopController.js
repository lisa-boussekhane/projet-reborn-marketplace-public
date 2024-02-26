
const {
  Product,
  Shop,
  Media,
  User,
  User_Order_Product,
} = require('../../Models');


const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../../Models/index'); // Import Sequelize instance
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
            attributes: [
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
    const orderNumber = async () => {
      const getRandomDigit = () => Math.floor(Math.random() * 10).toString();

      const newOrderNumber = Array.from({ length: 5 }, getRandomDigit).join('');

      const existingOrder = await User_Order_Product.findOne({
        where: { order_number: newOrderNumber },
      });

      if (existingOrder) {
        return orderNumber();
      }

      return newOrderNumber;
    };

    try {
      const { userId, productIds } = req.body;
      console.log('user id', userId);
      console.log('product ids', productIds);

      // Create a new entry in User_Order_Product
      const orders = await Promise.all(
        productIds.map(async (productId) => {
          try {
            // Create a new order for the current product
            const order = await User_Order_Product.create(
              {
                user_id: userId,
                product_id: productId,
                date: new Date(),
                status: 'Paid',
                order_number: await orderNumber(),
              },
              {
                fields: [
                  'user_id',
                  'product_id',
                  'date',
                  'status',
                  'order_number',
                ],
              }
            );

            console.log('Order created successfully:', order);

            // marquer le produit comme "vendu" uniquement si la commande est réussie
            await Product.markAsSold(productId);
            console.log('Product marked as sold:', productId);
            return order.order_number;
          } catch (error) {
            console.error('Error placing order:', error);
            return null; // or handle the error in a way that makes sense for your application
          }
        })
      );

      // Filter out null values from orders array
      const validOrders = orders.filter((order) => order !== null);

      res.status(201).json({
        message: 'Commande créée :',
        order_numbers: validOrders,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({
        message: 'Échec de la création de la commande',
        error: error.message,
      });
    }
  },
};

module.exports = shopController;
