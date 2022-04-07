const express = require('express');
const router = express.Router();
const Notifications = require('../../models/notifications');

router.get('/notifications', (req, res) => {
    Notifications.find((err, notifications) => {
      if (err) {
        res.send(err);
      }
      return res.json(notifications);
    });
  });
  
  router.put('/notifications', () => {
    Notifications.find((err, notifs) => {
      notifs.forEach((notif) => {
        notif.read = true;
        notif.save();
      });
    });
  });
  
  router.delete('/notifications', (req, res) => {
    Notifications.remove({}, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Database Truncated');
      res.send('/notifications');
    });
  });
module.exports = router;
