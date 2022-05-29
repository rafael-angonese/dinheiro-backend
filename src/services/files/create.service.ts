import { prismaClient } from "../../database/prismaClient";
import { File } from "../../../prisma/client";

interface IRequest {
  key: string;
  model: string;
  name: string;
  bucket: string;
  url: string;
  size: number;
  content_type: string;
  original_name: string;
}

export class CreateFileService {
  async execute(params: IRequest): Promise<File> {
    const data = await prismaClient.file.create({
      data: {
        ...params,
      },
    });

    return data;
  }
}
