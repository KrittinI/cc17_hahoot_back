const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // ปรับให้สอดคล้องกับการตั้งค่า CORS ของคุณ
  },
});

app.use(cors());

let rooms = {};

const quizData = [
  {
    question: "ตัวละครหลักในเรื่อง Naruto คือใคร?",
    options: [
      "Sasuke Uchiha",
      "Sakura Haruno",
      "Naruto Uzumaki",
      "Kakashi Hatake",
    ],
    answer: "Naruto Uzumaki",
  },
  {
    question: "ใครเป็นผู้แต่งเรื่อง One Piece?",
    options: [
      "Eiichiro Oda",
      "Masashi Kishimoto",
      "Yoshihiro Togashi",
      "Akira Toriyama",
    ],
    answer: "Eiichiro Oda",
  },
  {
    question: "ชื่อจริงของ L ในเรื่อง Death Note คืออะไร?",
    options: ["Light Yagami", "Misa Amane", "L Lawliet", "Near"],
    answer: "L Lawliet",
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
      io.to(roomId).emit(
        "updatePlayers",
        rooms[roomId].players.map((player) => player.name)
      );
    } else {
      socket.emit("error", "Room not found");
    }
  });

  socket.on("startGame", (roomId) => {
    if (rooms[roomId] && rooms[roomId].owner === socket.id) {
      rooms[roomId].isGameStarted = true;
      io.to(roomId).emit("gameStarted");
      sendQuestion(roomId);
    }
  });

  socket.on("submitAnswer", ({ roomId, answer }) => {
    const room = rooms[roomId];
    const player = room.players.find((p) => p.id === socket.id);
    if (player && !player.hasAnswered) {
      player.hasAnswered = true;
      room.answeredPlayers += 1;

      const correct = answer === quizData[room.currentQuestionIndex].answer;
      if (correct) {
        player.score += 1;
      }
      socket.emit("answerResult", {
        correct,
        answer: quizData[room.currentQuestionIndex].answer,
      });

      if (room.answeredPlayers === room.players.length) {
        room.answeredPlayers = 0;
        room.players.forEach((p) => (p.hasAnswered = false));
        room.currentQuestionIndex += 1;

        if (room.currentQuestionIndex < quizData.length) {
          setTimeout(() => sendQuestion(roomId), 3000);
        } else {
          io.to(roomId).emit("gameOver");
        }
      }
    }
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
          room.owner = room.players[0].id;
          io.to(room.owner).emit("isOwner");
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
  if (room && room.currentQuestionIndex < quizData.length) {
    const questionData = {
      question: quizData[room.currentQuestionIndex].question,
      options: quizData[room.currentQuestionIndex].options,
      answer: quizData[room.currentQuestionIndex].answer, // เพิ่มบรรทัดนี้เพื่อส่ง answer ไปด้วย
    };
    io.to(roomId).emit("newQuestion", questionData);
  }
};

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
