const express = require('express');
const userController = require('./Controllers/userController');
const searchController = require('./Controllers/searchController');
const productController = require('./Controllers/productController');
const chatController = require('./Controllers/chatController');
const paymentController = require('./Controllers/paymentController');

const router = express.Router();

router.get('/user/:id', userController.getUserInfos);
router.post('/lists', listController.createOneList);