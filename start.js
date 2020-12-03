const mongoose = require('mongoose');
//import environmental variables from our variables.env file
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error(`failed to connect → ${err.message}`);
});

//import all of our models
require('./models/Account');

const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});