// Call third-party dependencies
const axios = require('axios');

// Call the constants/configs
const { STATUS_CODES } = require('../constants');

// Call the utils/helper functions
const confirmFtxOrderBookResponse = require('./confirmFtxOrderBookResponse');

/**
 * Uses the 'axios' to request FTX's 'orderbook' API.
 * Simply returns the pairs for offer and sell.
 * 
 * @param {String} orderBookURL The expected URL to request for orderbook.
 * @returns {Array} Response of bids and asks.
 */
const getOrderBookResponse = async (orderBookURL, res) => {
    return axios.get(orderBookURL)
        .then(orderBookRes => {
            if (!confirmFtxOrderBookResponse(orderBookRes)) {
                res.status(400).send({
                    status: STATUS_CODES.badRequest,
                    message: "Something got wrong!"
                });
            }

            return {
                status: STATUS_CODES.success,
                message: orderBookRes.data.result
            };

        })
        .catch(err => {
            res.status(400).send({
                status: STATUS_CODES.badRequest,
                message: err
            });
        });
}

module.exports = getOrderBookResponse;