/**
 * Responsible function to generate a market pair.
 * 
 * @param {String} base_currency Any currency code.
 * @param {String} quote_currency Any currency code.
 * @returns {String} A proper market-pair string with '/` symbol between two currencies.
 */
const generateMarketPair = function (base_currency, quote_currency) {
    // Ensure values are uppercase
    const baseCurrency = base_currency.toUpperCase()
    const quoteCurrency = quote_currency.toUpperCase();

    return `${baseCurrency}/${quoteCurrency}`;
} 

module.exports = generateMarketPair;