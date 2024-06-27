const commentController = {}

commentController.createCommentQuestion = async (req, res, next) => {
    try {
        console.log(req.params, 'comment question');
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