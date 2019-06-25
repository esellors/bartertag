const express = require('express');
const router = express.Router();
const getLocation = require('../controllers/user/getLocation');
const update = require('../models/user/update');

router.get('/getlocation/:locationId', getLocation);
router.put('/update', update);

module.exports = router;