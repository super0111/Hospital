const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    therapist_id : {
        type: String,
    },
    therapist_name : {
        type: String,
    },
    therapist_avatar : {
        type: String,
    },
    patient_name : {
        type:String,
    },
    patient_avatar : {
        type:String,
    },
    patient_id : {
        type:String,
    },
    message : {
        type: String,
        required: true,
    },
    isTherapistMessage : {
        type: Number,
    },
    // date : {
    //     type: String,
    // },
    date: {
        type: Date,
        default: Date.now
      }
})
module.exports = mongoose.model('message', messageSchema)