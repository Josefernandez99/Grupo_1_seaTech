const Product = require('../models/Productos');

const controller = {
    index: function (req, res) {
        const allProducts = Product.findAll();
        res.render('index', { allProducts });
    }
}

module.exports = controller;