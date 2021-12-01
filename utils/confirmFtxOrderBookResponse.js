/**
 * Responsible function to ensure we got correct response from the FTX Order book.
 * Here we will check two things; The 'status' value and the 'statusText'.
 * 
 * @param {Object} res Response object.
 * @returns {Boolean} True or false result for logic.
 */
 const confirmFtxOrderBookResponse = function (res) {
    return (
        !!res &&
        res.status === 200 &&
        res.statusText === 'OK'
    );
} 

module.exports = confirmFtxOrderBookResponse;