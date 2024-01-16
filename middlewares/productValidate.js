const { body } = require("express-validator");

module.exports = validate = [
  body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("category").notEmpty().withMessage("La categoria no puede estar vacio"),
  body("price")
    .notEmpty()
    .withMessage("El precio no puede estar vacio")
    .isNumeric()
    .withMessage("El precio debe ser numerico"),
  body("year")
    .notEmpty()
    .withMessage("El año no puede estar vacio")
    .isNumeric()
    .withMessage("El año debe ser numerico"),
  body("state_embarcation")
    .notEmpty()
    .withMessage("El estado no puede estar vacio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion no puede estar vacio"),
  // body("imgage").custom((value, { req }) => {
  //   if (
  //     req.file.mimetype == "image/png" ||
  //     req.file.mimetype == "image/jpg" ||
  //     req.file.mimetype == "image/jpeg"
  //   ) {
  //     return true;
  //   } else {
  //     throw new Error("¡Solo .png, .jpg y .jpeg son los formatos permitidos!");
  //   }
  // }),
];
