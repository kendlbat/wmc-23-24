/*
function doLongRunningComplexCalculation(numersArray) {
    let result = numersArray.reduce((prev, current) => {return prev+current}, 0);

    return result;
}


let sum = doLongRunningComplexCalculation([1,3,6,8,3,5,3,3]);
*/

doLongRunningComplexCalculation([1, 8, 5], handleResult);

function doLongRunningComplexCalculation(numersArray, callback) {
    let result = numersArray.reduce((prev, current) => {return prev+current}, 0);

    callback(result);
}

function handleResult(data) {
    console.log(data);
}