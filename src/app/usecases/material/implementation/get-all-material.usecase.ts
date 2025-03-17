import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetAllMaterialUseCase } from "../interface/get-all-material.usecase";
import { IGetAllMaterialRequestDTO } from "../../../../domain/dtos/material/material";
import { IMaterialRepository } from "../../../repositories/material.repository";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { PaginationDTO } from "../../../../domain/dtos/pagination.dtos";

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
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
