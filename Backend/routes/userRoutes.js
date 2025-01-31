import { sendCode, userLogin,userRegister } from "../controller/userController.js";
import express from "express";
import { checkUserStaus } from "../middleware/auth.js";
import trimValues from "../middleware/trimValues.js";

const userRouter = express.Router();
userRouter.post('/register',trimValues,userRegister);
userRouter.post('/login',trimValues,checkUserStaus,userLogin);
userRouter.post('/send',trimValues,sendCode);

export default userRouter;