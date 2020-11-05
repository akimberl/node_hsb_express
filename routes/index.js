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
  // TODO: логика заполнения entries
  res.render('index', { user: res.locals?.user });
});

// ДОБАВЛЕНИЕ
/* router.post('/', async function (req, res, next) {
  // TODO: добавление чего-либо в БД
    const newEntry = new Entry({ title: req.body.title, body: req.body.body });
    await newEntry.save();
    res.redirect(`/entries/${newEntry.id}`);
});

//ФОРМА НОВОГО ЭЛЕМЕНТА
router.get('/new', CheckUser, (req, res, next) => {
  res.render('entries/new', { name: res.locals.user.username });
}); */

//СТРАНИЦА КАЖДОГО ЭЛЕМЕНТА
/* router.get('/:id', CheckUser, async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
    res.render('entries/show', { entry, name: res.locals?.user?.username });
}); */

// ИЗМЕНЕНИЕ ЭЛЕМЕНТА
/* router.put('/:id', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
    // changing files
    entry.title = req.body.title;
    entry.body = req.body.body;
    await entry.save();

    res.redirect(`/entries/${entry.id}`);
}); */

// УДАЛЕНИЕ ЭЛЕМЕНТА
/* router.delete('/:id', async function (req, res, next) {
  // deleting files
  if (req.session.user) {
    await Entry.deleteOne({'_id': req.params.id});
    res.redirect('/');
  }
  res.render('error', {message: "No rights"});
}); */

// ФОРМА ИЗМЕНЕНИЯ ЭЛЕМЕНТА
/* router.get('/:id/edit', async function (req, res, next) {
  // editing certain files
  if (req.session.user) {
    let entry = await Entry.findById(req.params.id);
    res.render('entries/edit', { entry, name: res.locals.user.username });
  }
  res.render('error', {message: "No rights"});
}); */

// ФОРМА ОТПИСКИ ОТ КАНАЛА
/* router.get('/:id/unsubscribe', async function (req, res, next) {
  // editing certain files
  if (req.session.user) {
    const user = await User.findById(req.session.user.id);
    await User.updateOne({_id: user._id}, {$pull: {channels: req.params.id}}) // pulling out of user
    await Channel.updateOne({_id: req.params.id}, {$pull : {users: user._id}}) // pulling out of channels
    res.redirect(`entries/${req.params.id}`, { entry, name: res.locals.user.username });
  }
  res.render('error', {message: "No rights"});
}); */

module.exports = router;
