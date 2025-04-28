import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import { IS3ServiceProvider } from "../../app/providers";
import { MaterialType } from "../../domain/types";

dotenv.config();

export class S3ServiceProvider implements IS3ServiceProvider {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  public async getObjectUrl(
    key: string,
    materialType: MaterialType
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${materialType}s/${key}`,
      ResponseContentDisposition: "inline",
      ResponseContentType:
        materialType === "video"
          ? " application/octet-stream"
          : "application/pdf",
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 600 });
  }

  public async putObject(
    fileName: string,
    category: MaterialType,
    contentType: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${category}s/${fileName}`,
      ContentType: contentType,
      Body: "",
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 600 });
  }

  public async deleteFileFromS3(
    bucketName: string,
    fileKey: string
  ): Promise<void> {
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      });

      await this.s3.send(deleteCommand);
      console.log("File deleted successfully");
    } catch (err) {
      console.error("Error deleting file:", err);
      throw new Error("File deletion failed");
    }
  }
}

export default S3ServiceProvider;
