import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUploadMaterialRequestDTO } from "../../../../domain/dtos/upload";
import { UploadErrorType } from "../../../../domain/enums/upload";
import { IS3ServiceProvider } from "../../../../infra/providers";
import { formatErrorResponse } from "../../../../presentation/http/utils";

import { IMaterialContentUploadUseCase } from "../interface/material-conent-upload.usecase";

export class MaterialContentUploadUseCase
  implements IMaterialContentUploadUseCase
{
  constructor(private s3ServiceProvider: IS3ServiceProvider) {}

  async execute(
    { fileName, fileType, materialType }: IUploadMaterialRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      const url = await this.s3ServiceProvider.putObject(
        fileName,
        materialType,
        fileType
      );

      console.log(url);

      if (!url) {
        return {
          data: { error: UploadErrorType.SignedUrlGenerationFailed },
          success: false,
        };
      }

      return { data: { signedUrl: url, fileKey: fileName }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
