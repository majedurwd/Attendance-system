const router = require("express").Router()
const adminAttendanceController = require("../controllers/admin-attendance")

router.get("/enable", adminAttendanceController.getEnable)
router.get("/disable", adminAttendanceController.getDisable)
router.get("/status", adminAttendanceController.getStatus)

module.exports = router