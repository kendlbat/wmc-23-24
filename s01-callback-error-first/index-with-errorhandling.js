doLongRunningComplexCalculation([100, 500, 800], handleResult);

function doLongRunningComplexCalculation(numersArray, callback) {
    try {
        let result = numersArray.reduce((prev, current) => {return prev+current}, 0);

        if (result > 1000) {
            throw new Error("Calculation Overflow");
        }

        callback(null, result);
    } catch (error) {
        callback(error, null);
    }
}

//Fehler ist IMMER der erste Parameter (Error-First-Prinzip)
function handleResult(error, data) {
    if (error) {
        console.error(error.message); //error.message gibt nur den Fehlertext ohne Callstack aus
    } else {
        console.log(data);
    }
}