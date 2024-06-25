const checkQuestionMiddleware = (req, res, next) => {
    console.log("checkquestion");
    next()
}

module.exports = checkQuestionMiddleware