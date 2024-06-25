const questionService = require("../services/question-service");
const topicService = require("../services/topic-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const questionController = {};

questionController.getAllQuestion = async (req, res, next) => {
  try {
    const allQuestion = await questionService.getAllQuestion();
    res.status(200).json(allQuestion);
  } catch (err) {
    next(err);
  }
};
questionController.getQuestionByTopicId = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const isTopicExisted = await topicService.findTopicById(+topicId);
    if (!isTopicExisted) {
      createError(500, "topicId does not exist");
    }
    const questionInTopic = await questionService.getQuestionByTopicId(+topicId);
    res.status(200).json({ questions: questionInTopic });
  } catch (err) {
    next(err);
  }
};

questionController.getQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await questionService.getQuestionByQuestionId(+questionId);
    if (!question) {
      createError(500, "this question Id does not exist");
    }
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};

questionController.getQuestionByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const existUser = await userService.findUserById(+userId);
    if (!existUser) {
      createError(500, "this userId is not found");
    }
    const questions = await questionService.getQuestionByUserId(+userId);
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};
questionController.getFavQuestionByAuthId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const questions = await questionService.getFavQuestionByAuthId(+id);
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

questionController.createQuestions = async (req, res, next) => {
  try {
    const { questions } = req.body;
    const question = await questionService.createQuestions(questions);
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};
questionController.editQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const isQuestionIdExist = await questionService.getQuestionByQuestionId(+questionId);
    if (!isQuestionIdExist) {
      createError(500, "this question id does not exist");
    }
    const question = await questionService.editQuestionByQuestionId(+questionId, req.body);
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};
questionController.deleteQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const isQuestionIdExist = await questionService.getQuestionByQuestionId(+questionId);
    if (!isQuestionIdExist) {
      createError(500, "this question id does not exist");
    }
    const question = await questionService.deleteQuestionByQuestionId(+questionId);
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};
module.exports = questionController;
