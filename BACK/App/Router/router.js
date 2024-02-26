const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../Controllers/userController');
const searchController = require('../Controllers/searchController');
const productController = require('../Controllers/productController');
const chatController = require('../Controllers/chatController');
const paymentController = require('../Controllers/Stripe/paymentController');
const authController = require('../Controllers/authController');
const shopController = require('../Controllers/shopController');
const contactController = require('../Controllers/contactController');
const ratingController = require('../Controllers/ratingController');
const verifyToken = require('../Middlewares/authMiddleware');
const { upload, uploadInvoice } = require('../Middlewares/multerMiddleware');

const router = express.Router();

router.post('/contactus', contactController.sendEmail);

router.get('/user/:id', verifyToken, userController.getUserInfos);

router.patch('/user/:id', verifyToken, authController.updateAccount);
router.delete('/user/:id', verifyToken, authController.deleteAccount);
router.post('/signup', authController.createUserAccount);
router.post('/login', authController.logAccount);
router.patch('/login', verifyToken, authController.updatePassword);

router.get('/results', searchController.searchReborns);

router.post('/createorder', verifyToken, shopController.createOrder);

router.post(
  '/process-payment',
  verifyToken,
  paymentController.addStripePayment
);

router.get('/product/:id', productController.getOneProduct);
router.get('/products', productController.getAllProducts);
router.post(
  '/product/:id',

  verifyToken,
  upload.array('photo', 12),
  productController.createProduct
);
router.patch(
  '/product/:id',

  verifyToken,
  upload.array('photo', 12),
  productController.updateProduct
);

router.delete('/product/:id', verifyToken, productController.deleteProduct);

// router.get('/products', productController.getProductsPage);

router.get('/shop/:id', verifyToken, shopController.showShop);
router.post('/createshop/:id', verifyToken, shopController.createShop);
router.delete('/shop/:id', verifyToken, shopController.deleteShop);
router.get(
  '/user/orders/:id',
  verifyToken,
  shopController.getAllUserOrdersWithDetails
);

router.patch(
  '/orders',
  verifyToken,
  uploadInvoice.single('invoice'),
  shopController.uploadInvoiceInOrder
);

router.get('/chat/:id', verifyToken, chatController.getMessage);
router.get('/chat/:id', verifyToken, chatController.getAllMessages);
router.post('/chat/message/room/:id', verifyToken, chatController.sendMessage);

router.get('shop/:id/ratings', ratingController.getShopRating);
router.post('/shop/:id/rate', ratingController.postShopRating);

module.exports = router;
