const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema(
    {
        idPhone: {
            type: String,
            unique: true,
            max: 8
        },
        slug: { type: String },
        promotion: {
            type: Boolean,
            enum: [true, false],
            required: true,
            default: false
        },
        variable: [
            {
                idVariable: {
                    type: String,
                    max: 8
                },
                avatar:
                {
                    type: String,
                    default: ''
                },
                title:
                {
                    type: String,
                    default: ''
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
                sale: {
                    type: Number,
                    default: 0
                },
                listimg: [
                    {
                        thumb: {
                            type: String,
                        },
                    }
                ],
            }
        ],
        company: String,
        title: String,
        infophone: {
            type: {}
        },

    },
    {
        timestamps: true
    }
);

productSchema.pre('save', async function (next) {
    let ProductLast = await Product.findOne().sort({ idPhone: -1 }).limit(1);
    if (!ProductLast) {
        this.idPhone = 'D0001';
    } else {
        let idPhone = Number(ProductLast.idPhone.substring(2)) + 1
        switch (idPhone.toString().length) {
            case 0:
                this.idPhone = 'D0001';
                break;
            case 1:
                this.idPhone = 'D000' + idPhone;
                break;
            case 2:
                this.idPhone = 'D00' + idPhone;
                break;
            case 3:
                this.idPhone = 'D0' + idPhone;
                break;
            default:
                this.idPhone = 'D' + idPhone;
                break;
        }
    }
    next();
});

productSchema.statics.checkFound = async function (id) {
    let check = await Product.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`Product not found`);
    }
    return check
};


const Product = mongoose.model(
    "Product", productSchema);

module.exports = Product;



