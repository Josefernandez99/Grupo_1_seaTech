const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer.Middleware');
const { cloudinaryMiddleware } = require("../../middlewares/cloudinary.Middleware");
const controller = require('../../controllers/api/productsAPIController')

//Listado de productos
router.get('/', controller.list);

//Vista de un producto en particular
router.get('/detail/:id', controller.detail);

//Listado de categorias
router.get('/categories', controller.listCategories);

//Vista de productos por categoria
router.get('/categories/:id', controller.productsXCategories);

//Procesar la creación de un producto
router.post("/create", upload.single('image'), cloudinaryMiddleware,controller.create);

//Procesar la edición de un producto en particular
router.put('/detail/:id/update', upload.single('image'), cloudinaryMiddleware, controller.update);

//Eliminar producto
router.delete("/detail/:id/destroy", controller.destroy);


module.exports = router;