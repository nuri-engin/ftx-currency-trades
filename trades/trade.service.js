// Call the utils/helper functions
const generateMarketPair = require('../utils/generateMarketPair');
const generateFTXOrderBookURL = require('../utils/generateFTXOrderBookURL');
const getOrderBookResponse = require('../utils/getOrderBookResponse');
const determineBidsOrAsks = require('../utils/determineBidsOrAsks');
const findClosest = require('../utils/findClosest');

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
     // Ensure to convert amount to the Number!
     // Let convert the 'amount' if exist...
     amount = Number(amount);
     
     // 1. Determine between 'bids/asks': Consumer's "BUY" request goes to orderbook.asks and "SELL" request goes into the orderbook.bids.
     const marketPair = generateMarketPair(base_currency, quote_currency);
     const orderBookURL = generateFTXOrderBookURL(marketPair); 

     // Get all ORDERS from market
     const orderBooks = await getOrderBookResponse(orderBookURL, res);

     // Find out consumer asks for BIDS or ASKS
     const bidsOrAsks = determineBidsOrAsks(action);
     const filteredOrderBooks = !!orderBooks && !!bidsOrAsks && orderBooks.message[bidsOrAsks]

     // 2. Grab the consumer's 'amount': We will need to use 'amount' value provided by the consumer in both case for 'bids/asks'.
     // 3. Compare to orderbook: Find the most closest 'amount' value from orderbook regarding 'bids/asks' differentiation.
     const comparedOrder = !!filteredOrderBooks && findClosest(filteredOrderBooks, amount);

     // 4. Left-out amount: So we have compared the values and now store the extra value between two amount of orderbook and consumer.
     const totalAmount = amount + comparedOrder.gap;

     // 5. Aggreation process: Multiply one unit amount price to the left-out amount value (left-out amount * one-unit amount price)
     const aggreatedPrice = totalAmount * comparedOrder.unitPrice ; 

     // 6.Response back to the consumer with the final quote which is a weighted average of newly price.
     return {
         total: totalAmount.toFixed(4), //Total quantity of quote currency
         price: aggreatedPrice.toFixed(4), // The per-unit cost of the base currency
         currency: quote_currency
     };
}