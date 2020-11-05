const express = require('express');
const sha256 = require('sha256');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  /* if user on session redirect to main page - unable to login */
  if (res.locals.user) {
    res.redirect('/');
  }
  res.render('signin');
});

router.post('/', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: sha256(req.body.password),
  });
  if (user) {
    req.session.user = user;
    return res.status(200).end();
  }
  return res.status(401).end();
});

module.exports = router;
