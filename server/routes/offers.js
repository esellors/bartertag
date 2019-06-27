const express = require('express');
const router = express.Router();
const offerCreate = require('../models/offers/offerCreate');

router.post('/create', offerCreate);

module.exports = router;