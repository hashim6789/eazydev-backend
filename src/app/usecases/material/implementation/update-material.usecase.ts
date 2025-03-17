import { Payload } from "../../../../domain/dtos/jwt-payload";
import {
  ICreateMaterialRequestDTO,
  IUpdateMaterialDTO,
} from "../../../../domain/dtos/material/material";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { MaterialEntity } from "../../../../domain/entities";
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
      type,
      description,
      fileKey,
      duration,
    }: IUpdateMaterialDTO,
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

      const createdMaterial = await this.materialRepository.create(
        materialEntity
      );

      if (!createdMaterial) {
        return {
          data: { error: MaterialErrorType.MaterialCreationFailed },
          success: false,
        };
      }

      return { data: createdMaterial, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
