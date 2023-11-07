function setImmediate(func) {
    setTimeout(func, 0);
}

function add(a, b) {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                resolve(a + b);
            } catch (e) {
                reject(e);
            }
        });
    });
}

function div(a, b) {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                if (b === 0)
                    throw new Error('div by zero');
                resolve(a / b);
            } catch (e) {
                reject(e);
            }
        })
    })

}

// console.log('(10 + 22) / 4 = ' + div(add(10, 22), 4));

add(10, 22)
    .then(res => div(res, 4))
    .then(res => console.log(res));

// console.log('100 / 25 + 10  = ' + add(div(100, 25), 10));

div(100, 25)
    .then(res => add(res, 10))
    .then(res => console.log(res));

// try {
//     console.log('100 / (20 - 20) = ' + div(100, add(20, -20)));
// }
// catch (err) {
//     console.log(err.message);
// }

add(20, -20)
    .then(res => div(100, res))
    .then(res => console.log(res))
    .catch(err => console.error(err.message));