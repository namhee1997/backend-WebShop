const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const rateProductSchema = new mongoose.Schema(
    {
        idrate: {
            type: Number,
        },
        idPhone: {
            type: String,
        },
        totalstart: {
            start5: {
                type: Number,
                default: 0
            },
            start4: {
                type: Number,
                default: 0
            },
            start3: {
                type: Number,
                default: 0
            },
            start2: {
                type: Number,
                default: 0
            },
            start1: {
                type: Number,
                default: 0
            },
        },
        listCommentRate: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ListCommentRate',
            }
        ],
    },
    {
        timestamps: true
    }
);

rateProductSchema.statics.checkFound = async function (id) {
    let check = await RateProduct.findOne({ idPhone: id })
    if (!check) {
        return true;
    } else {
        return false;
    }
};
rateProductSchema.plugin(AutoIncrement, { inc_field: 'idrate' });

const RateProduct = mongoose.model(
    "RateProduct", rateProductSchema);

module.exports = RateProduct;



