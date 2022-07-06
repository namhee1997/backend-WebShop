const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        src: {
            type: String,
        },
        title: {
            type: String,
        },
        slug: {
            type: String
        }

    },
    {
        timestamps: true
    }
);

companySchema.statics.checkFound = async function (id) {
    let check = await Company.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`Company not found`);
    }
    return check;
};

const Company = mongoose.model(
    "Company", companySchema);

module.exports = Company;




