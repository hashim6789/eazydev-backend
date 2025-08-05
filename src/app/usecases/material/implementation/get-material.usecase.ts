import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IGetMaterialRequestDTO,
  IMaterialPopulateMentorDTO,
} from "../../../../domain/dtos/material";
import { IMaterialRepository } from "../../../../infra/repositories";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { IGetMaterialUseCase } from "../interface/get-material.usecase";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IMaterial } from "../../../../infra/databases/interfaces";
import { mapMaterialToDTO } from "../../../../infra/databases/mappers";

export class GetMaterialUseCase implements IGetMaterialUseCase {
  constructor(private _materialRepository: IMaterialRepository) {}

  async execute({
    role,
    materialId,
  }: IGetMaterialRequestDTO): Promise<ResponseDTO> {
    try {
      let fetchedData: null | IMaterial = null;

      if (role === "mentor") {
        fetchedData = await this._materialRepository.findById(materialId);
      }

      if (!fetchedData) {
        return {
          success: false,
          data: { error: MaterialErrorType.MaterialFetchingFailed },
        };
      }

      const mappedData = mapMaterialToDTO(fetchedData);
      return {
        statusCode: 200,
        success: true,
        data: mappedData,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
