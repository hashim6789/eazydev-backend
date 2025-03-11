import { Payload } from "../../../../domain/dtos/jwt-payload.dto";
import { ICreateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { MaterialEntity } from "../../../../domain/entities";
import { AuthenticateUserErrorType } from "../../../../domain/enums/Authenticate/error-type.enum";
import { MaterialErrorType } from "../../../../domain/enums/material/error-type.enum";
import { IMaterialRepository } from "../../../repositories/material.repository";
import { ICreateMaterialUseCase } from "../interface";

export class CreateMaterialUseCase implements ICreateMaterialUseCase {
  constructor(private materialRepository: IMaterialRepository) {}

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
