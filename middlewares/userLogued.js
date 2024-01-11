module.exports = function userLogued(req, res, next) {
  const user = require("../models/Usuarios");
  if (req.cookies.userEmail) {
    req.session.userLogued = user.findByField("email", req.cookies.userEmail);
  }
  if (req.session.userLogued) {
    console.log("EL USUARIO ESTA LOGUEADO Y NO PUEDE ACCEDER");
    return res.redirect("/products");
  }
  next();
};
