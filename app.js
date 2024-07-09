require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const socketio = require("socket.io");
const notFoundMiddleware = require("./src/middlewares/not-found");
const errorMiddleware = require("./src/middlewares/error-middlewares");
const authRoute = require("./src/routes/auth-route");
const authenticate = require("./src/middlewares/authenticate");
const userRouter = require("./src/routes/user-route");
const questionRouter = require("./src/routes/question-route");
const eventRouter = require("./src/routes/event-route");
const topicRoute = require("./src/routes/topic-route");
const adminRouter = require("./src/routes/admin-route");
const adminValidate = require("./src/middlewares/admin-validator");
const adminController = require("./src/controllers/adminController");
const playRouter = require("./src/routes/play-route");
const ioServer = require("./socket-server");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/users", authenticate, userRouter);
app.use("/questions", authenticate, questionRouter);
app.use("/events", authenticate, eventRouter);
app.use("/topics", authenticate, topicRoute);
app.use("/admin", authenticate, adminValidate, adminRouter);
app.get("/hero/Active", adminController.getHeroByIsActive);
app.use("/play-game", playRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8800;
console.log(process.env.DATABASE_URL);
const server = app.listen(PORT, () => console.log(`Server run on PORT ${PORT}`));

const io = socketio(server, {
    cors: {
        origin: "*", // ปรับนี้ใน production ให้เป็น origin เฉพาะ
    },
});

io.on("connection", (socket) => ioServer(socket, io))


