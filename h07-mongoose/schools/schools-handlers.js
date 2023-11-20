const mongoose = require("mongoose");
const { School } = require("./schools-schema");

const create = async (req, res) => {
    console.log(`Schools - adding a new school: `, req.body);

    try {
        let newSchool = await School.create(req.body);
        res.status(201);
        res.location(`/api/school/${newSchool.id}`);
        res.json(newSchool);
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).send("Invalid school object");
        } else res.status(500).send("An unexpected error occured");
    }
};

const getAll = async (req, res) => {
    console.log(`Schools - fetching schools with filter`, req.query);

    // never do this in the real world > do not blindly accept client queries!!!
    // Comment: added express-mongo-sanitize to prevent arbitrary queries
    let resultSet = await School.find(req.query);

    res.status(200).json(resultSet);
};

const getById = async (req, res) => {
    try {
        const schoolId = req.params.id;
        console.log("Schools - get single tour: ", schoolId);

        let school = await School.findById(schoolId);
        if (school) {
            res.status(200).send(school);
        } else {
            res.status(404).send(`Tour with id ${schoolId} not found`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("unexpected error occured");
    }
};

const deleteById = async (req, res) => {
    try {
        const schoolId = req.params.id;
        console.log("Tours - get single tour: ", schoolId);

        let result = await School.deleteOne({ _id: schoolId });
        if (result.deletedCount == 1) {
            res.status(204).send();
        } else {
            res.status(404).send(`School with id ${schoolId} not found`);
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
