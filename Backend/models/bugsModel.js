const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model('bug', bugSchema);