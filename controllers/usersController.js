const user = require("../tools/Usuarios");
const bcriptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const getProvincias = require('../tools/provincias');
<<<<<<< HEAD
const { handleValidationErrors, handleExistingUser, hashPasswordAndFormatData, handleError } = require('../tools/extraFunctionsUser');
=======
>>>>>>> b53466c50209c5b758e512870f9d692a00a79f12

const imgUserDefault = {
  public_id: 'seatech/user_default_image',
  url: 'https://res.cloudinary.com/draudtuyr/image/upload/v1705370913/seatech/user_default_image.jpg'
}

const controller = {
  login: function (req, res) {
    res.render("./users/login");
  },
  checkLogin: function (req, res) {
    let userToFind = user.findByField("email", req.body.email);
    userToFind = userToFind.pop();
    if (userToFind) {
      if (bcriptjs.compareSync(req.body.password, userToFind.password)) {
        console.log("USUARIO RECONOCIDO");
        delete userToFind.password;
        req.session.userLogued = userToFind;
        if (req.body.rememberMe) {
          res.cookie("userEmail", req.body.email, { maxAge: 600000 });
        }
      }
    }
    res.redirect("/products");
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
      res.status(500).json({ error: 'Error al cargar la vista de Registro' });
    }

<<<<<<< HEAD
  },
  registerUser: async function (req, res) {

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        handleValidationErrors(req, res, errors);
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
      handleError(res, 'Error al registrar usuario', 500);
=======


  },
  registerUser: async function (req, res) {

    let errors = validationResult(req);

    if (errors.isEmpty()) {

      req.body.password = bcriptjs.hashSync(req.body.password, 10);
      req.body.telefono = `+54 9 ${req.body.telefono}`;

      const newUser = {
        ...req.body,
        category: 0,//0: Comprador | 1: Vendedor+Comprador | 2: Admin (sujeto a cambios)
        image: req.file?.public_id ? { public_id: req.file.public_id, url: req.file.cloudinaryUrl } : imgUserDefault
      }

      user.create(newUser);
      res.redirect("./login");

    }

    let oldBody = req.body;
    errors = errors.mapped();
    delete oldBody.password;

    try {

      const provincias = await getProvincias();

      res.render("./users/register", { errors, oldBody, provincias });

    } catch (error) {

      res.status(500).json({ error: 'Error al registrarse' });

>>>>>>> b53466c50209c5b758e512870f9d692a00a79f12
    }

  }
};

module.exports = controller;
