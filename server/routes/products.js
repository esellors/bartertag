const express = require('express');
const router = express.Router();
const getCategoryProducts = require('../controllers/products/getCategoryProducts');

router.get('/getcategoryproducts/:category', getCategoryProducts);

module.exports = router;