import {
  ILessonOutDTO,
  ICreateLessonInDTO,
  ILessonOutPopulateDTO,
  IUpdateLessonRequestDTO,
} from "../../domain/dtos";

export interface ILessonRepository {
  create(data: ICreateLessonInDTO): Promise<ILessonOutDTO>;
  addMaterialToLesson(lessonId: string, materialId: string): Promise<void>;
  findByIdPopulate(id: string): Promise<ILessonOutPopulateDTO | null>;
  update(
    id: string,
    data: IUpdateLessonRequestDTO
  ): Promise<ILessonOutDTO | null>;
}
