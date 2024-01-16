const { validationResult } = require("express-validator");
const product = require("../tools/Productos");

const controller = {
  cart: function (req, res) {
    res.render("./products/cart");
  },
  detail: function (req, res) {
    const selectedProduct = product.findByPk(req.params.id);
    res.render("./products/productDetail", { selectedProduct });
  },
  add: function (req, res) {
    res.render("./products/productAdd");
  },
  create: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let imagen_default = 'https://res.cloudinary.com/draudtuyr/image/upload/v1705370351/seatech/product_default_image.png';
      const newProduct = {
        image: req.file?.cloudinaryUrl || imagen_default,
        ...req.body
      }

      product.create(newProduct);
      //Sujeto a cambios
      return res.redirect("/products");
    }
    let oldBody = req.body;
    errors = errors.mapped();
    res.render("./products/productAdd", { errors, oldBody });
  },
  edit: function (req, res) {
    const idProducto = req.params.id;
    const productoAactualizar = product.findByPk(idProducto);
    const categorias = ["velero", "lancha", "yate", "moto_agua"];

    res.render("./products/productEdit", {
      productoAactualizar,
      categorias,
    });
  },

  update: function (req, res) {
    const updateProduct = {
      image: req.file?.filename || ([1, 2, 3, 4].includes(Number(req.params.id)) ? `barco-img-${req.params.id}.png` : 'default_image.png'),
      ...req.body
    }
    product.update(updateProduct, req.params.id);
    res.redirect("/products");
  },
  list: function (req, res) {
    const allProducts = product.findAll();
    res.render("./products/listaProductos", { allProducts });
  },
  delete: function (req, res) {
    const selectedProduct = product.findByPk(req.params.id);
    res.render("./products/deleteSure", { selectedProduct });
  },
  destroy: function (req, res) {
    product.delete(req.params.id);
    res.redirect("/products");
  },
};

module.exports = controller;
