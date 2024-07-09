const { boolean } = require("joi");
const prisma = require("../models/prisma");

const questionService = {};

questionService.getAllQuestion = (userId) => {
  return prisma.question.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      QuestionFavorite: {
        where: { userId },
      },
    },
  });
};

questionService.getQuestionByTopicId = (topicId, userId) => {
  return prisma.question.findMany({
    where: { topicId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      QuestionFavorite: {
        where: { userId },
      },
    },
  });
};

questionService.getQuestionByQuestionId = (id, userId) => {
  // console.log(+id, "hahah");
  return prisma.question.findFirst({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      questionComments: true,
      QuestionFavorite: {
        where: { userId },
      },
    },
  });
};

questionService.getQuestionByUserId = (creatorId, userId) => {
  return prisma.question.findMany({
    where: { creatorId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      QuestionFavorite: {
        where: { userId: userId },
      },
    },
  });
};

questionService.getQuestionByArr = (questionArr, userId) =>
  prisma.question.findMany({
    where: { id: { in: questionArr } },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      QuestionFavorite: {
        where: { userId },
      },
    },
  });

questionService.createQuestions = (questions) => {
  return prisma.question.createMany({
    data: questions,
  });
};

questionService.editQuestionByQuestionId = (questionId, newInfo) => {
  // delete newInfo.id;
  const { id, topic, topicId, creatorId, QuestionFavorite, user, index, ...data } = newInfo;
  const newestInfo = { ...data, isDelete: Boolean(+newInfo.isDelete) };
  return prisma.question.update({
    where: {
      id: questionId,
    },
    data: newestInfo,
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
