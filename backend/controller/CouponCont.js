const Coupon = require("../models/CouponModel");
const { param } = require("../routes/ProdectRoute");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({
        success: true,
        coupon,
    });
});
exports.getAllCouponsAdmin = catchAsyncErrors(async (req, res, next) => {
    const CouponAll = await Coupon.find()
    const CouponsCount = await Coupon.countDocuments();
    res.status(200).json({
        success: true,
        CouponAll,
        CouponsCount
    })
});

exports.validateCoupon = catchAsyncErrors(async (req, res, next) => {
    let id = req.params.id;
    const coupon = await Coupon.findOne({ couponName:id })
    if (!coupon) {
        return next(new ErrorHander("Invalid Coupon", 401));
    }
    res.status(200).json({
        success: true,
        coupon
    })
});

exports.getAllCoupons = catchAsyncErrors(async (req, res, next) => {
    let CouponAll = await Coupon.find()
    let CouponsCount = await Coupon.countDocuments();
    let newCoupons = [];
    // let dateNow = new Date();
    for (let i = 0; i < CouponsCount; i++) {
        if (CouponAll[i].type == 'Regular') {
            newCoupons.push(CouponAll[i])
        }
    }
    CouponAll = newCoupons;
    res.status(200).json({
        success: true,
        CouponAll,
        CouponsCount
    })
});

exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
        return next(new ErrorHander("Coupon not found", 404));
    }

    await Coupon.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Coupon Delete Successfully",
    });
});



