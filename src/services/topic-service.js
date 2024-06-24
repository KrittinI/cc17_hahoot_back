const prisma = require("../models/prisma")

const topicService = {}

topicService.getAllTopic = () => prisma.topic.findMany()

topicService.findTopicByName = (topicName) => prisma.topic.findFirst({
    where: { topicName }
})

topicService.findTopicById = (id) => prisma.topic.findFirst({
    where: { id }
})

topicService.editTopic = (id, topicName) => prisma.topic.update({
    where: { id },
    data: { topicName }
})

topicService.createTopic = (topicName) => prisma.topic.create({
    data: { topicName }
})

// topicService.deleteTopic = () => prisma.topic.delete()

module.exports = topicService