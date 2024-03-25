import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

class ImageUploadService {
    // async uploadImage(imageStream: Readable): Promise<UploadApiResponse> {
    //   return new Promise((resolve, reject) => {
    //     const stream = cloudinary.uploader.upload_stream((error, result) => {
    //       if (error) {
    //         reject(error); // Reject with the error
    //       } else {
    //         if (!result) {
    //           reject(new Error('Upload result is undefined')); // Reject with an error if result is undefined
    //         } else {
    //           resolve(result); // Resolve with the result
    //         }
    //       }
    //     });
  
    //     imageStream.pipe(stream);
    //   });
    // }
  }
  

export default ImageUploadService;
