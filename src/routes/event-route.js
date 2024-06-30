const { Router } = require('express')
const eventController = require('../controllers/event-controller')
const favoriteController = require('../controllers/favorite-controller')
const commentController = require('../controllers/comment-controller')
const checkQuestionMiddleware = require('../middlewares/check-quesiton')
const assignQuestionMiddleware = require('../middlewares/assign-qustion')
const assignController = require('../controllers/assign-controller')

const eventRouter = Router()

eventRouter.get('/', eventController.getAllEvent)
eventRouter.get('/topic/:topicId', eventController.getEventByTopic)
eventRouter.get('/users/:userId', eventController.getEventByUserId)
eventRouter.get('/favorite', eventController.getEvetnByFavorite)

eventRouter.get('/:eventId', eventController.getEventById)

eventRouter.post('/', checkQuestionMiddleware, eventController.createEvent, assignController.createNewQuestionAndMapData, assignController.createRelation)
eventRouter.patch('/:eventId', eventController.editEvent)
eventRouter.delete('/:eventId', eventController.deleteEvent)

//----------------- For Favorite -----------------
// eventRouter.post('/:eventId/favorite', favoriteController.favoriteEvent)
// eventRouter.delete('/:eventId/favorite', favoriteController.unfavoriteEvent)

//----------------- For Comment -----------------
// eventRouter.post('/:eventId/comment', commentController.createCommentEvent)
// eventRouter.patch('/:eventId/comment/:commentId', commentController.editCommentEvent)
// eventRouter.delete('/:eventId/comment/:commentId', commentController.deleteCommentEvent)

module.exports = eventRouter