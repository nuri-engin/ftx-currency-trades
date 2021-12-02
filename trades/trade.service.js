// Call the constants/configs
const { ACTION_TYPES } = require('../constants');

// Call the utils/helper functions
const generateMarketPair = require('../utils/generateMarketPair');
const generateFTXOrderBookURL = require('../utils/generateFTXOrderBookURL');
const getOrderBookResponse = require('../utils/getOrderBookResponse');

module.exports = {
    proceedTradeRequest
};

/**
 * @param action (String): Either “buy” or “sell”
 * @param base_currency (String): The currency to be bought or sold
 * @param quote_currency (String): The currency to quote the price in
 * @param amount (String): The amount of the base currency to be traded     
 * @returns {Object} {
 *      total (String): Total quantity of quote currency
 *      price (String): The per-unit cost of the base currency
 *      currency (String): The quote currency
 * }
 */
 async function proceedTradeRequest({ res, action, base_currency, quote_currency, amount }) {
    let marketPair;

    if (action === ACTION_TYPES.buy) {
        marketPair = generateMarketPair(base_currency, quote_currency);
    }

    if (action === ACTION_TYPES.sell) {
        marketPair = generateMarketPair(quote_currency, base_currency);
    }

    const orderBookURL = generateFTXOrderBookURL(marketPair); 

    // Step 01: Request to the FTX order book
    const orderBooks = await getOrderBookResponse(orderBookURL, res);
    
    // Step 02: Handle requests to buy or sell a particular amount of a currency (the base currency) with another currency (the quote currency)
    // Ensure to only support spot (not futures) markets on FTX.
    // Note that the quantity your user enters will rarely match a quantity in the order book exactly.

    // Step 03: Find the match and response
    // Code will need to aggregate orders in the order book or use parts of orders to arrive at the exact quantity, and your final quote will be a weighted average of those prices.
     
    const getTotalValue = 70; //Total quantity of quote currency
    const getPriceValue = 70; //The per-unit cost of the base currency

    return {
        total: getTotalValue,
        price: getPriceValue,
        currency: quote_currency
    };
}