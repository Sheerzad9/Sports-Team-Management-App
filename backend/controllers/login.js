const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      error: `User with given username '${username}' not found in DB`,
    });
  }

  if (await bcrypt.compare(password, user.passwordHash)) {
    const userDataForToken = {
      username: user.username,
      name: user.name,
      email: user.email,
      birthDay: user.birthDay,
      role: user.role,
    };

    const token = jwt.sign(userDataForToken, process.env.SECRETJWT, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "Login successfully!", token, user });
  }

  // else we get here and the password is wrong
  return res
    .status(400)
    .json({ error: "Given password or username is wrong!" });
});

module.exports = loginRouter;
