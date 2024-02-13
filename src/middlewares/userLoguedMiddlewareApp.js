const user = require("../tools/Usuarios");

module.exports = function userLogued(req, res, next) {

  if (req.cookies.userEmail) {
    req.session.userLogued = user.findByField("email", req.cookies.userEmail).pop();
  }

  if (req.session.userLogued) {
    res.locals.userLogued = req.session.userLogued;
  }

  next();
};
