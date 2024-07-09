const { event, room } = require("./src/models/prisma");
const gameService = require("./src/services/game-service");

//Backend Multiplayer
let rooms = {};

const ioServer = (socket, io) => {
  socket.onAny((event, ...arg) => {
    console.log("Receive Event", event);
    console.log("With Arg", arg);
  })
  // console.log(rooms);
  console.log("A user connected");

  socket.on("createRoom", ({ name, questions, eventId }) => {
    const roomId = Math.random().toString(36).substring(2, 10);
    rooms[roomId] = {
      owner: socket.id,
      players: [{ id: socket.id, name, score: 0 }],
      eventId: eventId,
      currentQuestionIndex: 0,
      answeredPlayers: 0,
      questions: questions,
      isGameStarted: false,
      answerCounts: {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
      },
    };
    socket.join(roomId);
    socket.emit("isOwner");
    socket.emit("roomCreated", roomId);
    io.to(roomId).emit(
      "updatePlayers",
      rooms[roomId].players.map((player) => player.name)
    );
  });

  socket.on("joinRoom", ({ roomId, name }) => {
    if (rooms[roomId]) {
      rooms[roomId].players.push({ id: socket.id, name, score: 0 });
      socket.join(roomId);
      socket.emit("joinedRoom", { id: socket.id });
      io.to(roomId).emit(
        "updatePlayers",
        rooms[roomId].players.map((player) => player.name)
      );
    } else {
      socket.emit("roomNotFound"); // Notify if room not found
    }
  });

  socket.on("startGame", (roomId) => {
    console.log(roomId, rooms[roomId]);
    gameService.startGame(roomId, rooms[roomId])
    if (rooms[roomId] && rooms[roomId].owner === socket.id) {
      rooms[roomId].isGameStarted = true;
      io.to(roomId).emit("gameStarted");
      // sendQuestion(roomId, io);
      const room = rooms[roomId]
      io.to(roomId).emit("newQuestion", room.questions[room.currentQuestionIndex]);
      console.log("Sent questionData");
    }
  });

  socket.on("submitAnswer", ({ roomId, answer, timeLeft, playerId, questionId }) => {
    const room = rooms[roomId];
    console.log("000000000000000000000000000000000000000000000000000000000000000000000");
    const player = room.players.find((p) => p.id === socket.id);
    if (player && !player.hasAnswered && player.id !== room.owner) {
      player.hasAnswered = true;
      room.answeredPlayers += 1;

      io.to(roomId).emit("answerCount", room.answeredPlayers);

      if (answer) {
        room.answerCounts[answer] += 1;
        io.to(roomId).emit("RoomAnswerCount", room.answerCounts);
      }

      const correct = answer === room.questions[room.currentQuestionIndex].answer

      if (correct) {
        player.score += timeLeft * 50;
      }
      socket.emit("answerResult", {
        correct,
        score: player.score,
      });

      const nonOwnerPlayers = room.players.filter((p) => p.id !== room.owner);
      //    if(room.answeredPlayers === 3) is working
      if (nonOwnerPlayers.every((p) => p.hasAnswered)) {
        // console.log(
        //   "answeredPlayers in filterNonOwner =>",
        //   room.answeredPlayers
        // );

        io.to(roomId).emit("showAnswer");
        //reset to Next Questions
        room.answeredPlayers = 0;
        room.players.forEach((p) => (p.hasAnswered = false)); //all players set to false

        // Broadcast updated scores
        io.to(roomId).emit("updateScores", room.players);
      } else {
        //player.hasAnswered = false;
      }
      console.log("-------------------------------------------------------");
    }
    //if (isTimeout) player.hasAnswered = false;
  });

  socket.on("nextQuestion", (roomId) => {
    const room = rooms[roomId];
    // console.log("RoomID in nextQuestion=", room);
    room.answerCounts = { A: 0, B: 0, C: 0, D: 0 }; // Reset counts for next question
    io.to(roomId).emit("newQuestion", room.questions[room.currentQuestionIndex]);
    console.log("nextQuestion Backend is working");
  });

  socket.on("ShowScoreboard", (roomId) => {
    //chcking if LastQuestion in Scoreboard
    const room = rooms[roomId];
    if (room.currentQuestionIndex < room.questions.length - 1) {
      room.currentQuestionIndex += 1;
    } else {
      io.to(roomId).emit("gameOver");
      console.log(room);
      console.log("The Game is Over");
    }
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
  });

  socket.on("reconnect_attempt", () => {
    console.log("Attempting to reconnect...");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    for (const roomId in rooms) {
      const room = rooms[roomId];
      room.players = room.players.filter((player) => player.id !== socket.id);
      if (room.players.length === 0) {
        delete rooms[roomId];
      } else {
        if (room.owner === socket.id) {
          io.to(roomId).emit("ownerDisconnected");
        }
        io.to(roomId).emit(
          "updatePlayers",
          room.players.map((player) => player.name)
        );
      }
    }
  });
};

module.exports = ioServer
