const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userController, searchController, productController, chatController, paymentController, authController, shopController, contactController, ratingController  } = require('../Controllers/');
const verifyToken = require('../Middlewares/authMiddleware');
const upload = require('../Middlewares/multerMiddleware');

const router = express.Router();

router.post('/contactus', contactController.sendEmail);

router.get('/user/', verifyToken, userController.getUserInfos);
router.get('/myorders', verifyToken, userController.getOrdersReturns);

router.patch('/user/:id', verifyToken, authController.updateAccount);
router.delete('/user/:id', verifyToken, authController.deleteAccount);
router.post('/signup', authController.createUserAccount);
router.post('/login', authController.logAccount);
router.patch('/login', verifyToken, authController.updatePassword);

router.get('/verifyToken', verifyToken, (req, res) => {
  const user = req.user;
  res.json({ success: true, user });
});

router.post('/process-payment', verifyToken, paymentController.addStripePayment);

router.get('/product/:id', productController.getOneProduct);
router.get('/products/:id', productController.getAllProducts);
router.post('/product/', verifyToken, upload.array('photo', 12), productController.createProduct);
router.patch('/product/', verifyToken, upload.array('photo', 12), productController.updateProduct);
router.delete('/product/', verifyToken, productController.deleteProduct);
router.get('/products', productController.getProductsPage);

router.get('/shop/:id', verifyToken, shopController.showShop);
router.post('/createshop/:id', verifyToken, shopController.createShop);
router.delete('/shop/:id', verifyToken, shopController.deleteShop);
router.get('/shop/orders', verifyToken, shopController.getAllUserOrdersWithDetails);
router.post('/shop/order/invoice', verifyToken, upload.single('invoice'), shopController.uploadInvoice);

router.get('/chat/:id', verifyToken, chatController.getMessage);
router.get('/chat/:id', verifyToken, chatController.getAllMessages);
router.post('/chat/message/room/:id', verifyToken, chatController.sendMessage);

router.get('shop/:id/ratings', ratingController.getShopRating);
router.post('/product/:id/rate', ratingController.postShopRating);


module.exports = router;
