import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetSignedUrlRequestDTO } from "../../../../domain/dtos/progress";
import { IGetSignedUrlUseCase } from "../interfaces";
import { Payload } from "../../../../domain/dtos";
import { IProgressRepository } from "../../../../infra/repositories";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import { AuthenticateUserErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IS3ServiceProvider } from "../../../../infra/providers";
import { mapProgressToDTO } from "../../../../infra/databases/mappers";

export class GetSignedUrlUseCase implements IGetSignedUrlUseCase {
  constructor(
    private progressRepository: IProgressRepository,
    private s3ServiceProvider: IS3ServiceProvider
  ) {}

  async execute(
    { progressId, fileKey, materialType }: IGetSignedUrlRequestDTO,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      const progress = await this.progressRepository.findById(progressId);

      if (!progress) {
        return {
          success: false,
          data: { error: ProgressErrorType.ProgressNotFound },
        };
      }

      const mappedData = mapProgressToDTO(progress);

      if (mappedData.userId !== userId) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
        };
      }

      const url = await this.s3ServiceProvider.getObjectUrl(
        fileKey,
        materialType
      );

      return {
        statusCode: 200,
        success: true,
        data: url,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
