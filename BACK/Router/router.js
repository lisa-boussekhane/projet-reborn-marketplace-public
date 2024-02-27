const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../App/Controllers/UserController');
const searchController = require('../App/Controllers/searchController');
const productController = require('../App/Controllers/productController');
const chatController = require('../App/Controllers/chatController');
const paymentController = require('../App/Controllers/Stripe/paymentController');
const authController = require('../App/Controllers/authController');
const shopController = require('../App/Controllers/shopController');
const contactController = require('../App/Controllers/contactController');
const ratingController = require('../App/Controllers/ratingController');
const verifyToken = require('../App/Middlewares/authMiddleware');
const {
  upload,
  uploadInvoice,
} = require('../App/Middlewares/multerMiddleware');

const aUserController = require('../Admin/Controllers/aUserController');
const aAuthController = require('../Admin/Controllers/aAuthController');
const aProductController = require('../Admin/Controllers/aProductController');
const aShopController = require('../Admin/Controllers/aShopController');

const router = express.Router();

router.post('/contactus', contactController.sendEmail);

router.get('/user/:id', verifyToken, userController.getUserInfos);

router.patch('/user/:id', verifyToken, authController.updateAccount);
router.delete('/user/:id', verifyToken, authController.deleteAccount);
router.post('/signup', authController.createUserAccount);
router.post('/login', authController.logAccount);
router.post('/resetrequest', authController.requestPasswordReset);
router.patch('/updatepassword', verifyToken, authController.updatePassword);

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

router.get('/shop/:id', verifyToken, shopController.showShop);
router.post('/createshop/:id', verifyToken, shopController.createShop);
router.delete('/shop/:id', verifyToken, shopController.deleteShop);
router.get(
  '/user/orders/:id',
  verifyToken,
  shopController.getAllUserOrdersWithDetails
);
router.get(
  '/user/sales/:id',
  verifyToken,
  shopController.sellerOrdersWithDetails
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
router.get('shop/:id/average-rating', ratingController.getAverageRating);

/// ADMIN ROUTES ///
router.get('/admin/users', aUserController.getAllUsers);
router.patch('/admin/user/:id', aUserController.updateUser);

router.delete('/admin/user/:id', aAuthController.deleteAccount);
router.post('/admin/login', aAuthController.logAccount);
router.post('/admin/resetrequest', aAuthController.requestPasswordReset);
router.post('/admin/resetpassword', aAuthController.updatePassword);

router.get('/admin/products', aProductController.getAllProducts);
router.post(
  '/admin/product/:id',
  upload.array('photo', 12),
  aProductController.createProduct
);
router.patch(
  '/admin/product/:id',
  upload.array('photo', 12),
  aProductController.updateProduct
);
router.delete('/admin/product', aProductController.deleteProduct);

router.get('/admin/shops', aShopController.getAllShops);
router.post('/admin/createshop/:id', aShopController.createShop);
router.patch('/admin/updateshop/:id', aShopController.updateShop);
router.delete('/admin/shop', aShopController.deleteShop);
router.get(
  '/admin/user/orders/:id',
  aShopController.getAllUserOrdersWithDetails
);

module.exports = router;
