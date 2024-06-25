const prisma = require("../models/prisma")

const userFilter = {
    id: true,
    email: true,
    username: true,
    profileImage: true,
    googleImage: true,
    isActive: true,
    isAdmin: true

}

const userService = {}

userService.findUserById = (id) => prisma.user.findFirst({
    where: { id },
    select: userFilter
})

// ต้องมาสร้างเพิ่มหลังจาก create event กับ create question เสร็จ
userService.getUserByUserId = (id) => prisma.user.findFirst({
    where: { id },
    select: userFilter,
})

userService.findUserByUsername = (username) => prisma.user.findFirst({
    where: { username },
    select: userFilter
})

userService.updateUser = (id, data) => prisma.user.update({
    where: { id },
    data: data,
    select: userFilter
})

module.exports = userService