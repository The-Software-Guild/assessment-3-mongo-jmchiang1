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
<<<<<<< HEAD
  date: { //need this for countdown timer in react section 
=======
  date: {
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('user', UserSchema);
