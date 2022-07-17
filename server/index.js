require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.use(cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 1000
}))

const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) => console.log(`Listening on PORT ${PORT}`))