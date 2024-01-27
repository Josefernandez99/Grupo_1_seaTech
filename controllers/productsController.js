const { validationResult } = require("express-validator");
const product = require("../tools/Productos");
const { handleError, formatDataProduct } = require('../tools/extraFunctions');

const controller = {
  cart: function (req, res) {
    res.render("./products/cart");
  },
  detail: async function (req, res) {
    try {

      const selectedProduct = await product.findByPk(req.params.id);
      res.render("./products/productDetail", { selectedProduct });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al cargar la vista de detalle de un producto', 500);
    }

  },
  add: function (req, res) {
    res.render("./products/productAdd");
  },
  create: async function (req, res) {

    try {

      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        let oldBody = req.body;
        errors = errors.mapped();
        res.render("./products/productAdd", { errors, oldBody });
        return;
      }

      formatDataProduct(req);

      const newProduct = {
        ...req.body,
        image: {
          public_id: req.file.public_id,
          url: req.file.cloudinaryUrl
        }
      }

      product.create(newProduct);
      return res.redirect("/products");

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al registar el producto', 500);
    }

  },
  edit: async function (req, res) {

    try {

      const idProducto = req.params.id;
      const productoAactualizar = product.findByPk(idProducto);

      res.render("./products/productEdit", {
        productoAactualizar
      });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al cargar el formulario de actualizar producto', 500);
    }

  },

  update: async function (req, res) {

    try {

      const idProducto = req.params.id;
      const productoAactualizar = product.findByPk(idProducto);
      let errors = validationResult(req);
      let condicionDeActualizacion = Object.keys(errors.mapped()).length === 1 &&
        errors.mapped()?.image.msg.includes("imagen");

      if (!errors.isEmpty() && !condicionDeActualizacion) {

        let oldBody = req.body;
        errors = errors.mapped();
        res.render("./products/productEdit", { errors, oldBody, productoAactualizar });
        return;
      }

      formatDataProduct(req);

      const updateProduct = {
        ...req.body,
        image: {
          public_id: req.file?.public_id || productoAactualizar.image.public_id,
          url: req.file?.cloudinaryUrl || productoAactualizar.image.url
        }
      }

      product.update(updateProduct, idProducto);
      return res.redirect("/products");

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al actualizar el producto', 500);
    }

  },
  list: async function (req, res) {

    try {

      const allProducts = await product.findAll();
      res.render("./products/listaProductos", { allProducts });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al listar los productos', 500);
    }

  },
  delete: async function (req, res) {

    try {

      const selectedProduct = await product.findByPk(req.params.id);
      res.render("./products/deleteSure", { selectedProduct });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al mostrar el producto a eliminar', 500);
    }

  },
  destroy: async function (req, res) {

    try {

      await product.delete(req.params.id);
      res.redirect("/products");

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al eliminar el producto', 500);
    }

  },
};

module.exports = controller;
