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

eventService.findEventById = (id, userId) => prisma.event.findFirst({
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
        EventFavorites: {
            where: { userId }
        },
        EventComments: true
    }
})

eventService.createEvent = (body) => prisma.$transaction(async (tx) => {
    const result = {}
    // *************************** Create New Event
    const events = await tx.event.create({ data: body.events })

    // *************************** Create New Question
    const assign = []
    const questions = []
    const data = [...body.questions]
    let index = 1
    for (let question of data) {
        const assignData = {}
        assignData.eventId = events.id
        assignData.order = index++
        if (!question.id) {
            const newQuestion = await tx.question.create({ data: question })
            assignData.questionId = newQuestion.id
            questions.push(newQuestion)
        } else {
            assignData.questionId = question.id
            questions.push(question)
        }
        assign.push(assignData)
    }


    // *************************** Create Assign Relation
    await tx.assignOfBridge.createMany({ data: assign })

    result.events = events
    result.assign = assign
    result.questions = questions
    return result
})

eventService.updateEvent = (id, body) => prisma.$transaction(async (tx) => {
    const result = {}
    // *************************** Update Event
    const updateEvents = await tx.event.update({
        where: { id },
        data: body.events
    })

    // *************************** Delete Assign
    await tx.assignOfBridge.deleteMany({
        where: { eventId: id, questionId: { in: body.assignDelete } }
    })

    // *************************** Set up Assign
    const [existAssign] = await tx.assignOfBridge.findMany({
        where: { eventId: id },
        orderBy: { order: 'desc' },
        take: 1
    })
    let index = 1
    if (existAssign) {
        index = existAssign.order + 1
    }
    const assign = []
    const questions = []
    const data = [...body.questions]
    for (let question of data) {
        const assignData = {}
        assignData.eventId = id
        assignData.order = index++
        if (!question.id) {
            const newQuestion = await tx.question.create({ data: question })
            assignData.questionId = newQuestion.id
            questions.push(newQuestion)
        } else {
            assignData.questionId = question.id
            questions.push(question)
        }
        assign.push(assignData)
    }
    // *************************** Update Assign
    await tx.assignOfBridge.createMany({ data: assign })

    result.events = updateEvents
    result.assign = assign
    return result
})

module.exports = eventService