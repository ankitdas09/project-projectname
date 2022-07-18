require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
const passport = require('passport')
const GoogleStrat = require('./passport/passport.config')

const authRoutes = require('./routes/auth.routes')

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
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, (req, res) => console.log(`Listening on PORT ${PORT}`))