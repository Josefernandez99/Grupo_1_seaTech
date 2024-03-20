const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer.Middleware');

const controller = require('../../controllers/api/productsAPIController')

//Listado de productos
router.get('/', controller.list);

//Vista de un producto en particular
router.get('/detail/:id', controller.detail);

//Procesar la creación de un producto
router.post("/create", upload.single('image'), controller.create);

//Procesar la edición de un producto en particular
router.put('/detail/:id/update', upload.single('image'), controller.update);

//Eliminar producto
router.delete("/detail/:id/destroy", controller.destroy);


module.exports = router;