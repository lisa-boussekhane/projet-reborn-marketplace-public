const { product, detail_product, media, user } = require('../Models/');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 6 });
const multer = require('multer');

const productController = {
  async getProductPage(req, res) {
    try {
      // Extract the product ID from the request parameters
      const productId = req.params.id;
      console.log(productId);

      // Fetch the product from the database, including its detail_product and media
      const theProduct = await product.findByPk(productId, {
        include: [
          {
            model: detail_product,
            as: 'detail_product',
          },
          {
            model: media,
            as: 'media',
          },
          {
            model: user,
            as: 'users',
          },
        ],
      });

      if (!theProduct) {
        // If the product is not found, return a 404 Not Found response
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      // If the product is found, return it along with its detailed information and media
      res.status(200).json(theProduct);
    } catch (error) {
      // If there's an error, respond with a 500 status code and the error message
      res.status(500).json({
        message: 'Failed to retrieve product details',
        error: error.message,
      });
    }
  },

  async createProduct(req, res) {
    try {
      // Extract product, detailProduct, and media data from request body
      const { productData, detailProductData, mediaData } = req.body;

      // Generate a unique ID for the product
      productData.customId = uid();

      // Create product
      const product = await product.create(productData);

      // Add product ID to detailProductData and mediaData
      detailProductData.product_id = product.id;
      mediaData.product_id = product.id;

      // Create detailProduct and media associated with the product
      const detailProduct = await detail_product.create(detailProductData);
      const media = await Promise.all(
        mediaData.map((mediaItem) => media.create(mediaItem))
      );

      // If everything goes well, commit the transaction
      // await t.commit();

      // Respond with created product, its details, and media
      res.status(201).json({
        message: 'Product created successfully',
        product: product,
        detail_product: detailProduct,
        media: media,
      });
    } catch (error) {
      // If there's an error, rollback the transaction
      // await t.rollback();

      // Respond with error message
      res.status(500).json({
        message: 'Failed to create product',
        error: error.message,
      });
    }
  },

  async updateProduct(req, res) {
    try {
      const { productId } = req.params.id;
      // Extract product, detailProduct, and media data from request body
      const { productData, detailProductData, mediaData } = req.body;

      // Update product
      const product = await product.update(productData, {
        where: { id: productId },
      });

      // Update detailProduct and media associated with the product
      const detailProduct = await detail_product.update(detailProductData, {
        where: { product_id: productId },
        transaction: t,
      });

      const media = await media.update(mediaData, {
        where: { product_id: productId },
        transaction: t,
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
        error: error.message,
      });
    }
  },

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const theProduct = await product.findByPk(productId);

      if (!theProduct) {
        return res
          .status(404)
          .json({ message: `product with id ${productId} not found.` });
      }

      await theProduct.destroy();

      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },

  async getProductsPage(req, res) {
    try {
      const products = await product.findAll({
        order: [['title']],
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },

  // SHORT UNIQUE ID //
  async createNewRecord(data) {
    try {
      const newRecord = await product.create(data);
      console.log('Record created with unique ID:', newRecord.uniqueId);
      // Handle the newly created record as needed
    } catch (error) {
      console.error('Error creating new record:', error);
    }
  },

  async createNewRecordWithRetry(data, retryCount = 0) {
    try {
      const newRecord = await product.create(data);
      return newRecord;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' && retryCount < 5) {
        console.log('Unique ID collision detected, retrying...');
        return createNewRecordWithRetry(data, retryCount + 1);
      } else {
        throw error; // Rethrow error if not a unique constraint error or retries exceeded
      }
    }
  },

// MULTER //
// Single file upload
async fileUpload(req, res) {
  try {
        await new Promise((resolve, reject) => {
        upload.single('myFile')(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // After the promise resolves, the file has been uploaded and is accessible via req.file
      console.log(req.file); // `req.file` is the `myFile` file
      // `req.body` will hold the text fields, if there were any

      res.send('File uploaded successfully!');
    } catch (error) {
      // Handle any errors that occurred during file upload
      console.error(error);
      res.status(500).send('An error occurred during the file upload.');
    }
  },

  // Multiple file uploads
  async multipleFilesUpload(req, res) {
    try {
      await new Promise((resolve, reject) => {
        upload.array('myFiles', 12)(req, res, (err) => {
          if (err) {
            // If an error occurs, reject the promise
            reject(err);
          } else {
            // Otherwise, resolve the promise indicating successful file upload
            resolve();
          }
        });
      });

      // After the promise resolves, the files have been uploaded and are accessible via req.files
      console.log(req.files); // `req.files` is the array of `myFiles` files
      // `req.body` will contain the text fields, if there were any

      res.send('Multiple Files uploaded successfully!');
    } catch (error) {
      // Handle any errors that occurred during the file uploads
      console.error(error);
      res.status(500).send('An error occurred during the file uploads.');
    }
  },
};

module.exports = productController;
