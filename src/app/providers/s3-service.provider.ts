import { Request, Response, NextFunction } from "express";
import { MaterialType } from "../../domain/types";

export interface IS3ServiceProvider {
  /**
   * Generate a signed URL to retrieve an object from S3.
   * @param key - The key of the object in the S3 bucket.
   * @param materialType - The type of the material (e.g., "reading" or "video").
   * @returns A signed URL string.
   */
  getObjectUrl(key: string, materialType: MaterialType): Promise<string>;

  /**
   * Generate a signed URL to upload an object to S3.
   * @param fileName - The name of the file to be uploaded.
   * @param category - The type of the material (e.g., "reading" or "video").
   * @param contentType - The MIME type of the file being uploaded.
   * @returns A signed URL string.
   */
  putObject(
    fileName: string,
    category: MaterialType,
    contentType: string
  ): Promise<string>;

  /**
   * Delete an object from the S3 bucket.
   * @param bucketName - The name of the S3 bucket.
   * @param fileKey - The key of the file to delete.
   */
  deleteFileFromS3(bucketName: string, fileKey: string): Promise<void>;

  /**
   * Middleware to handle file uploads using multer.
   * @returns A multer middleware function.
   */
  // uploadMiddleware(): (req: Request, res: Response, next: NextFunction) => void;

  /**
   * Upload a file to S3 and attach the file URL to the request object.
   * @param req - The Express request object containing the file.
   * @param res - The Express response object.
   * @param next - The next middleware function.
   */
  // s3Upload(req: Request, res: Response, next: NextFunction): Promise<void>;
}
