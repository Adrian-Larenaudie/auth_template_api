const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'utilisateur'],
    default: 'utilisateur',
  },
});

const user = mongoose.model('User', userSchema);
module.exports = user;

