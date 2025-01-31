import express from 'express';
import {placeOrder,updateOrderStatus,userOrders,listOrders} from "../controller/orderController.js";
import { authMiddleware} from '../middleware/auth.js';
import trimValues from '../middleware/trimValues.js';

const orderRouter = express.Router();

orderRouter.post('/new',trimValues,authMiddleware,placeOrder);
orderRouter.post('/userorders',trimValues,authMiddleware,userOrders);
orderRouter.get('/list',trimValues,authMiddleware,listOrders);
orderRouter.post('/update',trimValues,updateOrderStatus);
export default orderRouter;