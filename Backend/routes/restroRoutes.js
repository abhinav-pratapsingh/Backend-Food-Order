import express from 'express';
import { restroLogin,restroRegister } from '../controller/restroController.js';
import { authMiddleware, checkRestroStatus } from '../middleware/auth.js';
import { nearRestro } from '../controller/mapController.js';
import multer from 'multer';
const restroRouter = express.Router();

const storage = multer.diskStorage({
    destination: "restro_uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage:storage});

restroRouter.post("/register",upload.single('image'),restroRegister);
restroRouter.post("/login",checkRestroStatus,restroLogin);
restroRouter.get("/near",authMiddleware,nearRestro);


export default restroRouter;