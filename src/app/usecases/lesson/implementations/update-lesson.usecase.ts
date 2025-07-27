import {
  IUpdateLessonRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { LessonErrorType, UserErrorType } from "../../../../domain/enums";
import { ILessonRepository } from "../../../../infra/repositories";
import { IUpdateLessonUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  mapLessonToDocument,
  mapLessonToDTO,
} from "../../../../infra/databases/mappers";

export class UpdateLessonUseCase implements IUpdateLessonUseCase {
  constructor(private lessonRepository: ILessonRepository) {}

  async execute(
    data: IUpdateLessonRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      const existingLesson = await this.lessonRepository.findById(data.id);
      if (!existingLesson) {
        return {
          data: { error: LessonErrorType.LessonNotFound },
          success: false,
        };
      }

      const mappedData = mapLessonToDTO(existingLesson);

      if (mappedData.mentorId !== authData.userId) {
        return {
          data: { error: UserErrorType.UserCantUpdate },
          success: false,
        };
      }

      const { mentorId, courseId, id, ...updateData } = data;

      Object.assign(existingLesson, updateData);
      const updatedLesson = await this.lessonRepository.update(
        data.id,
        existingLesson
      );
      if (!updatedLesson) {
        return {
          data: { error: LessonErrorType.LessonCreationFailed },
          success: false,
        };
      }

      return { data: updatedLesson.id, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
