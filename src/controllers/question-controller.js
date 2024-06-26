const questionService = require("../services/question-service");
const topicService = require("../services/topic-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const questionController = {};

questionController.getAllQuestion = async (req, res, next) => {
  try {
    const allQuestion = await questionService.getAllQuestion();
    res.status(200).json({ questions: allQuestion });
  } catch (err) {
    next(err);
  }
};

questionController.getQuestionByTopicId = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const topicExisted = await topicService.findTopicById(+topicId);
    if (!topicExisted) {
      createError(400, "topicId does not exist");
    }
    const questionInTopic = await questionService.getQuestionByTopicId(topicExisted.id);
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
      createError(400, "this question Id does not exist");
    }
    res.status(200).json({ question });
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
    const questions = await questionService.getQuestionByUserId(existUser.id);
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

questionController.getFavQuestionByAuthId = async (req, res, next) => {
  try {
    // const { id } = req.user;
    // const questions = await questionService.getFavQuestionByAuthId(+id);
    // res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

questionController.createQuestions = async (req, res, next) => {
  try {
    const { questions } = req.body;
    await questionService.createQuestions(questions);
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

questionController.editQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = { ...req.body }
    console.log(question);
    if (!question.question || !question.choice1 || !question.choice2 || !question.answer) {
      createError(400, "invalid question")
    }

    if (question.answer === "C" && !question.choice3) {
      createError(400, "invalid question")
    }

    if (question.answer === "D" && !question.choice4 || !question.choice3) {
      createError(400, "invalid question")
    }

    const existedTopic = await topicService.findTopicById(+question.topicId)
    if (!existedTopic) {
      createError(400, "topic not found")
    }
    const existedQuestion = await questionService.getQuestionByQuestionId(+questionId);
    if (!existedQuestion) {
      createError(400, "this question id does not exist");
    }
    const updateQuestion = await questionService.editQuestionByQuestionId(existedQuestion.id, req.body);
    res.status(200).json({ question: updateQuestion });
  } catch (err) {
    next(err);
  }
};

questionController.deleteQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const existedQuestion = await questionService.getQuestionByQuestionId(+questionId);
    if (!existedQuestion) {
      createError(400, "this question id does not exist");
    }
    const question = await questionService.deleteQuestionByQuestionId(existedQuestion.id);
    res.status(204).json({ question });
  } catch (err) {
    next(err);
  }
};

module.exports = questionController;
