const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/UserModel");
const sendToken = require("../utils/jsonwebtoken");
// const bcrypt = require("bcryptjs")
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password,phoneno} = req.body;
  const user = await User.create({
    name,
    email,
    password,
    phoneno
  });
  sendToken(user, 201, res);
});
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { phoneno, password } = req.body;
  let isPasswordMatched;
  if (!phoneno || !password) {
    return next(new ErrorHander("Please Enter Phone number & Password", 400));
  }
  const user = await User.findOne({ phoneno }).select("+password");
  if (!user) {
    res.status(200).json({
      success: false,
      error: "Invalid Phone Number, Try Again !"
    });
    // return next(new ErrorHander("Invalid phone number", 401));
  } else {
    isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      res.status(200).json({
        success: false,
        error: "Invalid Passwaord, Try Again !"
      });
      // return next(new ErrorHander("Invalid password", 401));
    }
  }
  if(user && isPasswordMatched){
    sendToken(user,200,res)
  }
});
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData ={
    name: req.body.name,
    phone_no:req.body.phone_no,
  };
  if (req.body.email) {
    return next(new ErrorHander("Email does not Change", 400));
  }
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
   res.status(200).json({
   success: true,
   user
  });
});
exports.deleteProfile=catchAsyncErrors(async(req,res,next)=>{
  let user = await User.findById(req.user.id);
  if(!user){
      return next(new ErrorHander("Product not Found..",400))
  }
  await user.remove()
  res.status(200).json({
      success:true,
      message:"Data is Deleted"
  })
})
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user_email = req.body.email
  const user = await User.findOne({email:user_email});
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user_email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

exports.getAllUser=catchAsyncErrors(async(req,res, next)=>{
  const userAll = await User.find();
  let users = [];
  let countusers = 0;
  const userCount = await User.countDocuments();
  for(let i=0;i<userCount;i++){
    if(userAll[i].role === 'user'){
      users.push(userAll[i]);
      countusers++;
    }
  }
  res.status(200).json({
      success:true,
      users,
      countusers
  })
})