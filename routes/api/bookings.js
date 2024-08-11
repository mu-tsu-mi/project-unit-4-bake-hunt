const express = require('express');
const router = express.Router();
const bookingsCtrl = require('../../controllers/api/bookings');


// PUT /api/bookings
router.put('/', bookingsCtrl.addToCart)
// GET /api/bookings
router.get('/', bookingsCtrl.getCart)
// POST /api/bookings
router.post('/', bookingsCtrl.updateCart)
router.post('/checkout', bookingsCtrl.checkout)

module.exports = router;