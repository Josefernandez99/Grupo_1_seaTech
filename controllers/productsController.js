const { validationResult } = require("express-validator");
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
        let errors = validationResult(req);
        if (errors.isEmpty()) {
          product.create(req.body);
          //Sujeto a cambios
          return res.redirect("/");
        }
        let oldBody = req.body;
        errors = errors.mapped();
        console.log(errors);
        res.render("./products/productAdd", { errors, oldBody });
      },
    edit: function (req, res) {

        res.render('./products/productEdit');
    },
    list: function (req, res) {
        const allProducts = product.findAll();
        res.render('./products/listaProductos', {allProducts});
    }
}

module.exports = controller;