/**
 * Here is the main-logic which lays down with service (other than 'confirm...' functions)
 * 
 * So far, basically we fetched orderbook response from FTX and now time to find the closest value.
 * Here after we will not be worry about consumer's "buy" or "sell" decisions because of we already got filtered orderbooks.
 * 
 * The logic goes within two main steps; Generating a new array which has objects of already calculated diff value and unitPrice for each record.
 * And finally, we sort the diffs values with ASC mode and choosed the the first record.
 * 
 * The rest of app logic will use the `diff` and `unitPrice` properties to finalize the process.
 * Thus we ensure here only lays the single-responsibilty of finding the closest value with helper `unitPrice` property. 
 * 
 * @param {Array} arr Array of orderbooks with dimensional stored arrays.
 * @param {Number} target The amount value that consumer provided. 
 * @returns {Object} Filtered record of closest match with `diff` and `unitPrice` values.
 */
function findClosest(arr, target) {

    // First step: Find out diffs
    let diffArr = [];

    arr.forEach(orderArr => {
        // Find difference between target and current fella; Ensure to store a positive number for always.
        // Get the second index of array which references to the amount of this order.
        const diffValue = Math.abs(target - orderArr[1]); 

        // Store this diff and unit price to use later on...
        diffArr.push({
            diff: diffValue,
            unitPrice: orderArr[0] / orderArr[1]
        });
    });

    // Secod step: Find out the closest diff.
    // Sort the array to grab closest value from diff value
    diffArr.sort((current, next) => {
        return current.diff - next.diff;
    });
    
    // So now we have the lowest diff value on the array and we can use it only...
    return diffArr.shift();
}
 
module.exports = findClosest;