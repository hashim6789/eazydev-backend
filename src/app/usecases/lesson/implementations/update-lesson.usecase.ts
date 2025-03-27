import {
  IUpdateLessonRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { LessonErrorType, UserErrorType } from "../../../../domain/enums";
import { ILessonRepository } from "../../../repositories";
import { IUpdateLessonUseCase } from "../interfaces";

export class UpdateLessonUseCase implements IUpdateLessonUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(
    data: IUpdateLessonRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      const lesson = await this.lessonRepository.findByIdPopulate(data.id);
      if (!lesson) {
        return {
          data: { error: LessonErrorType.LessonNotFound },
          success: false,
        };
      }
      if (lesson.mentorId !== authData.userId) {
        return {
          data: { error: UserErrorType.UserCantUpdate },
          success: false,
        };
      }

      const updatedLesson = await this.lessonRepository.update(data.id, data);
      if (!updatedLesson) {
        return {
          data: { error: LessonErrorType.LessonCreationFailed },
          success: false,
        };
      }

      return { data: updatedLesson.id, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
