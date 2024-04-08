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



export const uploadToCloudinary = async (filePath: string, folderName: string): Promise<any> => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, { folder: folderName });
    return result;
  } catch (error) {
    throw error;
  }
};

export const uploadMultipleToCloudinary = async (filePaths: string[], folderName: string): Promise<any[]> => {
  try {
    const uploadPromises = filePaths.map(filePath => cloudinary.v2.uploader.upload(filePath, { folder: folderName }));
    const results = await Promise.all(uploadPromises);
    return results;
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