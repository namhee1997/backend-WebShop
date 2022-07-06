const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentRateSchema = new mongoose.Schema(
    {
        idrateComment: {
            type: Number,
        },
        start: {
            type: Number,
        },
        avt: {
            type: String,
        },
        user: {
            type: String,
        },
        title: {
            type: String,
        },
        idPhone: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

commentRateSchema.statics.checkFound = async function (id) {
    let check = await ListCommentRate.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        return true;
    } else {
        return false;
    }
};

commentRateSchema.plugin(AutoIncrement, { inc_field: 'idrateComment' });

const ListCommentRate = mongoose.model(
    "ListCommentRate", commentRateSchema);

module.exports = ListCommentRate;



