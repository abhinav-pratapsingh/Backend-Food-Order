import express from 'express';
import {placeOrder,updateOrderStatus,userOrders,listOrders, verifyPayment} from "../controller/orderController.js";
import { authMiddleware} from '../middleware/auth.js';
import trimValues from '../middleware/trimValues.js';

const orderRouter = express.Router();

orderRouter.post('/new',trimValues,authMiddleware,placeOrder);
orderRouter.post('/userorders',trimValues,authMiddleware,userOrders);
orderRouter.get('/list',trimValues,authMiddleware,listOrders);
orderRouter.post('/update',trimValues,updateOrderStatus);
orderRouter.post('/verify',authMiddleware,verifyPayment);
export default orderRouter;