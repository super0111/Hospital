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
    }
})
module.exports = mongoose.model('test', TestSchema)