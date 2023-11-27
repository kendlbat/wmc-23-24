"use strict";

const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const { logger } = require("./logging");

dotenv.config();

const toursHandlers = require("./tours/tours-handlers");
const schoolsHandlers = require("./schools/schools-handlers");
const { setupDBConnection, dropCurrentDatabase } = require("./database");

logger.info("Backend - Starting up...");

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

const apiRoute = new express.Router();
app.use("/api", apiRoute);

const toursRoute = new express.Router();
apiRoute.use("/tours", toursRoute);
toursRoute.get("/", toursHandlers.getAll);
toursRoute.get("/:id", toursHandlers.getById);
toursRoute.post("/", toursHandlers.create);
toursRoute.delete("/:id", toursHandlers.deleteById);

const schoolsRoute = new express.Router();
apiRoute.use("/schools", schoolsRoute);
schoolsRoute.get("/", schoolsHandlers.getAll);
schoolsRoute.get("/:id", schoolsHandlers.getById);
schoolsRoute.post("/", schoolsHandlers.create);
schoolsRoute.delete("/:id", schoolsHandlers.deleteById);

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
    logger.info(`Backend - Running on port ${PORT}...`);
});

module.exports = httpServer;
