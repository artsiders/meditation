const express = require('express');
const router = express.Router();
const fakeData = require('./fakeData.controler')

router.post('/meditations', fakeData.fakeMeditaton)
router.post('/users', fakeData.fakeUser)

module.exports = router;