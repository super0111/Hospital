const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    patient_name : {
        type: String,
        required: true,
    },
    test_id : {
        type: Number,
    },
    date: {
        type: String,
        required: true,
    },
    foodValue: {
        type: String,
    },
    addTextValue: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    canceled: {
        type: Boolean,
        default: false,
    }
})
module.exports = mongoose.model('test', TestSchema)