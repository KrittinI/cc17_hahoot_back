const prisma = require("../models/prisma");

const questionService = {};

questionService.getAllQuestion = (userId) => {
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
      QuestionFavorite: {
        where: { userId }
      }
    }
  });
};

questionService.getQuestionByTopicId = (topicId, userId) => {
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
      QuestionFavorite: {
        where: { userId }
      }
    }
  });
};

questionService.getQuestionByQuestionId = (id, userId) => {
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
      QuestionFavorite: {
        where: { userId }
      }
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
        },
      },
      topic: true,
      QuestionFavorite: {
        where: { userId: creatorId }
      }
    }
  });
};

questionService.getQuestionByArr = (questionArr) => prisma.question.findMany({
  where: { id: { in: questionArr } },
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
})

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
