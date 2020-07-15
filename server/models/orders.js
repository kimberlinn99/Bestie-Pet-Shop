const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  orders: {
    type: [Object],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
}) 

module.exports = mongoose.model('Order', orderSchema)