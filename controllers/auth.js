
const error = require("../utils/error")
const { registerService, loginService } = require("../service/auth")


// Register Controller
const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        // validation
        if (!name || !email || !password) throw error("Invalid data", 400)

        const user = await registerService({name, email, password})
        res.status(200).json({
            success: true,
            user
        })

    } catch (e) {
        next(e)
    }
}

// Login Controller
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const token = await loginService({ email, password })
        
        res.status(200).json({
            success: true,
            token
        })
        
    } catch (e) {
        next(e)
    }
}


module.exports = {
    registerController,
    loginController,
}