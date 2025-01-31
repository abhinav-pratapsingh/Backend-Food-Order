import multer from "multer";

// image storage engine

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)

    }
});

const uploadLocal = multer({ storage: storage });

const upload_middleware = (req,res,next) =>{
    uploadLocal.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!req.file){
            return res.status(400).json( {success:false,message:`failed to fecth image`} );
        }
        next();
    });
}

export default upload_middleware;