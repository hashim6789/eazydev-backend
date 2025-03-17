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
import { ICourseRepository, ILessonRepository } from "../../../repositories";
import { ICreateLessonUseCase } from "../interfaces";

export class CreateLessonUseCase implements ICreateLessonUseCase {
  constructor(
    private lessonRepository: ILessonRepository,
    private courseRepository: ICourseRepository
  ) {}

  async execute(
    { title, description, mentorId, courseId }: ICreateLessonRequestDTO,
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
        materials: [],
      });

      const createdLesson = await this.lessonRepository.create(lessonEntity);

      if (!createdLesson) {
        return {
          data: { error: LessonErrorType.LessonCreationFailed },
          success: false,
        };
      }

      await this.courseRepository.addLessonToCourse(courseId, createdLesson.id);

      return { data: { lessonId: createdLesson.id }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
