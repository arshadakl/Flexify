"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImageUploadService_1 = __importDefault(require("../services/ImageUploadService"));
class ImageUploadRepository {
    imageUploadService;
    constructor() {
        this.imageUploadService = new ImageUploadService_1.default();
    }
}
exports.default = ImageUploadRepository;
