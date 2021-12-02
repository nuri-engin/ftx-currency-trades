// See {@link https://www.geeksforgeeks.org/find-closest-number-array/}
function findClosest(arr, target) {

    // Step 001: Find out gaps
    let gapResultsArr = [];

    arr.forEach(orderArr => {
        // Find difference between target and current fella;
        // Get the second index of array which references to the amount of this order.
        const gapValue = Math.abs(target - orderArr[1]); 

        // Store this gap and unit price to use later on...
        gapResultsArr.push({
            gap: gapValue,
            unitPrice: orderArr[0] / orderArr[1]
        });
    });

    // Sort the array to grab closest value from gap value
    gapResultsArr.sort((current, next) => {
        return current.gap - next.gap;
    });
    
    // So now we have the lowest gap value on the array and we can use it only...
    return gapResultsArr.shift();
}
 
module.exports = findClosest;