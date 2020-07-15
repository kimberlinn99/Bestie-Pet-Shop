const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')

const Product = require('../models/products')
const User = require('../models/users')
const Order = require('../models/orders')
const Feedback = require('../models/feedbacks')
const Subscribe = require('../models/subscribes')

// Home Page Route
route.get('/', async (req, res) => {
  try{
    const products = await Product.find().limit(5).exec
    res.status(200).json({ products })
  } catch(err){
    res.status(500).json({
      message: 'Could not find any products'
    })
  }
})

// Sign up Route
route.post('/sign-up', async (req, res) => {
  const { email } = req.body
  // Validate User
  User.find({ email: email })
      .then(async (user) => {
        if(user.length > 0){
          res.status(200).json({
            status: 'ERROR',
            message: "This email is already existed"
          })
        }
        else{
          try {
            const { email, password, firstName, lastName, address } = req.body
            if(email.length == 0){
              res.status(200).json({
                status: 'ERROR',
                message: "Email is Required",
                firstName,
                lastName,
                address
              })
            }
            if(password.length < 6){
              res.status(200).json({
                status: 'ERROR',
                message: "Password should contain at least 6 characters",
                firstName,
                lastName,
                address
              })
            } else {
              const newUser = new User({ email, password, firstName, lastName, address })
              const hashPassword = await bcrypt.hash(password, 10)
              newUser.password = hashPassword
              await newUser.save()
              res.status(201).json({
                status: 'SUCCESS',
                message: `${email} has signed up successfully`,
                user: {
                  id: newUser._id,
                  email: newUser.email, 
                  firstName: newUser.firstName, 
                  lastName: newUser.lastName, 
                  address: newUser.address, 
                  profileImage: newUser.profileImage
                }
              })
            }
          } catch(error) {
            res.status(500).json({
              message: "Could not sign up this account",
              error
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({ err })
      })
})
  
// Log in Route
route.post('/log-in', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { 
      res.json({ message: info.message })
      return 
    }
    req.login(user, (err) => {
      if(err) console.log(err)
      res.status(200).json({ 
        message: "Log in successfully",
        user: {
          id: user._id,
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName, 
          address: user.address, 
          profileImage: user.profileImage,
          phone: user.phone || ''
        }
      })
    })
  })(req, res, next)
})

// Log out Route
route.post('/log-out', (req, res) => {
  req.logout()
  res.status(200).json({ message: "You are logged out" });
})

// Post Order Route
route.post('/new/order', async (req, res) => {
  const { orders, totalPrice } = req.body
  try {
    const newOrder = new Order({
      orders,
      totalPrice
    })
    await newOrder.save()
    res.status(200).json({
      message: "Add orders successfully!",
      orders: newOrder
    })
  } catch(err) {
    res.status(500).json({ message: "Fail to add new order", err })
  }
})

// Feedback Route
route.post('/feedback', async (req, res) => {
  const { name, email, phone, message } = req.body
  if(email.length == 0 || message.length == 0){
    res.status(400).json({ message: "Please fill in both email and message" })
  } else {
    try{
      const feedback = new Feedback({
        name, email, phone, message
      })
      await feedback.save()
      res.status(200).json({ message: "Thanks for submitting!" })
    } catch(err){
      res.status(500).json({ message: "Could not save the feedback. Please try again." })
    }
  }
})

// Subscribe Route
route.post('/subscribe', async (req, res) => {
  const email = req.body.email
  if(email.length != 0){
    try{
      const subscriber = new Subscribe({ email })
      await subscriber.save()
      res.status(200).json({ message: "Thanks for subscribing our shop!" }) 
    } catch(err){
      res.status(500)
    }
  } else {
    res.status(500).json({ message: "Please fill in your email." })
  }
})

module.exports = route