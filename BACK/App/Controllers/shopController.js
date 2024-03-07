const {
  Product,
  Shop,
  Media,
  User,
  User_Order_Product,
} = require('../../Models');

const shopController = {
  // ne touche pas à showShop stp
  async showShop(req, res) {
    try {
      const user_id = req.user_id;

      console.log(user_id);
      // Trouver le shop associé à l'utilisateur connecté
      const shop = await Shop.findOne({
        where: {
          user_id: user_id,
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

      const user_id = req.user_id;

      // Add user_id to shopData
      shopData.user_id = user_id;
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
      const user_id = req.user_id;
      console.log(user_id);

      // trouver le shop associé au user
      const shop = await Shop.findOne({
        where: {
          user_id: user_id,
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
      const user_id = req.user_id;

      const ordersWithDetails = await User_Order_Product.findAll({
        where: { buyer_id: user_id },
        include: [
          {
            model: User,
            as: 'buyer',
            attributes: [
              'first_name',
              'last_name',
              'address',
              'phone',
              'city',
              'zip_code',
              'state',
              'country',
            ],
          },
          {
            model: Product,
            attributes: ['title', 'price', 'shipping_fees', 'shop_id'],
            include: [
              { model: User, as: 'seller', attributes: ['username', 'id'] },
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
  async sellerOrdersWithDetails(req, res) {
    try {
      const user_id = req.user_id;

      const soldProducts = await User_Order_Product.findAll({
        where: { seller_id: user_id },
        attributes: ['date', 'order_number', 'invoice', 'status', 'id'],
        include: [
          {
            model: Product,
            attributes: ['title', 'price'],
          },
          {
            model: User,
            attributes: [
              'first_name',
              'last_name',
              'address',
              'phone',
              'zip_code',
              'city',
              'state',
              'country',
            ],
            as: 'buyer',
          },
        ],
      });
      res.status(200).json({
        soldProducts,
      });
    } catch (error) {
      console.error('Failed to retrieve user sold products:', error);
      res.status(500).json({
        message: 'Failed to retrieve user sold products',
        error: error.message,
      });
    }
  },

  async uploadInvoiceInOrder(req, res) {
    try {
      const orderId = req.query.order_id || req.body.order_id;

      if (!req.file) {
        return res.status(400).send({ message: 'No invoice file uploaded.' });
      }

      const invoicePath = req.file.path; // Path where the uploaded file is saved

      // Update the order with the invoice file path using Sequelize
      // Assuming you have an Order model and an 'invoicePath' field in your orders table
      await User_Order_Product.update(
        { invoice: invoicePath },
        { where: { id: orderId } }
      );

      res.json({
        message: 'Invoice uploaded successfully.',
        invoice: invoicePath,
      });
    } catch (error) {
      console.error('Error uploading invoice:', error.message);
      res
        .status(500)
        .json({ error: 'An error occurred while uploading the invoice.' });
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
      const { productIds, sellerIds } = req.body;
      const user_id = req.user_id;
      const orders = await Promise.all(
        productIds.map(async (productId) => {
          try {
            const order = await User_Order_Product.create(
              {
                buyer_id: user_id,
                product_id: productId,
                seller_id: sellerIds[productIds.indexOf(productId)],
                date: new Date(),
                status: 'Paid',
                order_number: await orderNumber(),
              },
              {
                fields: [
                  'buyer_id',
                  'product_id',
                  'date',
                  'status',
                  'order_number',
                  'seller_id',
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
            return null;
          }
        })
      );
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
