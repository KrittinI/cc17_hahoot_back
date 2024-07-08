const prisma = require("../models/prisma");

const assignService = {}

assignService.createRelation = (data) => prisma.assignOfBridge.createMany({ data })

assignService.findQuestionInEvent = (eventId, userId) => prisma.assignOfBridge.findMany({
    where: { eventId },
    include: {
        question: {
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
        }
    }
})

module.exports = assignService;
