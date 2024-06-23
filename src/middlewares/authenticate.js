const jwt = require('jsonwebtoken');
const createError = require('../utils/create-error');
// const userService = require('../services/user-service');

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            createError(401, 'unauthenticated')
        }

        const accessToken = authorization.split(' ')[1]
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)

        const user = await userService.findUserById(payload.id)
        if (!user) {
            createError(400, "user not found")
        }
        delete user.password
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authenticate