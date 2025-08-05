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
import {
  mapLessonToDocument,
  mapLessonToDTO,
} from "../../../../infra/databases/mappers";

export class CreateLessonUseCase implements ICreateLessonUseCase {
  constructor(
    private _lessonRepository: ILessonRepository,
    private _courseRepository: ICourseRepository
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

      const createdLesson = await this._lessonRepository.create(
        mapLessonToDocument(lessonEntity)
      );

      if (!createdLesson) {
        return {
          data: { error: LessonErrorType.LessonCreationFailed },
          success: false,
        };
      }

      const mappedData = mapLessonToDTO(createdLesson);

      await this._courseRepository.addLessonToCourse(courseId, mappedData.id);

      return { data: mappedData.id, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
