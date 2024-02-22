const { Product, Detail_product, Media, User, Shop } = require('../Models/');

const productController = {
  async getProductPage(req, res) {
    try {
      // Extract the product ID from the request parameters
      const productId = req.params.id;
      console.log(productId);

      // Fetch the product from the database, including its detail_product and media
      const product = await Product.findByPk(productId, {
        include: [
          {
            model: Detail_product,
            as: 'Detail_product',
          },
          {
            model: Media,
            as: 'Media',
            attributes: ['photo'],
          },
          {
            model: User,
            as: 'Users',
          },
        ],
      });

      if (!product) {
        // If the product is not found, return a 404 Not Found response
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      // If the product is found, return it along with its detailed information and media
      res.status(200).json(product);
    } catch (error) {
      // If there's an error, respond with a 500 status code and the error message
      res.status(500).json({
        message: 'Failed to retrieve product details',
        error: error.message,
      });
    }
  },

async createProduct(req, res) {
    const randomId = () => {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x100000).toString(16);
        };
        return s4();
    };

    try {
        // Handle file upload first
        await new Promise((resolve, reject) => {
            upload.array('myFiles', 12)(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        
        console.log(req.files); // Log uploaded files

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

        // Assume req.body could be JSON strings, parse
        const productData = JSON.parse(req.body.productData || '{}');
        const detailProductData = JSON.parse(req.body.detailProductData || '{}');

        // Extend productData with user and shop IDs, and generate a unique ID
        Object.assign(productData, {
            user_id: userId,
            shop_id: usershop.id,
            unique_id: unique.id(),
        });

        // Create product and detailProduct in the database
        const product = await Product.create(productData);
        Object.assign(detailProductData, { product_id: product.id });
        const detailProduct = await Detail_product.create(detailProductData);

        // Process uploaded files for media creation
        const mediaData = req.files.map(file => ({
            product_id: product.id,
            photo: file.path, // Assuming file.path is available and correct
        }));

        const media = await Promise.all(mediaData.map(mediaItem => Media.create(mediaItem)));

        // Respond with created product and media
        res.status(201).json({
            message: 'Product created successfully',
            product: product,
            detail_product: detailProduct,
            media: media,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to create product',
            error: error.message,
        });
    }
},

  async updateProduct(req, res) {
    try {
      console.log(req.files); // voir les fichiers img qu'on récupère

      const productId = req.params.id;
      const productData = req.body;
      const detailProductData = req.body;
      const mediaDataArray = req.files.map((file) => ({
        path: file.path,
      }));

      // Update product
      await Product.update(productData, { where: { id: productId } });

      // Update detailProduct
      await Detail_product.update(detailProductData, {
        where: { product_id: productId },
      });

      // supprimer le média déjà existant
      await Media.destroy({ where: { product_id: productId } });

      // insérer le nouveau
      const mediaPromises = mediaDataArray.map((mediaData) =>
        Media.create({ photo: mediaData.path, product_id: productId })
      );
      await Promise.all(mediaPromises);

      res.status(200).json({
        message: 'Product updated successfully with files',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to update product with files',
        error: error.message,
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `product with id ${productId} not found.` });
      }

      await product.destroy();

      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },

  async getProductsPage(req, res) {
    try {
      const products = await Product.findAll({
        order: [['title']],
        include: [
          {
            model: Media,
            as: 'Media',
            attributes: ['photo'],
          },
        ],
      });
      console.log(products);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },
};

module.exports = productController;
