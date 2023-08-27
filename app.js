const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');

const User = require('./models/user');

const MONGODB_URI = `mongodb+srv://Sunny:${process.env.DB_PASSWORD}@cluster0.ars0ie4.mongodb.net/shop?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collections: 'sessions',
});

// by default in pugs it looks into the views folder for the html but here we define the views, views just for illustartion
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
    // `mongodb+srv://Sunny:${process.env.DB_PASSWORD}@cluster0.ars0ie4.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
