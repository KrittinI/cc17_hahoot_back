const { json } = require("express");
const prisma = require("../models/prisma");
const assignService = require("../services/assign-service");
const eventService = require("../services/event-service");
const favoriteService = require("../services/favorite-service");
const topicService = require("../services/topic-service");
const uploadService = require("../services/upload-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const fs = require("fs/promises");

const eventController = {};

// GET All Event
eventController.getAllEvent = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvent(req.user.id);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

// GET Event by Topic
eventController.getEventByTopic = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const existedTopic = await topicService.findTopicById(+topicId);
    if (!existedTopic) {
      createError(400, "Not found topic");
    }

    const events = await eventService.findEventByTopicId(existedTopic.id, req.user.id);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

// GET Event by Favorite
eventController.getEvetnByFavorite = async (req, res, next) => {
  try {
    const eventsId = await favoriteService.findEventRelationByUserId(req.user.id);
    const events = eventsId.map((event) => event.event);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

// GET Event by UserId
eventController.getEventByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const existedUser = await userService.findUserById(+userId);
    if (!existedUser) {
      createError(400, "user not found");
    }

    const events = await eventService.findEventByUserId(existedUser.id, req.user.id);
    res.status(200).json({ events });
  } catch (error) {
    next(error);
  }
};

// GET One Event
eventController.getEventById = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await eventService.findEventById(+eventId, req.user.id);
    if (!event) {
      createError(400, "event not found");
    }

    const assigns = await assignService.findQuestionInEvent(event.id, req.user.id);
    const questions = assigns.map((assign) => {
      const question = { ...assign.question };
      question.timeLimit = assign.timeLimit;
      question.order = assign.order;
      return question;
    });

    res.status(200).json({ event, questions });
  } catch (error) {
    next(error);
  }
};

// POST Create Event
// eventController.createEvent = async (req, res, next) => {
//   try {
//     //ส่งมาเป็น string (stringify) => field event
//     //parseJSON ออกมา
//     const eventData = req.body;
//     console.log(req.file.path, "path");
//     const file = req.file.path;
//     console.log(eventData, req.file);
//     // const eventData = req.body.events;
//     if (!eventData.eventName || !eventData.topicId) {
//       createError(400, "Event must have name, topic");
//     }

//     const existedTopic = await topicService.findTopicById(+eventData.topicId);
//     if (!existedTopic) {
//       createError(400, "topic not found");
//     }
//     eventData.topicId = existedTopic.id;
//     if (eventData.timeLimit) {
//       eventData.timeLimit = +eventData.timeLimit;
//     }
//     const url = await uploadService.upload(file);
//     eventData.creatorId = req.user.id;

//     const eventCreated = await eventService.createEvent({ ...req.body, eventImage: url });
//     console.log(eventCreated);
//     res.status(201).json({ eventCreated });
//   } catch (error) {
//     next(error);
//   }
// };
eventController.createEvent = async (req, res, next) => {
  try {
    const file = req.file.path;

    const eventData = JSON.parse(req.body.events);

    const questionData = JSON.parse(req.body.question);
    // const addArr = [sentQuestion];

    // let questionData;
    // if (addArr.length > 1) {
    //   questionData = addArr
    //     .map((ques) => {
    //       const obj = ques.split("},{").map((obj, index, array) => {
    //         // เพิ่มเครื่องหมายวงเล็บปิดและเปิดที่หายไป
    //         if (index === 0) {
    //           obj += "}";
    //         } else if (index === array.length - 1) {
    //           obj = "{" + obj;
    //         } else {
    //           obj = "{" + obj + "}";
    //         }
    //         return JSON.parse(obj);
    //       });

    //       return obj;
    //     })
    //     .flat(); //[[]] => []
    // } else {
    //   questionData = JSON.parse(addArr);
    // }

    if (!eventData.eventName || !eventData.topicId) {
      createError(400, "Event must have name, topic");
    }

    const existedTopic = await topicService.findTopicById(+eventData.topicId);
    if (!existedTopic) {
      createError(400, "topic not found");
    }
    eventData.topicId = existedTopic.id;
    if (eventData.timeLimit) {
      eventData.timeLimit = +eventData.timeLimit;
    }
    const url = uploadService.upload(file);
    eventData.creatorId = req.user.id;
    const { event, questions, assign } = await eventService.createEvent({ ...eventData }, questionData);
    res.status(201).json({ event, questions, assign });
  } catch (error) {
    next(error);
  } finally {
    if (req.file.fieldname === "eventImage") {
      fs.unlink(req.file.path);
    }
  }
};

// PATCH Edit Event
eventController.editEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const eventData = req.body.event;
    const existedEvent = await eventService.findEventById(+eventId);
    if (existedEvent.creatorId !== req.user.id) {
      createError(403, "no permission on this event");
    }

    if (!eventData.eventName || !eventData.topicId) {
      createError(400, "Event must have name, topic");
    }

    const existedTopic = await topicService.findTopicById(+eventData.topicId);
    if (!existedTopic) {
      createError(400, "topic not found");
    }
    eventData.topicId = existedTopic.id;
    if (eventData.timeLimit) {
      eventData.timeLimit = +eventData.timeLimit;
    }

    const updateEvent = await eventService.updateEvent(+eventId, req.body);
    res.status(200).json(updateEvent);
  } catch (error) {
    next(error);
  }
};

// DELETE Delete Event
eventController.deleteEvent = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = eventController;
