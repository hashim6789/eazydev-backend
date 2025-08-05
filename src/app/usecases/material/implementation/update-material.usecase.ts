import { Payload } from "../../../../domain/dtos/jwt-payload";
import { IUpdateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { UserErrorType } from "../../../../domain/enums";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { IMaterialRepository } from "../../../../infra/repositories";
import { IUpdateMaterialUseCase } from "../interface";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { mapMaterialToDocument } from "../../../../infra/databases/mappers";
import { MaterialEntity } from "../../../../domain/entities";

export class UpdateMaterialUseCase implements IUpdateMaterialUseCase {
  constructor(private _materialRepository: IMaterialRepository) {}

  async execute(
    {
      title,
      mentorId,
      description,
      type,
      duration,
      fileKey,
      materialId,
    }: IUpdateMaterialRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (mentorId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const material = await this._materialRepository.findByIdPopulate(
        materialId
      );
      if (!material) {
        return {
          data: { error: MaterialErrorType.MaterialNotFound },
          success: false,
        };
      }
      if (material.mentor.id !== mentorId) {
        return {
          data: { error: UserErrorType.UserCantUpdate },
          success: false,
        };
      }

      const updateData = MaterialEntity.create({
        title,
        mentorId,
        description,
        type,
        duration,
        fileKey,
      });

      const updatedMaterial = await this._materialRepository.update(
        material.id,
        mapMaterialToDocument(updateData)
      );

      if (!updatedMaterial) {
        return {
          data: { error: MaterialErrorType.MaterialCreationFailed },
          success: false,
        };
      }

      return { data: updatedMaterial.id, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
