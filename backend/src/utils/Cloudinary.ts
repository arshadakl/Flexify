import cloudinary from 'cloudinary';
import fs from 'fs'
import { Request, Response } from 'express';

function configCloudinary(){
    cloudinary.v2.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });      
}


export const uploadToCloudinary = async (filePath: string): Promise<any> => {
    try {
      const result = await cloudinary.v2.uploader.upload(filePath);
      return result;
    } catch (error) {
      throw error;
    }
  };




export default configCloudinary;

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });    