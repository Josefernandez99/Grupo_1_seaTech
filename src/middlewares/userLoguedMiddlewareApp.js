const db = require('../database/models');
const { handleError } = require('../tools/extraFunctions');

module.exports = async function userLogued(req, res, next) {

  if (req.cookies.userEmail) {
    
    try {
      req.session.userLogued = await db.User.findOne({ where: { email: req.cookies.userEmail } })
    } catch (error) {
      console.log(error);
      handleError(res, 'Error en al encontrar el Usuario - Middleware userLoged', 500);
    }
  }

  if (req.session.userLogued) {
    res.locals.userLogued = req.session.userLogued;
  }

  next();
};
