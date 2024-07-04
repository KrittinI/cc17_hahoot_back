const { Router } = require("express");
const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");

const adminRouter = Router();

//############# get user profile Event and Question
adminRouter.get("/users", adminController.getAllUserProfile);
adminRouter.get("/events", adminController.getAllEvent);
adminRouter.get("/questions", adminController.getAllQuestion);

//############ blockUser
adminRouter.patch("/users/:userId", adminController.updateUserStatus);

//########### createHero
adminRouter.post(
  "/hero",
  upload.fields([
    { name: "eventPicture", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  adminController.createHero
);

//############ editHero(isActive)
adminRouter.patch("/hero/:heroId", adminController.editHeroById);

//########### get All and isActive hero
adminRouter.get("/hero", adminController.getAllHero);
adminRouter.get("/hero/Active", adminController.getHeroByIsActive);

//delete event and edit event
//reuse with event route

//delete Question and edit Question
//reuse with question route

module.exports = adminRouter;
