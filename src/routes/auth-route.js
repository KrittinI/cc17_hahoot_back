const { Router } = require("express");
const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");

const authRoute = Router();

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.get("/verify", authController.verify);
authRoute.get("/me", authenticate, authController.getMe);

module.exports = authRoute;
