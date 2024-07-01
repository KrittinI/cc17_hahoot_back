const assignService = require("../services/assign-service");
const questionService = require("../services/question-service");

const assignController = {}

assignController.createNewQuestionAndMapData = async (req, res, next) => {
    try {
        const assign = []
        const questions = []
        const data = [...req.body.questions]
        await Promise.all(data.map(async (question, index) => {
            const assignData = {}
            assignData.eventId = req.events.id
            assignData.order = index + 1
            if (!question.id) {
                const newQuestion = await questionService.createOneQuestion(question)
                assignData.questionId = newQuestion.id
                questions.push(newQuestion)
            } else {
                assignData.questionId = question.id
                questions.push(question)
            }
            assign.push(assignData)
        }))
        req.assign = assign
        req.questions = questions
        next()
    } catch (error) {
        next(error)
    }
}

assignController.createRelation = async (req, res, next) => {
    try {
        const data = req.assign
        await assignService.createRelation(data)

        res.status(201).json({ events: req.events, questions: req.questions, assign: data })
    } catch (error) {
        next(error)
    }
}


module.exports = assignController;



