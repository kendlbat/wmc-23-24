const mongoose = require("mongoose");
const { Votings } = require("./votings-model");
const { logger } = require("../logging");

const create = async (req, res) => {
    logger.debug(`Votings - adding a new voting: ${JSON.stringify(req.body)}`);

    try {
        let newVoting = await Votings.create(req.body);
        res.status(201);
        res.location(`/api/votings/${newVoting.id}`);
        res.json(newVoting);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).send("Invalid votings object");
        } else res.status(500).send("An unexpected error occured");
    }
};

const getAll = async (req, res) => {
    logger.debug(
        `Votings - fetching votings with filter ${JSON.stringify(req.query)}`
    );

    // never do this in the real world > do not blindly accept client queries!!!
    let resultSet = await Votings.find(req.query);

    res.status(200).json(resultSet);
};

const getById = async (req, res) => {
    try {
        const votingId = req.params.id;
        logger.debug(`Votings - get single voting: ${votingId}`);

        let voting = await Votings.findById(votingId);
        if (voting) {
            res.status(200).send(voting);
        } else {
            res.status(404).send(`Voting with id ${votingId} not found`);
        }
    } catch (err) {
        logger.error(err);
        res.status(500).send("unexpected error occured");
    }
};

const deleteById = async (req, res) => {
    try {
        const votingId = req.params.id;
        logger.debug(`Votings - get single voting: ${votingId}`);

        let result = await Votings.deleteOne({ _id: votingId });
        if (result.deletedCount == 1) {
            res.status(204).send();
        } else {
            res.status(404).send(`Voting with id ${votingId} not found`);
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
