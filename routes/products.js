const express = require('express');
const route = express.Router();
const productsController = require('../controllers/productsController');


route.get('/cart', productsController.cart);

route.get('/productDetail', productsController.productDetail);

route.get('/productAdd', productsController.productAdd);

module.exports = route;