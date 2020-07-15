const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  previousPrice: {
    type: Number,
    default: 0
  },
  isOnSales: {
    type: Boolean,
    required: true
  },
  animal: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  productImage: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)