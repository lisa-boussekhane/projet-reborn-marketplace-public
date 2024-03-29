const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../App/Controllers/userController');
const searchController = require('../App/Controllers/searchController');
const productController = require('../App/Controllers/productController');
const chatController = require('../App/Controllers/chatController');
const paymentController = require('../App/Controllers/Stripe/paymentController');
const authController = require('../App/Controllers/authController');
const shopController = require('../App/Controllers/shopController');
const contactController = require('../App/Controllers/contactController');
const ratingController = require('../App/Controllers/ratingController');
const aUserController = require('../Admin/Controllers/aUserController');
const aProductController = require('../Admin/Controllers/aProductController');
const aShopController = require('../Admin/Controllers/aShopController');
const {
  adminPageMiddleware,
} = require('../App/Middlewares/authMiddlewareAdmin');
const { verifyToken } = require('../App/Middlewares/authMiddleware');
const {
  upload,
  uploadInvoice,
  uploadPhotoVideo,
} = require('../App/Middlewares/multerMiddleware');

const router = express.Router();

/// App Routes ///
router.post('/contactus', contactController.sendEmail);
router.post('/resetpassword/:token', userController.resetPassword);
router.get('/user', verifyToken, userController.getUserInfos);
router.post('/resetrequest', userController.requestNewPassword);

router.patch('/user', verifyToken, authController.updateAccount);
router.delete('/user', verifyToken, authController.deleteAccount);
router.post('/signup', authController.createUserAccount);
router.post('/login', authController.logAccount);
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
  '/product',
  verifyToken,
  uploadPhotoVideo.array('photo', 12),
  productController.createProduct
);
router.post('/products', productController.getProductsByCategory);
router.patch(
  '/product/:id',
  verifyToken,
  uploadPhotoVideo.array('photo', 12),
  productController.updateProduct
);
router.delete('/product/:id', verifyToken, productController.deleteProduct);

router.get('/shop', verifyToken, shopController.showShop);
router.post('/createshop', verifyToken, shopController.createShop);
router.delete('/shop', verifyToken, shopController.deleteShop);
router.get(
  '/user/orders',
  verifyToken,
  shopController.getAllUserOrdersWithDetails
);
router.get('/user/sales', verifyToken, shopController.sellerOrdersWithDetails);
router.patch(
  '/orders',
  verifyToken,
  uploadInvoice.single('invoice'),
  shopController.uploadInvoiceInOrder
);

router.get('/chat/:id', verifyToken, chatController.getMessage);
router.get('/chat', verifyToken, chatController.getAllMessages);
router.post('/chat/message/room/:id', verifyToken, chatController.sendMessage);

router.get('/shop/:id/ratings', ratingController.getShopRating);
router.post('/shop/:id/rate', verifyToken, ratingController.postShopRating);
router.get('/shop/:id/average-rating', ratingController.getAverageRating);

/// ADMIN ROUTES ///
router.get(
  '/check-admin-role',
  adminPageMiddleware,
  aUserController.checkAdminRole
);
router.get('/admin/users', adminPageMiddleware, aUserController.getAllUsers);
router.patch(
  '/admin/user/:id',
  adminPageMiddleware,
  aUserController.updateUser
);
router.delete('/admin/user', adminPageMiddleware, aUserController.deleteUser);

router.get(
  '/admin/products',
  adminPageMiddleware,
  aProductController.getAllProducts
);

router.patch(
  '/admin/product/:id',
  upload.array('photo', 12),
  aProductController.updateProduct
);
router.delete(
  '/admin/product',
  adminPageMiddleware,
  aProductController.deleteProduct
);

router.get('/admin/shops', adminPageMiddleware, aShopController.getAllShops);
router.patch(
  '/admin/updateshop/:id',
  adminPageMiddleware,
  aShopController.updateShop
);
router.delete('/admin/shop', adminPageMiddleware, aShopController.deleteShop);
router.get(
  '/admin/orders',
  adminPageMiddleware,
  aShopController.getAllUserOrdersWithDetails
);

module.exports = router;
