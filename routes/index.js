const router = require("express").Router()
const authenticate = require("../middlewares/authenticate")

// Import Auth Routes
const authRouter = require("./authRoutes")
const userRoutes = require("./userRoutes")

// Import Admin-Attendance Routes
const adminAttendanceRoutes = require("./admin-attendance")

// Import Student-Attendance Routes
const studentAttendanceRoutes = require("./student-attendance")

// Setup Auth Routes
router.use("/api/v1/auth", authRouter)
router.use("/api/v1/users", authenticate, userRoutes)
router.use("/api/v1/admin/attendance", authenticate, adminAttendanceRoutes)
router.use("/api/v1/student/attendance", authenticate, studentAttendanceRoutes)

module.exports = router
