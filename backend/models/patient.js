const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
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
  isDoctor : {
    type: Number
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
      type: String,
      required: true,
  },
  isAllergies: {
      type: Boolean,
  },
  allergiesValue: {
    type: String,
  },
  isADHD: {
      type: Boolean,
  },
  height: {
      type: Number,
      required: true,
  },
  weight: {
      type: Number,
      required: true,
  },
  information: {
      type: String,
      required: true,
  },
  summary: {
      type: String,
  },
  picture: {
    type: String,
  },
  treatmentStatus: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('patient', PatientSchema);
