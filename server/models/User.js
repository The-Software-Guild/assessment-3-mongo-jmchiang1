const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: { //need this for countdown timer in react section 
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('user', UserSchema);
