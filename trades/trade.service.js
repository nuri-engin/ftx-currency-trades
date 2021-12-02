// Call the constants/configs
const { STATUS_CODES } = require('../constants');

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
 * Main handler function to grab consumer request payload, compare it with FTX `orderbook` API,
 * Provide calculations to find the best offer and response back it to consumer.
 * 
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
     amount = Number(amount);
     
     // Determine between 'bids/asks': Consumer's "BUY" request goes to orderbook.asks and "SELL" request goes into the orderbook.bids.
     const bidsOrAsks = determineBidsOrAsks(action);
     const marketPair = generateMarketPair(base_currency, quote_currency);
     const orderBookURL = generateFTXOrderBookURL(marketPair); 

     // Get all ORDERS from market.
     const orderBooks = await getOrderBookResponse(orderBookURL, res);

     // Find out consumer based orderbooks stack.
     const filteredOrderBooks = !!orderBooks && !!bidsOrAsks && orderBooks.message[bidsOrAsks];

     // Grab the consumer's 'amount': We will need to use 'amount' value provided by the consumer in both case for 'bids/asks'.
     // Compare to orderbook: Find the most closest 'amount' value from orderbook regarding 'bids/asks' differentiation.
     const closestOrder = !!filteredOrderBooks && findClosest(filteredOrderBooks, amount);

     // Left-out amount: So we have compared the values and now store the extra value between two amount of orderbook and consumer.
     const totalAmount = !!closestOrder && amount + closestOrder.diff;

     // Aggreation process: Multiply one unit amount price to the left-out amount value (left-out amount * one-unit amount price)
     const aggreatedPrice = !!totalAmount && totalAmount * closestOrder.unitPrice; 

     // Response back to the consumer; 
     // Firstly ensure no any problem left behind!
     if (!aggreatedPrice && !totalAmount) {
        return {
            status: STATUS_CODES.badRequest,
            message: "Something went wrong!"
        };
     }

     // If all fine, then, let's inform the consumer...
     return {
        total: totalAmount.toFixed(4), 
        price: aggreatedPrice.toFixed(4),
        currency: quote_currency
     };
}