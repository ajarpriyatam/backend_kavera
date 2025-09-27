const Order = require("../models/OrderModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    coupon,
    destionation_address,
    price,
    gst,
    discount,
    total,
    creditcoupon,
    downpayment,
    outstandingbalence
  } = req.body;
  let order_id = "S0000001";
  let orderObj = {
    orderItems: orderItems,
    price: price,
    GST: gst,
    total: total,
    destionationAddress: destionation_address,
    orderID:order_id,
    paidAt: Date.now(),
    user: req.user._id,
    orderRemarks: "Payment Completed"
  }
  if(coupon){
    orderObj.coupon = coupon
    orderObj.discount = discount
  }
  if(creditcoupon) {
    orderObj.creditCoupon = creditcoupon;
    orderObj.downPayment = downpayment;
    orderObj.outstandingBalence = outstandingbalence;
    orderObj.orderRemarks = "Outstanding Balence is remaining"
  }
  const order = await Order.create(orderObj);
  res.status(201).json({
    success: true,
    order
  });
});
exports.updateOrderByAdmin = catchAsyncErrors(async (req, res, next) => {
  const newUserData ={
    logisticAgent:req.body
  };
  const order = await Order.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
   res.status(200).json({
   success: true,
   order
  });
});
exports.orderClearPayment = catchAsyncErrors(async (req, res, next) => {
  const newUserData ={
    clearPaymentDate: req.body.date,
    orderRemarks: "Payment Completed"
  };
  const order = await Order.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
   res.status(200).json({
   success: true,
   order
  });
});
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});




