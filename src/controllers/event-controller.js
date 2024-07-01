const prisma = require("../models/prisma")
const assignService = require("../services/assign-service")
const eventService = require("../services/event-service")
const favoriteService = require("../services/favorite-service")
const topicService = require("../services/topic-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")
const assignController = require("./assign-controller")

const eventController = {}

// GET All Event
eventController.getAllEvent = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvent(req.user.id)
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// GET Event by Topic
eventController.getEventByTopic = async (req, res, next) => {
    try {
        const { topicId } = req.params
        const existedTopic = await topicService.findTopicById(+topicId)
        if (!existedTopic) {
            createError(400, "Not found topic")
        }

        const events = await eventService.findEventByTopicId(existedTopic.id, req.user.id)
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// GET Event by Favorite
eventController.getEvetnByFavorite = async (req, res, next) => {
    try {
        const eventsId = await favoriteService.findEventRelationByUserId(req.user.id)
        const events = eventsId.map(event => event.event)
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// GET Event by UserId
eventController.getEventByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params
        const existedUser = await userService.findUserById(+userId)
        if (!existedUser) {
            createError(400, "user not found")
        }

        const events = await eventService.findEventByUserId(existedUser.id, req.user.id)
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// GET One Event 
eventController.getEventById = async (req, res, next) => {
    try {
        const { eventId } = req.params
        const events = await eventService.findEventById(+eventId, req.user.id)
        if (!events) {
            createError(400, "event not found")
        }

        const assigns = await assignService.findQuestionInEvent(events.id)
        const questions = assigns.map(assign => {
            const question = { ...assign.question }
            question.timeLimit = assign.timeLimit
            question.order = assign.order
            return question
        })

        res.status(200).json({ events, questions })
    } catch (error) {
        next(error)
    }
}

// POST Create Event
eventController.createEvent = async (req, res, next) => {
    try {
        const eventData = req.body.events
        if (!eventData.eventName || !eventData.topicId) {
            createError(400, "Event must have name, topic")
        }

        const existedTopic = await topicService.findTopicById(+eventData.topicId)
        if (!existedTopic) {
            createError(400, "topic not found")
        }
        eventData.topicId = existedTopic.id
        if (eventData.timeLimit) {
            eventData.timeLimit = +eventData.timeLimit
        }
        eventData.creatorId = req.user.id

        const { events, questions, assign } = await eventService.createEvent(req.body)
        res.status(201).json({ events, questions, assign })
    } catch (error) {
        next(error)
    }
}

// PATCH Edit Event
eventController.editEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params
        const eventData = req.body.events
        const existedEvent = await eventService.findEventById(+eventId)
        if (existedEvent.creatorId !== req.user.id) {
            createError(403, "no permission on this event")
        }

        if (!eventData.eventName || !eventData.topicId) {
            createError(400, "Event must have name, topic")
        }

        const existedTopic = await topicService.findTopicById(+eventData.topicId)
        if (!existedTopic) {
            createError(400, "topic not found")
        }
        eventData.topicId = existedTopic.id
        if (eventData.timeLimit) {
            eventData.timeLimit = +eventData.timeLimit
        }

        const updateEvent = await eventService.updateEvent(+eventId, req.body)
        res.status(200).json(updateEvent)

    } catch (error) {
        next(error)
    }
}

// DELETE Delete Event
eventController.deleteEvent = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

module.exports = eventController