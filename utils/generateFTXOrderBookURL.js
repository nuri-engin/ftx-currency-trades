/**
 * Responsible function to generate a FTX orderbook url.
 * 
 * @param {String} marketPair Expected value CURR/CURR
 * @returns {String} A valid URL for the FTX.
 */
const generateFTXOrderBookURL = function (marketPair) {
    // No need to provide depth while the API doc says the default is 20
    // See {@link https://docs.ftx.com/#get-orderbook}
    return `https://ftx.com/api/markets/${marketPair}/orderbook`;
} 

module.exports = generateFTXOrderBookURL;