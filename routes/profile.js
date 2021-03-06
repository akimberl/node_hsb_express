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

/* getting profile page */
router.get('/', CheckUser, async (req, res, next) => {
  const auctions = await Auction.find({author: res.locals?.user._id }) // looking auction of user who logged in
  res.render('profile', { auctions, user: res.locals?.user });
});

/* getting form to add auction */
router.get('/auc', CheckUser, async (req, res, next) => {
  res.render('itemsform', { user: res.locals?.user });
});

/* saving new auction */
router.post('/auc', CheckUser, async (req, res) => {
  const auction = new Auction({
    name: req.body.name,
    author: res.locals.user._id,
    condition: req.body.condition,
    startsAt: req.body.startsAt,
    endsAt: req.body.endsAt,
    description: req.body.description,
  });

  /* saving obj to mongodb and returning status */
  auction.save()
    .then(() => {
      console.log('saved');
      res.status(200).end();
  })
    .catch(() => {
      res.status(401).end();
    })
});

/* getting form to update auction */
router.get('/auc/:id/edit', async (req, res) => {
  const auction = await Auction.findOne({_id: req.params.id}); // taking this obj so it render with previous
  res.render('itemsform', {auction});
});

/* Updating */
router.patch('/auc/:id/edit', (req, res) => {
  // updating auction
  Auction.findOneAndUpdate({_id: req.params.id}, {$set: {
    name: req.body.name,
    condition: req.body.condition,
    startsAt: req.body.startsAt,
    endsAt: req.body.endsAt,
    description: req.body.description,
  }})
    .then(() => {
      // console.log('updated');
      res.status(200).end();
    })
    .catch(() => {
      // console.log('could not update');
      res.status(401).end();
    })
});

/* Deleting */
router.delete('/auc/:id/delete', async function (req, res, next) {
  // deleting files
  if (req.session.user) {
    await Auction.deleteOne({'_id': req.params.id});
    return res.status(200).end()
  }
  res.status(400).end();
});

module.exports = router;
