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
    question: `คิดว่าใครจะชนะในศึกฟุตบอลยูโร 2024?`,
    questionPicture: `https://www.rushbar.fr/wp-content/uploads/2024/05/22700824-euro-2024-allemagne-officiel-logo-avec-nom-bleu-symbole-europeen-football-final-conception-vecteur-illustration-gratuit-vectoriel.jpg`,
    choice1: "England",
    choice2: "Spain",
    choice3: "Netherlands",
    choice4: "France",
    answer: "B",
    isPublic: false,
    topicId: 8,
    creatorId: 4,
  },
  {
    question: `ใครหล่อสุดใน CC-17 Codecamp?`,
    questionPicture: `https://media.licdn.com/dms/image/C560BAQFzqgedOoX_rg/company-logo_200_200/0/1630644648038?e=2147483647&v=beta&t=rwNV9IHdP81Awn7vVor2AtnI6RqVmDmKVRFXbUpuRF4`,
    choice1: "Boom",
    choice2: "Gong",
    choice3: "KK",
    choice4: "Pae",
    answer: "D",
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
    //&& player.id !== room.owner
    if (player && !player.hasAnswered && player.id !== room.owner) {
      player.hasAnswered = true;
      room.answeredPlayers += 1;

      io.to(roomId).emit("answerCount", room.answeredPlayers);

      //socket.emit("answerCount", room.answeredPlayers);
      //if (isTimeout) return;
      // if (!isTimeout) {
      // }

      //console.log("Answer = ", quizData[room.currentQuestionIndex].answer);
      // ex. answer -> "Canada" === "A"

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

      const choice = checkAnswer(answer);
      if (choice) {
        room.answerCounts[choice] += 1;
        io.to(roomId).emit("RoomAnswerCount", room.answerCounts);
      }

      const correct =
        answer === false
          ? Boolean(false)
          : Boolean(
              checkAnswer(answer) ===
                geographyQuestion[room.currentQuestionIndex].answer
            );

      //answer คือคำตอบที่หน้าบ้านส่งมา เทียบกับ คำตอบที่หลังบ้านมีแต่ถ้าเป็น ช้อยต้องหาวิธี
      //console.log(player.name, "of Result = ", correct);
      //console.log("-----------------------------------------------------");

      if (correct) {
        // Received score from Frontend no matter + score again
        player.score += 0;
      }

      socket.emit("answerResult", {
        correct,
        scoreFromBackend: player.score,
      });

      socket.on("updateScores", (scoreFromFrontend) => {
        console.log("scoreFromFrontend=", scoreFromFrontend);
        player.score += scoreFromFrontend;
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

  // socket.on("updateScores",(score) => {
  //   //room.players
  //   //io.to(roomId).emit("updateScores", room.players);

  // })

  socket.on("nextQuestion", (roomId) => {
    const room = rooms[roomId];
    console.log("RoomID in nextQuestion=", roomId);

    //if (room && room.currentQuestionIndex < quizData.length - 1) {
    //room.currentQuestionIndex += 1;
    room.answerCounts = { A: 0, B: 0, C: 0, D: 0 }; // Reset counts for next question
    sendQuestion(roomId);
    console.log("nextQuestion Backend is working");
    //} else {
    //  io.to(roomId).emit("gameOver");
    //  console.log("The Game is Over");
    //}
  });

  socket.on("ShowScoreboard", (roomId) => {
    //chcking if LastQuestion in Scoreboard
    io.to(roomId).emit("answerCount", 0);
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

// เริ่มเซิร์ฟเวอร์และฟังที่ IP address 0.0.0.0
const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket Server is running on port ${PORT}`);
});
