const express = require('express');
const router = express.Router();
const multer = require('multer');

const evangileControler = require('../controlers/evangile.controller');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.xlsx')
    }
});
let upload = multer({ storage });

router.post('/', upload.single('file'), evangileControler.post);
router.get('/:date', evangileControler.getByDate);




module.exports = router;
