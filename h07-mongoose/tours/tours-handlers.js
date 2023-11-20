const mongoose = require("mongoose");
const { Tour } = require("./tour-model");

const create = async (req, res) => {
    console.log(`Tours - adding a new tour: `, req.body);

    try {
        let newTour = await Tour.create(req.body);
        res.status(201);
        res.location(`/api/tours/${newTour.id}`);
        res.json(newTour);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).send("Invalid tour object");
        } else res.status(500).send("An unexpected error occured");
    }
};

const getAll = async (req, res) => {
    console.log(`Tours - fetching tours with filter`, req.query);

    // never do this in the real world > do not blindly accept client queries!!!
    let resultSet = await Tour.find(req.query);

    res.status(200).json(resultSet);
};

const getById = async (req, res) => {
    try {
        const tourId = req.params.id;
        console.log("Tours - get single tour: ", tourId);

        let tour = await Tour.findById(tourId);
        if (tour) {
            res.status(200).send(tour);
        } else {
            res.status(404).send(`Tour with id ${tourId} not found`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("unexpected error occured");
    }
};

const deleteById = async (req, res) => {
    try {
        const tourId = req.params.id;
        console.log("Tours - get single tour: ", tourId);

        let result = await Tour.deleteOne({ _id: tourId });
        if (result.deletedCount == 1) {
            res.status(204).send();
        } else {
            res.status(404).send(`Tour with id ${tourId} not found`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("unexpected error occured");
    }
};
module.exports = {
    create,
    getAll,
    getById,
    deleteById,
};
