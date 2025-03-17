import { ResponseDTO } from "../../../../domain/dtos/response";
import { IGetAllMaterialUseCase } from "../interface/get-all-material.usecase";
import {
  IGetAllMaterialRequestDTO,
  IGetMaterialRequestDTO,
  IMaterialOutDTO,
  IMaterialPopulateMentorDTO,
} from "../../../../domain/dtos/material/material";
import { IMaterialRepository } from "../../../repositories/material.repository";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { PaginationDTO } from "../../../../domain/dtos/pagination.dtos";
import { IGetMaterialUseCase } from "../interface/get-material.usecase";

export class GetMaterialUseCase implements IGetMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

  async execute({
    userId,
    role,
    materialId,
  }: IGetMaterialRequestDTO): Promise<ResponseDTO> {
    try {
      let fetchedData: null | IMaterialPopulateMentorDTO = null;

      if (role === "mentor") {
        fetchedData = await this.materialRepository.findById(materialId);
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
