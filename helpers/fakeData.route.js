const express = require('express');
const router = express.Router();
const fakeData = require('./fakeData.controler')

router.post('/meditations', fakeData.fakeMeditaton)

module.exports = router;