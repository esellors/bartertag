const express = require('express');
const router = express.Router();
const getNotifications = require('../controllers/notifications/getNotifications');
const clearAll = require('../models/notifications/clearAll');

router.get('/getnotifications/:userId', getNotifications);
router.put('/clearall/:userId', clearAll);

module.exports = router;