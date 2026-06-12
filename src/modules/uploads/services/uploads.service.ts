import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadsService {
  constructor() {
    cloudinary.config({
      cloud_name:
        process.env.CLOUDINARY_CLOUD_NAME,

      api_key:
        process.env.CLOUDINARY_API_KEY,

      api_secret:
        process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'File is required',
      );
    }

    const result =
      await new Promise<any>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'onushilon',
              },
              (error, result) => {
                if (error) {
                  reject(error);
                }

                resolve(result);
              },
            )
            .end(file.buffer);
        },
      );

    return {
      url: result.secure_url,
    };
  }
}