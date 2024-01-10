const product = require('../models/Productos')

const controller = {
    cart: function (req, res) {
        res.render('./products/cart');
    },
    detail: function (req, res) {
        res.render('./products/productDetail');
    },
    add: function (req, res) {
        res.render('./products/productAdd');
    },
    create: function (req, res) {
        product.create(req.body);
        //Sujeto a cambios
        res.redirect('/');
    },
    edit: function (req, res) {

        res.render('./products/productEdit');
    },
    list: function (req, res) {
        res.render('./products/listaProductos');
    }
}

module.exports = controller;
