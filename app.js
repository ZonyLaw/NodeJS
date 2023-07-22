const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

// const exphbs = require("express-handlebars");

// const hbs = exphbs.create({
//   layoutsDir: "views/layouts/",
//   defaultLayout: "main-layout",
//   extname: ".hbs",
// });

const app = express();

const errorController = require("./controllers/error");
const db = require("./util/database");
// app.engine("hbs", 'hbs.engine');

// by default in pugs it looks into the views folder for the html but here we define the views, views just for illustartion
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0], result[1]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
