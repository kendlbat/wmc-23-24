const mongoose = require("mongoose");
const { School } = require("./schools-schema");
const { logger } = require("../logging");

const create = async (req, res) => {
    logger.debug(`Schools - adding a new school: ${JSON.stringify(req.body)}`);

    try {
        let newSchool = await School.create(req.body);
        res.status(201);
        res.location(`/api/schools/${newSchool.id}`);
        res.json(newSchool);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).send("Invalid school object");
        } else res.status(500).send("An unexpected error occured");
    }
};

const getAll = async (req, res) => {
    logger.debug(
        `Schools - fetching schools with filter ${JSON.stringify(req.query)}`
    );

    // never do this in the real world > do not blindly accept client queries!!!
    // Comment: added express-mongo-sanitize to prevent arbitrary queries
    let resultSet = await School.find(req.query);

    res.status(200).json(resultSet);
};

const getById = async (req, res) => {
    try {
        const schoolId = req.params.id;
        logger.debug(`Schools - get single school: ${schoolId}`);

        let school = await School.findById(schoolId);
        if (school) {
            res.status(200).send(school);
        } else {
            res.status(404).send(`School with id ${schoolId} not found`);
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send("unexpected error occured");
    }
};

const deleteById = async (req, res) => {
    try {
        const schoolId = req.params.id;
        logger.debug(`Schools - get single school: ${schoolId}`);

        let result = await School.deleteOne({ _id: schoolId });
        if (result.deletedCount == 1) {
            res.status(204).send();
        } else {
            res.status(404).send(`School with id ${schoolId} not found`);
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send("unexpected error occured");
    }
};

const putById = async (req, resp, next) => {
    try {
        let schoolId = req.params.id;
        logger.debug(`Schools - Update school with id=${schoolId}`);

        let ifMatchHdr = req.headers["if-match"];

        let school = await School.findById(schoolId);

        if (!school)
            return resp
                .status(404)
                .send(`School with id ${schoolId} not found`);

        if (school.__v != ifMatchHdr)
            return resp.status(409).send(`Version conflict`);

        let updatedSchool = await School.findByIdAndUpdate(schoolId, req.body, {
            new: true,
            runValidators: true,
        });

        if (updatedSchool) return resp.status(200).json(updatedSchool);

        return resp
            .status(500)
            .send(`Failed to update school with id ${schoolId}`);
    } catch (e) {
        return resp
            .status(500)
            .send(`Failed to update school with id ${schoolId}`);
    }
};

const patchById = putById;

module.exports = {
    create,
    getAll,
    getById,
    deleteById,
    putById,
    patchById,
};
