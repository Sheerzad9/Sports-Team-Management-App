const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const helloRouter = require("./controllers/hello");

app.use(cors());
app.use(express.json());

app.use("/api/hello", helloRouter);

module.exports = app;
