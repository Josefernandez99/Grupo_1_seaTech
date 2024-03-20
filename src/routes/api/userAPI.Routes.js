const express = require("express");
const router = express.Router();
const upload = require('../../middlewares/multer.Middleware');

const controller = require('../../controllers/api/usersAPIController'); // Cambio de productos a usuarios

// Listado de usuarios
router.get('/', controller.list);

// Vista de un usuario en particular
router.get('/detail/:id', controller.detail);

// Procesar la creación de un usuario
router.post("/create", upload.single('image'), controller.create);

// Procesar la edición de un usuario en particular
router.put('/detail/:id/update', upload.single('image'), controller.update);

// Eliminar usuario
router.delete("/detail/:id/destroy", controller.destroy);

module.exports = router;