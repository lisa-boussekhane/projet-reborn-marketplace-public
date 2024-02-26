const express = require('express');
const userController = require('../../Admin/Controllers/userController');
const authController = require('../../Admin/Controllers/authController');
const productController = require('../../Admin/Controllers/productController');
const shopController = require('../../Admin/Controllers/shopController');

const routerAdmin = express.RouterAdmin();

routerAdmin.get('/admin/user/:id', userController.getUserInfos);
routerAdmin.get('/admin/users', userController.getAllUsers);
routerAdmin.patch('/admin/user/:id', userController.updateUser);

routerAdmin.delete('/admin/user/:id', authController.deleteAccount);
routerAdmin.post('/admin/login', authController.logAccount);
router.post('/admin/resetrequest', authController.requestPasswordReset);
router.post('/admin/resetpassword', authController.updatePassword);

routerAdmin.get('/admin/product/:id', productController.getOneProduct);
routerAdmin.get('/admin/products', productController.getAllProducts);
routerAdmin.post('/admin/product/:id', upload.array('photo', 12), productController.createProduct);
routerAdmin.patch('/admin/product/:id', upload.array('photo', 12), productController.updateProduct);
routerAdmin.delete('/admin/product/:id', productController.deleteProduct);

routerAdmin.get('/admin/shop/:id', shopController.getOneShop);
routerAdmin.get('/admin/shops', shopController.getAllShops);
routerAdmin.post('/admin/createshop/:id', shopController.createShop);
routerAdmin.patch('/admin/updateshop/:id', shopController.updateShop);
routerAdmin.delete('/admin/shop/:id', shopController.deleteShop);
routerAdmin.get('/admin/user/orders/:id', shopController.getAllUserOrdersWithDetails);

module.exports = routerAdmin;
