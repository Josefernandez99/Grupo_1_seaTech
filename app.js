const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");

const indexRoute = require("./routes/index.Routes");

const usersRoute = require("./routes/users.Routes");
const productsRoute = require("./routes/products.Routes");

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(
  session({
    secret: "MEGA SECRETO",
  })
);

app.use("/", indexRoute);
app.use("/user", usersRoute);
app.use("/products", productsRoute);

app.use((req, res, next) => {
  res.status(404).render("not-found");
});

const puerto = 3000;
app.listen(puerto, () =>
  console.log("Servidor corriendo puerto: http://localhost:" + puerto)
);
