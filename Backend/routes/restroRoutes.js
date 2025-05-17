import express from "express";
import {
  districtRestro,
  restroLogin,
  restroRegister,
} from "../controller/restroController.js";
import { authMiddleware, checkRestroStatus } from "../middleware/auth.js";
import { allRestrosForTest, nearRestro } from "../controller/mapController.js";
import trimValues from "../middleware/trimValues.js";
import upload_middleware from "../config/multer.js";
import multer from "multer";

const restroRouter = express.Router();

restroRouter.post("/register", upload_middleware, trimValues, restroRegister);
restroRouter.post("/login", trimValues, checkRestroStatus, restroLogin);
restroRouter.post("/near", multer().none(), trimValues, nearRestro);
restroRouter.get("/all",allRestrosForTest);
restroRouter.post("/district", trimValues, districtRestro);

export default restroRouter;
