//Backend Multiplayer
const { createServer } = require("http");
const { Server } = require("socket.io");

// สร้าง HTTP server
const server = createServer();

// เริ่มต้น Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // ปรับนี้ใน production ให้เป็น origin เฉพาะ
  },
});

let rooms = {};

const geographyQuestion = [
  {
    questionPicture: "src/assets/hh-hero.png",
    question: `What is the biggest country ?`,
    choice1: "Russia",
    choice2: "China",
    choice3: "India",
    choice4: "Canada",
    answer: "A",
    isPublic: false,
    topicId: 8,
    creatorId: 4,
  },
  {
    questionPicture: "src/assets/hh-hero.png",
    question: `Which state in U.S.A have border only 1 state?`,
    choice1: "Hawaii",
    choice2: "Alaska",
    choice3: "Maine",
    choice4: "Florida",
    answer: "C",
    isPublic: false,
    topicId: 8,
    creatorId: 4,
  },
  {
    question: `Where is Angel Waterfall?`,
    questionPicture: `https://upload.wikimedia.org/wikipedia/commons/e/e9/SaltoAngel1.jpg`,
    choice1: "Brazil",
    choice2: "Columbia",
    choice3: "Venezuela",
    choice4: "Argentina",
    answer: "C",
    isPublic: false,
    topicId: 8,
    creatorId: 4,
  },
  {
    questionPicture: "src/assets/hh-hero.png",
    question: `The biggest ocean is Pacific Ocean ? `,
    choice1: "TRUE",
    choice2: "FALSE",
    answer: "A",
    isPublic: false,
    topicId: 8,
    creatorId: 4,
  },
];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("createRoom", (name) => {
    const roomId = Math.random().toString(36).substring(2, 10);
    rooms[roomId] = {
      owner: socket.id,
      players: [{ id: socket.id, name, score: 0 }],
      currentQuestionIndex: 0,
      answeredPlayers: 0,
      isGameStarted: false,
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
      socket.emit("joinedRoom");
      io.to(roomId).emit(
        "updatePlayers",
        rooms[roomId].players.map((player) => player.name)
      );
    } else {
      socket.emit("roomNotFound"); // Notify if room not found
    }
  });

  socket.on("startGame", (roomId) => {
    if (rooms[roomId] && rooms[roomId].owner === socket.id) {
      rooms[roomId].isGameStarted = true;
      io.to(roomId).emit("gameStarted");
      sendQuestion(roomId);
    }
  });

  socket.on("submitAnswer", ({ roomId, answer, isTimeout }) => {
    const room = rooms[roomId];
    const player = room.players.find((p) => p.id === socket.id);

    if (player && !player.hasAnswered && player.id !== room.owner) {
      room.answeredPlayers += 1;
      player.hasAnswered = true;
      //if (isTimeout) return;
      // if (!isTimeout) {
      // }

      //console.log("Answer = ", quizData[room.currentQuestionIndex].answer);
      // ex. answer -> "Canada" === "A"

      // let checkAnswer = "";
      // switch (answer) {
      //   case geographyQuestion[room.currentQuestionIndex].choice1:
      //     checkAnswer = "A";
      //     break;
      //   case geographyQuestion[room.currentQuestionIndex].choice2:
      //     checkAnswer = "B";
      //     break;
      //   case geographyQuestion[room.currentQuestionIndex].choice3:
      //     checkAnswer = "C";
      //     break;
      //   case geographyQuestion[room.currentQuestionIndex].choice4:
      //     checkAnswer = "D";
      //     break;
      //   default:
      //     checkAnswer = false;
      //     break;
      // }
      const checkAnswer = (answer) => {
        switch (answer) {
          case geographyQuestion[room.currentQuestionIndex].choice1:
            return "A";
          case geographyQuestion[room.currentQuestionIndex].choice2:
            return "B";
          case geographyQuestion[room.currentQuestionIndex].choice3:
            return "C";
          case geographyQuestion[room.currentQuestionIndex].choice4:
            return "D";
          default:
            return false;
        }
      };

      const correct =
        answer === false
          ? Boolean(false)
          : Boolean(
              checkAnswer(answer) ===
                geographyQuestion[room.currentQuestionIndex].answer
            );

      //answer คือคำตอบที่หน้าบ้านส่งมา เทียบกับ คำตอบที่หลังบ้านมีแต่ถ้าเป็น ช้อยต้องหาวิธี
      //console.log(player.name, "of Result = ", correct);
      //console.log("-------------------------------------------------------");
      if (correct) {
        player.score += 1000;
      }
      socket.emit("answerResult", {
        correct,
        score: player.score,
      });

      //if (isTimeout) player.hasAnswered = false;

      // !important ** Check if all non-owner players have answered **
      //const TimeoutPlayers = room.players.filter((p) => p);

      const nonOwnerPlayers = room.players.filter((p) => p.id !== room.owner);
      //    if(room.answeredPlayers === 3) is working
      if (nonOwnerPlayers.every((p) => p.hasAnswered)) {
        console.log(
          "answeredPlayers in filterNonOwner =>",
          room.answeredPlayers
        );

        io.to(roomId).emit("showAnswer");
        //reset to Next Questions
        room.answeredPlayers = 0;
        room.players.forEach((p) => (p.hasAnswered = false)); //all players set to false

        // Broadcast updated scores
        io.to(roomId).emit("updateScores", room.players);
      } else {
        //player.hasAnswered = false;
      }
      console.log("room=", room);
      console.log("player=", player);
      console.log("-------------------------------------------------------");
    }
    //if (isTimeout) player.hasAnswered = false;
  });

  socket.on("nextQuestion", (roomId) => {
    console.log("RoomID in nextQuestion=", roomId);

    //if (room && room.currentQuestionIndex < quizData.length - 1) {
    //room.currentQuestionIndex += 1;
    sendQuestion(roomId);
    console.log("nextQuestion Backend is working");
    //} else {
    //  io.to(roomId).emit("gameOver");
    //  console.log("The Game is Over");
    //}
  });

  socket.on("ShowScoreboard", (roomId) => {
    //chcking if LastQuestion in Scoreboard
    const room = rooms[roomId];
    if (room.currentQuestionIndex < geographyQuestion.length - 1) {
      room.currentQuestionIndex += 1;
    } else {
      io.to(roomId).emit("gameOver");
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
          //room.owner = room.players[0].id;
          //io.to(room.owner).emit("isOwner");
          io.to(roomId).emit("ownerDisconnected");
        }
        io.to(roomId).emit(
          "updatePlayers",
          room.players.map((player) => player.name)
        );
      }
    }
  });
});

const sendQuestion = (roomId) => {
  const room = rooms[roomId];
  if (room && room.currentQuestionIndex < geographyQuestion.length) {
    const questionData = {
      questionPicture:
        geographyQuestion[room.currentQuestionIndex].questionPicture,
      question: geographyQuestion[room.currentQuestionIndex].question,
      choice1: geographyQuestion[room.currentQuestionIndex].choice1,
      choice2: geographyQuestion[room.currentQuestionIndex].choice2,
      choice3: geographyQuestion[room.currentQuestionIndex].choice3,
      choice4: geographyQuestion[room.currentQuestionIndex].choice4,
      answer: geographyQuestion[room.currentQuestionIndex].answer,
      isPublic: geographyQuestion[room.currentQuestionIndex].isPublic,
      topicId: geographyQuestion[room.currentQuestionIndex].topicId,
      creatorId: geographyQuestion[room.currentQuestionIndex].creatorId,
    };
    io.to(roomId).emit("newQuestion", questionData);
    console.log("Sent questionData");
  } else {
    io.to(roomId).emit("gameOver");
    console.log("The Game is Over from sendQuestionFN");
  }
};

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket Server is running on port ${PORT}`);
});
