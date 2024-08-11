const Booking = require('../../models/booking');

module.exports = {
    addToCart,
    getCart
}

async function addToCart(req, res) {
    let booking = await Booking.findOne({ bookingStatus: false, user: req.user });
    if (!booking) {
        booking = await Booking.create({
            bookingStatus: false,
            user: req.user,
            pickUpDate: new Date()
        })
    }
    booking.lineItems.push({
        qty: req.body.qty,
        cake: req.body.cakeId
    })
    await booking.save()
    res.json(booking)
}

async function getCart(req, res) {
    const booking = await Booking
        .findOne({ bookingStatus: false, user: req.user})
        .populate('lineItems.cake')
    booking ? res.json(booking) : res.json(null)
}