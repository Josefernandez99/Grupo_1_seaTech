const express = require('express');
const route = express.Router();
const { login, index, register, cart, productDetail } = require('../controllers/indexController');



route.get('/', index);
route.get('/index', index);

route.get('/login', login);

route.get('/register', register);

route.get('/cart', cart);

route.get('/productDetail', productDetail);

module.exports = route;