import { Payload, ResponseDTO } from "../../../../domain/dtos";
import { LessonErrorType } from "../../../../domain/enums";
import { ILessonRepository } from "../../../repositories";
import { IGetLessonUseCase } from "../interfaces";

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
