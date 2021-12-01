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
    const marketPair = generateMarketPair(base_currency, quote_currency);
    const orderBookURL = generateFTXOrderBookURL(marketPair); 

    // Step 01: Request to the FTX order book
    const orderBooks = await getOrderBookResponse(orderBookURL, res);
    
    return orderBooks;
    
    // Step 02: Confirm the income to order book
    
    // Step 03: Find the match and response
}