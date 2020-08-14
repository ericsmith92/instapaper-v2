const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
//create our Express app
const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// pass variables to our templates + all requests
app.use((req, res, next) => {
    res.locals.h = helpers;
    next();
});

//finally we hit our routes
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);


if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandlers.developmentErrors);
  }

module.exports = app;