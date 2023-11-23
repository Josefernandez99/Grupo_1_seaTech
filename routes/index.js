const express = require('express');
const route = express.Router();
const { login, index, register, cart, productDetail } = require('../controllers/indexController');



route.get('/', index);
route.get('/index', index);

module.exports = route;