const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");

exports.newCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return next(new ErrorHander("User not Found..", 400))
  }
  let cart = {
    "productName": req.body.productName,
    "productSize": req.body.productSize,
    "productQuantity": req.body.productQuantity,
    "productPrice": req.body.productPrice,
    "productColor": req.body.productColor,
    "productImage": req.body.productImage
  }
  user.cartItems.push(cart)
  let updatedCartItems = user.cartItems;
  await user.save();
  res.status(201).json({
    success: true,
    updatedCartItems
  });
});

exports.deleteCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return next(new ErrorHander("User not Found..", 400))
  }
  if (user.cartItems.length > 1) {
    user.cartItems.splice(user.cartItems.findIndex(a => a.productId === req.body.productId), 1);
  }
  let updatedCartItems = user.cartItems;
  await user.save();
  res.status(201).json({
    success: true,
    updatedCartItems
  });
});

exports.addQuantityCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return next(new ErrorHander("User not Found..", 400))
  }
  if (user.cartItems.length > 0) {
    if (user.cartItems.length === 1) {
      user.cartItems[0].productQuantity = user.cartItems[0].productQuantity + 1;
    } else {
      for (let i=0;i<user.cartItems.length;i++){
        if(user.cartItems[i].productId === req.body.productId){
          user.cartItems[i].productQuantity = user.cartItems[i].productQuantity+1;
          break;
        }
      }
    }
  }
  let updatedCartItems = user.cartItems;
  await user.save();
  res.status(201).json({
    success: true,
    updatedCartItems
  });
});

exports.removeQuantityCart = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return next(new ErrorHander("User not Found..", 400))
  }
  if (user.cartItems.length > 0) {
    if (user.cartItems.length === 1) {
      if(user.cartItems[0] && user.cartItems[0].productQuantity === 1) {
        user.cartItems = [];
      } else {
        user.cartItems[0].productQuantity = user.cartItems[0].productQuantity - 1;
      }
    } else {
      for (let i=0;i<user.cartItems.length;i++){
        if(user.cartItems[i].productId === req.body.productId){
          if (user.cartItems[i] && user.cartItems[i].productQuantity === 1) {
            user.cartItems.splice(user.cartItems.findIndex(a => a.productId === req.body.productId), 1);
          } else {
            user.cartItems[i].productQuantity = user.cartItems[i].productQuantity-1;
          }
          break;
        }
      }
    }
  }
  let updatedCartItems = user.cartItems;
  await user.save();
  res.status(201).json({
    success: true,
    updatedCartItems
  });
});

// exports.updatecartByAdmin = catchAsyncErrors(async (req, res, next) => {
//   const newUserData ={
//     logisticAgent:req.body
//   };
//   const cart = await cart.findByIdAndUpdate(req.params.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });
//    res.status(200).json({
//    success: true,
//    cart
//   });
// });
// exports.cartClearPayment = catchAsyncErrors(async (req, res, next) => {
//   const newUserData ={
//     clearPaymentDate: req.body.date,
//     cartRemarks: "Payment Completed"
//   };
//   const cart = await cart.findByIdAndUpdate(req.params.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });
//    res.status(200).json({
//    success: true,
//    cart
//   });
// });
// exports.getSinglecart = catchAsyncErrors(async (req, res, next) => {
//   const cart = await cart.findById(req.params.id);

//   if (!cart) {
//     return next(new ErrorHander("cart not found with this Id", 404));
//   }
//   res.status(200).json({
//     success: true,
//     cart,
//   });
// });

// exports.mycarts = catchAsyncErrors(async (req, res, next) => {
//   const carts = await cart.find({ user: req.user._id });
//   res.status(200).json({
//     success: true,
//     carts,
//   });
// });

exports.getAllcarts = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHander("User not Found..", 400))
  }
  let cartAll = user.cartItems
  res.status(200).json({
    success: true,
    cartAll
  });
});




