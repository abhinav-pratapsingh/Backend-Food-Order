import express from 'express';
import {placeOrder,updateOrderStatus,userOrders, verifyPayment, getRazorpayOrders, listOrdersPending, listOrdersOutForDelivery, listOrdersDelivered} from "../controller/orderController.js";
import { authMiddleware} from '../middleware/auth.js';
import trimValues from '../middleware/trimValues.js';

const orderRouter = express.Router();

// user order routes
orderRouter.post('/new',trimValues,authMiddleware,placeOrder);
orderRouter.post('/userorders',trimValues,authMiddleware,userOrders);
orderRouter.post('/verify',authMiddleware,verifyPayment);
orderRouter.get('/getorder',getRazorpayOrders);

// restro order routes

orderRouter.get('/pending',trimValues,authMiddleware,listOrdersPending);
orderRouter.get('/outfordelivery',trimValues,authMiddleware,listOrdersOutForDelivery);
orderRouter.get('/delivered',trimValues,authMiddleware,listOrdersDelivered);
orderRouter.post('/update',trimValues,updateOrderStatus);


export default orderRouter;