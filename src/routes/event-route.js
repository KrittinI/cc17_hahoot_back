const { Router } = require('express')
const eventController = require('../controllers/event-controller')

const eventRouter = Router()

eventRouter.get('/', eventController.getAllEvent)
eventRouter.get('/topic/:topicId', eventController.getEventByTopic)
eventRouter.get('/favorite', eventController.getEvetnByFavorite)
eventRouter.get('/users/:userId', eventController.getEventByUserId)
eventRouter.get('/:eventId', eventController.getEventById)
eventRouter.post('/', eventController.createEvent)
eventRouter.patch('/:eventId', eventController.editEvent)
eventRouter.delete('/:eventId', eventController.deleteEvent)
//----------------- For Comment -----------------
// eventRouter.post('/:eventId/comment', eventController.createComment)
// eventRouter.patch('/:eventId/comment/:commentId', eventController.editComment)
// eventRouter.delete('/:eventId/comment/:commentId', eventController.deleteComment)
//----------------- For Favorite -----------------
// eventRouter.post('/:eventId/favorite', eventController.createFavorite)
// eventRouter.delete('/:eventId/favorite', eventController.deleteFavorite)

module.exports = eventRouter