const dotenv = require("dotenv")

dotenv.config()

module.exports = {
    APP_PORT,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRY,
} = process.env