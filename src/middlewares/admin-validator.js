const createError = require("../utils/create-error")

const adminValidate = (req, res, next) => {
    if (!req.user.isAdmin) {
        createError(403, "Not permission for this.")
    }
    next()
}

module.exports = adminValidate