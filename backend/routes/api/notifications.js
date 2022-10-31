const express = require('express');
const router = express.Router();
const Notify = require('../../models/notifications');
const Notifications = require('../../models/ConfirmNotifications');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000/",
    // methods: ["GET", "POST"],
    methods: 'GET,PUT,POST,DELETE,OPTIONS'.split(','),
    transports : ['websocket']
  }
});

router.post('/saveAllNotify',
    async(req, res) => {
        const { content, patient_name } = req.body;
        const date = new Date()
        const notifications = new Notify({
            patient_name,
            content,
            date,
        })
        notifications.save()
        .then(() => {
            Notify.find()
            .then( notityList => io.emit('notifications', notityList))
        })
    }
)

router.post('/saveNotify',
    async (req, res) => {
        const { notifyInfo, test_id } = req.body;
        const patientName = notifyInfo.patientSelectValue;
        const testName = notifyInfo.testName;
        try {
            const date = new Date();
            const notifications = new Notifications({
                test_id,
                patientName,
                testName,
                date
            })

             await notifications.save()
            .then(notify => res.json({message: "success", notify}))
            .catch(err => {
                res.status(400).json({RegisterPatient: err.message})
            });
        }
        catch  (err) {
            console.error(err);
            res.status(500).send("Server 500 error");
        }
    }

)

router.delete('/deleteConfirmNotify/:id',
    (req, res) => {
        Notifications.findById(req.params.id)
        .then(notify => {
            notify.delete()
            .then( () => {
                Notifications.find()
                .then( notify =>res.json({success: true, data: notify}))
            } )
        })
        .catch(err => {
            res.status(400).json({Notify: err.message})
        })
    }
)

router.get('/getConfirmNotifications',
    async (req, res) => {
        Notifications.find().sort({ date: 1 })
        .then(confirmNotify => res.json(confirmNotify))
        .catch(err => {console.log(err)
            res.status(404).json({err: "Notifications no found"})
        });
    }
)

router.get('/',
    async (req, res) => {
        Notify.find().sort({ date: 1 })
        .then(notify => res.json(notify))
        .catch(err => {console.log(err)
            res.status(404).json({err: "Notifications no found"})
        });
    }
)

router.delete('/deleteNotify/:id',
    (req, res) => {
        Notify.findById(req.params.id)
        .then(notify => {
            notify.delete()
            .then( () => {
                Notify.find()
                .then( notify =>res.json({success: true, data: notify}))
            } )
        })
        .catch(err => {
            res.status(400).json({Notify: err.message})
        })
    }
)

module.exports = router;