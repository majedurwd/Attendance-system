
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")

const { APP_PORT, DB_URI } = require("./config")
const routes = require("./routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(routes)

app.use((err, _req, res, _next) => {
    const statusCode = err.status ? err.status : 500;
    const msg = err.message ? err.message : "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        msg
    })
})

// Database Connection
mongoose.connect(DB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("Database Connected")
        app.listen(APP_PORT, () => {
            console.log(`Server is Running on http://localhost:${APP_PORT}/`)
        })
    })
    .catch(err => {
        console.log(err.message)
    })
