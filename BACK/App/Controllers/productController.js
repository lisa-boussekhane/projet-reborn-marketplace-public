const { Product, Detail_product, Media, User, Shop } = require('../../Models');

const { sequelize } = require('../../Models/index');

const productController = {
  async getOneProduct(req, res) {
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
            as: 'Creator',
            attributes: ['username'],
          },
        ],
      });

      if (!product) {
        // If the product is not found, return a 404 Not Found response
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      const username = product.Creator.username || '';

      const productWithUsername = {
        ...product.toJSON(),
        username,
      };

      res.status(200).json(productWithUsername);
    } catch (error) {
      // If there's an error, respond with a 500 status code and the error message
      res.status(500).json({
        message: 'Failed to retrieve product details',
        error: error.message,
      });
    }
  },

  async getAllProducts(req, res) {
    try {
      // Fetch all products from the database, including their detail_product and media
      const products = await Product.findAll({
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
            as: 'Creator',
          },
        ],
      });

      if (!products || products.length === 0) {
        // If no products are found, return a 404 Not Found response
        return res.status(404).json({
          message: 'No products found',
        });
      }

      // If products are found, return them along with their detailed information and media
      res.status(200).json(products);
    } catch (error) {
      // If there's an error, respond with a 500 status code and the error message
      res.status(500).json({
        message: 'Failed to retrieve products',
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

  async createProduct(req, res) {
    // Create random unique ID for the product
    const randomId = () => {
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x100000).toString(16);
      };
      // Retourner un id de format 'aaaaa'
      return s4();
    };
    const userId = req.params.id;
    const newid = randomId();
    try {
      console.log(req.files);
      // });
      const theUser = await User.findByPk(userId);
      if (!theUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      const usershop = await Shop.findOne({
        where: {
          user_id: userId,
        },
      });
      if (!usershop) {
        return res.status(404).json({ error: 'Shop not found' });
      }
      const productData = {
        user_id: userId,
        shop_id: usershop.id,
        unique_id: newid,
        ...req.body,
      };
      console.log('productData :', productData);
      const detailProductData = {
        ...req.body,
      };
      try {
        // création du produit
        const newProduct = await Product.create(productData);
        console.log(newProduct.id);
        await Detail_product.create({
          product_id: newProduct.id,
          ...detailProductData,
        });
        const mediaData = req.files.map((file) => ({
          product_id: newProduct.id,
          photo: file.path,
        }));
        const mediaPromises = mediaData.map(async (mediaItem) => {
          console.log(mediaItem);
          return Media.create(mediaItem);
        });
        const media = await Promise.all(mediaPromises);
        // Log and return the response after successful product creation
        console.log('Product created successfully:', newProduct);
        return res.status(201).json({
          product: newProduct.get(), // Convert Sequelize instance to plain object
          media,
        });
      } catch (error) {
        console.error('Error creating product or details_product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    } catch (error) {
      console.error('Error finding user or shop:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
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
