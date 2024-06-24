const questionService = require("../services/question-service");

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
    const questionInTopic = await questionService.getQuestionByTopicId(topicId);
    res.status(200).json({ questions: questionInTopic });
  } catch (err) {
    next(err);
  }
};

questionController.getQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await questionService.getQuestionByQuestionId(questionId);
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};

questionController.getQuestionByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
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
    const question = await questionService.editQuestionByQuestionId(+questionId, req.body);
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};
questionController.deleteQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await questionService.deleteQuestionByQuestionId(+questionId);
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};
module.exports = questionController;
