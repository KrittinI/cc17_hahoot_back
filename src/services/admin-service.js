const prisma = require("../models/prisma");

const adminService = {};

adminService.getAllUserProfile = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      isActive: true,
      _count: {
        select: {
          events: true,
          Questions: true
        }
      }
    },

  });
};

adminService.getAllEventList = () => {
  return prisma.event.findMany({
    select: {
      id: true,
      eventName: true,
      user: {
        select: {
          username: true
        }
      },
      topicId: true,
      topic: {
        select: {
          topicName: true
        }
      },
      _count: {
        select: {
          assignOfBridges: true
        }
      }
    }
  });
};

adminService.getAllQuestion = () => {
  return prisma.question.findMany({
    select: {
      question: true,
      answer: true,
      topicId: true,
      topic: {
        select: {
          topicName: true,
        }
      },
      _count: {
        select: {
          assignOfBridges: true
        }
      }
    }
  });
};

//update status
adminService.findUserStatus = (userId) => {
  return prisma.user.findFirst({ where: { id: +userId } });
};

adminService.updateStatus = (userId, status) => {
  console.log(status);
  return prisma.user.update({
    where: { id: +userId },
    data: {
      isActive: !status,
    },
  });
};

adminService.createHero = (data) => {
  return prisma.hero.create({
    data,
  });
};

adminService.editHeroById = (heroId) => {
  return prisma.$transaction([
    prisma.hero.updateMany({
      where: {
        id: {
          not: +heroId,
        },
      },
      data: {
        isActive: false,
      },
    }),

    prisma.hero.update({
      where: {
        id: +heroId,
      },
      data: {
        isActive: true,
      },
    }),
  ]);
};

adminService.getAllHero = () => {
  return prisma.hero.findMany({});
};

adminService.getHeroById = (heroId) => {
  return prisma.hero.findFirst({
    where: {
      id: +heroId,
    },
    include: {
      question1: true,
      question2: true,
      question3: true,
      question4: true,
    },
  });
};

adminService.getHeroByIsActive = () => {
  return prisma.hero.findFirst({
    where: {
      isActive: true,
    },
    include: {
      question1: true,
      question2: true,
      question3: true,
      question4: true,
    },
  });
};

module.exports = adminService;
