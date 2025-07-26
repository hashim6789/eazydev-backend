import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IGetMaterialRequestDTO,
  IMaterialPopulateMentorDTO,
} from "../../../../domain/dtos/material";
import { IMaterialRepository } from "../../../repositories/material.repository";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { IGetMaterialUseCase } from "../interface/get-material.usecase";
import { formatErrorResponse } from "../../../../presentation/http/utils";

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
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
