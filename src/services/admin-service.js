const prisma = require("../models/prisma");

const adminService = {};
const userFilter = {
  id: true,
  email: true,
  username: true,
  profileImage: true,
  googleImage: true,
  isActive: true,
  isAdmin: true,
};
adminService.getAllData = async () => {
  const result = {}
  result.users = await prisma.user.findMany({
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
  })
  result.topics = await prisma.topic.findMany()
  result.questions = await prisma.question.findMany({
    select: {
      id: true,
      question: true,
      questionPicture: true,
      user: {
        select: {
          username: true
        }
      },
      answer: true,
      topicId: true,
      _count: {
        select: {
          assignOfBridges: true,
          AnswerOfBridge: true
        }
      }
    }
  })
  result.events = await prisma.event.findMany({
    select: {
      id: true,
      eventName: true,
      user: {
        select: {
          username: true
        }
      },
      topicId: true,
      _count: {
        select: {
          assignOfBridges: true,
        }
      }
    }
  })
  result.rooms = await prisma.room.groupBy({
    by: ['roomId', "eventId"],
    _count: {
      participantId: true
    },
  })
  result.heros = await prisma.hero.findMany({
    include: {
      question1: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question2: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question3: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question4: {
        select: {
          question: true,
          questionPicture: true
        }
      },
    }
  })

  result.answerQuestion = await prisma.answerOfBridge.groupBy({
    by: ["questionId"],
    where: {
      answer: {
        equals: true
      }
    },
    _count: {
      answer: true
    }
  })


  return result
}

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
    include: {
      question1: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question2: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question3: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question4: {
        select: {
          question: true,
          questionPicture: true
        }
      }
    }
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
  return prisma.hero.findMany({
    include: {
      question1: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question2: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question3: {
        select: {
          question: true,
          questionPicture: true
        }
      },
      question4: {
        select: {
          question: true,
          questionPicture: true
        }
      },
    }
  });
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
