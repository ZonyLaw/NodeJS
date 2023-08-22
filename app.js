const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

// by default in pugs it looks into the views folder for the html but here we define the views, views just for illustartion
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64e52ceb5d9994a5d1685eeb')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://Sunny:${process.env.DB_PASSWORD}@cluster0.ars0ie4.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log('Connected!');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
