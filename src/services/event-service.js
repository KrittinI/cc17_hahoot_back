const prisma = require("../models/prisma")

const eventFilter = {
    id: true,
    eventName: true,
    description: true,
    eventImage: true,
    dueDate: true,
    creatorId: true,
    topicId: true,
    isPublic: true,
}

const eventService = {}

eventService.getAllEvent = (userId) => prisma.event.findMany({
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
})

eventService.findEventByTopicId = (topicId, userId) => prisma.event.findMany({
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
        EventFavorites: {
            where: { userId }
        }
    }
})

eventService.findEventByUserId = (creatorId, userId) => prisma.event.findMany({
    where: { creatorId },
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
})

eventService.findEventById = (id) => prisma.event.findFirst({
    where: { id }
})

eventService.createEvent = (data) => prisma.event.create({ data })

module.exports = eventService