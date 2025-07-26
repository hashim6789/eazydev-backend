import { ResponseDTO } from "../../../../domain/dtos/response";
import { PaginationDTO } from "../../../../domain/dtos/pagination.dtos";
import { QueryProgress } from "../../../../domain/dtos/progress";
import { IGetAllProgressUseCase } from "../interfaces";
import { Payload } from "../../../../domain/dtos";
import { IProgressRepository } from "../../../repositories";
import { ProgressErrorType } from "../../../../domain/enums/progress";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetAllProgressUseCase implements IGetAllProgressUseCase {
  constructor(private progressRepository: IProgressRepository) {}

  async execute(
    query: QueryProgress,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      let paginatedProgresses: null | PaginationDTO = null;

      if (role === "learner") {
        paginatedProgresses = await this.progressRepository.findAllByUserId(
          query,
          userId
        );
      }

      if (!paginatedProgresses) {
        return {
          success: false,
          data: { error: ProgressErrorType.ProgressNotFound },
        };
      }
      return {
        statusCode: 200,
        success: true,
        data: paginatedProgresses,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
