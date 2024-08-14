const Booking = require('../../models/booking');

module.exports = {
    addToCart,
    getCart,
    updateCart,
    checkout,
    // for Orders page
    getOrders
}

async function addToCart(req, res) {
    let booking = await Booking
        .findOne({ bookingStatus: false, user: req.user })
        .populate('lineItems.cake')

    if (!booking) {
        booking = await Booking.create({
            bookingStatus: false,
            user: req.user,
            pickUpDate: new Date()
        })
    }

    // find if there is already lineitem for the cake
    const checkLineItem = booking.lineItems.find((lineitem) => {
        return lineitem.cake._id.toString() === req.body.cakeId
    })

    if (!checkLineItem) {
        booking.lineItems.push({
            qty: req.body.qty,
            cake: req.body.cakeId,
        })
    } else {
        checkLineItem.qty += req.body.qty;
    }

    await booking.save()
    res.json(booking)
}

async function getCart(req, res) {
    const booking = await Booking
        .findOne({ bookingStatus: false, user: req.user })
        .populate('lineItems.cake')
    booking ? res.json(booking) : res.json(null)
}

async function updateCart(req, res) {
    if(!Number.isInteger(Number(req.body.qty))){
        return res.status(400).json({ message: "Please select an integer value for quantity"})
    }

    const booking = await Booking
        .findOne({ bookingStatus: false, user: req.user })
        .populate('lineItems.cake')

    booking.lineItems.forEach((lineItem, index) => {
        lineItem.qty = req.body.lineItems[index].qty
    })

    booking.lineItems = booking.lineItems.filter((lineItem) => {
        return lineItem.qty > 0
    })
    if (booking.lineItems.length === 0) {
        await booking.delete();
        res.json(null)
    } else {
        await booking.save();
        res.json(booking);
    }
}

async function checkout(req, res) {
    const booking = await Booking
        .findOne({ bookingStatus: false, user: req.user })

    booking.pickUpDate = req.body.pickUpDate;
    booking.timeOfDay = req.body.timeOfDay;
    booking.bookingStatus = true;
     
    await booking.save();
    res.json(null)
}

// for Oreders page
async function getOrders(req, res) {
    const booking = await Booking
        .find({ bookingStatus: true, user: req.user })
        .populate('lineItems.cake')

    booking ? res.json(booking) : res.json(null)
}