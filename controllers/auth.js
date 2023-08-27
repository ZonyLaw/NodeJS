const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1];

  const isLoggedIn = req.get('Cookie');
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('64e52ceb5d9994a5d1685eeb')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
