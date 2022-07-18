const AppError = require('../utils/AppError')
const adminMails = require('../models/adminEmails.model')
const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated() && !req.user) {
        throw new AppError('Not Authenticated!', 403)
        return
    }
    if (!adminMails.includes(req.user._json.email)) {
        throw new AppError('Not Admin!', 403)
        return
    }
    next()
}

module.exports = isAdmin