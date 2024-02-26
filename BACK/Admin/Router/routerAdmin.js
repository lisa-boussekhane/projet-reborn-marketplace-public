const express = require('express');
const userController = require('../../Admin/Controllers/userController');
const authController = require('../../Admin/Controllers/authController');
const productController = require('../../Admin/Controllers/productController');
const shopController = require('../../Admin/Controllers/shopController');

const routerAdmin = express.RouterAdmin();

router.get('/admin/user/:id', userController.getUserInfos);
router.get('/admin/users', userController.getAllUsers);
router.patch('/admin/user/:id', userController.updateUser);

router.delete('/admin/user/:id', authController.deleteAccount);
router.post('/admin/login', authController.logAccount);
router.post('/admin/resetrequest', authController.requestPasswordReset);
router.post('/admin/resetpassword', authController.updatePassword);

router.get('/admin/product/:id', productController.getOneProduct);
router.get('/admin/products', productController.getAllProducts);
router.post('/admin/product/:id', upload.array('photo', 12), productController.createProduct);
router.patch('/admin/product/:id', upload.array('photo', 12), productController.updateProduct);
router.delete('/admin/product/:id', productController.deleteProduct);

router.get('/admin/shop/:id', shopController.getOneShop);
router.get('/admin/shops', shopController.getAllShops);
router.post('/admin/createshop/:id', shopController.createShop);
router.patch('/admin/updateshop/:id', shopController.updateShop);
router.delete('/admin/shop/:id', shopController.deleteShop);
router.get('/admin/user/orders/:id', shopController.getAllUserOrdersWithDetails);

module.exports = routerAdmin;
