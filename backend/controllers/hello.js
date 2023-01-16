const helloRouter = require("express").Router();

helloRouter.get("/", (req, res) => {
  res.json({ message: "Hello there! :-)" });
});

module.exports = helloRouter;
