const prisma = require("../models/prisma");

const questionService = {};

questionService.getAllQuestion = () => {
  return prisma.question.findMany({
    // where: { isPublic: true },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true
        }
      },
      topic: true,
    }
  });
};

questionService.getQuestionByTopicId = (topicId) => {
  return prisma.question.findMany({
    where: { topicId },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true
        }
      },
      topic: true,
    }
  });
};

questionService.getQuestionByQuestionId = (id) => {
  return prisma.question.findFirst({
    where: { id },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true
        }
      },
      topic: true,
      questionComments: true,
    }
  });
};

questionService.getQuestionByUserId = (creatorId) => {
  return prisma.question.findMany({
    where: { creatorId },
    include: {
      creator: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true
        }
      },
      topic: true,
      questionComments: true,
    }
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
