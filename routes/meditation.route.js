const express = require('express');
const router = express.Router();
const meditationControler = require('../controlers/meditation.controller');


router.get('/:date', meditationControler.getAtDate);

router.put('/:id', meditationControler.put);

router.delete('/:id', meditationControler.delete);

module.exports = router;
