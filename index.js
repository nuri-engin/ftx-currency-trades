// App basics
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Call the middlewares
const authCheck = require('./middlewares/authCheck');

// Call the constants/configs
const { PATHS } = require('./constants');

// Define inline constants (some can move to the /configs for env usage)
const PORT = 4000;

// Set the middleware
app.use(authCheck);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set paths/routes
require('./base/base.controller')(app); 
require('./trades/trade.controller')(app); 

app.listen(PORT, () => {
    console.log('Server is running on PORT ' + PORT);
});