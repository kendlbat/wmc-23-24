const express = require("express");
const app = express();
const fs = require("fs");

let nextRequestId = 1;

function add(a, b) {
    return a + b;
}

app.use(express.json());

app.use((req, res, next) => {
    req.id = nextRequestId;
    nextRequestId++;
    next();
});

app.get("/hello", (req, res) => {
    res.send("Hello World! now is " + Date.now());
});

app.post("/write", (req, res) => {
    console.log(
        `start processing received request nr. ${req.id} at ${getFormattedTime(
            new Date(Date.now()),
        )}`,
    );
    const numFiles = req.body.numFiles;
    const value = req.body.value;
    for (let fileNo = 1; fileNo <= numFiles; fileNo++) {
        const fileName = `data/file${fileNo}.txt`;
        fs.writeFileSync(fileName, value);
    }
    res.status(200).send("done");
    console.log(
        `answered request nr. ${req.id} at ${getFormattedTime(
            new Date(Date.now()),
        )}\n`,
    );
});

app.post("/writeSeq", (req, res) => {
    console.log(
        `[WRITE-SEQ] start processing received request nr. ${
            req.id
        } at ${getFormattedTime(new Date(Date.now()))}`,
    );
    const numFiles = req.body.numFiles;
    const value = req.body.value;
    function writeFile(fileNo, maxFileNo) {
        const fileName = `data/file${fileNo}.txt`;
        fs.writeFile(fileName, value, () => {
            if (fileNo < maxFileNo) {
                writeFile(fileNo + 1, maxFileNo);
            } else {
                res.status(200).send("done");
                console.log(
                    `answered request nr. ${req.id} at ${getFormattedTime(
                        new Date(Date.now()),
                    )}\n`,
                );
            }
        });
    }
    writeFile(1, numFiles);
});

app.post("/writePar", (req, res) => {
    console.log(
        `[WRITE-PAR] start processing received request nr. ${
            req.id
        } at ${getFormattedTime(new Date(Date.now()))}`,
    );
    let executions = [];
    const { numFiles, value } = req.body;
    for (let i = 0; i < numFiles; i++) {
        executions.push(
            new Promise((res) => fs.writeFile(`data/file${i}.txt`, value, res)),
        );
    }
    Promise.all(executions).then(() => {
        res.status(200).send("done");
        console.log(
            `answered request nr. ${req.id} at ${getFormattedTime(
                new Date(Date.now()),
            )}\n`,
        );
    });
});

function getFormattedTime(dateTS) {
    let dateObj = new Date(dateTS);
    return `${dateObj.getHours()}:${("00" + dateObj.getMinutes()).slice(-2)}:${(
        "00" + dateObj.getSeconds()
    ).slice(-2)}.${("000" + dateObj.getMilliseconds()).slice(-3)}`;
}

async function getAverageExecutionTimeForEndpoint(
    endpointURL,
    executionNumber,
    numFiles = 5000,
    value = "Kendlbacher",
) {
    let executions = [];
    for (let i = 0; i < executionNumber; i++) {
        try {
            fs.mkdirSync("data");
        } catch (e) {
            console.error(e);
        }
        let startTime = Date.now();
        await fetch(endpointURL, {
            method: "POST",
            body: JSON.stringify({
                numFiles: 5000,
                value: "Kendlbacher",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(`Took ${Date.now() - startTime}ms\n`);
        executions.push(Date.now() - startTime);
        fs.rmSync("data", { recursive: true });
    }
    return executions.reduce(add, 0) / executions.length;
}

try {
    app.listen(3000, async () => {
        console.log("Server running on http://localhost:3000/");

        let normal = await getAverageExecutionTimeForEndpoint(
            "http://localhost:3000/write",
            3,
        );
        let sequential = await getAverageExecutionTimeForEndpoint(
            "http://localhost:3000/writeSeq",
            3,
        );
        let parallel = await getAverageExecutionTimeForEndpoint(
            "http://localhost:3000/writePar",
            3,
        );

        console.log(`[NORMAL] Average execution time: ${normal.toFixed(2)}ms`);
        console.log(
            `[SEQUENTIAL] Average execution time: ${sequential.toFixed(2)}ms`,
        );
        console.log(
            `[PARALLEL] Average execution time: ${parallel.toFixed(2)}ms`,
        );
    });
} finally {
    if (fs.existsSync("data")) fs.rmSync("data", { recursive: true });
}
