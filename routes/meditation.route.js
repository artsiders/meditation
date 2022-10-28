const express = require('express');
const router = express.Router();
const meditationControler = require('../controlers/meditation.controller');

router.post('/', meditationControler.post);

router.get('', meditationControler.get);

router.get('', meditationControler.getAtDate); //get element by date ?date='08-06-2022'

router.get('/:id', meditationControler.getById);

router.put('/:id', meditationControler.put);

router.delete('/:id', meditationControler.delete);

module.exports = router;
