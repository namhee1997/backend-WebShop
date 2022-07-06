const mongoose = require("mongoose");

const uploadFileSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            unique: true,
            max: 8
        },
        title: {
            type: String,
        },
        fileUrl: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

uploadFileSchema.pre('save', async function (next) {
    let Last = await UploadedFile.findOne().sort({ code: -1 }).limit(1);
    if (!Last) {
        this.code = 'F0001';
    } else {
        let code = Number(Last.code.substring(2)) + 1
        switch (code.toString().length) {
            case 0:
                this.code = 'F0001';
                break;
            case 1:
                this.code = 'F000' + code;
                break;
            case 2:
                this.code = 'F00' + code;
                break;
            case 3:
                this.code = 'F0' + code;
                break;
            default:
                this.code = 'F' + code;
                break;
        }
    }
    next();
});

uploadFileSchema.statics.checkFound = async function (id) {
    let check = await UploadedFile.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`UploadedFile not found`);
    }
    return check
};


const UploadedFile = mongoose.model(
    "UploadedFile", uploadFileSchema);

module.exports = UploadedFile;



