const express = require('express');
const router = express.Router();
const meditationControler = require('../controlers/meditation.controller');


router.post('/', meditationControler.post);

router.get('/get', meditationControler.get);

router.get('/:date', meditationControler.getAtDate);

router.put('/:id', meditationControler.put);

router.delete('/:id', meditationControler.delete);

module.exports = router;
