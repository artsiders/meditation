const express = require('express');
const router = express.Router();
const XLSX = require("xlsx")
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.xlsx')
    }
});
let upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
    var workbook = XLSX.readFile('./uploads/' + req.file.filename);
    var sheetNameList = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetNameList[0]]
    const datas = XLSX.utils.sheet_to_json(worksheet)
    return res.status(200).json(datas)
});




module.exports = router;
