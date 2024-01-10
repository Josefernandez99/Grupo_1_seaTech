const express = require('express');
const route = express.Router();
const productsController = require('../controllers/productsController');

//Listado de productos
route.get('/', productsController.list);

//Vista del carrtito
route.get('/cart', productsController.cart);

//Vista de crear un producto
route.get('/create', productsController.add);

//Procesar la creación de un producto
route.post('/create', productsController.create);

//Vista de un producto en particular
route.get('/:id', productsController.detail);

//Vista de editar un producto en particular
route.get('/detail/:id/edit', productsController.edit);

//Procesar la edición de un producto en particular
//route.put('/:id/edit', productsController.update);

//Eliminar producto
//route.delete('/:id/delete', productsController.delete);

module.exports = route;