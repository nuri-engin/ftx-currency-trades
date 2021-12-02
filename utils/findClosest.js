/**
 * Here is the main-logic which lays down with service (other than 'confirm...' functions)
 * 
 * So far, basically we fetched orderbook response from FTX and now time to find the closest value.
 * Here after we will not be worry about consumer's "buy" or "sell" decisions because of we just move around the already filtered orderbooks.
 * 
 * The logic goes within two main steps; Generating a new array which has objects of already calculated GAP value and unitPrice for each record.
 * Finally we sort with ASC mode the collected values between those gaps and grab the the first record of the newly generated array.
 * 
 * The rest of app logic will use the `gap` and `unitPrice` properties to finalize the process.
 * 
 * @param {Array} arr Array of orderbooks with dimensional stored arrays.
 * @param {Number} target The amount value that consumer provided. 
 * @returns {Object} Filtered record of closest match with `gap` and `unitPrice` values.
 */
function findClosest(arr, target) {

    // First step: Find out gaps
    let gapResultsArr = [];

    arr.forEach(orderArr => {
        // Find difference between target and current fella; Ensure to store a positive number for always.
        // Get the second index of array which references to the amount of this order.
        const gapValue = Math.abs(target - orderArr[1]); 

        // Store this gap and unit price to use later on...
        gapResultsArr.push({
            gap: gapValue,
            unitPrice: orderArr[0] / orderArr[1]
        });
    });

    // Secod step: Find out the closest gap.
    // Sort the array to grab closest value from gap value
    gapResultsArr.sort((current, next) => {
        return current.gap - next.gap;
    });
    
    // So now we have the lowest gap value on the array and we can use it only...
    return gapResultsArr.shift();
}
 
module.exports = findClosest;