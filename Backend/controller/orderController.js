import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

const placeOrder = async (req, res) => {
  console.log(process.env.key_id, process.env.key_secret);
  try {
    const newOrder = new orderModel({
      restroId: req.body.restroId,
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const options = {
      amount: req.body.amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `order_reciept_${newOrder._id}`,
    };

    const razorpayOrder = await instance.orders.create(options);
    newOrder.razorpay_id = razorpayOrder.id;
    await newOrder.save();

    res.json({
      success: true,
      message: "Order created successfully",
      razorpayOrder,
      key: process.env.key_id,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({
      success: false,
      message: `Order creation failed: ${error.message}`,
    });
  }
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    console.log("inside try verify")
    const expectedSignature = crypto
      .createHmac("sha256", process.env.key_secret)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const data = await orderModel.updateOne({razorpay_id:razorpay_order_id},{ payment: true });
      return res.json({ success: true, message: "Payment successful" });
    } else {
        console.log("inside else;")
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed hello ,,,,,," });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while verifying payment",
    });
  }
};

const getRazorpayOrders = async (req, res) => {
    try {
      const orders = await instance.orders.all({ limit: 20 }); // you can increase/decrease limit
      res.json({ success: true, data: orders });
    } catch (error) {
      console.error("Error fetching Razorpay orders:", error);
      res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
  };

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Fetching user orders failed:", error);
    res.status(500).json({ success: false, message: "Cannot fetch orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Fetching order list failed:", error);
    res.status(500).json({ success: false, message: "Cannot fetch orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderModel.findById(req.body.orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = req.body.orderStatus;
    await order.save();

    res.json({ success: true, message: "Order status updated", data: order });
  } catch (error) {
    console.error("Updating order status failed:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating order status" });
  }
};

export { placeOrder, userOrders, updateOrderStatus, listOrders, verifyPayment,getRazorpayOrders };
