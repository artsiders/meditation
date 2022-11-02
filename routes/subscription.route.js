const express = require('express');
const router = express.Router();
const usersControler = require('../controlers/subscription.controller');


router.post('/', usersControler.post);

router.get('/', usersControler.get);

router.get('/:id', usersControler.getOne);

router.patch('/:id', usersControler.patch);


router.delete('/:id', usersControler.delete);

module.exports = router;
