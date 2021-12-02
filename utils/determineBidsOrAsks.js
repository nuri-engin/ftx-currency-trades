// Call the constants/configs
const { ACTION_TYPES } = require('../constants');

/**
 * Simply vice-versa between consumer notation and FTX's orderbook response convention.
 * If consumer wants to buy, then it means look at the orders for asked to be sold on FTX side.
 * 
 * @param {String} action Consumer's "BUY" or "SELL" notation.
 * @returns {String} One of the proper notation or empty string by default.
 */
function determineBidsOrAsks(action) {
    return (
        action === ACTION_TYPES.buy ? 
        'asks' : 
        action === ACTION_TYPES.sell ? 
        'bids' : 
        ''
    );
}

module.exports = determineBidsOrAsks;