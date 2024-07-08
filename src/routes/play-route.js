const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const playGameController = require("../controllers/playGame-controller");
const playRouter = Router();
playRouter.post("/sendmail", authenticate, playGameController.sendMail);
module.exports = playRouter;
