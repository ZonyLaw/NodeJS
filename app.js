const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

<<<<<<< HEAD
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();
=======
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
>>>>>>> parent of a4a46f5 (install sequelize structure in app)

// by default in pugs it looks into the views folder for the html but here we define the views, views just for illustartion
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result[0], result[1]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

<<<<<<< HEAD
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// by applying force: true we redo the tables
sequelize
  .sync()
  .then((results) => {
    return User.findByPk(1);
    // console.log(results);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "sunny_law@hotmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log(user);
    user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(3000);
=======
app.listen(3000);
>>>>>>> parent of a4a46f5 (install sequelize structure in app)
