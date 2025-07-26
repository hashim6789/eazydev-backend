import { ResponseDTO } from "../../../../domain/dtos/response";
import { PaginationDTO } from "../../../../domain/dtos/pagination.dtos";
import {
  IGetLearningContentRequestDTO,
  QueryProgress,
} from "../../../../domain/dtos/progress";
import {
  IGetAllProgressUseCase,
  IGetLearningContentsUseCase,
} from "../interfaces";
import { Payload } from "../../../../domain/dtos";
import { IProgressRepository } from "../../../repositories";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import { AuthenticateUserErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetLearningContentUseCase implements IGetLearningContentsUseCase {
  constructor(private progressRepository: IProgressRepository) {}

  async execute(
    { progressId }: IGetLearningContentRequestDTO,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      const progress = await this.progressRepository.findByIdPopulate(
        progressId
      );

      if (!progress) {
        return {
          success: false,
          data: { error: ProgressErrorType.ProgressNotFound },
        };
      }

      if (progress.userId !== userId) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
        };
      }

      return {
        statusCode: 200,
        success: true,
        data: progress,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
