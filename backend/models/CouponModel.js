const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  couponName: {
    type: String,
    required: [true, "Please Enter Coupon Name"],
  },
  couponDiscount: {
    type: Number,
    required: [true, "Please Enter Coupon Discount Percentage"],
  },
  couponType: {
    type: String,
    required: [true, "Please Enter Coupon Type"],
  },
  description: {
    type: String,
  },
  validto: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Coupon = new mongoose.model("Coupon", couponSchema);
module.exports = Coupon