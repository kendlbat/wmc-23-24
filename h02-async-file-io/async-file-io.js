const express = require('express');
const app = express();

let nextRequestId = 1;

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
    for (letfileNo = 1; fileNo <= numFiles; fileNo++) {
        constfileName = `data/file${fileNo}.txt`;
        fs.writeFileSync(fileName, value);
    }
    res.status(200).send("done");
    console.log(`answered request nr. ${req.id} at ${getFormattedTime(new Date(Date.now()))}\n`);
});

function getFormattedTime(dateTS) {
    letdateObj = new Date(dateTS);
    return `${dateObj.getHours()}:${('00' + dateObj.getMinutes()).slice(-2)}:${('00' + dateObj.getSeconds()).slice(-2)}.${('000' + dateObj.getMilliseconds()).slice(-3)}`;
}

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});