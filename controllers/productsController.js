const { validationResult } = require("express-validator");
const product = require("../tools/Productos");

const controller = {
  cart: function (req, res) {
    res.render("./products/cart");
  },
  detail: async function (req, res) {
    const selectedProduct = await product.findByPk(req.params.id);
    res.render("./products/productDetail", { selectedProduct });
  },
  add: function (req, res) {
    res.render("./products/productAdd");
  },
  create: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let bodyCopy = { ...req.body };
      let price = Number(bodyCopy.price), year = Number(bodyCopy.year);
      delete bodyCopy.price;
      delete bodyCopy.year;
      const newProduct = {
        image: {
          public_id: req.file.public_id,
          url: req.file.cloudinaryUrl
        },
        price,
        year,
        ...bodyCopy
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

    res.render("./products/productEdit", {
      productoAactualizar
    });
  },

  update: function (req, res) {
    const idProducto = req.params.id;
    const productoAactualizar = product.findByPk(idProducto);
    let errors = validationResult(req);
    let condicionDeActualizacion = Object.keys(errors.mapped()).length === 1 &&
      errors.mapped().hasOwnProperty("image") &&
      errors.mapped().image.msg.includes("imagen");
    if (errors.isEmpty() || condicionDeActualizacion) {
      let bodyCopy = { ...req.body };
      let price = Number(bodyCopy.price), year = Number(bodyCopy.year);
      delete bodyCopy.price;
      delete bodyCopy.year;
      console.log(req.file);
      const updateProduct = {
        image: {
          public_id: req.file?.public_id || productoAactualizar.image.public_id,
          url: req.file?.cloudinaryUrl || productoAactualizar.image.url
        },
        price,
        year,
        ...bodyCopy
      }

      product.update(updateProduct, idProducto);
      return res.redirect("/products");
    }
    let oldBody = req.body;
    errors = errors.mapped();
    res.render("./products/productEdit", { errors, oldBody, productoAactualizar });
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
