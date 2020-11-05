const express = require('express');
const router = express.Router();

// checking if user logged in (if username in req.session)
const CheckUser = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.get('/', CheckUser, async (req, res, next) => {
  res.render('profile', { user: res.locals?.user });
});

module.exports = router;
