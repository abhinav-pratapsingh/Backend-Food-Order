import express from "express";
import multer from "multer";
import { addfood, listFood, removeFood } from "../controller/foodController.js";
import { authMiddlewareRestro } from "../middleware/auth.js";
import trimValues from "../middleware/trimValues.js";
import upload_middleware from "../config/multer.js";

const foodRouter = express.Router();

<<<<<<< HEAD
foodRouter.post(
  "/add",
  trimValues,
  authMiddlewareRestro,
  upload_middleware,
  addfood
);
foodRouter.post("/list", authMiddlewareRestro, listFood);
foodRouter.post("/remove", trimValues, authMiddlewareRestro, removeFood);

export default foodRouter;
=======
foodRouter.post('/add',trimValues,authMiddlewareRestro, upload_middleware, addfood);
foodRouter.post('/list', authMiddlewareRestro, listFood);
foodRouter.post('/remove',trimValues,authMiddlewareRestro, removeFood);

export default foodRouter ;
>>>>>>> eb0f4a40f040b14a8abc1dca88fae48ab88134c5
