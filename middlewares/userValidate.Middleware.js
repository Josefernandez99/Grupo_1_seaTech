const { body } = require("express-validator");
const path = require('path');

module.exports = validate = [
    body("firstName").notEmpty().withMessage("El campo nombre no puede estar vacio").bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage("El campo nombre debe contener solo letras"),

    body("lastName").notEmpty().withMessage("El campo apellido no puede estar vacio").bail()
        .isAlpha('es-ES', { ignore: ' ' }).withMessage("El campo apellido debe contener solo letras"),

    body("telefono").notEmpty().withMessage("El campo telefono no puede estar vacio").bail()
        .isNumeric().withMessage("El campo telefono debe ser numerico").bail()
        .isMobilePhone('es-AR').withMessage("El valor ingresado debe ser un numero de telefono"),

    body("direccion").notEmpty().withMessage("El campo direccion no puede estar vacio").bail()
        .isAlphanumeric('es-ES', { ignore: ' -_.°' }).withMessage("La direccion debe ser alfanumerica"),

    body("provincia").notEmpty().withMessage("Tiene que elegir una provincia"),

    body("email").notEmpty().withMessage("El campo email no puede estar vacio").bail()
        .isEmail().withMessage("El valor ingresado debe ser un email valido"),

    body("password").notEmpty().withMessage("El campo contraseña no puede estar vacio").bail()
        .isStrongPassword().withMessage("Contraseña debíl"),

    body("image").custom((value, { req }) => {

        let file = req.file;
        let acceptedExtension = ['.png', '.jpg', '.jpeg'];

        if (!acceptedExtension.includes(path.extname(file.originalname))) {
            throw new Error("¡Solo .png, .jpg y .jpeg son los formatos permitidos!");
        }

        return true;
    }),
];
