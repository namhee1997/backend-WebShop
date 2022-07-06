const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentProductSchema = new mongoose.Schema(
    {
        id_comment: {
            type: Number,
        },
        idUser: {
            type: String,
        },
        idPhone: {
            type: String,
        },
        avt: {
            type: String,
        },
        user: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            enum: [true, false],
            required: true,
            default: false
        },
        title: {
            type: String,
        },
        listReply: [
            {
                type: {}
            }
        ],
    },
    {
        timestamps: true
    }
);

commentProductSchema.statics.checkFound = async function (id) {
    let check = await CommentProduct.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`CommentProduct not found`);
    }
    return check;
};

commentProductSchema.plugin(AutoIncrement, { inc_field: 'idComment' });


const CommentProduct = mongoose.model(
    "CommentProduct", commentProductSchema);

module.exports = CommentProduct;



