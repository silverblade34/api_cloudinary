import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(file: any, folderName: string): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('No se ha encontrado una imagen cargada');
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(file.buffer);
    });
  }

  async listImages(folder?: string) {
    try {
      const options: Record<string, any> = { 
        resource_type: 'image',
        type: 'upload',
      };

      if (folder) {
        options.prefix = folder;
      }

      const result = await cloudinary.api.resources(options);
      return result.resources;
    } catch (error) {
      throw new Error('Error listing images: ' + error.message);
    }
  }

  async deleteImage(publicId: string): Promise<any> {
    return cloudinary.uploader.destroy(publicId);
  }
}
