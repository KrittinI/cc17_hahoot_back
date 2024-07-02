const questionService = require("../services/question-service");
const topicService = require("../services/topic-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");

const checkQuestionMiddleware = async (req, res, next) => {
  try {
    console.log(req.body, "checkkkkk‹");
    // const data = [...req.body.questions];
    console.log(req.file, "file");

    //may be problem
    const data = [{ ...req.body }];
    console.log(data, "dataaaaa");

    for (let question of data) {
      console.log("logggggggggggggg");
      if (!question.question || !question.choice1 || !question.choice2 || !question.answer) {
        createError(400, "invalid question1");
      }

      if (question.answer === "C" && !question.choice3) {
        createError(400, "invalid question2");
      }

      if ((question.answer === "D" && !question.choice4) || !question.choice3) {
        createError(400, "invalid question3");
      }

      const existedTopic = await topicService.findTopicById(+question.topicId);
      if (!existedTopic) {
        createError(400, "topic not found");
      }
      const path = await uploadService.upload(req.file.path);
      question.questionPicture = path;
      question.isPublic = Boolean(question.isPublic);
      question.topicId = +question.topicId;
      question.creatorId = req.user.id;
    }
    req.body.questions = data;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkQuestionMiddleware;
