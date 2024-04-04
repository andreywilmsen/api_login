const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: { type: String, minlenght: 3, maxlenght: 50 },
  email: { type: String, required: true, minlenght: 3, maxlenght: 50 },
  password: { type: String, required: true, minlenght: 3, maxlenght: 100 },
  createdAt: { type: Date, required: true, default: Date.now() },
  admin: { type: Boolean, default: false, required: true },
});

module.exports = User = mongoose.model("User", userSchema);
