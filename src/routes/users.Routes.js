const express = require("express");
const route = express.Router();
const usersController = require("../controllers/usersController");
/*const upload = require('../middlewares/multer.Middleware');
const userValidate = require("../middlewares/userValidate.Middleware");
const { cloudinaryMiddleware } = require("../middlewares/cloudinary.Middleware");
const guesMiddleware = require("../middlewares/guestMiddlewareRoute");
const authMiddleware = require("../middlewares/authMiddlewareRoute"); */

route.get("/login",  usersController.login);
route.post("/login",  usersController.checkLogin);

route.get("/register", usersController.register);
route.post("/register",  usersController.registerUser);

route.get("/logout", usersController.logout);

route.get("/profile/:id", usersController.profile);

module.exports = route;
