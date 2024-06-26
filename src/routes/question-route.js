const { Router } = require("express");
const questionController = require("../controllers/question-controller");
const checkQuestionMiddleware = require("../middlewares/check-quesiton");
// const questionController = require('../controllers/question-controller')

const questionRouter = Router();

questionRouter.get("/", questionController.getAllQuestion);
questionRouter.get("/topic/:topicId", questionController.getQuestionByTopicId);
questionRouter.get("/favorite", questionController.getFavQuestionByAuthId);

questionRouter.get("/:questionId", questionController.getQuestionByQuestionId);
questionRouter.get("/users/:userId", questionController.getQuestionByUserId);

questionRouter.post("/", checkQuestionMiddleware, questionController.createQuestions);
questionRouter.patch("/:questionId", questionController.editQuestionByQuestionId);
// questionRouter.delete("/:questionId", questionController.deleteQuestionByQuestionId);

module.exports = questionRouter;
