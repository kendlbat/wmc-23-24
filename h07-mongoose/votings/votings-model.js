const mongoose = require("mongoose");
const { Station } = require("../stations/stations-model");

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
    { timestamps: true }
);

VotingsSchema.path("station", async (value) => StationSchem);
