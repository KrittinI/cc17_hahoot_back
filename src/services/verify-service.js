const prisma = require("../models/prisma")

const verifyService = {}


verifyService.createVerfiId = (data) => prisma.verify.create({
    data: { data }
})

verifyService.findDataById = (id) => prisma.verify.findFirst({
    where: { id }
})

verifyService.deleteDataById = (id) => prisma.verify.delete({
    where: { id }
})

module.exports = verifyService