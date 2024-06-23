const prisma = require("../models/prisma")

const authService = {}

authService.findUserByEmail = (email) => prisma.user.findFirst({
    where: { email }
})

authService.createUser = data => prisma.user.create({
    data: data
})

module.exports = authService