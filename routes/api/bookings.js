const express = require('express');
const router = express.Router();
const bookingsCtrl = require('../../controllers/api/bookings');


// PUT /api/bookings
router.put('/', bookingsCtrl.addToCart)
// GET /api/bookings
router.get('/', bookingsCtrl.getCart)

module.exports = router;