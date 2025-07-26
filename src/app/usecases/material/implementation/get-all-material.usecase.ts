import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetAllMaterialUseCase } from "../interface/get-all-material.usecase";
import { IMaterialRepository } from "../../../../infra/repositories";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { PaginationDTO } from "../../../../domain/dtos/pagination.dtos";
import { IGetAllMaterialRequestDTO } from "../../../../domain/dtos/material";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetAllMaterialUseCase implements IGetAllMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute({
    userId,
    role,
    query,
  }: IGetAllMaterialRequestDTO): Promise<ResponseDTO> {
    try {
      let fetchedData: null | PaginationDTO = null;

      if (role === "mentor") {
        const filter = { ...query, mentorId: userId };

        fetchedData = await this.materialRepository.findAll(filter);
        if (!fetchedData) {
          return {
            success: false,
            data: { error: MaterialErrorType.MaterialFetchingFailed },
          };
        }
      }

      if (!fetchedData) {
        return {
          success: false,
          data: { error: MaterialErrorType.MaterialFetchingFailed },
        };
      }
      return {
        statusCode: 200,
        success: true,
        data: fetchedData,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
