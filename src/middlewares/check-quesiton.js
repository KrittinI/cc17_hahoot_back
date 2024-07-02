const questionService = require("../services/question-service");
const topicService = require("../services/topic-service");
const createError = require("../utils/create-error");

const checkQuestionMiddleware = async (req, res, next) => {
    try {
        const data = [...req.body.questions]
        for (let question of data) {
            if (question.id) {
                const existedQuestion = await questionService.getQuestionByQuestionId(question.id)
                if (!existedQuestion) {
                    createError(400, "question not found")
                }
                continue;
            }
            if (!question.question || !question.choice1 || !question.choice2 || !question.answer) {
                createError(400, "invalid question")
            }

            if (question.answer === "C" && !question.choice3) {
                createError(400, "invalid question")
            }

            if (question.answer === "D" && !question.choice4 || !question.choice3) {
                createError(400, "invalid question")
            }

            const existedTopic = await topicService.findTopicById(+question.topicId)
            if (!existedTopic) {
                createError(400, "topic not found")
            }
            question.creatorId = req.user.id
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = checkQuestionMiddleware