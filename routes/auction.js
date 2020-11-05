const express = require('express');
const router = express.Router();
const Auction = require('../models/auction');

router.get('/:id', async (req, res, next) => {
  const auction = await Auction.findOne({_id: req.params.id}).populate('author');
  res.render('auction', { auction, user: res.locals?.user });
});

module.exports = router;
