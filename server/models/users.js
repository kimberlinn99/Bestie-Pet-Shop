const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: { 
      type: String 
  },
  profileImage: {
    type: String,
    default: "public/uploads/default_profile_image.png"
  },
  phone: {
    type: String
  },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }
})

module.exports = mongoose.model('User', userSchema)