const prisma = require("../models/prisma")

const commentService = {}

commentService.createQuestionComment = (data) => prisma.questionComment.create({ data })

module.exports = commentService