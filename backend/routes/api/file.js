const express = require('express');
const router = express.Router();
const server_url= 'http://10.10.10.249:5000/'

router.post(
    '/',
    async (req, res) => {
        let imageFile = req.files.file;
        imageFile.mv(`./public/${imageFile.name}`, function(err) {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            res.json({file: `${server_url}${imageFile.name}`});
        });
    })

router.post(
    '/edit',
    async (req, res) => {
        let imageFile = req.files.file;
        imageFile.mv(`./public/${imageFile.name}`, function(err) {
            if (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            res.json({file: `${server_url}${imageFile.name}`});
        });
    })
module.exports = router;
