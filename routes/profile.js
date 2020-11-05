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
  const auctions = await Auction.find({author: res.locals?.user._id }) // looking auction of user who logged in
  res.render('profile', { auctions, user: res.locals?.user });
});

router.get('/auc', CheckUser, async (req, res, next) => {
  res.render('itemsform', { user: res.locals?.user });
});

router.post('/auc', CheckUser, async (req, res, next) => {
  const auction = new Auction({
    name: req.body.name,
    author: res.locals.user._id,
    condition: req.body.condition,
    startsAt: req.body.startsAt,
    endsAt: req.body.endsAt,
    description: req.body.description,
  });

  auction.save()
    .then(() => {
      console.log('saved');
      res.status(200).end();
  })
    .catch(() => {
      res.status(401).end();
    })
});
module.exports = router;
