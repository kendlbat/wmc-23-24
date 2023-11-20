"use strict";

const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");

dotenv.config();

const toursHandlers = require("./tours/tours-handlers");
const schoolsHandlers = require("./schools/schools-handlers");
const { setupDBConnection, dropCurrentDatabase } = require("./database");

console.log("Backend - Starting up...");

// Take configuration from environment variables
// or use hardcoded default value
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
const PORT = process.env.PORT || 8080;
const MONGODB_CONNECTION_STRING =
    process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost/tdot-app";
const MONGODB_RECREATE = process.env.MONGODB_RECREATE === "true";

const app = express();
app.use(express.json());
app.use("/api", mongoSanitize());

app.get("/api/tours", toursHandlers.getAll);
app.get("/api/tours/:id", toursHandlers.getById);
app.post("/api/tours", toursHandlers.create);
app.delete("/api/tours/:id", toursHandlers.deleteById);

app.get("/api/schools", schoolsHandlers.getAll);
app.get("/api/schools/:id", schoolsHandlers.getById);
app.post("/api/schools", schoolsHandlers.create);
app.delete("/api/schools/:id", schoolsHandlers.deleteById);

// create HTTP server
const httpServer = http.createServer(app);

// establish DB connection
setupDBConnection(MONGODB_CONNECTION_STRING, MONGODB_RECREATE);

// add function so that it is accessible by tests
httpServer.dropCurrentDatabase = async () => {
    await dropCurrentDatabase(MONGODB_CONNECTION_STRING);
};

httpServer.dropCurrentDatabase();

// start listening to HTTP requests
httpServer.listen(PORT, HOSTNAME, () => {
    console.log(`Backend - Running on port ${PORT}...`);
});

module.exports = httpServer;
