import orderModel from "../models/orderModels.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { error } from "console";

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
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `order_reciept_${newOrder._id}`,
    };

    const razorpayOrder = instance.orders.create(options);
    newOrder.razorpay_id = razorpayOrder.id;
    await newOrder.save();
    res.json({
      success: true,
      message: "order created",
      razorpayData: razorpayOrder,
      orderId: newOrder._id,
    });
  } catch (e) {
    res.json({ success: false, message: `order creation failed... ${e}` });
  }
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderId,
  } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.key_secret)
      .update(body)
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      const orderData = await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      return res.json({ success: true, message: "payment successfull" });
    } else {
      return res.json({
        success: false,
        message: "payment verification failed try again",
      });
    }
  } catch (e) {
    res.json({
      success: false,
      message:
        "internal server error while verifying payment please try again later",
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(e);
    res.json({ success: false, msg: "cannot fetch orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (e) {
    res.json({ success: false, message: "cannot fecth orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  const order = await orderModel.findOne({ _id: req.body.orderId });
  order.status = req.body.orderStatus;
  res.json({ success: true, message: "successfull", data: order });
};

export { placeOrder, userOrders, updateOrderStatus, listOrders, verifyPayment };
