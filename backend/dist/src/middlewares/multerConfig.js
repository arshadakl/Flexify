"use strict";
// import multer from 'multer';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMid = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        const uploadDirectory = path_1.default.join(__dirname, '../public/images');
        if (!fs_1.default.existsSync(uploadDirectory)) {
            fs_1.default.mkdirSync(uploadDirectory, { recursive: true });
        }
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    },
});
exports.multerMid = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1000 * 1024 * 1024 // 10MB
    }
});
