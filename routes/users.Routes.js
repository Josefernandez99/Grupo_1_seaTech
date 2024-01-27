const express = require("express");
const route = express.Router();
const usersController = require("../controllers/usersController");
const upload = require('../middlewares/multer.Middleware');
const userValidate = require("../middlewares/userValidate.Middleware");
const { cloudinaryMiddleware } = require("../middlewares/cloudinary.Middleware");
const userLogued = require("../middlewares/userLogued");

route.get("/login", userLogued, usersController.login);
route.post("/login", userValidate, usersController.checkLogin);

route.get("/register", userLogued, usersController.register);
route.post("/register", upload.single('image'), userValidate, cloudinaryMiddleware, usersController.registerUser);

route.get("/logout", usersController.logout)
route.post("/logout", usersController.logoutP);

module.exports = route;
