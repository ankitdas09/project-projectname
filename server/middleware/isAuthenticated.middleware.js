const AppError = require('../utils/AppError')
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated() && !req.user) {
        throw new AppError('Not Authenticated', 403)
        return
    }
    next()
}

module.exports = isAuthenticated