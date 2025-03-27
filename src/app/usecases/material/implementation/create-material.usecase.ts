import { Payload } from "../../../../domain/dtos/jwt-payload";
import { ICreateMaterialRequestDTO } from "../../../../domain/dtos/material";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { MaterialEntity } from "../../../../domain/entities";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { MaterialErrorType } from "../../../../domain/enums/material";
import { ILessonRepository } from "../../../repositories";
import { IMaterialRepository } from "../../../repositories/material.repository";
import { ICreateMaterialUseCase } from "../interface";

export class CreateMaterialUseCase implements ICreateMaterialUseCase {
  constructor(
    private materialRepository: IMaterialRepository,
    private lessonRepository: ILessonRepository
  ) {}

  async execute(
    {
      title,
      mentorId,
      type,
      description,
      fileKey,
      duration,
    }: // lessonId,
    ICreateMaterialRequestDTO,
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

      // await this.lessonRepository.addMaterialToLesson(
      //   lessonId,
      //   createdMaterial.id
      // );

      return { data: createdMaterial.id, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
