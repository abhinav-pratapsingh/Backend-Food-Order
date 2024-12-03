import express from 'express';
import { getCart,removeFromCart,addToCart } from "../controller/cartController.js";
const cartRouter = express.Router();
import {authMiddleware} from '../middleware/auth.js';

cartRouter.post('/get',authMiddleware,getCart);
cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);

export default cartRouter;