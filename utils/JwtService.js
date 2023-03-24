const jwt = require("jsonwebtoken")
const { JWT_SECRET, JWT_EXPIRY } = require("../config")

class JwtService {
    static sign(payload, expiry = JWT_EXPIRY, secret = JWT_SECRET) {
        return jwt.sign(payload, secret, {expiresIn: expiry})
    }

    static varify(payload, secret = JWT_SECRET) {
        return jwt.verify(payload, secret)
    }
}

module.exports = JwtService

