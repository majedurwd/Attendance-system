
const JwtService = require("../utils/JwtService")
const { JWT_SECRET } = require("../config")
const userService = require("../service/user")
const User = require("../models/User")

const authenticate = async(req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized"
            })
        }
        token = token.split(" ")[1]
        const decoded = JwtService.varify(token, JWT_SECRET)
        // const user = await User.findById(decoded._id)
        const user = await userService.findUserByProperty("_id", decoded._id)
        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized",
            })
        }

        req.user = user
        next()

    } catch (e) {
        next(e)
    }
}

module.exports = authenticate