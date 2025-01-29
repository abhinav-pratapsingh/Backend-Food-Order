import express from 'express';
import multer from 'multer';
import { addfood, listFood, removeFood } from '../controller/foodController.js';
import { authMiddlewareRestro } from '../middleware/auth.js';


// image storage engine

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)

    }
});

const upload = multer({ storage: storage });

const foodRouter = express.Router();

const upload_middleware = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!req.file) {
            return res.status(400).json( {success:false,message:`failed to fecth image`} );
        }
        next();
    });
}

foodRouter.post('/add', authMiddlewareRestro, upload_middleware, addfood);
foodRouter.get('/list', authMiddlewareRestro, listFood);
foodRouter.post('/remove', authMiddlewareRestro, removeFood);

export default foodRouter;