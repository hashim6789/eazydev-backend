import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ICreateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { MaterialEntity } from "../../../../domain/entities";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { IMaterialRepository } from "../../../../infra/repositories";
import { ICreateMaterialUseCase } from "../interface";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { mapMaterialToDocument } from "../../../../infra/databases/mappers";

export class CreateMaterialUseCase implements ICreateMaterialUseCase {
  constructor(private _materialRepository: IMaterialRepository) {}

  async execute(
    {
      title,
      mentorId,
      type,
      description,
      fileKey,
      duration,
    }: ICreateMaterialRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (mentorId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }
      const materialEntity = MaterialEntity.create({
        title,
        mentorId,
        type,
        description,
        fileKey,
        duration,
      });

      const createdMaterial = await this._materialRepository.create(
        mapMaterialToDocument(materialEntity)
      );

      if (!createdMaterial) {
        return {
          data: { error: MaterialErrorType.MaterialCreationFailed },
          success: false,
        };
      }

      return { data: createdMaterial.id, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
