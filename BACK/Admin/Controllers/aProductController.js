const { Product, Detail_product, Media, User, Shop } = require('../../Models');

const { sequelize } = require('../../Models/index');

const aProductController = {
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
            as: 'seller',
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
      const updates = req.body;

      if (Object.keys(updates).length === 0 && mediaDataArray.length === 0) {
        return res.status(400).json({ message: 'No fields to update.' });
      }
      // Update product

      const [updatedRows] = await Product.update(updates, {
        where: { id: productId },
      });

      // Update detailProduct
      if (Object.keys(updates).length > 0) {
        await Detail_product.update(updates, {
          where: { product_id: productId },
        });
      }

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
      const productId = req.body.id;
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
};

module.exports = aProductController;
