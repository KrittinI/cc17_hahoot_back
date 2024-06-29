const assignQuestionMiddleware = async (req, res, next) => {
    try {
        const assign = []
        const data = [...req.body.questions]
        data.map((question, index) => {
            console.log(question?.id, index + 1);
        })
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = assignQuestionMiddleware;