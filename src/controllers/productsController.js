const { validationResult } = require("express-validator");
const { handleError, formatDataProduct } = require('../tools/extraFunctions');
const db = require("../database/models");

const controller = {
  cart: function (req, res) {
    res.render("./products/cart");
  },
  detail: async function (req, res) {
    try {

      const selectedProduct = await db.Product.findOne({ where: { uuid: req.params.id }, include: [{ association: 'tiene_una_category' }] });
      res.render("./products/productDetail", { selectedProduct });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al cargar la vista de detalle de un producto', 500);
    }

  },
  add: async function (req, res) {
    try {
      const categorias = await db.Category.findAll();
      res.render("./products/productAdd", { categorias });
    } catch (error) {
      console.log(error);
      handleError(res, 'Error al cargar el formulario de añadir producto', 500);
    }
  },
  create: async function (req, res) {

    try {

      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        const categorias = await db.Category.findAll();
        let oldBody = req.body;
        errors = errors.mapped();
        res.render("./products/productAdd", { errors, oldBody, categorias });
        return;
      }

      formatDataProduct(req);
      const body = req.body;
      const id_category = body.category;
      delete body.category;
      const newProduct = {
        id_category,
        id_user: req.session.userLogued.id,
        ...body,
        image: JSON.stringify({
          public_id: req.file.public_id,
          url: req.file.cloudinaryUrl
        })
      }

      await db.Product.create(newProduct);
      return res.redirect("/products");

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al registar el producto', 500);
    }

  },
  edit: async function (req, res) {

    try {
      const UUIDProducto = req.params.id;
      const productoAactualizar = await db.Product.findOne({ where: { uuid: UUIDProducto } });
      const categorias = await db.Category.findAll();

      res.render("./products/productEdit", {
        productoAactualizar, categorias
      });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al cargar el formulario de actualizar producto', 500);
    }

  },

  update: async function (req, res) {

    try {

      const UUIDProducto = req.params.id;
      const productoAactualizar = await db.Product.findOne({ where: { uuid: UUIDProducto } });
      let errors = validationResult(req);
      let condicionDeActualizacion = Object.keys(errors.mapped()).length === 1 &&
        errors.mapped()?.image.msg.includes("imagen");


      if (!errors.isEmpty() && !condicionDeActualizacion) {
        const categorias = await db.Category.findAll();
        let oldBody = req.body;
        errors = errors.mapped();
        res.render("./products/productEdit", { errors, oldBody, productoAactualizar, categorias });
        return;
      }

      formatDataProduct(req);
      const body = req.body;
      const id_category = body.category;
      delete body.category;
      const updateProduct = {
        id_category,
        ...body,
        image: JSON.stringify({
          public_id: req.file?.public_id || JSON.parse(productoAactualizar.image).public_id,
          url: req.file?.cloudinaryUrl || JSON.parse(productoAactualizar.image).url
        })
      }

      await db.Product.update(updateProduct, { where: { id: productoAactualizar.id } });
      return res.redirect("/products");

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al actualizar el producto', 500);
    }

  },
  list: async function (req, res) {

    try {

      const allProducts = await db.Product.findAll({ include: [{ association: 'tiene_una_category' }] });
      res.render("./products/listaProductos", { allProducts });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al listar los productos', 500);
    }

  },
  delete: async function (req, res) {

    try {

      const selectedProduct = await db.Product.findOne({ where: { uuid: req.params.id }, include: [{ association: 'tiene_una_category' }] });
      res.render("./products/deleteSure", { selectedProduct });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al mostrar el producto a eliminar', 500);
    }

  },
  destroy: async function (req, res) {

    try {

      await db.Product.destroy({ where: { uuid: req.params.id } });
      res.redirect("/products");

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al eliminar el producto', 500);
    }

  },
};

module.exports = controller;
