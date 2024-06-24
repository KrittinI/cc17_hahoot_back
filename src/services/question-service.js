const prisma = require("../models/prisma");

const questionService = {};

questionService.getAllQuestion = () => {
  return prisma.question.findMany({});
};
questionService.getQuestionByTopicId = (topicId) => {
  return prisma.question.findMany({
    where: {
      topic_id: topicId,
    },
  });
};
questionService.getQuestionByQuestionId = (questionId) => {
  return prisma.question.findFirst({
    where: {
      id: questionId,
    },
  });
};

questionService.getQuestionByUserId = (userId) => {
  return prisma.question.findMany({
    where: {
      creatorId: userId,
    },
  });
};
questionService.getFavQuestionByAuthId = (authId) => {
  console.log(authId, "auth");
  return prisma.questionFavorite.findMany({
    where: {
      userId: authId,
    },
  });
};

questionService.createQuestions = (questions) => {
  return prisma.question.createMany({
    data: questions,
  });
};
questionService.editQuestionByQuestionId = (questionId, newInfo) => {
  return prisma.question.update({
    where: {
      id: questionId,
    },
    data: newInfo,
  });
};
questionService.deleteQuestionByQuestionId = (questionId) => {
  return prisma.question.delete({
    where: {
      id: questionId,
    },
  });
};

module.exports = questionService;
