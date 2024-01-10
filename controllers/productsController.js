const { validationResult } = require("express-validator");
const product = require("../models/Productos");

const controller = {
  cart: function (req, res) {
    res.render("./products/cart");
  },
  detail: function (req, res) {
    res.render("./products/productDetail");
  },
  add: function (req, res) {
    res.render("./products/productAdd");
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
    res.render("./products/productEdit");
  },
  list: function (req, res) {
    res.render("./products/listaProductos");
  },
  delete: function (req, res) {
    product.delete(req.params.id);
  },
  deleteSure: function (req, res) {
    let body = req.body;
    body = {
      name: "BARCO ANACHE",
      year: "111111",
      price: "99999999",
      image: "barco-img-1.png",
    };
    res.render("./products/deleteSure", { body });
  },
};

module.exports = controller;
