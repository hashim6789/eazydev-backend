import {
  ICreateLessonRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { LessonEntity } from "../../../../domain/entities";
import {
  AuthenticateUserErrorType,
  LessonErrorType,
} from "../../../../domain/enums";
import {
  ICourseRepository,
  ILessonRepository,
} from "../../../../infra/repositories";
import { ICreateLessonUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class CreateLessonUseCase implements ICreateLessonUseCase {
  constructor(
    private lessonRepository: ILessonRepository,
    private courseRepository: ICourseRepository
  ) {}

  async execute(
    {
      title,
      description,
      mentorId,
      courseId,
      materials,
    }: ICreateLessonRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (mentorId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }
      const lessonEntity = LessonEntity.create({
        title,
        description,
        mentorId,
        materials,
      });

      const createdLesson = await this.lessonRepository.create(lessonEntity);

      if (!createdLesson) {
        return {
          data: { error: LessonErrorType.LessonCreationFailed },
          success: false,
        };
      }

      await this.courseRepository.addLessonToCourse(courseId, createdLesson.id);

      return { data: createdLesson.id, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
