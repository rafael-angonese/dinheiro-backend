import { s3Client } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

interface CreatePresignedUrlServiceRequest {
  fileExtension: string;
}

interface CreatePresignedUrlServiceResponse {
  presignedUrl: string;
  fileKey: string;
}

export class CreatePresignedUrlService {
  constructor() {}

  async execute({
    fileExtension
  }: CreatePresignedUrlServiceRequest): Promise<CreatePresignedUrlServiceResponse> {
    
    const fileKey = `dev/${uuidv4()}.${fileExtension}`

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
    });

    const expiresInMinutes = 3 * 60 // 3 minutos

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: expiresInMinutes });

    return {
      presignedUrl,
      fileKey,
    };
  }
}
