const prisma = require("../models/prisma");

const favoriteService = {}

// ************************ QUESTION ************************
favoriteService.findRelationByQuestionAndUserId = (userId, questionId) => prisma.questionFavorite.findFirst({
    where: { userId, questionId }
})

favoriteService.createQuestionFavorite = (userId, questionId) => prisma.questionFavorite.create({
    data: { userId, questionId }
})

favoriteService.deleteQuestionFavorite = (id) => prisma.questionFavorite.delete({
    where: { id }
})

favoriteService.findQuestionRelationByUserId = (userId) => prisma.questionFavorite.findMany({
    where: { userId },
    include: {
        question: {
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
        }
    }
})


// ************************ EVENT ************************
favoriteService.findRelationByEventAndUserId = (userId, eventId) => prisma.eventFavorite.findFirst({
    where: { userId, eventId }
})

favoriteService.createEventFavorite = (userId, eventId) => prisma.eventFavorite.create({
    data: { userId, eventId }
})

favoriteService.deleteEventFavorite = (id) => prisma.eventFavorite.delete({
    where: { id }
})

favoriteService.findEventRelationByUserId = (userId) => prisma.eventFavorite.findMany({
    where: { userId },
    include: {
        event: {
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
                EventFavorites: {
                    where: { userId }
                }
            }
        }
    }
})

module.exports = favoriteService;