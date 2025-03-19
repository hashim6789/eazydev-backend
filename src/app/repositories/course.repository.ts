import {
  ICourseOutDTO,
  ICourseOutPopulateDTO,
  ICreateCourseInDTO,
  IUpdateCourseInDTO,
  QueryCourse,
} from "../../domain/dtos/course";
import { PaginationDTO } from "../../domain/dtos/pagination.dtos";
import { CourseStatus } from "../../domain/types";

export interface ICourseRepository {
  create(data: ICreateCourseInDTO): Promise<ICourseOutDTO>;
  addLessonToCourse(courseId: string, lessonId: string): Promise<void>;
  updateStatusOfCourse(
    courseId: string,
    newStatus: CourseStatus
  ): Promise<boolean>;
  findById(id: string): Promise<ICourseOutDTO | null>;
  update(id: string, data: IUpdateCourseInDTO): Promise<ICourseOutDTO | null>;
  findAll(query: QueryCourse): Promise<PaginationDTO>;
  findByIdPopulate(id: string): Promise<ICourseOutPopulateDTO | null>;
}
