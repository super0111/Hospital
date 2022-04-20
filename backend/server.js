const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

io.on('connection', function(socket){
  socket.on("addTest", (notifis) => {
    io.emit('addTest', notifis);  
  });
  socket.on("deleteTest", (tests) => {
    io.emit('deleteTest', tests);  
  });
  socket.on("patientConfirm", (patientConfirm) => {
    io.emit('patientConfirm', patientConfirm);  
  });
  socket.on("patientCancel", (patientCancel) => {
    io.emit('patientCancel', patientCancel);  
  });
  socket.on("therapistConfirm", (therapistConfirm) => {
    console.log("therapistConfirm m", therapistConfirm)
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


