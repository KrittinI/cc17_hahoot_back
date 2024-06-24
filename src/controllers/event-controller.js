const eventService = require("../services/event-service")
const topicService = require("../services/topic-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")

const eventController = {}

eventController.getAllEvent = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvent()
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}
eventController.getEventByTopic = async (req, res, next) => {
    try {
        const { topicId } = req.params
        console.log(topicId);

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
eventController.getEvetnByFavorite = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
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
eventController.getEventById = async (req, res, next) => {
    try {
        const { eventId } = req.params
        const events = await eventService.findEventById(+eventId)
        if (!events) {
            createError(400, "event not found")
        }
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}
eventController.createEvent = async (req, res, next) => {
    try {
        const data = req.body
    } catch (error) {
        next(error)
    }
}
eventController.editEvent = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
eventController.deleteEvent = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}

module.exports = eventController