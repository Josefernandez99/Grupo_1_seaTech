const express = require("express");
const route = express.Router();
const usersController = require("../controllers/usersController");
const userLogued = require("../middlewares/userLogued");

route.get("/login", userLogued, usersController.login);
route.post("/login", usersController.checkLogin);

route.get("/register", userLogued, usersController.register);
route.post("/register", usersController.registerUser);

route.get("/logout", usersController.logout)
route.post("/logout", usersController.logoutP);

module.exports = route;
