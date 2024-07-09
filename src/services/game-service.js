const prisma = require("../models/prisma")

const gameService = {}

gameService.startGame = (roomId, roomData) => prisma.$transaction(async (tx) => {
    // Create participants data
    const participants = roomData.players.map((player) => ({ id: player.id, username: player.name }))
    const rooms = roomData.players.map((player => ({ participantId: player.id, roomId, eventId: roomData.eventId })))
    console.log('rooms', rooms)
    await tx.participant.createMany({ data: participants })
    await tx.room.createMany({ data: rooms })
})

gameService.submitAnswer = async (data) => prisma.answerOfBridge.create({ data })

module.exports = gameService

// roomId fxma3auv
// roomData {
//     owner: 'QIwCgTW1Ze_hcCU1AAAN',
//         players: [
//             { id: 'QIwCgTW1Ze_hcCU1AAAN', name: 'MisterKK', score: 0 },
//             { id: '-5MtSd6ZQIZkidpEAAAL', name: 'AA', score: 0 }
//         ],
//             eventId: 9,
//                 currentQuestionIndex: 0,
//                     answeredPlayers: 0,
//                         questions: [
//                             {
//                                 id: 65,
//                                 question: 'Which song is in Album "Plus" from "Ed Sheeran" ?',
//                                 questionPicture: null,
//                                 choice1: 'Bad Habits',
//                                 choice2: 'Shape of You',
//                                 choice3: 'LegoHouse',
//                                 choice4: 'Thinking out loud',
//                                 answer: 'C',
//                                 isDelete: false,
//                                 topicId: 9,
//                                 creatorId: 4,
//                                 user: [Object],
//                                 topic: [Object],
//                                 QuestionFavorite: [],
//                                 timeLimit: 20,
//                                 order: 1
//                             },
//                             {
//                                 id: 66,
//                                 question: 'Which song is in Album "Multiply" from "Ed Sheeran" ?',
//                                 questionPicture: null,
//                                 choice1: 'Bad Habits',
//                                 choice2: 'Shape of You',
//                                 choice3: 'LegoHouse',
//                                 choice4: 'Thinking out loud',
//                                 answer: 'D',
//                                 isDelete: false,
//                                 topicId: 9,
//                                 creatorId: 1,
//                                 user: [Object],
//                                 topic: [Object],
//                                 QuestionFavorite: [],
//                                 timeLimit: 20,
//                                 order: 2
//                             },
//                             {
//                                 id: 67,
//                                 question: 'Which song is in Album "Devided" from "Ed Sheeran" ?',
//                                 questionPicture: null,
//                                 choice1: 'Bad Habits',
//                                 choice2: 'Shape of You',
//                                 choice3: 'LegoHouse',
//                                 choice4: 'Thinking out loud',
//                                 answer: 'B',
//                                 isDelete: false,
//                                 topicId: 9,
//                                 creatorId: 1,
//                                 user: [Object],
//                                 topic: [Object],
//                                 QuestionFavorite: [],
//                                 timeLimit: 20,
//                                 order: 3
//                             },
//                             {
//                                 id: 68,
//                                 question: 'Which song is in Album "Equal" from "Ed Sheeran" ?',
//                                 questionPicture: null,
//                                 choice1: 'Bad Habits',
//                                 choice2: 'Shape of You',
//                                 choice3: 'LegoHouse',
//                                 choice4: 'Thinking out loud',
//                                 answer: 'A',
//                                 isDelete: false,
//                                 topicId: 9,
//                                 creatorId: 1,
//                                 user: [Object],
//                                 topic: [Object],
//                                 QuestionFavorite: [],
//                                 timeLimit: 20,
//                                 order: 4
//                             },
//                             {
//                                 id: 69,
//                                 question: 'Which song is in Album "Substract" from "Ed Sheeran" ?',
//                                 questionPicture: null,
//                                 choice1: 'Bad Habits',
//                                 choice2: 'Shape of You',
//                                 choice3: 'Boat',
//                                 choice4: 'Thinking out loud',
//                                 answer: 'C',
//                                 isDelete: false,
//                                 topicId: 9,
//                                 creatorId: 1,
//                                 user: [Object],
//                                 topic: [Object],
//                                 QuestionFavorite: [],
//                                 timeLimit: 20,
//                                 order: 5
//                             }
//                         ],
//                             isGameStarted: false,
//                                 answerCounts: { A: 0, B: 0, C: 0, D: 0 }
// }