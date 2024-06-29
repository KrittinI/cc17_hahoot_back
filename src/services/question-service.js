const prisma = require("../models/prisma");

const questionService = {};

questionService.getAllQuestion = (userId) => {
  return prisma.question.findMany({
    // where: { isPublic: true },
    include: {
      user: {
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
      user: {
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
      user: {
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

questionService.getQuestionByUserId = (creatorId, userId) => {
  return prisma.question.findMany({
    where: { creatorId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true
        },
      },
      topic: true,
      QuestionFavorite: {
        where: { userId: userId }
      }
    }
  });
};

questionService.getQuestionByArr = (questionArr, userId) => prisma.question.findMany({
  where: { id: { in: questionArr } },
  include: {
    user: {
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
})

questionService.createQuestion = (question) => prisma.question.create({ data: question })

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
