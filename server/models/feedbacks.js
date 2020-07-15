const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  message: {
    type: String,
    required: true
  }
}) 

module.exports = mongoose.model('Feedback', feedbackSchema)