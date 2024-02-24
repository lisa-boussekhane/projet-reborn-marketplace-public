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
const upload = require('../Middlewares/multerMiddleware');

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
router.get('/products/:id', productController.getAllProducts);
router.post(
  '/product/',
  verifyToken,
  upload.array('photo', 12),
  productController.createProduct
);
router.patch(
  '/product/',
  verifyToken,
  upload.array('photo', 12),
  productController.updateProduct
);
router.delete('/product/', verifyToken, productController.deleteProduct);
router.get('/products', productController.getProductsPage);

router.get('/shop/:id', verifyToken, shopController.showShop);
router.post('/createshop/:id', verifyToken, shopController.createShop);
router.delete('/shop/:id', verifyToken, shopController.deleteShop);
router.get(
  '/shop/orders',
  verifyToken,
  shopController.getAllUserOrdersWithDetails
);
router.post(
  '/orders/invoice',
  verifyToken,
  upload.single('invoice'),
  shopController.uploadInvoice
);

router.get('/chat/:id', verifyToken, chatController.getMessage);
router.get('/chat/:id', verifyToken, chatController.getAllMessages);
router.post('/chat/message/room/:id', verifyToken, chatController.sendMessage);

router.get('shop/:id/ratings', ratingController.getShopRating);
router.post('/shop/:id/rate', ratingController.postShopRating);

module.exports = router;
