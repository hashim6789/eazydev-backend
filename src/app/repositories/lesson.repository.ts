import { ILessonOutDTO, ICreateLessonInDTO } from "../../domain/dtos";

export interface ILessonRepository {
  create(data: ICreateLessonInDTO): Promise<ILessonOutDTO>;
  addMaterialToLesson(lessonId: string, materialId: string): Promise<void>;
}
