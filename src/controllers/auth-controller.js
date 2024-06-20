const authController = {}

authController.login = (req, res, next) => {
    console.log("login");
}
authController.register = (req, res, next) => {
    console.log("register");
}
authController.getMe = (req, res, next) => {
    console.log("getme");
}

module.exports = authController