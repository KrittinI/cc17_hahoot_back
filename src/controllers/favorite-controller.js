const favoriteService = require("../services/favorite-service");
const questionService = require("../services/question-service");
const createError = require("../utils/create-error");

const favoriteController = {}

favoriteController.favoriteQuestion = async (req, res, next) => {
    try {
        const { questionId } = req.params
        const existedQuestion = await questionService.getQuestionByQuestionId(+questionId)
        if (!existedQuestion) {
            createError(400, "question not found")
        }

        const existedFavorite = await favoriteService.findRelationByQuestionAndUserId(req.user.id, existedQuestion.id)
        if (existedFavorite) {
            createError(400, "already favorite this question")
        }

        const result = await favoriteService.createQuestionFavorite(req.user.id, existedQuestion.id)
        res.status(201).json({ favorite: result })
    } catch (error) {
        next(error)
    }
}

favoriteController.unfavoriteQuestion = async (req, res, next) => {
    try {
        const { questionId } = req.params
        const existedQuestion = await questionService.getQuestionByQuestionId(+questionId)
        if (!existedQuestion) {
            createError(400, "question not found")
        }

        const existedFavorite = await favoriteService.findRelationByQuestionAndUserId(req.user.id, existedQuestion.id)
        if (!existedFavorite) {
            createError(400, "you not favorite this question")
        }

        const result = await favoriteService.deleteQuestionFavorite(existedFavorite.id)
        res.status(204).json({ favorite: result })
    } catch (error) {
        next(error)
    }
}

favoriteController.favoriteEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params
        const existedQuestion = await questionService.getQuestionByQuestionId(+eventId)
        if (!existedQuestion) {
            createError(400, "question not found")
        }

        const existedFavorite = await favoriteService.findRelationByQuestionAndUserId(req.user.id, existedQuestion.id)
        if (existedFavorite) {
            createError(400, "already favorite this question")
        }

        const result = await favoriteService.createFavorite(req.user.id, existedQuestion.id)
        res.status(201).json({ favorite: result })
    } catch (error) {
        next(error)
    }
}

favoriteController.unfavoriteEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params
        const existedQuestion = await questionService.getQuestionByQuestionId(+eventId)
        if (!existedQuestion) {
            createError(400, "question not found")
        }

        const existedFavorite = await favoriteService.findRelationByQuestionAndUserId(req.user.id, existedQuestion.id)
        if (!existedFavorite) {
            createError(400, "you not favorite this question")
        }

        const result = await favoriteService.deleteFavorite(existedFavorite.id)
        res.status(204).json({ favorite: result })
    } catch (error) {
        next(error)
    }
}

module.exports = favoriteController;