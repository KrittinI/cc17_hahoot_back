const { Router } = require("express");
const eventController = require("../controllers/event-controller");
const favoriteController = require("../controllers/favorite-controller");
const commentController = require("../controllers/comment-controller");
const checkQuestionMiddleware = require("../middlewares/check-quesiton");
const upload = require("../middlewares/upload");

const eventRouter = Router();

//----------------- For Event -----------------
eventRouter.get("/", eventController.getAllEvent);
eventRouter.get("/topic/:topicId", eventController.getEventByTopic);
eventRouter.get("/users/:userId", eventController.getEventByUserId);
eventRouter.get("/favorite", eventController.getEvetnByFavorite);

//----------------- For Get One -----------------
eventRouter.get("/:eventId", eventController.getEventById);

//----------------- For Another Method -----------------
eventRouter.post("/", upload.single("eventImage"), eventController.createEvent);
eventRouter.patch("/:eventId", upload.single("eventImage"), eventController.editEvent);
eventRouter.delete("/:eventId", eventController.deleteEvent);

//----------------- For Favorite -----------------
eventRouter.post("/:eventId/favorite", favoriteController.favoriteEvent);
eventRouter.delete("/:eventId/favorite", favoriteController.unfavoriteEvent);

//----------------- For Comment -----------------
// eventRouter.post('/:eventId/comment', commentController.createCommentEvent)
// eventRouter.patch('/:eventId/comment/:commentId', commentController.editCommentEvent)
// eventRouter.delete('/:eventId/comment/:commentId', commentController.deleteCommentEvent)

module.exports = eventRouter;
