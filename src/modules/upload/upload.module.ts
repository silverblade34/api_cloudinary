import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from 'src/providers/cloudinary.provider';

@Module({
  providers: [UploadService, CloudinaryProvider],
  controllers: [UploadController],
})
export class UploadModule {}
