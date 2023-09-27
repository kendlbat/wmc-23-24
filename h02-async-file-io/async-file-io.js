const express = require('express');
const app = express();

let nextRequestId = 1;

function add(a, b) { return a + b; }

app.use(express.json());

app.use((req, res, next) => {
    req.id = nextRequestId;
    nextRequestId++;
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello World! now is ' + Date.now());
});

app.post("/write", (req, res) => {
    console.log(`start processing received request nr. ${req.id} at ${getFormattedTime(new Date(Date.now()))}`);
    const numFiles = req.body.numFiles;
    const value = req.body.value;
    for (let fileNo = 1; fileNo <= numFiles; fileNo++) {
        const fileName = `data/file${fileNo}.txt`;
        fs.writeFileSync(fileName, value);
    }
    res.status(200).send("done");
    console.log(`answered request nr. ${req.id} at ${getFormattedTime(new Date(Date.now()))}\n`);
});

function getFormattedTime(dateTS) {
    let dateObj = new Date(dateTS);
    return `${dateObj.getHours()}:${('00' + dateObj.getMinutes()).slice(-2)}:${('00' + dateObj.getSeconds()).slice(-2)}.${('000' + dateObj.getMilliseconds()).slice(-3)}`;
}

app.listen(3000, async () => {
    console.log("Server running on http://localhost:3000/");
    let executions = [];
    for (let i = 0; i < 3; i++) {
        let startTime = Date.now();
        await fetch("http://localhost:3000/write", {
            method: "POST",
            body: JSON.stringify({
                numFiles: 5000,
                value: "Kendlbacher",
            }),
        });
        console.log(`Took ${Date.now() - startTime}ms\n`);
        executions.push(Date.now() - startTime);
    }
    let avg = executions.reduce(add, 0) / executions.length;
    console.log(`Average execution time: ${avg.toFixed(2)}ms`);
});