const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const playGameController = require("../controllers/playGame-controller");
const upload = require("../middlewares/upload");
const playRouter = Router();
playRouter.post("/sendmail", authenticate, playGameController.sendMail);
playRouter.post(
  "/multiplayer/sendmail",
  upload.single("scoreImage"),
  playGameController.multiplayerSendMail
);
playRouter.post(
  "/multiplayerClient/sendmail",
  playGameController.clientPlayerSendMail
);
module.exports = playRouter;
