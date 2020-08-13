const express = require('express');
const routes = require('./routes/index');
const path = require('path');
//create our Express app
const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);

module.exports = app;