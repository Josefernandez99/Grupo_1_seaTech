const express = require("express");
const route = express.Router();
const usersController = require("../controllers/usersController");
const upload = require('../middlewares/multer.Middleware');
const userValidate = require("../middlewares/userValidate.Middleware");
const { cloudinaryMiddleware } = require("../middlewares/cloudinary.Middleware");
const guesMiddleware = require("../middlewares/guestMiddlewareRoute");
const authMiddleware = require("../middlewares/authMiddlewareRoute");

route.get("/login", guesMiddleware, usersController.login);
route.post("/login", userValidate, usersController.checkLogin);

route.get("/register", guesMiddleware, usersController.register);
route.post("/register", upload.single('image'), userValidate, cloudinaryMiddleware, usersController.registerUser);

route.get("/logout", authMiddleware, usersController.logout);

route.get("/profile/:id", authMiddleware, usersController.profile);

module.exports = route;
