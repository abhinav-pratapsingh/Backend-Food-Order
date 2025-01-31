import express from 'express';
import { districtRestro, restroLogin,restroRegister } from '../controller/restroController.js';
import { authMiddleware, checkRestroStatus } from '../middleware/auth.js';
import { nearRestro } from '../controller/mapController.js';
import trimValues from '../middleware/trimValues.js';
import upload_middleware from '../config/multer.js';

const restroRouter = express.Router();

restroRouter.post("/register", upload_middleware, trimValues, restroRegister);
restroRouter.post("/login",trimValues,checkRestroStatus,restroLogin);
restroRouter.get("/near",trimValues,authMiddleware,nearRestro);
restroRouter.get("/district",trimValues,districtRestro);

export default restroRouter ;