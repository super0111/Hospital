
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const Notify = require('./models/notifications');
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

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors({origin: '*'}));
app.use(fileUpload());
app.use(express.static('public'));
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/posts/', require('./routes/api/posts'));
app.use('/api/file/', require('./routes/api/file'));
app.use('/api/patient/', require('./routes/api/patient'));
app.use('/api/message/', require('./routes/api/message'));
app.use('/api/notifications', require("./routes/api/notifications"));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

io.on('connection', function(socket) {
  socket.on("addTest", (notifis, notifyInfo, id) => {
    io.emit('addTest', notifis, notifyInfo, id);  
  });
  socket.on("editTest", (test) => {
    io.emit('editTest', test);
  });
  socket.on("notifications", (notify, name) => {
      const content = notify;
      const patient_name = name;
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
  });
  socket.on("deleteTest", (tests) => {
    io.emit('deleteTest', tests);
  });
  socket.on("patientConfirm", (patientConfirm) => {
    console.log("patientConfirm", patientConfirm)
    io.emit('patientConfirm', patientConfirm);  
  });
  socket.on("patientCancel", (patientCancel) => {
    io.emit('patientCancel', patientCancel);  
  });
  socket.on("therapistConfirm", (therapistConfirm) => {
    io.emit('therapistConfirm', therapistConfirm);  
  });
  socket.on("therapist_message_send", (therapist_message_send) => {
    io.emit("therapist_message_send", therapist_message_send);
  });
  socket.on("patient_message_send", (patient_message_send) => {
    io.emit("patient_message_send", patient_message_send);
  });
})
http.listen(5000, function(){
  console.log('listening on *:5000');
});


