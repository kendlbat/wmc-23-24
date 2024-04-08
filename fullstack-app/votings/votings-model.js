const mongoose = require("mongoose");
const { Station } = require("../stations/stations-model");
const { Tour } = require("../tours/tour-model");

const VotingsSchema = new mongoose.Schema(
    {
        numStars: {
            type: Number,
            required: [true, "numStars is missing"],
            min: 1,
            max: 5,
        },
        station: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "tours",
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "stations",
        },
    },
    { timestamps: true },
);

VotingsSchema.path("station").validate(
    async (value) => await Station.findById(value),
);
VotingsSchema.path("tour").validate(
    async (value) => await Tour.findById(value),
);

const Votings = mongoose.model("votings", VotingsSchema);

module.exports = { Votings };
