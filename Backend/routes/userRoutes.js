import passport from "passport";
import { sendCode, userLogin,userRegister } from "../controller/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post('/register',userRegister);
userRouter.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/api/user/login'}),userLogin);
userRouter.post('/send',sendCode)



export default userRouter;