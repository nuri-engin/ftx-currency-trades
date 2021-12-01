module.exports = {
    proceedTradeRequest
};

/**
 * @param action (String): Either “buy” or “sell”
 * @param base_currency (String): The currency to be bought or sold
 * @param quote_currency (String): The currency to quote the price in
 * @param amount (String): The amount of the base currency to be traded     
 * @returns Object {
 *      total (String): Total quantity of quote currency
 *      price (String): The per-unit cost of the base currency
 *      currency (String): The quote currency
 * }
 */
 async function proceedTradeRequest({ action, base_currency, quote_currency, amount }) {
    // Step 01: Request to the FTX order book
    // Step 02: Confirm the income to order book
    // Step 03: Find the match and response

    // Let's return only the incoming request till providing the logic
    return {
        action, base_currency, quote_currency, amount
    };
}
