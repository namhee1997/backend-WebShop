const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const listReplyCommentSchema = new mongoose.Schema(
    {
        idComment: {
            type: Number,
            unique: true,
        },
        idUser: {
            type: String,
            unique: true,
        },
        user: {
            type: String,
        },
        avt: {
            type: String,
        },
        title: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            enum: [true, false],
            required: true,
            default: false
        },
    },
    {
        timestamps: true
    }
);

listReplyCommentSchema.statics.checkFound = async function (id) {
    let check = await ListReply.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`ListReply not found`);
    }
    return check;
};
listReplyCommentSchema.plugin(AutoIncrement, { inc_field: 'idComment' });

const ListReply = mongoose.model(
    "ListReply", listReplyCommentSchema);

module.exports = ListReply;



