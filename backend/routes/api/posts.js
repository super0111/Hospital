const express = require('express');
const router = express.Router();
const Patient = require('../../models/patient');
const Test = require('../../models/test');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Notifications = require('../../models/notifications');

router.post('/registerPatient',
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { therapist_id, fullname, id, email,isDoctor, phoneNumber, gender, birthday, isAllergies, isADHD, height, weight, information, summary, picture } = req.body;
        let patient_user = await Patient.findOne({ email });
        let user = await User.findOne({ email })

        if (patient_user && user) {
            return res
              .status(400)
              .json({ errors: { msg: 'User already exists' } });
          }

        try {
            const date = new Date();
            const password = id;
            const patient = new Patient({
                therapist_id,
                fullname,
                id,
                email,
                isDoctor,
                password,
                phoneNumber,
                gender, 
                birthday,
                isAllergies,
                isADHD,
                height,
                weight,
                information,
                summary,
                picture,
                date
            })
             await patient.save()
            .then(patient => res.json({message: "success", patient}))
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

router.get('/getPatients', 
    (req, res) => {
        Patient.find().sort({ date: 1 })
        .then(users=>res.json(users))
        .catch(err=>{console.log(err)
            res.status(404).json({err: 'Patients no found'});
        });
    }
)

router.post('/addTests',
    async (req, res) => {
        const { patient_name, test_id, date, foodValue, addTextValue  } = req.body;
        try {
            const test = new Test({
                patient_name,
                test_id,
                date,
                foodValue,
                addTextValue,
            })
            await test.save()
            .then(test => res.json({message: "success", test}))
            .catch(err => {
                res.status(400).json({AddTest: err.message})
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Server 500 error");
        }
    }
)

router.put('/confirmTest',
    async (req, res) => {
        const { id, confirmed } = req.body;
        console.log("req.body", req.body)
        Test.findByIdAndUpdate(id, { confirmed: confirmed })
        .then(results => res.json({status: "success", results}))
        .catch(err => {
            res.status(400).json({Confirm: err.message})
        })
    }
)
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

router.get('/getTests',
    (req, res) => {
        Test.find().sort({ date: 1 })
        .then(tests => res.json(tests))
        .catch(err => {console.log(err)
            res.status(404).json({err: "Tests no found"})
        });
    }
)

module.exports = router;