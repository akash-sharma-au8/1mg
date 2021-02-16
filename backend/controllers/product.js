const Product = require('../models/product')


// Create a new product
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success:true,
    product
  })
}

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    count: products.length,
    products
  })
}

// Get a single Product By Its :id 
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message:'Product not found'
   })
  }

  res.status(200).json({
    success: true,
    product
  })
}

// update product by its :id
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message:'Product not found'
   })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    product
  })
}

// delete a product by its :id

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id) 

  if (!product) {
    return res.status(404).json({
      success: false,
      message:'Product not found'
   })
  }

  await product.remove()

  res.status(200).json({
    success: true,
    message:'Product successfully deleted'
 })
}