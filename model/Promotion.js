const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const promotionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            max: 8
        },
        slug: {
            type: Number,
        },

    },
    {
        timestamps: true
    }
);

promotionSchema.statics.checkFound = async function (id) {
    let check = await Promotion.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`Promotion not found`);
    }
    return check;
};
promotionSchema.plugin(AutoIncrement, { inc_field: 'slug' });

const Promotion = mongoose.model(
    "Promotion", promotionSchema);

module.exports = Promotion;




