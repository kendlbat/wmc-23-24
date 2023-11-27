const mongoose = require("mongoose");
const { Station } = require("./stations-model");
const { logger } = require("../logging");

const create = async (req, res) => {
    logger.debug(`Stations - adding a new station: ${req.body}`);

    try {
        if (!req.body?.roomNumber)
            return res.status(400).send("roomNumber missing");

        let roomStationCount = await Station.find({
            roomNumber: req.body.roomNumber,
        });

        let newStation = await Station.create(req.body);
        res.status(201);
        res.location(`/api/stations/${newStation.id}`);
        res.json(newStation);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).send("Invalid station object");
        } else res.status(500).send("An unexpected error occured");
    }
};

const getAll = async (req, res) => {
    logger.debug(`Stations - fetching stations with filter ${req.query}`);

    // never do this in the real world > do not blindly accept client queries!!!
    let resultSet = await Station.find(req.query);

    res.status(200).json(resultSet);
};

const getById = async (req, res) => {
    try {
        const stationId = req.params.id;
        logger.debug(`Stations - get single station: ${stationId}`);

        let station = await Station.findById(stationId);
        if (station) {
            res.status(200).send(station);
        } else {
            res.status(404).send(`Station with id ${stationId} not found`);
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send("unexpected error occured");
    }
};

const deleteById = async (req, res) => {
    try {
        const stationId = req.params.id;
        logger.debug(`Stations - get single station: ${stationId}`);

        let result = await Station.deleteOne({ _id: stationId });
        if (result.deletedCount == 1) {
            res.status(204).send();
        } else {
            res.status(404).send(`Station with id ${stationId} not found`);
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send("unexpected error occured");
    }
};
module.exports = {
    create,
    getAll,
    getById,
    deleteById,
};
