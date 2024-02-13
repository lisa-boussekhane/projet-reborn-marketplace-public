const express = require('express');
const userController = require('../Controllers/userController');
const searchController = require('../Controllers/searchController');
const productController = require('../Controllers/productController');
const chatController = require('../Controllers/chatController');
const paymentController = require('../Controllers/paymentController');
const authController = require('../Controllers/authController');

const verifyToken = require('../Middlewares/authMiddleware');

const router = express.Router();

router.get('/user/:id', verifyToken, userController.getUserInfos);
router.get('/myaccount', verifyToken, userController.getMyAccount);
router.get('/myorders', verifyToken, userController.getOrdersReturns);

router.patch('/user/:id', verifyToken, authController.updateAccount);
router.delete('/user/:id', verifyToken, authController.deleteAccount);
router.post('/signup', authController.createUserAccount);
router.post('/login', verifyToken, authController.logAccount);
router.patch('/login', verifyToken, authController.updatePassword);

router.get('/result', searchController.searchReborns);

router.post('/payment', paymentController.bankAccount);

router.get('/product/:id', productController.getProductPage);
router.post('/product/:id', productController.createProduct);
router.get('/product', productController.getProductsPage);

router.get('/shop/:id', shopController.showStore);
router.post('/shop/:id', shopController.createShop);

router.get('/chat/:id', chatController.getMessage);
router.patch('/chat/message/room/:id', chatController.chatRoom);
