const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: String,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
