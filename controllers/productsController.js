const { validationResult } = require("express-validator");
const product = require("../models/Productos");

const controller = {
<<<<<<< HEAD
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
    const allProducts = product.findAll();
    res.render("./products/listaProductos", { allProducts });
  },
  delete: function (req, res) {
    res.render("./products/deleteSure");
  },
  deleteSure: function (req, res) {
    product.delete(req.params.id);
  },
};
=======
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
        res.render('./products/listaProductos', { allProducts });
    },
    delete: function (req, res) {
        res.render("./products/deleteSure");
    },
    deleteSure: function (req, res) {
        product.delete(req.params.id);
    },
}
>>>>>>> 10459fa27e34be8f565b66c9c283a9d1f4d741ae

module.exports = controller;
