const express = require('express')
const route = express.Router()
const Product = require('../models/products')

// Get animal products
route.get('/:animalType', async (req, res) => {
  const animalType = req.params.animalType
  try {
    const animalProducts = await Product.find({ animal: animalType })
    res.status(200).json({
      message: `Retrieve ${animalType} products`,
      animalProducts
    })
  } catch(err) {
    res.status(500).json({ message: `Fail to get ${animalType} products`, err })
  }
})

//Filter animal products
route.get('/:animalType/filter', async (req, res) => {
  const animalType = req.params.animalType
  let { category, sortBy, min, max } = req.query
  var animalProducts
  if(min != 'undefined' && max != 'undefined'){
    min = parseInt(min)
    max = parseInt(max)
  }

  // Filter Category only
  if(category != 'undefined' && sortBy == 'undefined' && min == 'undefined' && max == 'undefined'){
    try {
      animalProducts = await Product.find({ animal: animalType, type: category })
    } catch(err) {
      res.status(500).json({ message: `FAIL in Filter type only`, err })
    }
  }

  // Filter Price only
  else if(category == 'undefined' && sortBy == 'undefined' && min != 'undefined' && max != 'undefined'){
    try {
      animalProducts = await Product.find({ 
        animal: animalType,
        currentPrice: { $gte: min, $lte : max }
      })
    } catch(err) {
      res.status(500).json({ message: `FAIL in Filter price only`, err })
    }
  }

  // Filter Category and Price 
  else if(category != 'undefined' && sortBy == 'undefined' && min != 'undefined' && max != 'undefined'){
    try {
      animalProducts = await Product.find({ 
        animal: animalType,
        type: category,
        currentPrice: { $gte: min, $lte : max }
      })
    } catch(err) {
      res.status(500).json({ message: `FAIL in Filter category and price`, err })
    }
  }

  // Filter Price and Sort by  
  else if(category == 'undefined' && sortBy != 'undefined' && min != 'undefined' && max != 'undefined'){
    try {
      animalProducts = await sortWithPrice(animalType, sortBy, min, max)
    } catch(err) {
      res.status(500).json({ message: `FAIL in Filter price and Sort by`, err })
    }
  }

  // Filter all 
  else if(category != 'undefined' && sortBy != 'undefined' && min != 'undefined' && max != 'undefined'){
    try {
      animalProducts = await sortWithPriceAndType(animalType, sortBy, category, min, max)
    } catch(err) {
      res.status(500).json({ message: `FAIL in Filter all`, err })
    }
  }

  res.status(200).json({
    message: `Filter Products successfully`,
    animalProducts
  })
})

// Get animal products
route.get('/:animalType/:productName', async (req, res) => {
  const animalType = req.params.animalType
  const productName = req.params.productName
  try {
    // Find this animal product
    const animalProduct = await Product.findOne({ 
      animal: animalType, 
      name: productName 
    })
    // Get other related products of the animal
    const otherProducts = await Product.find({ 
      animal: animalType,
      name: { $ne: productName }
    })
    res.status(200).json({
      message: `Retrieve ${productName}`,
      animalProduct,
      otherProducts
    })
  } catch(err) {
    res.status(500).json({ message: `Fail to get ${productName}`, err })
  }
})

async function sortWithPrice(animalType, sortMethod, min, max){
  var animalProducts
  if(sortMethod == 'newest'){
    animalProducts = await Product
      .find({ animal: animalType, currentPrice: { $gte: min, $lte : max } })
      .sort({ createdAt: -1 });
  } else if( sortMethod == 'price-low-to-high'){
    animalProducts = await Product
      .find({ animal: animalType, currentPrice: { $gte: min, $lte : max } })
      .sort({ currentPrice: 1 });
  } else if( sortMethod == 'price-high-to-low'){
    animalProducts = await Product
      .find({ animal: animalType, currentPrice: { $gte: min, $lte : max } })
      .sort({ currentPrice: -1 });
  } else if( sortMethod == 'name-a-z'){
    animalProducts = await Product
      .find({ animal: animalType, currentPrice: { $gte: min, $lte : max } })
      .sort({ name: 1 });
  } else if( sortMethod == 'name-z-a'){
    animalProducts = await Product
      .find({ animal: animalType, currentPrice: { $gte: min, $lte : max } })
      .sort({ name: -1 });
  }
  return animalProducts
}

async function sortWithPriceAndType(animalType, sortMethod, type, min, max){
  var animalProducts
  if(sortMethod == 'newest'){
    animalProducts = await Product
      .find({ animal: animalType, type, currentPrice: { $gte: min, $lte : max } })
      .sort({ createdAt: -1 });
  } else if( sortMethod == 'price-low-to-high'){
    animalProducts = await Product
      .find({ animal: animalType, type, currentPrice: { $gte: min, $lte : max } })
      .sort({ currentPrice: 1 });
  } else if( sortMethod == 'price-high-to-low'){
    animalProducts = await Product
      .find({ animal: animalType, type, currentPrice: { $gte: min, $lte : max } })
      .sort({ currentPrice: -1 });
  } else if( sortMethod == 'namea-z'){
    animalProducts = await Product
      .find({ animal: animalType, type, currentPrice: { $gte: min, $lte : max } })
      .sort({ name: 1 });
  } else if( sortMethod == 'name-z-a'){
    animalProducts = await Product
      .find({ animal: animalType, type, currentPrice: { $gte: min, $lte : max } })
      .sort({ name: -1 });
  }
  return animalProducts
}

module.exports = route