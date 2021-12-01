/**
 * Responsible function to ensure we got correct response from the FTX Order book.
 * Here we will check two things; The 'status' value and the 'statusText'.
 *  This logic holds the application rules. App flow documents would relly on here...
 * 
 *  TODO: Combine with 'Joi' {@ink https://joi.dev/api/}
 * 
 * @param {Object} res Response object.
 * @returns {Boolean} Truthy result for logic.
 */
 const confirmFtxOrderBookResponse = function (res) {
    return (
        !!res &&
        res.status === 200 &&
        res.statusText === 'OK'
    );
} 

module.exports = confirmFtxOrderBookResponse;