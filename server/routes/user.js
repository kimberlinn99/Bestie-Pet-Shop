const express = require('express')
const route = express.Router()
const sharp = require('sharp')

const upload = require('../config/multer')
const User = require('../models/users')
const Order = require('../models/orders')

route.get('/:id', async (req, res) => {
  try{
    const order = await Order.find({ user: req.params.id })
                             .sort({ createdAt: -1 })
                             .limit(5)
    const user = await User.findById({ _id: req.params.id })
    res.status(200).json({ 
      user: {
        id: user._id,
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        address: user.address, 
        phone: user.phone, 
        profileImage: user.profileImage,
        orders: order
      }
    })
  } catch(err){
    res.status(500).json({ message: 'Cannot find order and user' })
  }
})

// User Personal Info Route (firstname, lastname, phone, address)
route.patch('/account/update/:id', (req, res) => {
  if(req.params.id) {
    User.findOneAndUpdate({ id: req.params.id })
    .then(async (user) => {
      //mutate user:
      Object
        .keys(req.body)
        .reduce(
          (user, key) => {
            user[key] = req.body[key];
            return user;
          }, user)
      await user.save()
      res.status(200).json({ 
        message: "Update user information",
        user: {
          id: user._id,
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName, 
          address: user.address, 
          phone: user.phone, 
          profileImage: user.profileImage
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Fail to update user information", err })
    })
  } 
})

// Update Profile Image Route
route.patch('/account/update/profile-image/:id', upload.single('profileImage'), async (req, res) => {
  const filePath = `public/uploads/profile_image/resize_${req.file.filename}`

  // Resize image
  sharp(req.file.path)
  .resize(150)
  .jpeg({quality: 50})
  .toFile(filePath)

  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { profileImage: filePath })
    res.status(200).json({
      message: "Upload your profile image",
      user: {
        id: user._id,
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        address: user.address, 
        phone: user.phone, 
        profileImage: filePath
      }
    })
  } catch(err) {
    res.status(500).json({ message: "Fail to update profile image", err })
  }
})

// Post Order Route
route.post('/new/order/:id', async (req, res) => {
  const { orders, totalPrice } = req.body
  try {
    const newOrder = new Order({
      orders,
      totalPrice,
      user: req.params.id
    })
    await newOrder.save()
    res.status(200).json({
      message: "Add order to your account",
      orders,
      user: req.params.id
    })
  } catch(err) {
    res.status(500).json({ message: "Fail to add order to your account", err })
  }
})

module.exports = route