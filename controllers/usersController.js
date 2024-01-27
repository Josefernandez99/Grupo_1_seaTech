const user = require("../tools/Usuarios");
const bcriptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const getProvincias = require('../tools/provincias');
const { handleExistingUser, hashPasswordAndFormatData, handleError } = require('../tools/extraFunctions');

const imgUserDefault = {
  public_id: 'seatech/user_default_image',
  url: 'https://res.cloudinary.com/draudtuyr/image/upload/v1705370913/seatech/user_default_image.jpg'
}

const controller = {
  login: function (req, res) {
    res.render("./users/login");
  },
  checkLogin: async function (req, res) {

    try {

      let errors = validationResult(req);
      let condicionDeLogueo = typeof (errors.mapped().email) == 'undefined' &&
        (typeof (errors.mapped().password) == 'undefined' || errors.mapped().password.msg.includes('débil'));

      if (!errors.isEmpty() && !condicionDeLogueo) {
        errors = errors.mapped();
        res.render("./users/login", { errors });
        return;
      }

      let userToFind = await user.findByField("email", req.body.email).pop();

      if (!userToFind) {
        console.log('DENTRO DE VALIDACION DE USUARIO EXISTENTE');
        const errors = { email: { msg: 'Usuario no registrado' } };
        res.render("./users/login", { errors });
        return;
      }

      if (!bcriptjs.compareSync(req.body.password, userToFind.password)) {
        const errors = { email: { msg: 'Credenciales incorrectas' } };
        res.render("./users/login", { errors });
        return;
      }

      delete userToFind.password;
      console.log("USUARIO RECONOCIDO");
      req.session.userLogued = userToFind;
      if (req.body.rememberMe) {
        res.cookie("userEmail", req.body.email, { maxAge: 600000 });
      }
      res.redirect("/products");


    } catch (error) {
      console.log(error);
      handleError(res, 'Error en el proceso de logueo', 500);
    }
  },
  logout: function (req, res) {
    res.render("./users/logout");
  },
  logoutP: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
  register: async function (req, res) {

    try {

      const provincias = await getProvincias();

      res.render("./users/register", { provincias });

    } catch (error) {
      console.log(error);
      handleError(res, 'Error al cargar la vista de Registro', 500);
    }

  },
  registerUser: async function (req, res) {

    try {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        let oldBody = req.body;
        errors = errors.mapped();
        delete oldBody.password;
        const provincias = await getProvincias();
        res.render("./users/register", { errors, oldBody, provincias });

        return;
      }

      const existingUser = await user.findByField('email', req.body.email).pop();

      if (existingUser) {
        handleExistingUser(req, res);
        return;
      }

      hashPasswordAndFormatData(req);

      const newUser = {
        ...req.body,
        category: 0, // 0: Comprador | 1: Vendedor+Comprador | 2: Admin (sujeto a cambios)
        image: req.file?.public_id ? { public_id: req.file.public_id, url: req.file.cloudinaryUrl } : imgUserDefault
      };

      user.create(newUser);
      res.redirect("./login");
    } catch (error) {
      console.log(error);
      handleError(res, 'Error al registrar usuario', 500);
    }

  }
};

module.exports = controller;
