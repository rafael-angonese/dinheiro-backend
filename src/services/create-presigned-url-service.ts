import { s3Client } from '@/lib/s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface CreatePresignedUrlServiceRequest {
  objectKey: string;
}

interface CreatePresignedUrlServiceResponse {
  presignedUrl: string;
}

export class CreatePresignedUrlService {
  constructor() {}

  async execute({
    objectKey
  }: CreatePresignedUrlServiceRequest): Promise<CreatePresignedUrlServiceResponse> {
    
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: objectKey,
    });

    const expiresInMinutes = 3 * 60 // 3 minutos

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: expiresInMinutes });

    return {
      presignedUrl,
    };
  }
}
