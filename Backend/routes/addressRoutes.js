import { addAddress,removeAddress,updateAddress,getAddress, reqAddress} from "../controller/addressController.js";
import express from "express";
import {authMiddleware} from "../middleware/auth.js";

const addressRouter = express.Router();

addressRouter.get('/get',authMiddleware,getAddress);
addressRouter.post('/add',authMiddleware,addAddress);
addressRouter.post('/remove',authMiddleware,removeAddress);
addressRouter.post('/update',authMiddleware,updateAddress);
addressRouter.get('/getone',authMiddleware,reqAddress)

export default addressRouter;