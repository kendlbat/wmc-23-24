const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
    guideName: {
        type: String,
        required: [true, "guideName is missing"],
        trim: true,
    },
    guideClass: {
        type: String,
        required: true,
        uppercase: true,
        match: new RegExp("^[2-5][AB]HIF$"),
    },
    numPersons: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    registration: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const Tour = mongoose.model("tours", TourSchema);

module.exports = { Tour };
