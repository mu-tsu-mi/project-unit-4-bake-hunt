const Booking = require('../../models/booking');

module.exports = {
    addToCart,
    getCart,
    updateCart,
    checkout,
    deleteCart,
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
    // Check user's qty input. If not an integer, return an error message.
    let error = false
    req.body.lineItems.forEach((lineItem) => {
        if(!Number.isInteger(Number(lineItem.qty)) || Number(lineItem.qty) < 0){
            error = true
        }
    })

    if (error) {
        return res.status(400).json({ message: "Please select a positive integer for quantity or zero to cancel the item"})
    }

    const booking = await Booking
        .findOne({ bookingStatus: false, user: req.user })
        .populate('lineItems.cake')

    // Update lineitem with request
    booking.lineItems.forEach((lineItem, index) => {
        lineItem.qty = req.body.lineItems[index].qty
    })

    // Check then remove any lineitem that has a qty of zero.
    booking.lineItems = booking.lineItems.filter((lineItem) => {
        return lineItem.qty > 0
    })
    // Delete the cart if it doesn't have any lineitem.
    if (booking.lineItems.length === 0) {
        await booking.delete();
        res.json(null)
    } else {
        await booking.save();
        res.json(booking);
    }
}

async function deleteCart(req, res) {
    const booking = await Booking
        .findOne({ bookingStatus: false, user: req.user })
    
    if (booking) await booking.delete();
    res.json(null)
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
        .sort({ pickUpDate: "descending" });

    booking ? res.json(booking) : res.json(null)
}