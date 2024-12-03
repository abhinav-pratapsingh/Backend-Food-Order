import { sendCode, userLogin,userRegister } from "../controller/userController.js";
import express from "express";
import { checkUserStaus } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post('/register',userRegister);
userRouter.post('/login',checkUserStaus,userLogin);
userRouter.post('/send',sendCode);

export default userRouter; 