const authProduct = require('../Models/product');
const detail_product = require('../Models/detail_product');
const media = require('../Models/media');
const { sequelize } = require('../Models/index'); // Import Sequelize instance

const productController = {
  async getProductPage(req, res) {
    try {
      const productId = req.params.id;
      const product = await authProduct
        .findByPk({
          productId,
          include: [
            { model: detail_product, required: true },
            { model: media, required: false },
          ],
        })
        .then((product) => {
          console.log(product);
        });

      if (!product) {
        return res
          .status(404)
          .json({ message: `product with id ${productId} not found.` });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },
  
  async createProduct(req, res) {
    const t = await sequelize.transaction(); // Start a new transaction
    try {
        // Extract product, detailProduct, and media data from request body
        const { productData, detailProductData, mediaData } = req.body;

        // Create product
        const product = await product.create(productData, { transaction: t });

        // Add product ID to detailProductData and mediaData
        detailProductData.product_id = product.id;
        mediaData.product_id = product.id;

        // Create detailProduct and media associated with the product
        const detailProduct = await detail_product.create(detailProductData, { transaction: t });
        const media = await media.create(mediaData, { transaction: t });

        // If everything goes well, commit the transaction
        await t.commit();

        // Respond with created product, its details, and media
        res.status(201).json({
            message: 'Product created successfully',
            product: product,
            detail_product: detailProduct,
            media: media
        });
    } catch (error) {
        // If there's an error, rollback the transaction
        await t.rollback();

        // Respond with error message
        res.status(500).json({
            message: 'Failed to create product',
            error: error.message
        });
    }
  },

  async updateProduct(req, res) {
    const t = await sequelize.transaction(); // Start a new transaction
    try {
        const { productId } = req.params.id;
        // Extract product, detailProduct, and media data from request body
        const { productData, detailProductData, mediaData } = req.body;

        // Update product
        const product = await Product.update(productData, {
            where: { id: productId },
            transaction: t
        });

        // Update detailProduct and media associated with the product
        const detailProduct = await DetailProduct.update(detailProductData, {
            where: { product_id: productId },
            transaction: t
        });

        const media = await Media.update(mediaData, {
            where: { product_id: productId },
            transaction: t
        });

        // If everything goes well, commit the transaction
        await t.commit();

        // Respond with a message indicating success
        res.status(200).json({
            message: 'Product updated successfully',
        });
    } catch (error) {
        // If there's an error, rollback the transaction
        await t.rollback();

        // Respond with error message
        res.status(500).json({
            message: 'Failed to update product',
            error: error.message
        });
    }
},

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await authProduct.findByPk(productId);

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
      const products = await authProduct.findAll({
        order: [['title']],
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },
};

module.exports = productController;
