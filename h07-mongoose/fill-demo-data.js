const fsp = require("fs").promises;
const mongoose = require("mongoose");
const { setupDBConnection } = require("./database");

const { Tour } = require("./tours/tour-model");

const MONGODB_CONNECTION_STRING =
    process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/tdot-app";

async function fillTourData() {
    let content = await fsp.readFile("demodata/tours.json");
    let allTours = JSON.parse(content);

    let results = await Promise.allSettled(allTours.map((t) => Tour.create(t)));

    let { successCnt, errorCnt } = results.reduce(
        (acc, curr) => {
            if (curr.status === "resolved") acc.successCnt++;
            if (curr.status === "rejected") acc.errorCnt++;
            return acc;
        },
        { successCnt: 0, errorCnt: 0 }
    );

    console.log(`Successfully filled ${successCnt}/${results.length} tours`);
    if (errorCnt > 0) console.warn(`Failed inserting ${errorCnt} tours`);
}

async function fillDatabase() {
    await setupDBConnection(MONGODB_CONNECTION_STRING, true);

    console.log("start filling database with demo-data");

    await fillTourData();

    await mongoose.disconnect();
}

fillDatabase();
