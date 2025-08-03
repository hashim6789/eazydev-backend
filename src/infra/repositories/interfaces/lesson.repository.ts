import {
  // ILessonOutDTO,
  // ICreateLessonInDTO,
  // IUpdateLessonRequestDTO,
  ILessonOutPopulateDTO,
} from "../../../domain/dtos";
import { ILesson } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface ILessonRepository extends IBaseRepository<ILesson> {
  // create(data: ICreateLessonInDTO): Promise<ILessonOutDTO>;
  addMaterialToLesson(lessonId: string, materialId: string): Promise<void>;
  findByIdPopulate(id: string): Promise<ILessonOutPopulateDTO | null>;
  // update(
  //   id: string,
  //   data: IUpdateLessonRequestDTO
  // ): Promise<ILessonOutDTO | null>;
}
