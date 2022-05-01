const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConfirmNotificationsSchema = new Schema({
    test_id: String,
    patientName: String,
    testName: String,
    date: String,
});

module.exports = mongoose.model('confirmNotifications', ConfirmNotificationsSchema);
