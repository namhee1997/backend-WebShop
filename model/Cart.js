const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            unique: true,
            trim: true,
        },
        idPhone: {
            type: String,
            unique: true,
            trim: true,
        },
        selected: {
            type: {}
        },
        dataTotal: {
            promotionChoose: [
                {
                    type: {}
                }
            ],
            totalSelect: [
                {
                    type: {}
                }
            ],
        },
        totalCurrent: Number,

    },
    {
        timestamps: true
    }
);

cartSchema.statics.checkFound = async function (id) {
    let check = await Cart.findOne({ idPhone: id })
    if (!check) {
        return true;
    } else {
        return false;
    }
};

const Cart = mongoose.model(
    "Cart", cartSchema);

module.exports = Cart;



