const { Schema, model } = require("mongoose")

const adminAttendanceSchema = new Schema({
    timeLimit: {
        type: Number,
        min: 5,
        max: 30,
        default: 5,
        required: true
    },
    status: {
        type: String,
        enum: ["RUNNING", "COMPLETE"],
        default: "RUNNING",
        required: true
    },

}, { timestamps: true })

const AdminAttendance = model("AdminAttendance", adminAttendanceSchema)
module.exports = AdminAttendance