const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    roomNumber: {
        type: Number,
        required: true,
        min: 0,
        max: 299,
    },
    interactive: {
        type: Boolean,
        required: true,
    },
});

const Station = mongoose.model("stations", StationSchema);

module.exports = { Station };
