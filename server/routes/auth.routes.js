const router = require('express').Router()
const passport = require('passport');

const isAuthenticated = require('../middleware/isAuthenticated.middleware')
const isAdmin = require('../middleware/isAdmin.middleware')
const AppError = require('../utils/AppError')

router.get('/admin', isAdmin, (req, res) => {
    res.status(200).json({ admin: true })
})

router.get("/login/success", isAuthenticated, (req, res) => {
    // console.log(req.user)
    res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: req.user,
    })

})

router.get("/login/failed", (req, res) => {
    throw new AppError('Can\'t Log in!', 500)
})

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/google/redirect", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
})
)

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

module.exports = router