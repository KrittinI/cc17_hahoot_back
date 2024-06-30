const prisma = require("../models/prisma");

const assignService = {}

assignService.createRelation = (data) => prisma.assignOfBridge.createMany({ data })

module.exports = assignService;
