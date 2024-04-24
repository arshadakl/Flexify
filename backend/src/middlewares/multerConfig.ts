// import multer from 'multer';

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// export { upload };
import { Request, Response, NextFunction } from 'express';

import multer from "multer";
import path from "path";
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        
        const uploadDirectory = path.join(__dirname, '../public/images')
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    },
});

export const  multerMid = multer({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024 // 10MB
    }
});
