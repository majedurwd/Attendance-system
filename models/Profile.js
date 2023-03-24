const { Schema, model } = require("mongoose")
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    firstName: {
        type: String,
        required: [true, "Enter your first name"],
        minLength: [3, "Minimum three characters long"],
        maxLength: [15, "Maximum fifteen characters long"],
    },
    lastName: {
        type: String,
        minLength: [3, "Minimum three characters long"],
        maxLength: [15, "Maximum fifteen characters long"],
    },
    phoneNo: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: [true, "Please Upload Product Image"],
        },
    },


}, {timestamps: true})

const Profile = model("Profile", profileSchema)
module.exports = Profile