const { Router } = require('express')
const topicController = require('../controllers/topic-controller')
const adminValidate = require('../middlewares/admin-validator')

const topicRoute = Router()

topicRoute.get('/', topicController.getAllTopic)
topicRoute.post('/', adminValidate, topicController.createTopic) // need adminvalidate
topicRoute.patch('/:topicId', adminValidate, topicController.editTopic)  // need adminvalidate
topicRoute.delete('/:topicId', adminValidate, topicController.deleteTopic) // need adminvalidate

module.exports = topicRoute