import {
  ICreateLessonRequestDTO,
  ILessonOutDTO,
  ILessonOutPopulateDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { LessonEntity } from "../../../../domain/entities";
import {
  AuthenticateUserErrorType,
  LessonErrorType,
} from "../../../../domain/enums";
import { ICourseRepository, ILessonRepository } from "../../../repositories";
import { ICreateLessonUseCase, IGetLessonUseCase } from "../interfaces";

export class GetLessonUseCase implements IGetLessonUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(lessonId: string, authData: Payload): Promise<ResponseDTO> {
    try {
      const lesson = await this.lessonRepository.findByIdPopulate(lessonId);

      if (!lesson) {
        return {
          data: { error: LessonErrorType.LessonNotFound },
          success: false,
        };
      }

      return { data: lesson, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
