const favoriteService = require("../services/favorite-service");
const questionService = require("../services/question-service");
const topicService = require("../services/topic-service");
const uploadService = require("../services/upload-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const fs = require("fs/promises");
const cloudinary = require("../config/cloudinary");

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
    const questionInTopic = await questionService.getQuestionByTopicId(
      topicExisted.id,
      req.user.id
    );
    res.status(200).json({ questions: questionInTopic });
  } catch (err) {
    next(err);
  }
};

// GET Question by QuestionId
questionController.getQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const question = await questionService.getQuestionByQuestionId(
      +questionId,
      req.user.id
    );
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
    const questions = await questionService.getQuestionByUserId(
      existUser.id,
      req.user.id
    );
    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

// GET Question by Favorite
questionController.getFavQuestionByAuthId = async (req, res, next) => {
  try {
    const questionsId = await favoriteService.findQuestionRelationByUserId(
      req.user.id
    );
    const questions = questionsId.map((question) => question.question);
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
//ทํ่ําไมไม่ใช้ checkquestion middleware ไปเลยนะ???
questionController.editQuestionByQuestionId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { questionId } = req.params;
    const data = JSON.parse(req.body.questions);
    const path = await uploadService.upload(req.file?.path);
    const question = { ...data, questionPicture: path };

    if (
      !question.question ||
      !question.choice1 ||
      !question.choice2 ||
      !question.answer
    ) {
      createError(400, "invalid question");
    }

    if (question.answer === "C" && !question.choice3) {
      createError(400, "invalid question");
    }

    if (question.answer === "D" && (!question?.choice3 || !question?.choice4)) {
      createError(400, "invalid question");
    }

    const existedTopic = await topicService.findTopicById(+question.topicId);
    if (!existedTopic) {
      createError(400, "topic not found");
    }
    const existedQuestion = await questionService.getQuestionByQuestionId(
      +questionId,
      +id
    );
    if (!existedQuestion) {
      createError(400, "this question id does not exist");
    }

    delete question.questionComments;

    if (path && existedQuestion?.questionPicture) {
      const src = existedQuestion?.questionPicture
        ?.split("/")
        .pop()
        .split(".")[0];
      await cloudinary.uploader.destroy(src);
    }

    const updateQuestion = await questionService.editQuestionByQuestionId(
      existedQuestion.id,
      question
    );

    res.status(200).json({ question: updateQuestion });
  } catch (err) {
    next(err);
  } finally {
    if (req.file?.fieldname === "questionPicture") {
      fs.unlink(req.file?.path);
    }
  }
};

// DELETE Delete Question
questionController.deleteQuestionByQuestionId = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const existedQuestion = await questionService.getQuestionByQuestionId(
      +questionId
    );
    if (!existedQuestion) {
      createError(400, "this question id does not exist");
    }
    const question = await questionService.deleteQuestionByQuestionId(
      existedQuestion.id
    );
    console.log("deleted");
    res.status(204).json({ question });
  } catch (err) {
    next(err);
  }
};

module.exports = questionController;
