const bcrypt = require("bcrypt")
const userService = require("./user")
const error = require("../utils/error")
const { JWT_EXPIRY, JWT_SECRET } = require("../config")
const JwtService = require("../utils/JwtService")


const registerService = async ({ name, email, password, roles, accountStatus }) => {
    let user = await userService.findUserByProperty("email", email)
    if (user) throw error("User already exist", 400)
    
    const hashPassword = await bcrypt.hash(password, 10)

    return userService.createNewUser({name, email, password: hashPassword, roles, accountStatus})
}

const loginService = async ({ email, password }) => {

    let user = await userService.findUserByProperty("email", email)
 
    if (!user) throw error("Worng Email or Password", 400)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw error("Worng Email or Password", 400)
    
    const payload = {
        _id : user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus
    }
    return JwtService.sign(payload, JWT_EXPIRY, JWT_SECRET)

}

module.exports = {
    registerService,
    loginService
}