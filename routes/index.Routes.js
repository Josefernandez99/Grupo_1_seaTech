const express = require('express');
const route = express.Router();
const { login, index, register, cart, productDetail } = require('../controllers/indexController');



route.get('/', index);
route.get('/home', index);

module.exports = route;