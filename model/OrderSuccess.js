const mongoose = require("mongoose");

const orderSuccessSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            trim: true,
        },
        title:
        {
            type: String,
        }
        ,
        price: {
            type: Number,
            default: 0
        },
        cost: {
            type: Number,
            default: 0
        },
        address:
        {
            type: String,
        },
        promotion:
        {
            type: String,
        },
        company:
        {
            type: String,
        },
        phone: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"], match: [/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 'is invalid phone'],
            index: true
        },

    },
    {
        timestamps: true
    }
);

orderSuccessSchema.statics.checkFound = async function (id) {
    let check = await OrderSuccess.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`OrderSuccess not found`);
    }
    return check;
};

const OrderSuccess = mongoose.model(
    "OrderSuccess", orderSuccessSchema);

module.exports = OrderSuccess;



