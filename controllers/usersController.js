const user = require("../models/Usuarios");
const bcriptjs = require("bcryptjs");
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
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },
  register: function (req, res) {
    res.render("./users/register");
  },
  registerUser: function (req, res) {
    req.body.password = bcriptjs.hashSync(req.body.password, 10);
    user.create(req.body);
    res.redirect("./login");
  },
};

module.exports = controller;
