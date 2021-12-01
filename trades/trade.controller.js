// App basics
const express = require('express');
const router = express.Router();

// Call the services
const tradeService = require('./trade.service');

// Call the constants/configs
const { PATHS, STATUS_CODES } = require('../constants');

module.exports = app => {
    app.post(PATHS.TRADE, handleTradeRequest);
};

// The is the determine/controller function. Firstly we will ensure the request provides all the main needs to proceed next step
// If all requirements are satisfied then, we will simply call/delegate to the service handler to finalize the rest of the logic.
function handleTradeRequest(req, res, next) {
    const { action, base_currency, quote_currency, amount } = req.body;

    // Handle error-first convention.
    if (!action && !base_currency && !quote_currency && !amount) {
        res.status(400).send({
            status: STATUS_CODES.badRequest,
            message: "We cannot proceed with the request! There are missing payload values..."
        });
    }

    tradeService.proceedTradeRequest({ action, base_currency, quote_currency, amount })
        .then((action) => {
            res.json(action);
        })
        .catch(next);
}