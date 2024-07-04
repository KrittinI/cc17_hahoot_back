const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const userController = {};

userController.getUserByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const existedUser = await userService.getUserByUserId(+userId);
    if (!existedUser) {
      createError(400, "User not found");
    }
    res.status(200).json(existedUser);
  } catch (error) {
    next(error);
  }
};

userController.updateUserProfile = async (req, res, next) => {
  try {
    const data = req.body;
    if (data.username?.length < 6) {
      createError(400, "username must have at least 6 characters");
    }

    const existedUsername = await userService.findUserByUsername(data.username);
    if (existedUsername && existedUsername?.id !== req.user.id) {
      createError(400, "username is already used");
    }

    const existedUser = await userService.findUserById(req.user.id);
    if (!existedUser) {
      createError(400, "User not found");
    }

    if (data.password) {
      data.password = await hashService.hash(data.password);
    }
    const updateUser = await userService.updateUser(existedUser.id, data);

    res.status(200).json({ user: updateUser });
  } catch (error) {
    next(error);
  }
};

userController.deactivateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const existedUser = await userService.findUserById(+userId);
    if (!existedUser) {
      createError(400, "user not found");
    }

    const updateUser = await userService.updateUser(existedUser.id, { isActive: false });
    res.status(200).json({ user: updateUser });
  } catch (error) {
    next(error);
  }
};

userController.activateUSer = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const existedUser = await userService.findUserById(+userId);
    if (!existedUser) {
      createError(400, "user not found");
    }

    const updateUser = await userService.updateUser(existedUser.id, { isActive: true });
    res.status(200).json({ user: updateUser });
  } catch (error) {
    next(error);
  }
};

userController.getHeroByIsActive = async (req, res, next) => {
  try {
    const hero = await userService.getHeroByIsActive();
    res.status(200).json({ hero });
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
