/**
 * Responsible function to ensure consumer provided correct values.
 * This logic holds the application rules. App flow documents would relly on here...
 * 
 * TODO: Combine with 'Joi' {@ink https://joi.dev/api/}
 * 
 * @param action (String): Either “buy” or “sell”
 * @param base_currency (String): The currency to be bought or sold
 * @param quote_currency (String): The currency to quote the price in
 * @param amount (String): The amount of the base currency to be traded     
 * @returns {Boolean} Truthy result for logic.
 */
const confirmProceedTradeRequest = (action, base_currency, quote_currency, amount) => {
    // Let convert the 'amount' if exist...
    amount = !!amount && Number(amount);

    return (
        !!action && typeof action === 'string' && (action === 'buy' || action === 'sell') &&
        !!base_currency && typeof base_currency === 'string' &&
        !!quote_currency && typeof quote_currency === 'string' &&
        typeof amount === 'number' && !isNaN(amount)
    );
}

module.exports = confirmProceedTradeRequest;