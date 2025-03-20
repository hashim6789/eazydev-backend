import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IGetSignedUrlRequestDTO,
  IUpdateProgressRequestDTO,
} from "../../../../domain/dtos/progress";
import { IGetSignedUrlUseCase, IUpdateProgressUseCase } from "../interfaces";
import { Payload } from "../../../../domain/dtos";
import { IProgressRepository } from "../../../repositories";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import { AuthenticateUserErrorType } from "../../../../domain/enums";
import { IS3ServiceProvider } from "../../../providers";

export class UpdateProgressUseCase implements IUpdateProgressUseCase {
  constructor(private progressRepository: IProgressRepository) {}

  async execute(
    { progressId, materialId }: IUpdateProgressRequestDTO,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      const progress = await this.progressRepository.updateProgress(
        progressId,
        materialId
      );

      if (!progress) {
        return {
          success: false,
          data: { error: ProgressErrorType.ProgressNotFound },
        };
      }

      return {
        statusCode: 200,
        success: true,
        data: progress,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
