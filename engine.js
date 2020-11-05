require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const hbs = require('hbs'); 

// import routers
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const regRouter = require('./routes/regRouter');
const entriesRouter = require('./routes/entries');

// middleware for reslocals
function resLocal(app) {
  app.use((req, res, next) => {
    res.locals.user = req.session?.user;
    next();
  });
}

// routes
function routers(app) {
  app.use('/', indexRouter);
  app.use('/login', loginRouter);
  app.use('/registration', regRouter);
  app.use('/entries', entriesRouter);
  app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
  });
}

// connecting to the mongoose
function dbconnect() {
  mongoose.connect(`${process.env.DB_HOST}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: false }, () => console.log('Mongoose connected'));
}

// session storage
const month = 1000*60*60*24*30; // variable with month in milesecond
function sessionStore(app) {
  app.use(session({
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(`${process.env.DB_HOST}`, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false })
    }),
    secret: `${process.env.DB_SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: month, httpOnly: false },
  }));
}

// initial settings
function initialSet(app) {
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, 'views'));
  
  // register partials
  hbs.registerPartials(`${__dirname}/views/partials`);

  app.use(express.static(path.join(__dirname, 'public')));
  
  //parse through post request
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
}

// handling error
const port = process.env.PORT ?? 3000
function ErrorHandler(app) {
  // 404
  app.use((req, res, next) => {
    console.log(`>>>>>${req.url}<<<<< This ROUTE not FOUND 4-0-4`);
    next();
  });
  // error
  app.use((err, req, res, next) => {
    console.error(err);
    next();
})
}

// hosting
function host(app) {
  app.listen(port, () => console.log(`hosting on ${port}`));
}
module.exports = { dbconnect, sessionStore, initialSet, ErrorHandler, host, routers, resLocal };
