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

eventService.getAllEvent = () => prisma.event.findMany()

eventService.findEventByTopicId = (topicId) => prisma.event.findMany({
    where: { topicId }
})

eventService.findEventByUserId = (creatorId) => prisma.event.findMany({
    where: { creatorId }
})

eventService.findEventById = (id) => prisma.event.findFirst({
    where: { id }
})

eventService.createEvent = (data) => prisma.event.create({ data })

module.exports = eventService