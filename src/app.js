const express = require("express");
const app = express();
const cors = require('cors')
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const indexRoute = require("./routes/index.Routes");

const usersRoute = require("./routes/users.Routes");
const productsRoute = require("./routes/products.Routes");
const userLogued = require("./middlewares/userLoguedMiddlewareApp");

const productsAPIRoute = require("./routes/api/productsAPI.Routes");

const usersAPIRoute = require("./routes/api/userAPI.Routes");

app.use(express.static(path.join(__dirname, "../public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(cors())

app.use(
  session({
    secret: "MEGA SECRETO",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

app.use(userLogued);

app.use("/", indexRoute);
app.use("/user", usersRoute);
app.use("/products", productsRoute);

app.use("/products/api", productsAPIRoute);

app.use("/users/api", usersAPIRoute);


app.use((req, res, next) => {
  res.status(404).render("not-found");
});

const puerto = 3000;
app.listen(puerto, () =>
  console.log("Servidor corriendo puerto: http://localhost:" + puerto)
);
