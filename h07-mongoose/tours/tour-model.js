const mongoose = require("mongoose");
const { Station } = require("../stations/stations-model");

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
    favoriteStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stations",
        required: false,
    },
});

TourSchema.path("favoriteStation").validate(
    async (value) => await Station.findById(value),
    "Station does not exist"
);

const Tour = mongoose.model("tours", TourSchema);

module.exports = { Tour };
