import { userLogin,userRegister } from "../controller/userController.js";
import express from "express";

const userRouter = express.Router;

userRouter.post('/register',userRegister);




export {userRouter};