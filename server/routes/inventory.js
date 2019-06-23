const express = require('express');
const router = express.Router();
const imgAdd = require('../models/inventory/imgAdd');
const imgDelete = require('../models/inventory/imgDelete');
const detailsAdd = require('../models/inventory/detailsAdd');

router.post('/img/add', imgAdd);
router.delete('/img/delete', imgDelete);

router.post('/details/add', detailsAdd);
router.delete('/details/delete');

module.exports = router;