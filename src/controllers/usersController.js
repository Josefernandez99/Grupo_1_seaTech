const bcriptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const getProvincias = require('../tools/provincias');
const { handleExistingUser, hashPasswordAndFormatData, handleError } = require('../tools/extraFunctions');
const db = require('../database/models');

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

      let userToFind = await db.User.findOne({ where: { email: req.body.email } });

      if (!userToFind) {

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

      req.session.userLogued = userToFind;

      //CARRITO si es que tiene
      req.session.cart = [];
      let carrito = await db.Cart_Item.findAll({ where: { id_user: userToFind.id }, include: [{ association: 'contiene_un_product' }] });
      if (carrito.length > 0) {

        req.session.cart = carrito.map(elemento => {
          return { id: elemento.contiene_un_product.uuid, cant: elemento.quantity }
        });
      }

      if (req.body.rememberMe) {
        res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 10 });
      }

      res.redirect(`/user/profile/${req.session.userLogued.uuid}`);

    } catch (error) {
      console.log(error);
      handleError(res, 'Error en el proceso de logueo', 500);
    }
  },
  logout: function (req, res) {
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

      const existingUser = await db.User.findOne({ where: { email: req.body.email } });

      if (existingUser) {
        handleExistingUser(req, res);
        return;
      }

      hashPasswordAndFormatData(req);

      const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        address: req.body.address,
        province: req.body.provincia,
        phone: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
        rol: 1, // 1: Vendedor+Comprador | 2: Admin
      };

      if (req.file?.public_id) {
        newUser.image = JSON.stringify({ public_id: req.file.public_id, url: req.file.cloudinaryUrl })
      }

      await db.User.create(newUser);
      res.redirect("./login");
    } catch (error) {
      console.log(error);
      handleError(res, 'Error al registrar usuario', 500);
    }

  },
  profile: function (req, res) {
    return res.render("./users/profile", { user: req.session.userLogued })
  }
};

module.exports = controller;