const adminService = require("../services/admin-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");
const fs = require("fs/promises");

const adminController = {};

// get user profile Event and Question
adminController.getAllData = async (req, res, next) => {
  try {
    const data = await adminService.getAllData()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

adminController.getAllUserProfile = async (req, res, next) => {
  try {
    const users = await adminService.getAllUserProfile();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

adminController.getAllEvent = async (req, res, next) => {
  try {
    const events = await adminService.getAllEventList();
    res.status(200).json({ events });
  } catch (err) {
    next(err);
  }
};

adminController.getAllQuestion = async (req, res, next) => {
  try {
    const question = await adminService.getAllQuestion();
    res.status(200).json({ question });
  } catch (err) {
    next(err);
  }
};

//block And Unblock User
adminController.updateUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await adminService.findUserStatus(userId);
    if (!user) {
      createError(500, "this userId is not found");
    }
    const status = await adminService.updateStatus(userId, user.isActive);
    res.status(200).json(status);
  } catch (err) {
    next(err);
  }
};

//createHero
adminController.createHero = async (req, res, next) => {
  try {
    const heroInfo = req.body;
    console.log(req.files);
    const promises = [];
    if (req.files.eventPicture) {
      const result = uploadService.upload(req.files.eventPicture[0].path).then((url) => ({ url, key: "eventPicture" }));
      promises.push(result);
    }
    if (req.files.icon) {
      const result = await uploadService.upload(req.files.icon[0].path).then((url) => ({ url, key: "icon" }));
      promises.push(result);
    }

    const allResult = await Promise.all(promises);

    console.log(allResult);

    const pictures = allResult.reduce((acc, cur) => {
      acc[cur.key] = cur["url"];
      return acc;
    }, {});

    if (!heroInfo.title) createError(400, "invalid title");
    if (!heroInfo.detail) createError(400, "invalid detail");
    if (!heroInfo.quiz1 || !heroInfo.quiz2 || !heroInfo.quiz3 || !heroInfo.quiz3 || !heroInfo.quiz4) createError(400, "question must have 4 questions");

    const data = { ...req.body, quiz1: +req.body.quiz1, quiz2: +req.body.quiz2, quiz3: +req.body.quiz3, quiz4: +req.body.quiz4, ...pictures };

    const event = await adminService.createHero(data);
    await adminService.editHeroById(event.id);
    res.status(200).json({ event });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.eventPicture) {
      fs.unlink(req.files.eventPicture[0].path);
    }
    if (req.files.icon) {
      fs.unlink(req.files.icon[0].path);
    }
  }
};

// editHero getHero
adminController.editHeroById = async (req, res, next) => {
  try {
    const { heroId } = req.params;

    const existHero = await adminService.getHeroById(heroId);

    if (!existHero) {
      createError(500, "this heroId is not found");
    }

    const updated = await adminService.editHeroById(heroId);
    res.status(200).json({ updated: updated[1] });
  } catch (err) {
    next(err);
  }
};

adminController.getAllHero = async (req, res, next) => {
  try {
    const heros = await adminService.getAllHero();
    res.status(200).json({ heros });
  } catch (err) {
    next(er);
  }
};

adminController.getHeroByIsActive = async (req, res, next) => {
  try {
    const hero = await adminService.getHeroByIsActive();
    if (!hero) {
      createError(500, "do not have any activated hero");
    }
    res.status(200).json({ hero });
  } catch (err) {
    next(err);
  }
};
module.exports = adminController;
