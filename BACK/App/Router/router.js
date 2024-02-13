const express = require('express');
const userController = require('../Controllers/userController');
const searchController = require('../Controllers/searchController');
const productController = require('../Controllers/productController');
const chatController = require('../Controllers/chatController');
const paymentController = require('../Controllers/paymentController');
const authController = require('../Controllers/authController');

const verifyToken = require ('../Middlewares/authMiddleware')

const router = express.Router();

router.get('/user/:id', verifyToken,userController.getUserInfos);
router.get('/myaccount', userController.getMyAccount);
router.get('/myorders', userController.getOrdersReturns);

router.patch('/user/:id', authController.updateAccount);
router.delete('/user/:id', authController.deleteAccount);
router.post('/signup', authController.createUserAccount);
router.post('/login', authController.logAccount);
router.patch('/login', authController.updatePassword);

router.get('/result', searchController.searchReborns);

router.post('/payment', paymentController.bankAccount);

router.get('/product/:id', productController.productPage);
router.post('/product/:id', productController.createProduct);
router.get('/product', productController.productsPage);

router.get('/shop/:id', shopController.showStore);
router.post('/shop/:id', shopController.createShop);

router.get('/chat/:id', chatController.getMessage);
router.patch('/chat/message/room/:id', chatController.chatRoom);





