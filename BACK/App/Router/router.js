const express = require('express');
const userController = require('./Controllers/userController');
const searchController = require('./Controllers/searchController');
const productController = require('./Controllers/productController');
const chatController = require('./Controllers/chatController');
const paymentController = require('./Controllers/paymentController');

const router = express.Router();

router.get('/user/:id', userController.getUserInfos);
router.patch('/user/:id', userController.updateAccount);
router.delete('/user/:id', userController.deleteAccount);
router.post('/signup', userController.createUserAccount);
router.post('/login', userController.logAccount);
router.patch('/login', userController.updatePassword);
router.get('/myaccount', userController.getUserDashboard);

router.get('/result', searchController.searchReborns);

router.post('/payment', paymentController.bankAccount);

router.get('/product/:id', productController.productPage);
router.post('/product/:id', productController.createProduct);
router.get('/product', productController.productsPage);

router.get('/shop/:id', shopController.showStore);
router.post('/shop/:id', shopController.createShop);

router.get('/chat/:id', chatController.getMessage);
router.patch('/chat/message/room/:id', chatController.chatRoom);





