"use strict";

const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const { logger } = require("./logging");
const path = require("path");

dotenv.config();

const toursHandlers = require("./tours/tours-handlers");
const schoolsHandlers = require("./schools/schools-handlers");
const stationsHandlers = require("./stations/stations-handlers");
const votingsHandlers = require("./votings/votings-handlers");
const { setupDBConnection, dropCurrentDatabase } = require("./database");

logger.info("Backend - Starting up...");

// Take configuration from environment variables
// or use hardcoded default value
const HOSTNAME = process.env.HOSTNAME || "::";
const PORT = process.env.PORT || 8080;
const MONGODB_CONNECTION_STRING =
    process.env.MONGODB_CONNECTION_STRING || "mongodb://[::1]/tdot-app";
const MONGODB_RECREATE = process.env.MONGODB_RECREATE === "true";

const app = express();
app.use(express.json());
app.use("/api", mongoSanitize());

const apiRoute = new express.Router();
app.use("/api", apiRoute);

const checkIfMatch = (req, res, next) => {
    const ifMatchHdr = req.headers["if-match"];

    if (!ifMatchHdr) {
        next(new BadRequest(`if-match header not provided`, err));
        return;
    }
};

apiRoute.put(checkIfMatch);
apiRoute.patch(checkIfMatch);

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
schoolsRoute.put("/:id", schoolsHandlers.putById);
schoolsRoute.patch("/:id", schoolsHandlers.patchById);

const stationsRoute = new express.Router();
apiRoute.use("/stations", stationsRoute);
stationsRoute.get("/", stationsHandlers.getAll);
stationsRoute.get("/:id", stationsHandlers.getById);
stationsRoute.post("/", stationsHandlers.create);
stationsRoute.delete("/:id", stationsHandlers.deleteById);

const votingsRoute = new express.Router();
apiRoute.use("/votings", votingsRoute);
votingsRoute.get("/", votingsHandlers.getAll);
votingsRoute.get("/:id", votingsHandlers.getById);
votingsRoute.post("/", votingsHandlers.create);
votingsRoute.delete("/:id", votingsHandlers.deleteById);

// Block faulty api calls from returning the frontend
apiRoute.use((_req, res) => {
    res.status(404).json({
        status: "404",
        message: "Not found",
    });
});

app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// create HTTP server
const httpServer = http.createServer(app);

// establish DB connection
setupDBConnection(MONGODB_CONNECTION_STRING, MONGODB_RECREATE);

// add function so that it is accessible by tests
httpServer.dropCurrentDatabase = async () => {
    await dropCurrentDatabase(MONGODB_CONNECTION_STRING);
};

// httpServer.dropCurrentDatabase();

// start listening to HTTP requests
httpServer.listen(PORT, HOSTNAME, () => {
    logger.info(`Backend - Running on port ${PORT}...`);
});

module.exports = httpServer;
