const express = require('express');
const router = express.Router();
const Auction = require('../models/auction');

// checking if user logged in (if username in req.session)
const CheckUser = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.get('/', CheckUser, async (req, res, next) => {
  const auctions = await Auction.find().populate('author');
  res.render('index', { auctions, user: res.locals?.user });
});

module.exports = router;
