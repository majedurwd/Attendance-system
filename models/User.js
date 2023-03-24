const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
        minLength: [3, "Minimum three characters long"],
        maxLength: [30, "Maximum thirty characters long"],
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        email: [true, "Enter your valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Enter your strong password"],
        minLength: [6, "Password must be at least 3 characters long"],
    },
    roles: {
        type: [String],
        default: ["USER"],
        required: true,
    },
    accountStatus: {
        type: String,
        enum: ["PENDING", "ACTIVE", "REJECTED"],
        default: "PENDING",
        required: true
    }
}, {timestamps: true})

const User = model("User", userSchema)
module.exports = User