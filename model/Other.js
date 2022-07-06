const mongoose = require("mongoose");

const otherSchema = new mongoose.Schema(
    {
        price: {
            type: String,
        },

    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model(
    "Other", otherSchema);



