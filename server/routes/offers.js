const express = require('express');
const router = express.Router();
const getOffers = require('../controllers/offers/getOffers');
const getItemsDetails = require('../controllers/products/getItemsDetails');
const offerCreate = require('../models/offers/offerCreate');

router.get('/getoffers/:userId', getOffers);
router.get('/getitemsdetails/:secondaryItemId/:primaryItem1Id/:primaryItem2Id/:primaryItem3Id', getItemsDetails);
router.post('/create', offerCreate);

module.exports = router;