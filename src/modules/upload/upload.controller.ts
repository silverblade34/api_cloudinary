import { Controller, Post, UploadedFile, UseInterceptors, Delete, Body, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: any) {
    const result = await this.uploadService.uploadImage(file);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  @Delete('image')
  async deleteImage(@Body('publicId') publicId: string) {
    const result = await this.uploadService.deleteImage(publicId);
    return { message: 'Image deleted successfully', result };
  }
}
