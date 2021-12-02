// See {@link https://www.geeksforgeeks.org/find-closest-number-array/}
function findClosest(arr, target) {

    // Step 001: Find out gaps
    let gapResultsArr = [];

    arr.forEach((inlineArr, i) => {
        // Find difference between target and current fella;
        // Get the second index of array which references to the amount of this order.
        const gapValue = target - inlineArr[1]; 

        // Store this gap and unit price to use later on...
        gapResultsArr.push({
            gap: gapValue,
            unitPrice: inlineArr[0] / inlineArr[1]
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