const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
  patient_name: String,
  content: String,
  date: String,
});

module.exports = mongoose.model('notifications', NotificationsSchema);
