const mongoose = require("mongoose");

const BugSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of bugs.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // Refers to the users collection.
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("bug", BugSchema);
