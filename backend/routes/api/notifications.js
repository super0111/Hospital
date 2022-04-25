const express = require('express');
const router = express.Router();
const Notify = require('../../models/notifications');
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