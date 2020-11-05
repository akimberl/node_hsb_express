const express = require('express');
const sha256 = require('sha256');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  /* if user on session redirect to main page - unable to register */
  if (res.locals.user) {
    res.redirect('/');
  }
  res.render('signup');
});

router.post('/', (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: sha256(req.body.password),
  });
  user.save()
    .then(() => {
      console.log('usersaved');
      res.status(200).end();
    })
    .catch((err) => {
      console.log('user not saved');
      res.status(401).end();
    });
});

module.exports = router;
