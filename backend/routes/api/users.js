const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Patient = require('../../models/patient');

// @route    POST api/users
// @desc     Register user
// @access   Public

router.post( '/register',
  check('fullname', 'Fullname is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password','Please enter a password with 6 or more characters').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, id, email,isDoctor, gender, degree, expertise, phoneNumber, password, } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: 'User already exists' } });
      }

      const date = new Date();
      user = new User({
        fullname,
        id,
        email,
        isDoctor,
        gender,
        degree,
        expertise,
        phoneNumber,
        password,
        date,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user._id,
          password: user.password
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "success" });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server 500 error');
    }
  }
);

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/login', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post( '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      let patient_user = await Patient.findOne({ email });

      if (!user && !patient_user) {
        return res
          .status(400)
          .json({ errors: { msg: 'Invalid Email' } });
      }

      if(patient_user ? patient_user.isDoctor == 2 : "") {

        if(patient_user.id == patient_user.password) {
          isFirst = 1;
        } else { isFirst = 2 }

        if (password !== patient_user.password) {
          return res
            .status(400)
            .json({ errors: { msg: 'Invalid Password' } });
        }
        const payload = {
          patient_user: {
            email: patient_user.email,
            id: patient_user._id,
            fullname: patient_user.fullname,
            avatar: patient_user.picture,
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            const doctor = 1;
            res.status(200).json({ token, doctor, isFirst });
          }
        );
        return
      }

      if( user ? user.isDoctor == 1 : "") {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: { msg: 'Invalid Password' } });
        }
        const payload = {
          user: {
            id: user._id,
            fullname: user.fullname,
            avatar: user.picture,
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            const doctor = 2
            if (err) throw err;
            res.status(200).json({ token, doctor });
          }
        );
      }
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.put("/changePassword",   
  async (req, res) => {
    const { password, id } = req.body;
    Patient.findByIdAndUpdate(id, { password: password })
    .then(results => res.json({status: "success"}))
    .catch(err => {
      res.status(400).json({ChangePatientPassword: err.message})
    })
  }
)

module.exports = router;
