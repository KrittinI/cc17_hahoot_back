const prisma = require("../src/models/prisma");

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
    await prisma.topic.createMany({ data: topicData })
}

// run()