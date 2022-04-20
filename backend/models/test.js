const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    patient_name : {
        type: String,
        required: true,
    },
    test_id : {
        type: Number,
    },
    testName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    allergies : {
        type: String,
        required: true,
    },
    foodName : {
        type: String,
        required: true,
    },
    whightAmountValue : {
        type: Number,
    },
    whightAmountUnits : {
        type: String,
    },
    unitsAmountValue : {
        type: Number,
    },
    eatTimeValue : {
        type: Number,
    },
    eatTimeUnits : {
        type: String,
    },
    addInstructions : {
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