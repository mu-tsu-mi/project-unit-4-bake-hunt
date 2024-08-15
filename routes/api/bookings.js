const express = require('express');
const router = express.Router();
const bookingsCtrl = require('../../controllers/api/bookings');

// for Orders page
// GET /api/bookings
router.get('/', bookingsCtrl.getOrders)

// for Cart
// PUT /api/bookings
router.put('/cart', bookingsCtrl.addToCart)
// GET /api/bookings
router.get('/cart', bookingsCtrl.getCart)
// POST /api/bookings
router.post('/cart', bookingsCtrl.updateCart)
router.post('/checkout', bookingsCtrl.checkout)
// DELETE /api/bookings
router.delete('/cart', bookingsCtrl.deleteCart)

module.exports = router;