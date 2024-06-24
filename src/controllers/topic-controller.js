const { topic } = require("../models/prisma")
const topicService = require("../services/topic-service")
const createError = require("../utils/create-error")

const topicController = {}

topicController.getAllTopic = async (req, res, next) => {
    try {
        const topics = await topicService.getAllTopic()
        res.status(200).json({ topics })
    } catch (error) {
        next(error)
    }
}

topicController.editTopic = async (req, res, next) => {
    try {
        const { topicId } = req.params
        const { topicname } = req.body

        const existedTopicName = await topicService.findTopicByName(topicname)
        if (existedTopicName) {
            createError(400, "This topic already existed")
        }

        const existedTopic = await topicService.findTopicById(+topicId)
        if (!existedTopic) {
            createError(400, "Not found topic")
        }

        const updateTopic = await topicService.editTopic(existedTopic.id, topicname)

        res.status(200).json({ topics: updateTopic })
    } catch (error) {
        next(error)
    }
}

topicController.createTopic = async (req, res, next) => {
    try {

        const existTopic = await topicService.findTopicByName(req.body.topicname)
        if (existTopic) {
            createError(400, "This topic already existed")
        }
        const newTopic = await topicService.createTopic(req.body.topicname)
        res.status(201).json({ topic: newTopic })

    } catch (error) {
        next(error)
    }
}

topicController.deleteTopic = async (req, res, next) => {
    try {
        res.status(400).json({ message: "Not ready to use" })
    } catch (error) {
        next(error)
    }
}

module.exports = topicController