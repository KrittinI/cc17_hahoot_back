const eventService = require("../services/event-service")
const topicService = require("../services/topic-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")

const eventController = {}

// GET All Event
eventController.getAllEvent = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvent()
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

        const events = await eventService.findEventByTopicId(existedTopic.id)
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// GET Event by Favorite
eventController.getEvetnByFavorite = async (req, res, next) => {
    try {

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

        const events = await eventService.findEventByUserId(existedUser.id)
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// GET One Event 
eventController.getEventById = async (req, res, next) => {
    try {
        const { eventId } = req.params
        const events = await eventService.findEventById(eventId)
        if (!events) {
            createError(400, "event not found")
        }
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// POST Create Event
eventController.createEvent = async (req, res, next) => {
    try {
        const eventData = req.body.events
        if (!eventData.eventName && !eventData.topicId) {
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

        console.log(existedTopic);


        console.log(eventData);
        res.json({ events: eventData })
    } catch (error) {
        next(error)
    }
}

// PATCH Edit Event
eventController.editEvent = async (req, res, next) => {
    try {

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