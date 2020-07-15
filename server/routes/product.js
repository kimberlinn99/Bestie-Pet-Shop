const express = require('express')
const route = express.Router()

const upload = require('../config/multer')
const Product = require('../models/products')

// Create new products
route.post('/', upload.single('productImage'), async (req, res) => {
  const { filename } = req.file 
  const { name, currentPrice, previousPrice, isOnSales, type, animal } = req.body
  try {
    const sharp = require('sharp')
    const filePath = `public/uploads/resizes/resize_${filename}`
    
    // Resize image
    await sharp(req.file.path)
    .resize(150)
    .jpeg({quality: 50})
    .toFile(filePath)

    // Create new Product
    const product = new Product({
      name, currentPrice, previousPrice, isOnSales, type, animal,
      productImage: filePath
    })
    product
      .save()
      .then(result => {
        res.status(201).json({
          message: `${name} is stored in the database successfully`,
          result
        })
      })
      .catch(err => {
        res.status(500).json({ message: "Fail to store this product", err })
    })
  } catch(err) {
    res.status(500).json({ message: "Fail to resize the image", err })
  }
})

// Get all products
route.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      message: "Retrieve all products",
      products
    })
  } catch(err) {
    res.status(500).json({ message: "Fail to get all products", err })
  }
}) 

// Get limit number of products
route.get('/limit/:limitNumber', async (req, res) => {
  let limit = req.params.limitNumber
  limit = parseInt(limit)
  try {
    const products = await Product.find({}).limit(limit)
    res.status(200).json({
      message: `Retrieve ${limit} products`,
      products
    })
  } catch(err) {
    res.status(500).json({ message: `Fail to get ${limit} products`, err })
  }
})

// Filter price of all products
route.get('/filter/price', async (req, res) => {
  const { min, max } = req.query
  try {
    const animalProducts = await Product.find({ 
      currentPrice: { $gte: min, $lte : max }
    });
    res.status(200).json({
      message: `Retrieve all products with the price between ${min} and ${max}`,
      animalProducts
    })
  } catch(err) {
    res.status(500).json({ 
      message: `Fail to get products with the price between ${min} and ${max}`, 
      err 
    })
  }
})

module.exports = route