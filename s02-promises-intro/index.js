function doLongRunningComplexCalculation(numersArray) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let result = numersArray.reduce((prev, current) => {
                    return prev + current;
                }, 0);

                if (result > 1000) {
                    throw new Error("Calculation Overflow");
                }

                resolve(result);
            } catch (error) {
                reject(error);
            }
        }, 0);
    });
}

Promise.prototype.logStuff = function () {
    this.then(console.log).catch(console.error);
    return this;
};

doLongRunningComplexCalculation([100, 500, 800]).logStuff();

doLongRunningComplexCalculation([1, 5, 8]).logStuff();

doLongRunningComplexCalculation({ a: 1, b: 5 }).logStuff();
