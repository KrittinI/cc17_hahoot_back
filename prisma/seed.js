const bcrypt = require('bcryptjs')
const prisma = require("../src/models/prisma");

const password1 = bcrypt.hashSync('admin01')
const password2 = bcrypt.hashSync('admin02')
const password3 = bcrypt.hashSync('admin03')
const password4 = bcrypt.hashSync('admin04')
const userData = [
    { username: "admin01", password: password1, email: "admin01@admin.com", isAdmin: true },
    { username: "admin02", password: password2, email: "admin02@admin.com", isAdmin: true },
    { username: "admin03", password: password3, email: "admin03@admin.com", isAdmin: true },
    { username: "admin04", password: password4, email: "admin04@admin.com", isAdmin: true },
]

const topicData = [
    { topicName: "Mathematis" },
    { topicName: "Coding" },
    { topicName: "English" },
    { topicName: "Sports" },
    { topicName: "Science" },
    { topicName: "Manga" },
    { topicName: "Movie" },
    { topicName: "Geography" },
    { topicName: "Music" },
    { topicName: "Common" }
]


const run = async () => {
    await prisma.topic.createMany({ data: userData })
    await prisma.topic.createMany({ data: topicData })
}

// run()

const runadmin = async () => {
    await prisma.user.createMany({ data: userData })
}

// runadmin()