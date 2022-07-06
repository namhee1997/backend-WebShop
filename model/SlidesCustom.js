const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const slidesCustomSchema = new mongoose.Schema(
    {
        idslidescustom: {
            type: Number,
            unique: true,
        },
        slidesmain: [
            {
                url: String,
            }
        ],

        bannermain: [
            {
                url: String,
            }
        ],

        slidespage: [
            {
                url: String,
            }
        ],

    },
    {
        timestamps: true
    }
);

slidesCustomSchema.statics.checkFound = async function (id) {
    let check = await SlidesCustom.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`SlidesCustom not found`);
    }
    return check;
};

slidesCustomSchema.plugin(AutoIncrement, { inc_field: 'idslidescustom' });


const SlidesCustom = mongoose.model(
    "SlidesCustom", slidesCustomSchema);

module.exports = SlidesCustom;




