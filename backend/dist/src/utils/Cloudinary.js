"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleToCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
function configCloudinary() {
    cloudinary_1.default.v2.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}
const uploadToCloudinary = async (filePath, folderName) => {
    try {
        const result = await cloudinary_1.default.v2.uploader.upload(filePath, { folder: folderName, resource_type: 'auto' });
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
const uploadMultipleToCloudinary = async (filePaths, folderName) => {
    try {
        const uploadPromises = filePaths.map(filePath => cloudinary_1.default.v2.uploader.upload(filePath, { folder: folderName }));
        const results = await Promise.all(uploadPromises);
        return results;
    }
    catch (error) {
        throw error;
    }
};
exports.uploadMultipleToCloudinary = uploadMultipleToCloudinary;
exports.default = configCloudinary;
// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });    
