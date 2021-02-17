const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandling");
const Features = require("../utils/features");
const cloudinary = require('cloudinary')

// Create a new product
exports.newProduct = async (req, res, next) => {
  let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// Get all products
exports.getProducts = async (req, res) => {
  // const products = await Product.find();
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new Features(Product.find(), req.query).search().filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage)
  products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products
  });
};

// Get a single Product By Its :id
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

// update product by its :id
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

// delete a product by its :id

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product successfully deleted",
  });
};
