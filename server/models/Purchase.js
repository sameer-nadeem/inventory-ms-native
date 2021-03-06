const mongoose = require('mongoose')

const Schema = mongoose.Schema

const purchaseSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    payment: {
        type: String,
        enum: ['Partial', 'Credit', 'Full']
    },
    total: {
        type: Number
    },
    received: {
        type: Number
    },
    note: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    typeOfPurchase: {
        type: String,
        enum: ['Warehouse', 'DeliveryOrder'],
        default: 'Warehouse'
    },
    deliveryOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryOrder'
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse'
    }
})


module.exports = mongoose.model('Purchase', purchaseSchema)