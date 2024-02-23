const { Product, Shop, Media, User, User_order_product } = require('../Models/');
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

async getAllUserOrdersWithDetails() {
    try {
      // Fetch all entries from the User_Order_Product join table
      // Include related user and product information, especially focusing on price and shipping fees from the product
      const ordersWithDetails = await User_Order_Product.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'last_name', 'email'], // Customize as needed
          },
          {
            model: Product,
            attributes: ['id', 'title', 'price', 'shipping_fees'], // Ensure 'price' and 'shipping_fees' are included
          },
        ],
      });
  
      // Assuming the 'price' and 'shipping_fees' are directly on the Product model as per your schema
      return ordersWithDetails;
    } catch (error) {
      console.error('Failed to retrieve user orders with details:', error);
      throw error;
    }
  },

async uploadInvoice(req, res) {
    try {
      // Set up Multer storage
      const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          // Define the directory where the invoices will be saved
          const invoicesDir = path.join(__dirname, '/invoices');
          if (!fs.existsSync(invoicesDir)){
            fs.mkdirSync(invoicesDir, { recursive: true });
          }
          cb(null, invoicesDir);
        },
        filename: function(req, file, cb) {
          // Generate a unique filename for the invoice
          cb(null, `invoice-${Date.now()}${path.extname(file.originalname)}`);
        }
      });
      
      // Multer upload setup for PDF files only
      const upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb) {
          if (path.extname(file.originalname) !== '.pdf') {
            return cb(new Error('Only PDF files are allowed!'));
          }
          cb(null, true);
        }
      }).single('invoice'); // 'invoice' is the name of the file input field

      // Process the file upload with Multer
      upload(req, res, async (err) => {
        if (err) {
          // Handle errors related to file uploading
          return res.status(400).json({ error: err.message });
        }
  
        if (!req.file) {
          // If no file was uploaded
          return res.status(400).json({ error: 'Please upload a PDF invoice.' });
        }
  
        // Check for user and shop existence
        const userId = req.params.id;
        const theUser = await User.findByPk(userId);
        if (!theUser) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        const usershop = await Shop.findOne({ where: { user_id: userId } });
        if (!usershop) {
          return res.status(404).json({ error: 'Shop not found' });
        }
  
        // Here you can proceed with your database operations, e.g., saving the invoice information
  
        // Respond with success message
        res.status(201).json({
          message: 'Invoice uploaded successfully',
          filePath: req.file.path
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to upload invoice',
        error: error.message,
      });
    }
  }  
};

module.exports = shopController;
