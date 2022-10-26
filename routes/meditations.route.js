const express = require('express');
const router = express.Router();
const meditationControler = require('../controlers/meditation.controller');


router.post('/', meditationControler.post);

router.get('', meditationControler.get);

module.exports = router;
