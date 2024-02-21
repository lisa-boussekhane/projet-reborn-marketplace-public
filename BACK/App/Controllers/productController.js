const { Product, Detail_product, Media, User, Shop } = require('../Models/');
const { randomId } = require('../Middlewares/randomIdMaison');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

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
            as: 'detail_product',
          },
          {
            model: Media,
            as: 'media',
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

  async updateProduct(req, res) {
    try {
        // Handle multiple file uploads first
        await new Promise((resolve, reject) => {
            upload.array('myFiles', 12)(req, res, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // At this point, files are uploaded and accessible via req.files
        console.log(req.files); // `req.files` is the array of `myFiles` files

        // Parse product, detailProduct, and media data from request body
        // Assuming the text fields are sent as JSON strings in `req.body`
        const { productId } = req.params; // Fixed to correctly extract `productId`
        const productData = JSON.parse(req.body.productData);
        const detailProductData = JSON.parse(req.body.detailProductData);
        const mediaDataArray = req.files.map(file => ({
            path: file.path, // Example, adjust based on your Media model
            // Add any additional fields you need from the file
        }));

        // Update product
        await Product.update(productData, { where: { id: productId } });

        // Update detailProduct
        await Detail_product.update(detailProductData, { where: { product_id: productId } });

        // Assuming you want to update media by removing existing entries and adding new ones
        // First, remove existing media entries for this product
        await Media.destroy({ where: { product_id: productId } });

        // Then, insert new media entries for uploaded files
        const mediaPromises = mediaDataArray.map(mediaData => 
            Media.create({ ...mediaData, product_id: productId })
        );
        await Promise.all(mediaPromises);

        // Respond with a message indicating success
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
    const userId = req.params.id;
    const newid = randomId();

    try {
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

        // Log and return the response after successful product creation
        console.log('Product created successfully:', newProduct);
        return res.status(201).json(newProduct);
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
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'an unexpected error occured...' });
    }
  },

  // // MULTER //
  // // Single file upload
  // async fileUpload(req, res) {
  //   try {
  //     await new Promise((resolve, reject) => {
  //       upload.single('myFile')(req, res, (err) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve();
  //         }
  //       });
  //     });



      // After the promise resolves, the file has been uploaded and is accessible via req.file
//       console.log(req.file); // `req.file` is the `myFile` file
      // `req.body` will hold the text fields, if there were any

//       res.send('File uploaded successfully!');
//     } catch (error) {
      // Handle any errors that occurred during file upload
//       console.error(error);
//       res.status(500).send('An error occurred during the file upload.');
//     }
//   },

  // Multiple file uploads
  // async multipleFilesUpload(req, res) {
  //   try {
  //     await new Promise((resolve, reject) => {
  //       upload.array('myFiles', 12)(req, res, (err) => {
  //         if (err) {
  //           // If an error occurs, reject the promise
  //           reject(err);
  //         } else {
  //           // Otherwise, resolve the promise indicating successful file upload
  //           resolve();
  //         }
  //       });
  //     });

  //     // After the promise resolves, the files have been uploaded and are accessible via req.files
  //     console.log(req.files); // `req.files` is the array of `myFiles` files
  //     // `req.body` will contain the text fields, if there were any

  //     res.send('Multiple Files uploaded successfully!');
  //   } catch (error) {
  //     // Handle any errors that occurred during the file uploads
  //     console.error(error);
  //     res.status(500).send('An error occurred during the file uploads.');
  //   }
  // },
};

module.exports = productController;
