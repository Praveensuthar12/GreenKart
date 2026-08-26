import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
      required: true,
    },

    items: [
      {
        product: {
          type: String,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      ref: "Address",
      required: true,
    },

    status: {
      type: String,
      default: "Order Placed",
    },

    paymentType: {
      type: String,
      required: true,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Order = mongoose.model.order || mongoose.model("order", orderSchema);

export default Order;
