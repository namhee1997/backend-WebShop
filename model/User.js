const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            max: 8
        },
        username: {
            type: String,
            lowercase: true,
            required: true,
            index: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            required: true,
            default: 'user'
        },
        fullname: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
        },
        address: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            index: true
        },
        phone: {
            type: String,
            index: true
        },

    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    let userLast = await User.findOne().sort({ userId: -1 }).limit(1);
    if (!userLast) {
        this.userId = 'U0001';
    } else {
        let userId = Number(userLast.userId.substring(2)) + 1
        switch (userId.toString().length) {
            case 0:
                this.userId = 'U0001';
                break;
            case 1:
                this.userId = 'U000' + userId;
                break;
            case 2:
                this.userId = 'U00' + userId;
                break;
            case 3:
                this.userId = 'U0' + userId;
                break;
            default:
                this.userId = 'U' + userId;
                break;
        }
    }
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.generateHashPassword = async function (password) {
    return bcrypt.hash(password, 8);
};

userSchema.statics.checkUsername = async function (username) {
    let check = await User.findOne({ username: username })
    if (check) {
        throw new Error(`Unique request body username`);
    }
    return check
};

userSchema.statics.checkEmail = async function (email) {
    let check = await User.findOne({ email: email })
    if (check) {
        throw new Error(`Unique request body email`);
    }
    return check
};

userSchema.statics.checkPhone = async function (phone) {
    let check = await User.findOne({ phone: phone })
    if (check) {
        throw new Error(`Unique request body phone`);
    }
    return check
};

userSchema.statics.checkFound = async function (id) {
    let check = await userSchema.findOne({ _id: mongoose.Types.ObjectId(id) })
    if (!check) {
        throw new Error(`userSchema not found`);
    }
    return check
};

const User = mongoose.model(
    "User", userSchema);

module.exports = User;



