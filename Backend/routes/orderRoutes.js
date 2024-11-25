import express from 'express';
import {placeOrder,updateOrderStatus,userOrders,listOrders} from "../controller/orderController.js";
import { authMiddleware} from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/new',authMiddleware,placeOrder);
orderRouter.post('/userorders',authMiddleware,userOrders);
orderRouter.get('/list',authMiddleware,listOrders);
orderRouter.post('/update',updateOrderStatus);
export default orderRouter;