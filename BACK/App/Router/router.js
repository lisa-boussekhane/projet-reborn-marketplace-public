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
const verifyToken = require('../Middlewares/authMiddleware');
const multerMiddleware = require('../Middlewares/multerMiddleware');


const router = express.Router();

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
router.post('/product/create', verifyToken, productController.createProduct);
router.patch('/product/:id', verifyToken, productController.updateProduct);
router.delete('/product/:id', verifyToken, productController.deleteProduct);
router.get('/products', productController.getProductsPage);

router.get('/shop/:id', shopController.showShop);
router.post('/shop/:id', shopController.createShop);
router.delete('/shop/:id', shopController.deleteShop);

router.get('/chat/:id', verifyToken, chatController.getMessage);
router.get('/chat/:id', verifyToken, chatController.getAllMessages);
router.post('/chat/message/room/:id', verifyToken, chatController.sendMessage);

router.post('/upload', multerMiddleware, productController.fileUpload);
router.post('/uploadmultiple', multerMiddleware, productController.multipleFilesUpload);


module.exports = router;
