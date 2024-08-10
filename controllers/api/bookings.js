const Booking = require('../../models/booking');
const Cake = require('../../models/cake');

module.exports = {
    addToCart,
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