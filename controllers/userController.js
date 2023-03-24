
const userService = require("../service/user")
const authService = require("../service/auth")
const error = require("../utils/error")

const getUser = async (req, res, next) => { 
    /**
    * TODO: filter, sort, pagination, select
    */
    try {
        const user = await userService.findUsers()
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

const getUserById = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const user = await userService.findUserByProperty("_id", userId)
        if (!user) {
            throw error("User not found!", 404)
        }
        return res.status(200).json({
            success: true,
            user
        })

    } catch (e) {
        next(e)
    }
}

const postUser = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body
    try {
        const user = await authService.registerService({
            name,
            email,
            password,
            roles,
            accountStatus,
        })
        res.status(200).json({
            success: true,
            user
        })
        
    } catch (e) {
        next(e)
    }
}

const putUserById = async (req, res, next) => {
    const { userId } = req.params
    const { name, email, roles, accountStatus } = req.body
    try {
        const user = await userService.updateUser(userId, { name, email, roles, accountStatus })

        if (!user) throw error("User not found!", 400)
        return res.status(200).json({
            success: true,
            user
        })
    } catch (e) {
        next(e)
    }
}

const patchUserById = async (req, res, next) => {
    try {
        const { userId } = req.params
        const { name, roles, accountStatus } = req.body
        const user = await userService.findUserByProperty("_id", userId)

        if (!user) throw error("User not found!", 400)
        
        user.name = name ?? user.name
        user.roles = roles ?? user.roles
        user.accountStatus = accountStatus ?? user.accountStatus
        await user.save()
        return res.status(200).json({
            success: true,
            user
        })
    } catch (e) {
        next(e)
    }
}

const deleteUserById = async (req, res, next) => {
    const { userId } = req.params

    try {
        const user = await userService.findUserByProperty("_id", userId)
        if (!user) throw error("User not found!", 400)
        user.remove()
        res.status(203).send()

    } catch (e) {
        next(e)
    }
    
    
}

module.exports = {
    getUser,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUserById,
}