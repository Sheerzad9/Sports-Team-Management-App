const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectID;

const userRouter = require("express").Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();

  res.status(200).json({ message: "success", users });
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.params.id);

    existingUser
      ? res
          .status(200)
          .json({ message: "User found successfully!", user: existingUser })
      : res
          .status(404)
          .json({ message: `User not found with given id: ${req.params.id}` });
  } catch (e) {
    next(e);
  }
});

userRouter.post("/create", async (req, res) => {
  const { username, name, password, birthDay, email, role } = req.body;

  // Check if given email or username exist already
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User with same username or email already exist in DB" });
  }

  const saltRounds = 10;
  const saltedPwd = await bcrypt.hash(password, saltRounds);

  const tempUser = new User({
    username,
    name,
    email,
    passwordHash: saltedPwd,
    role,
    birthDay,
  });
  const newUser = await tempUser.save();

  const userDataForToken = {
    username: newUser.name,
    name: newUser.name,
    email: newUser.email,
    birthDay: newUser.birthDay,
    role: newUser.role,
  };

  const token = jwt.sign(userDataForToken, process.env.SECRETJWT, {
    expiresIn: "1h",
  });

  res
    .status(200)
    .json({ message: "Successfully created new user", user: newUser, token });
});

module.exports = userRouter;
