const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexController');



route.get('/', indexController.index);
route.get('/index', indexController.index);

route.get('/login', indexController.login);

route.get('/register', indexController.register);

route.get('/cart', indexController.cart);

route.get('/productDetail', indexController.productDetail);

module.exports = route;