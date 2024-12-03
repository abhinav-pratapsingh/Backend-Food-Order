import { fetchRestroB,fetchRestroPV,fetchRestroVH,updateRestroStatus } from "../controller/adminController.js";
import express from "express"

const adminRouter = express.Router();
adminRouter.get('/restro/pv',fetchRestroPV);
adminRouter.get('/restro/vh',fetchRestroVH);
adminRouter.get('/restro/b',fetchRestroB);
adminRouter.post('/restro/status',updateRestroStatus);

export default adminRouter;