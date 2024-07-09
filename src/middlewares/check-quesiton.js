const questionService = require("../services/question-service");
const topicService = require("../services/topic-service");
const uploadService = require("../services/upload-service");
const createError = require("../utils/create-error");


const checkQuestionMiddleware = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.questions)
    const image = req.pictures
    for (let i in data) {
      if (!data[i].question || !data[i].choice1 || !data[i].choice2 || !data[i].answer) {
        uploadService.deleteArr(image)
        createError(400, "invalid question1");
      }

      if (data[i].answer === "C" && !data[i].choice3) {
        uploadService.deleteArr(image)
        createError(400, "invalid question2");
      }

      if (data[i].answer === "D" && (!data[i]?.choice3 || !data[i]?.choice4)) {
        uploadService.deleteArr(image)
        createError(400, "invalid question3");
      }

      const existedTopic = await topicService.findTopicById(+data[i].topicId);
      if (!existedTopic) {
        uploadService.deleteArr(image)
        createError(400, "topic not found");
      }
      data[i].questionPicture = image[i];
      data[i].isDelete = Boolean(data[i].isDelete);
      data[i].topicId = +data[i].topicId;
      data[i].creatorId = req.user.id;
    }
    req.body.questions = data;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkQuestionMiddleware;
