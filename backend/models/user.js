const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isDoctor: {
    type: Number,
  },
  gender: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
