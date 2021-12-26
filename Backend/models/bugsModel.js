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
  // date: {
  //   created: {
  //     type: Date,
  //     default: Date.now,
  //   },
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model('bug', bugSchema);