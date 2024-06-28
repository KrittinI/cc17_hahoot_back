const favoriteService = require("../services/favorite-service");
const questionService = require("../services/question-service");
const topicService = require("../services/topic-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const questionController = {};

// GET ALL Question
questionController.getAllQuestion = async (req, res, next) => {
  try {
    const allQuestion = await questionService.getAllQuestion(req.user.id);
    res.status(200).json({ questions: allQuestion });
  } catch (err) {
    next(err);
  }
};

// GET Question by Topic
questionController.getQuestionByTopicId = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const topicExisted = await topicService.findTopicById(+topicId);
    if (!topicExisted) {
      createError(400, "topicId does not exist");
    }
    const questionInTopic = await questionService.getQuestionByTopicId(topicExisted.id, req.user.id);
    res.status(200).json({ questions: questionInTopic });
  } catch (err) {
    next(err);
  }
};


// GET Question by QuestionId
questionController.getQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await questionService.getQuestionByQuestionId(+questionId, req.user.id);
    if (!question) {
      createError(400, "this question Id does not exist");
    }
    res.status(200).json({ question });
  } catch (err) {
    next(err);
  }
};


// GET Question by UserId
questionController.getQuestionByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const existUser = await userService.findUserById(+userId);
    if (!existUser) {
      createError(500, "this userId is not found");
    }
    const questions = await questionService.getQuestionByUserId(existUser.id, req.user.id);
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

// GET Question by Favorite
questionController.getFavQuestionByAuthId = async (req, res, next) => {
  try {
    const questionsId = await favoriteService.findQuestionRelationByUserId(req.user.id)
    const questionArr = questionsId.map(question => question.questionId)
    const questions = await questionService.getQuestionByArr(questionArr, req.user.id)
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

// POST Create Question
questionController.createQuestions = async (req, res, next) => {
  try {
    const { questions } = req.body;
    await questionService.createQuestions(questions);
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

// PATCH Edit Question
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


// DELETE Delete Question
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
