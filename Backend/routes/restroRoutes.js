import express from 'express';
import { restroLogin,restroRegister } from '../controller/restroController.js';
import { authMiddleware, checkRestroStatus } from '../middleware/auth.js';
import { nearRestro } from '../controller/mapController.js';
const restroRouter = express.Router();

restroRouter.post("/register",restroRegister);
restroRouter.post("/login",checkRestroStatus,restroLogin);
restroRouter.get("/near",authMiddleware,nearRestro);


export default restroRouter;