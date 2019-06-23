const express = require('express');
const router = express.Router();
const session = require('../controllers/user/session');
const register = require('../models/user/register');
const login = require('../controllers/user/login');
const logout = require('../controllers/user/logout');

router.get('/user/session', session);
router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/logout', logout);

module.exports = router;