const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, min: 3, max: 15 },
  admin: { type: String, default: false, required: true },
});

module.exports = User = mongoose.model("User", userSchema);
