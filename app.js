const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  layoutsDir: "views/layouts/",
  defaultLayout: "main-layout",
  extname: ".hbs",
});

const app = express();

app.engine("hbs", hbs.engine);

// by default in pugs it looks into the views folder for the html but here we define the views, views just for illustartion
app.set("view engine", "hbs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found!" });
});

app.listen(3000);
