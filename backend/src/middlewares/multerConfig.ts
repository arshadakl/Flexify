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

export const multerMid = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

// // Custom middleware to handle base64 image string
// export const handleBase64Image = (req: Request, res: Response, next: NextFunction) => {
//     if (req.body.croppedImageUrl) {
//         // Remove the data URL prefix
//         const base64Data = req.body.croppedImageUrl.replace(/^data:image\/\w+;base64,/, '');

//         // Convert base64 to buffer
//         const buffer = Buffer.from(base64Data, 'base64');

//         // Create a temporary file path
//         const tempFilePath = path.join(__dirname, 'tempImage.png');

//         // Write the buffer to a temporary file
//         fs.writeFileSync(tempFilePath, buffer);

//         // Use Multer's diskStorage to save the file
//         multerMid.single('image')(req, res, (err) => {
//             if (err) {
//                 // Handle error
//                 console.error(err);
//                 res.status(500).send('Error processing image');
//             } else {
//                 // The file has been saved by Multer, proceed to the next middleware
//                 next();
//             }
//         });
//     } else {
//         // If there's no base64 image string, pass control to the next middleware
//         next();
//     }
// };