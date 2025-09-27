const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [{
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    token_id: {
      type: String,
      required: true,
    },
    quantity:{
      type: Number,
      required: true,
    }
  }],
  coupon: {
    couponName: {
      type: String,
    },
    couponDiscount: {
      type: Number,
    },
    couponType: {
      type: String,
    }
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  GST: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  creditCoupon: {
    type: String,
  },
  orderRemarks: {
    type: String,
    required: true
  },
  downPayment: {
    type: Number,
  },
  clearPaymentDate: {
    type: Date
  },
  outstandingBalence: {
    type: Number,
  },
  deliveryCharges: {
    type: Number,
  },
  destionationAddress: {
    addreslin1: {
      type: String,
      required: true,
    },    
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  logisticAgent: {
    name: {
      type: String
    },    
    orderDropDate: {
      type: Date
    },
    orderReachDate: {
      type: Date
    }
  },
  "orderID": {
    type: String,
    required: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);