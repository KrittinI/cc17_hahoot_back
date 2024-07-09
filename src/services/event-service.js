const prisma = require("../models/prisma");

const eventFilter = {
  id: true,
  eventName: true,
  description: true,
  eventImage: true,
  dueDate: true,
  creatorId: true,
  topicId: true,
  isDelete: true,
};

const eventService = {};

eventService.getAllEvent = (userId) =>
  prisma.event.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      EventFavorites: {
        where: { userId },
      },
    },
  });

eventService.findEventByTopicId = (topicId, userId) =>
  prisma.event.findMany({
    where: { topicId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      EventFavorites: {
        where: { userId },
      },
    },
  });

eventService.findEventByUserId = (creatorId, userId) =>
  prisma.event.findMany({
    where: { creatorId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      EventFavorites: {
        where: { userId },
      },
    },
  });

eventService.findEventById = (id, userId) =>
  prisma.event.findFirst({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profileImage: true,
          googleImage: true,
        },
      },
      topic: true,
      EventFavorites: {
        where: { userId },
      },
      EventComments: true,
    },
  });

// eventService.createEvent = (body) => prisma.event.create({ data: body });
eventService.createEvent = (body, question) =>
  prisma.$transaction(async (tx) => {
    const result = {};
    // *************************** Create New Event
    const event = await tx.event.create({
      data: body,
      include: {
        user: {
          select: {
            profileImage: true
          }
        },
        topic: true
      }
    });

    // *************************** Create New Question
    const assign = [];
    const questions = [];
    const data = question;

    let index = 1;
    for (let question of data) {
      const assignData = {};
      assignData.eventId = event.id;
      assignData.order = index++;

      assignData.questionId = +question.questionId;
      questions.push(question);
      assign.push(assignData);
    }
    // *************************** Create Assign Relation
    await tx.assignOfBridge.createMany({ data: assign });

    result.event = event;
    result.assign = assign;
    result.questions = questions;
    return result;
  });

eventService.updateEvent = (id, body) =>
  prisma.$transaction(async (tx) => {
    const result = {};
    // *************************** Update Event
    const updateEvents = await tx.event.update({
      where: { id },
      data: body.events,
    });

    // *************************** Delete Assign
    await tx.assignOfBridge.deleteMany({
      where: { eventId: id, questionId: { in: body.assignDelete } },
    });

    // *************************** Set up Assign
    const [existAssign] = await tx.assignOfBridge.findMany({
      where: { eventId: id },
      orderBy: { order: "desc" },
      take: 1,
    });
    let index = 1;
    if (existAssign) {
      index = existAssign.order + 1;
    }
    const assign = [];
    const questions = [];
    const data = [...body.questions];
    for (let question of data) {
      const assignData = {};
      assignData.eventId = id;
      assignData.order = index++;
      if (!question.id) {
        const newQuestion = await tx.question.create({ data: question });
        assignData.questionId = newQuestion.id;
        questions.push(newQuestion);
      } else {
        assignData.questionId = question.id;
        questions.push(question);
      }
      assign.push(assignData);
    }
    // *************************** Update Assign
    await tx.assignOfBridge.createMany({ data: assign });

    result.events = updateEvents;
    result.assign = assign;
    return result;
  });

module.exports = eventService;
