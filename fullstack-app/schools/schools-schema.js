const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: [true, "code is missing"],
        min: 100000,
        max: 999999,
    },
    title: {
        type: String,
        required: true,
    },
    address: {
        zipCode: {
            type: Number,
            required: true,
            min: 1000,
            max: 9999,
        },
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String,
        },
    },
    category: {
        type: String,
        required: true,
        enum: ["AHS", "BHS", "MS"],
    },
});

const School = mongoose.model("schools", SchoolSchema);

module.exports = { School };
