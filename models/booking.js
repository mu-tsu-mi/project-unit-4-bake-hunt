const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    cake: {
        type: Schema.Types.ObjectId,
        ref: 'Cake',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

lineItemSchema.virtual('extPrice').get(function() {
    return this.qty * this.cake.unitPrice;
})

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickUpDate: { type: Date, required: true },
    timeOfDay: {
        type: String,
        enum: ['9am - Noon', 'Noon - 3pm', '3 - 6pm'],
        default: '9am - Noon',
    },
    bookingStatus: { type: Boolean },
    pickUpPreference: { type: Boolean },
    lineItems: [lineItemSchema]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

bookingSchema.virtual('cartTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
})

module.exports = mongoose.model('Booking', bookingSchema)