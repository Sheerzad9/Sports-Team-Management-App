const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: [
      3,
      "Username is too short! Username should contain atleast 3 characters",
    ],
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "Player", required: true },
  birthDay: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
