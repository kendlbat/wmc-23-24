const mongoose = require("mongoose");

const dbConnectTimeout = 5000;

async function dbConnect(connectionString) {
    await mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: dbConnectTimeout,
    });
}

async function dbDisconnect() {
    await mongoose.disconnect();
}

async function main() {
    try {
        await dbConnect("mongodb://localhost:50000/mongoose-intro-db");
        console.log("connected to database");
    } catch (e) {
        console.error(`error connecting to database: ${e}`);
    } finally {
        await dbDisconnect();
        console.log("disconnected from database");
    }
}

main();
