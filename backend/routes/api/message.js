const express = require('express');
const router = express.Router();
const Message = require('../../models/message');

router.post('/', 
    async (req, res) => {
        const { therapist_id, therapist_name, therapist_avatar, patient_name, patient_avatar, patient_id, message, isTherapistMessage, date } = req.body;
        console.log(req.body)
        const messages = new Message({
            therapist_id,
            therapist_name,
            therapist_avatar,
            patient_name,
            patient_avatar,
            patient_id,
            message,
            isTherapistMessage,
            // date,
        })
        await messages.save()
        .then(message => res.json({message: "success", message}))
        .catch(err => {
            res.status(400).json({Addmessage: err.message})
        });
    }
)

router.get('/',
    async (req, res) => {
        Message.find().sort({ date: 1 })
        .then(message => res.json(message))
        .catch(err => {console.log(err)
            res.status(404).json({err: "message no found"})
        });
    }
)

module.exports = router;