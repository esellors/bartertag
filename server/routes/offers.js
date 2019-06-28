const express = require('express');
const router = express.Router();
const getOffers = require('../controllers/offers/getOffers');
const offerCreate = require('../models/offers/offerCreate');

router.get('/getoffers/:userId', getOffers);
router.post('/create', offerCreate);

module.exports = router;