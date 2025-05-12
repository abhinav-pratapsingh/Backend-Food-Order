import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  userOrders,
  verifyPayment,
  getRazorpayOrders,
  listOrdersPending,
  listOrdersOutForDelivery,
  listOrdersDelivered,
} from "../controller/orderController.js";
import { authMiddleware, authMiddlewareRestro } from "../middleware/auth.js";
import trimValues from "../middleware/trimValues.js";

const orderRouter = express.Router();

// user order routes
orderRouter.post("/new", trimValues, authMiddleware, placeOrder);
orderRouter.post("/userorders", trimValues, authMiddleware, userOrders);
orderRouter.post("/verify", authMiddleware, verifyPayment);
orderRouter.get("/getorder", getRazorpayOrders);

// restro order routes

orderRouter.post(
  "/pending",
  trimValues,
  authMiddlewareRestro,
  listOrdersPending
);
orderRouter.post(
  "/outfordelivery",
  trimValues,
  authMiddlewareRestro,
  listOrdersOutForDelivery
);
orderRouter.post(
  "/delivered",
  trimValues,
  authMiddlewareRestro,
  listOrdersDelivered
);
orderRouter.post(
  "/update",
  trimValues,
  authMiddlewareRestro,
  updateOrderStatus
);

export default orderRouter;
