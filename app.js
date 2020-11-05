const express = require('express');
const { dbconnect, sessionStore, initialSet, ErrorHandler, host, routers, resLocal } = require('./engine');

const app = express();

// connecting to mongoose
dbconnect();

// session storage
sessionStore(app);

// setting view engine, statics and urlencoded
initialSet(app);

// resLocals
resLocal(app);

// routers
routers(app);

// error handler
ErrorHandler(app);

// hosting
host(app);
