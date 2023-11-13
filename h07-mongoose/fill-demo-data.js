const fsp = require("fs").promises;
const mongoose = require("mongoose");
const { setupDBConnection } = require("./database");

const { Tour } = require("./tours/tour-model");
const { School } = require("./schools/schools-schema");

const MONGODB_CONNECTION_STRING =
    process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/tdot-app";

async function fillTourData() {
    let content = await fsp.readFile("demodata/tours.json");
    let allTours = JSON.parse(content);

    let results = await Promise.allSettled(allTours.map((t) => Tour.create(t)));

    let { successCnt, errorCnt } = results.reduce(
        (acc, curr) => {
            if (curr.status === "fulfilled") acc.successCnt++;
            if (curr.status === "rejected") acc.errorCnt++;
            return acc;
        },
        { successCnt: 0, errorCnt: 0 }
    );

    console.log(
        `Tour data - ${successCnt}/${results.length} tours successfully imported, ${errorCnt} tours contain errors`
    );
}

async function fillSchoolData() {
    let content = await fsp.readFile("demodata/schools.json");
    let allSchools = JSON.parse(content);

    let results = await Promise.allSettled(
        allSchools.map((s) => School.create(s))
    );

    let { successCnt, errorCnt } = results.reduce(
        (acc, curr) => {
            if (curr.status === "fulfilled") acc.successCnt++;
            if (curr.status === "rejected") acc.errorCnt++;
            return acc;
        },
        { successCnt: 0, errorCnt: 0 }
    );

    console.log(
        `Schools data - ${successCnt}/${results.length} schools successfully imported, ${errorCnt} schools contain errors`
    );
}

async function fillDatabase() {
    await setupDBConnection(MONGODB_CONNECTION_STRING, true);

    console.log("start filling database with demo-data");

    await fillTourData();
    await fillSchoolData();

    await mongoose.disconnect();
}

fillDatabase();
