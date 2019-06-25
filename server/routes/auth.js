const express = require('express');
const router = express.Router();
const getSession = require('../controllers/user/getSession');
const register = require('../models/user/register');
const login = require('../controllers/user/login');
const logout = require('../controllers/user/logout');

router.get('/getsession', getSession);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;