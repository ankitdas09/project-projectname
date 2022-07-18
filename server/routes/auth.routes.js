const router = require('express').Router()
const passport = require('passport');

router.get('/login/success', (req, res) => {
    if (!req.isAuthenticated() && !req.user) {
        res.status(403).send('Not Authenticated')
        return
    }
    res.send('user logged in')
})

router.get("/login/failed", (req, res) => {
    res.status(500).send('Not Authenticated!')

});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/google/redirect", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
})
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router