const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const helloRouter = require("./controllers/hello");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const mongoose = require("mongoose");
const myLogger = require("./utils/middlewares/myLogger");
const { errorHandler } = require("./utils/middlewares/errorHandler");

if (config.MONGODB_URI_WITH_PWD) {
  mongoose.connect(config.MONGODB_URI_WITH_PWD);
  console.log("DB connected to: ", config.MONGODB_URI_WITH_PWD);
} else {
  console.log("NO MONGODB URL FOUND!!!");
}

app.use(cors());
app.use(express.json());
app.use(myLogger.requestLogger);

app.use("/api/hello", helloRouter);
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);
module.exports = app;
