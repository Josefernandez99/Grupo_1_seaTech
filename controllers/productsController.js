const { validationResult } = require("express-validator");
const product = require("../models/Productos");

const controller = {
  cart: function (req, res) {
    res.render("./products/cart");
  },
  detail: function (req, res) {
    const selectedProduct = product.findByPk(req.params.id);
    res.render("./products/productDetail", {selectedProduct});
  },
  add: function (req, res) {
    res.render("./products/productAdd");
  },
  create: function (req, res) {
    let errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      product.create(req.body);
      //Sujeto a cambios
      return res.redirect("/products");
    }
    let oldBody = req.body;
    errors.mapped();
    res.render("./products/productAdd", { errors, oldBody });
  },
  edit: function (req, res) {
    res.render("./products/productEdit");
  },
  list: function (req, res) {
    const allProducts = product.findAll();
    res.render("./products/listaProductos", { allProducts });
  },
  delete: function (req, res) {
    const selectedProduct = product.findByPk(req.params.id);
    res.render("./products/deleteSure", {selectedProduct});
  },
  destroy: function (req, res) {
    product.delete(req.params.id);
    res.redirect("/products");
  }
};

module.exports = controller;
