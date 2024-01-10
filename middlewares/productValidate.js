const { body } = require("express-validator");

module.exports = validate = [
  body("name").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("lancha").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("price").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("year").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("state_embarcation")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio"),
  body("description").notEmpty().withMessage("El nombre no puede estar vacio"),
  body("img").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Se necesita 1 o mas imagenes");
    }
    if (
      req.file.mimetype == "image/png" ||
      req.file.mimetype == "image/jpg" ||
      req.file.mimetype == "image/jpeg"
    ) {
      return true;
    } else {
      throw new Error("¡Solo .png, .jpg y .jpeg son los formatos permitidos!");
    }
  }),
];
