import { Readable } from 'stream';
import ImageUploadService from '../services/ImageUploadService';
import { UploadApiResponse } from 'cloudinary';

class ImageUploadRepository {
  private imageUploadService: ImageUploadService;

  constructor() {
    this.imageUploadService = new ImageUploadService();
  }

//   async uploadImage(imageStream: Readable): Promise<UploadApiResponse> {
//     return this.imageUploadService.uploadImage(imageStream);
//   }
}

export default ImageUploadRepository;
