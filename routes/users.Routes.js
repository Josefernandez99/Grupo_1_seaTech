const express = require('express');
const route = express.Router();
const usersController = require('../controllers/usersController');


route.get('/login', usersController.login);

route.get('/register', usersController.register);

module.exports = route;