require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFoundMiddleware = require("./src/middlewares/not-found");
const errorMiddleware = require("./src/middlewares/error-middlewares");
const authRoute = require("./src/routes/auth-route");
const authenticate = require("./src/middlewares/authenticate");
const userRouter = require("./src/routes/user-route");
const questionRouter = require("./src/routes/question-route");
const eventRouter = require("./src/routes/event-route");
const topicRoute = require("./src/routes/topic-route");

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

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8800;
console.log(process.env.DATABASE_URL);
app.listen(PORT, () => console.log(`Server run on PORT ${PORT}`));
