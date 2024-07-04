const { Router } = require("express");
const userController = require("../controllers/user-controller");
const adminValidate = require("../middlewares/admin-validator");

const userRouter = Router();

userRouter.get("/:userId", userController.getUserByUserId);
userRouter.get("/", userController.getHeroByIsActive);
userRouter.patch("/", userController.updateUserProfile);
userRouter.patch("/:userId/deactivate", adminValidate, userController.deactivateUser);
userRouter.patch("/:userId/activate", adminValidate, userController.activateUSer);

module.exports = userRouter;
