const helloRouter = require("express").Router();

helloRouter.get("/", (req, res) => {
  console.log("Helloh! Inside router");
  res.json({ message: "Hello there! :-)" });
});

module.exports = helloRouter;
