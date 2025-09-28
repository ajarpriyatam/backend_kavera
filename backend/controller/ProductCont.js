const Product = require("../models/ProductModel");
const { param } = require("../routes/ProdectRoute");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.productImageGallery === "string") {
        images.push(req.body.productImageGallery);
    } else {
        images = req.body.productImageGallery;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.productImageGallery = imagesLinks;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let id = req.params.id;

    // Try to find by ID first, then by slug
    let product = await Product.findById(id);
    if (!product) {
        product = await Product.findOne({ slug: id });
    }

    if (!product) {
        return next(new ErrorHander("Product not Found..", 400))
    }
    res.status(200).json({
        success: true,
        product
    })
});
exports.getAllProductsAdmin = catchAsyncErrors(async (req, res, next) => {
    const ProductAll = await Product.find()
    const productsCount = await Product.countDocuments();
    res.status(200).json({
        success: true,
        ProductAll,
        productsCount
    })
});
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    try {
        let ProductAll = await Product.find()
        let visibleProducts = ProductAll.filter(product => product.display === true);
        res.status(200).json({
            success: true,
            visibleProducts,
            visibleProductscount: visibleProducts.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database connection error',
            error: error.message
        });
    }
});
exports.getTopRatedProducts = catchAsyncErrors(async (req, res, next) => {
    let ProductAll = await Product.find()
    let productsCount = await Product.countDocuments();
    let products = [];
    for (let i = 0; i < productsCount; i++) {
        if (ProductAll[i].token_id[0] == 'S') {
            products.push(ProductAll[i]);
        }
    }
    productsCount = products.length;
    res.status(200).json({
        success: true,
        products,
        productsCount
    })
});
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
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
});
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Delete Successfully",
    });
});
