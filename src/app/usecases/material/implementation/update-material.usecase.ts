import { Payload } from "../../../../domain/dtos/jwt-payload";
import { IUpdateMaterialRequestDTO } from "../../../../domain/dtos/material";

import { ResponseDTO } from "../../../../domain/dtos/response";
import { MaterialEntity } from "../../../../domain/entities";
import { UserErrorType } from "../../../../domain/enums";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { IMaterialRepository } from "../../../repositories/material.repository";
import { ICreateMaterialUseCase, IUpdateMaterialUseCase } from "../interface";

export class UpdateMaterialUseCase implements IUpdateMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

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

      const material = await this.materialRepository.findById(materialId);
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

      const updateData = {
        title,
        mentorId,
        description,
        type,
        duration,
        fileKey,
      };

      const updatedMaterial = await this.materialRepository.update(
        material.id,
        updateData
      );

      if (!updatedMaterial) {
        return {
          data: { error: MaterialErrorType.MaterialCreationFailed },
          success: false,
        };
      }

      return { data: updatedMaterial.id, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
