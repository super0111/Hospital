const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Patient = require('../../models/patient');

router.put("/editProfile",   
  async (req, res) => {
    const { id, emailValue, phoneNumberValue, passwordValue, avatar } = req.body;
    Patient.findByIdAndUpdate(id, { password: passwordValue, email: emailValue, phoneNumber: phoneNumberValue, picture: avatar })
    .then(results => res.json({status: "success"}))
    .catch(err => {
      res.status(400).json({EditProfile: err.message})
    })
  }
)

router.get('/getProfile/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const user = await Patient.findById(id);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;

module.exports = router;