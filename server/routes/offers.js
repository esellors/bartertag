const express = require('express');
const router = express.Router();
const getOffers = require('../controllers/offers/getOffers');
const getItemsDetails = require('../controllers/products/getItemsDetails');
const offerCreate = require('../models/offers/offerCreate');
const offerRespond = require('../models/offers/offerRespond');
const updateMessageToSeen = require('../models/offers/updateMessageToSeen');

router.get('/getoffers/:userId', getOffers);
router.get('/getitemsdetails/:secondaryItemId/:primaryItem1Id/:primaryItem2Id/:primaryItem3Id', getItemsDetails);
router.put('/updatemessagetoseen/:offerMessageId', updateMessageToSeen);
router.post('/create', offerCreate);
router.post('/respond', offerRespond);

module.exports = router;