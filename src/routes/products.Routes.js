const express = require("express");
const route = express.Router();
const productsController = require("../controllers/productsController");
const productValidate = require("../middlewares/productValidate");
const upload = require('../middlewares/multer.Middleware');
const { cloudinaryMiddleware } = require("../middlewares/cloudinary.Middleware");
const authMiddleware = require("../middlewares/authMiddlewareRoute");

//Listado de productos
route.get("/", productsController.list);

//Vista del carrtito
route.get("/cart", productsController.cart);
route.post("/cart", productsController.cartAdd);

//Vista de crear un producto
route.get("/add", authMiddleware, productsController.add);

//Procesar la creación de un producto
route.post("/create", upload.single('image'), productValidate, cloudinaryMiddleware, productsController.create);

//Vista de un producto en particular
route.get("/detail/:id", productsController.detail);

//Vista de editar un producto en particular
route.get("/detail/:id/edit", authMiddleware, productsController.edit);

//Procesar la edición de un producto en particular
route.put('/detail/:id/update', upload.single('image'), productValidate, cloudinaryMiddleware, productsController.update);

//Eliminar producto
route.get("/detail/:id/delete", authMiddleware, productsController.delete);
route.delete("/detail/:id/destroy", productsController.destroy);

module.exports = route;
