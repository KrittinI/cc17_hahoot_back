const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
const jwtService = require("../services/jwt-services");
const userService = require("../services/user-service");
// const userService = require('../services/user-service');

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError(401, "unauthenticated");
    }

    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);

    const user = await userService.findUserById(payload.id);
    if (!user) {
      createError(400, "user not found");
    }
    if (user?.password !== null && user?.password !== "") {
      delete user?.password
    } else user.password = "firstLogin"
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
