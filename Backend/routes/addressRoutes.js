import { addAddress,removeAddress,updateAddress,getAddress, reqAddress} from "../controller/addressController.js";
import express from "express";
import {authMiddleware} from "../middleware/auth.js";
import trimValues from "../middleware/trimValues.js";

const addressRouter = express.Router();

addressRouter.get('/get',trimValues,authMiddleware,getAddress);
addressRouter.post('/add',trimValues,authMiddleware,addAddress);
addressRouter.post('/remove',trimValues,authMiddleware,removeAddress);
addressRouter.post('/update',trimValues,authMiddleware,updateAddress);
addressRouter.get('/getone',trimValues,authMiddleware,reqAddress)

export default addressRouter;