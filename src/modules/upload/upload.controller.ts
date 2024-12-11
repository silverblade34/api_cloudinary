import { Controller, Post, UploadedFile, UseInterceptors, Delete, Body, Get, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: any, @Body('folder') folder: string) {
    const result = await this.uploadService.uploadImage(file, folder);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  @Get('images')
  async listImages(@Query('folder') folder?: string) {
    const images = await this.uploadService.listImages(folder);
    return {
      message: 'Images retrieved successfully',
      images,
    };
  }

  @Delete('image')
  async deleteImage(@Body('publicId') publicId: string) {
    const result = await this.uploadService.deleteImage(publicId);
    return { message: 'Image deleted successfully', result: result.result };
  }
}
