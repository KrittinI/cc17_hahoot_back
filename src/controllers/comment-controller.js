const commentService = require("../services/comment-service")
const questionService = require("../services/question-service")
const createError = require("../utils/create-error")

const commentController = {}


// ---------------- For Question
commentController.createCommentQuestion = async (req, res, next) => {
    try {
        const { questionId } = req.params
        const data = req.body

        const existQuestion = await questionService.getQuestionByQuestionId(+questionId)
        if (!existQuestion) {
            createError(400, "Question not found")
        }

        data.rate = 5
        data.questionId = existQuestion.id
        data.userId = req.user.id

        const comment = await commentService.createQuestionComment(data)
        console.log(comment);
        res.status(201).json({ comment })
    } catch (error) {
        next(error)
    }
}

commentController.editCommentQuestion = async (req, res, next) => {
    try {
        console.log(req.params, "edit question")
    } catch (error) {
        next(error)
    }
}

commentController.deleteCommentQuestion = async (req, res, next) => {
    try {
        console.log(req.params, "delete question");
    } catch (error) {
        next(error)
    }
}

// ---------------- For Event
commentController.createCommentEvent = async (req, res, next) => {
    try {
        console.log(req.params, 'comment event');
    } catch (error) {
        next(error)
    }
}

commentController.editCommentEvent = async (req, res, next) => {
    try {
        console.log(req.params, "edit event")
    } catch (error) {
        next(error)
    }
}

commentController.deleteCommentEvent = async (req, res, next) => {
    try {
        console.log(req.params, "delete event");
    } catch (error) {
        next(error)
    }
}

module.exports = commentController;