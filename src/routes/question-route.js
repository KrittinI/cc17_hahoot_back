const { Router } = require("express");
const questionController = require("../controllers/question-controller");
const checkQuestionMiddleware = require("../middlewares/check-quesiton");
const favoriteController = require("../controllers/favorite-controller");
const commentController = require("../controllers/comment-controller");

const questionRouter = Router();

questionRouter.get("/", questionController.getAllQuestion);
questionRouter.get("/topic/:topicId", questionController.getQuestionByTopicId);
questionRouter.get("/users/:userId", questionController.getQuestionByUserId);
questionRouter.get("/favorite", questionController.getFavQuestionByAuthId);

questionRouter.get("/:questionId", questionController.getQuestionByQuestionId);

questionRouter.post("/", checkQuestionMiddleware, questionController.createQuestions);
questionRouter.patch("/:questionId", questionController.editQuestionByQuestionId);
// questionRouter.delete("/:questionId", questionController.deleteQuestionByQuestionId);

// Favorite
questionRouter.post("/:questionId/favorite", favoriteController.favoriteQuestion);
questionRouter.delete("/:questionId/favorite", favoriteController.unfavoriteQuestion);

// Comment
questionRouter.post("/:questionId/comment", commentController.createCommentQuestion);
questionRouter.patch("/:questionId/comment/:commentId", commentController.editCommentQuestion);
questionRouter.delete("/:questionId/comment/:commentId", commentController.deleteCommentQuestion);

module.exports = questionRouter;
