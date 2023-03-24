const { addMinutes, isAfter } = require("date-fns")
const AdminAttendance = require("../models/AdminAttendance");
const StudentAttendance = require("../models/StudentAttendance");
const error = require("../utils/error");

const getAttendance = async (req, res, next) => {
    try {
        const { id } = req.params;
        /**
         * Step-1 Find Admin attendance by id
         * Step-2 Check if it is running or not
         * Step-3 Already register or not
         * Step-4 Register entry
         */
        const adminAttendance = await AdminAttendance.findById(id);
        if (!adminAttendance) throw error("Invalid Attendance ID", 400);

        if (adminAttendance.status === "COMPLETE")
            throw error("Attendance Already Completed", 400)
        
        let studenAttendance = await StudentAttendance.findOne({
            user: req.user._id,
            adminAttendance: id,
        });
        if (studenAttendance) throw error("Your Attendance Already Done");

        studenAttendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id,
        });
        await studenAttendance.save();
        return res.status(200).json({
            success: true,
            message: "Your Attendance Successfully Done",
            studenAttendance,
        });
    } catch (e) {
        next(e);
    }
};

const getAttendanceStatus = async (_req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: "RUNNING" })
        if (!running) throw error("Not Running", 404)

        const started = addMinutes(
            new Date(running.createdAt),
            running.timeLimit
        );
        if (isAfter(new Date(), started)) {
            running.status = "COMPLETE"
            await running.save();
        }

        return res.status(200).json({ success: true, running });
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAttendance,
    getAttendanceStatus,
};
