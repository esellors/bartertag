const express = require('express');
const router = express.Router();
const getAllInventory = require('../controllers/inventory/getAll');
const imgAdd = require('../models/inventory/imgAdd');
const imgDelete = require('../models/inventory/imgDelete');
const detailsAdd = require('../models/inventory/detailsAdd');
const detailsUpdate = require('../models/inventory/detailsUpdate');
const detailsDelete = require('../models/inventory/detailsDelete');

router.get('/getallinventory/:userId', getAllInventory);

router.post('/img/add', imgAdd);
router.delete('/img/delete', imgDelete);

router.post('/details/add', detailsAdd);
router.put('/details/update', detailsUpdate);
router.delete('/details/delete', detailsDelete);

module.exports = router;