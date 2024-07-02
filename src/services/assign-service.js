const prisma = require("../models/prisma");

const assignService = {}

assignService.createRelation = (data) => prisma.assignOfBridge.createMany({ data })

assignService.findQuestionInEvent = (eventId) => prisma.assignOfBridge.findMany({
    where: { eventId },
    include: {
        question: true
    }
})

module.exports = assignService;
