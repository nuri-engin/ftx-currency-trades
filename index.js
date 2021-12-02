// App basics
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Call the middlewares
const authCheck = require('./middlewares/authCheck');

// Define inline constants (some can move to the /configs for env usage)
const PORT = 4000;

// Set the middleware
app.use(authCheck);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set paths/routes
// Firstly we will provide a warm welcome to consumer in case wondered about application.
require('./base/base.controller')(app); 
// The main route will be `trade` handler component.
require('./trades/trade.controller')(app); 

app.listen(PORT, () => {
    console.log('Server is running on PORT ' + PORT);
});