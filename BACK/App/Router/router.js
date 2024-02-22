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
const multerMiddleware = require('../Middlewares/multerMiddleware');

const router = express.Router();

router.post('/contactus', contactController.sendEmail);

router.get('/user/:id', verifyToken, userController.getUserInfos);
router.get('/myorders', verifyToken, userController.getOrdersReturns);

router.patch('/user/:id', verifyToken, authController.updateAccount);
router.delete('/user/:id', verifyToken, authController.deleteAccount);
router.post('/signup', authController.createUserAccount);
router.post('/login', authController.logAccount);
router.patch('/login', verifyToken, authController.updatePassword);

router.get('/result', searchController.searchReborns);

router.post('/process-payment', verifyToken, paymentController.addStripePayment);

router.get('/product/:id', productController.getProductPage);
router.post('/product/:id', verifyToken, multerMiddleware, productController.createProduct);
router.patch('/product/:id', verifyToken, multerMiddleware, productController.updateProduct);
router.delete('/product/:id', verifyToken, productController.deleteProduct);
router.get('/products', productController.getProductsPage);

router.get('/shop/:id', verifyToken, shopController.showShop);
router.post('/createshop/:id', verifyToken, shopController.createShop);
router.delete('/shop/:id', verifyToken, shopController.deleteShop);

router.get('/chat/:id', verifyToken, chatController.getMessage);
router.get('/chat/:id', verifyToken, chatController.getAllMessages);
router.post('/chat/message/room/:id', verifyToken, chatController.sendMessage);

router.get('shop/:id/ratings', ratingController.getShopRating);
router.post('/product/:id/rate', ratingController.postShopRating);
router.post('/product/:id/rate', ratingController.calculateShopRating);

//router.post('/upload', multerMiddleware, productController.fileUpload);
//router.post('/uploadmultiple', multerMiddleware, productController.multipleFilesUpload);


module.exports = router;
