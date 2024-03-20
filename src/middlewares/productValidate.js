const { body } = require("express-validator");
const path = require('path');

module.exports = validate = [
  body("name").notEmpty().withMessage("El nombre no puede estar vacio").bail()
    .isAlphanumeric('es-ES', { ignore: ' -_' }).withMessage("El nombre debe ser alfanumerico").bail()
    .isLength({ min: 5 }).withMessage(`El nombre del producto debe tener como minimo 5 caracteres`),
  body("category").notEmpty().withMessage("Tiene que elegir una categoría"),
  body("price")
    .notEmpty()
    .withMessage("El precio no puede estar vacio").bail()
    .isNumeric()
    .withMessage("El precio debe ser numerico").bail()
    .isFloat({ gt: 0 }).withMessage("El precio debe ser un numero positivo"),
  body("year")
    .notEmpty()
    .withMessage("El año no puede estar vacio").bail()
    .isNumeric()
    .withMessage("El año debe ser numerico").bail()
    .isInt({ gt: 1799, lt: 2026 }).withMessage("El año debe mayor o igual a 1800 y menor o igual que 2025"),
  body("state_embarcation")
    .notEmpty()
    .withMessage("El estado no puede estar vacio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion no puede estar vacia").bail()
    .isAlphanumeric('es-ES', { ignore: ' -_.*/()&#%,:°;\r?\n' }).withMessage("La descripcion debe ser alfanumerica").bail()
    .isLength({ min: 20 }).withMessage(`La descripción del producto debe tener como minimo 20 caracteres`),
  body("image").custom((value, { req }) => {

    let file = req.file;
    let acceptedExtension = ['.png', '.jpg', '.jpeg', '.gif'];

    if (!file) {
      throw new Error("Debe cargar 1 imagen");
    } else {

      if (!acceptedExtension.includes(path.extname(file.originalname))) {
        throw new Error("¡Solo .png, .jpg, .jpeg y .gif son los formatos permitidos!");
      }

    }
    return true;
  }),
];
