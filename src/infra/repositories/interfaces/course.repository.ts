import {
  // ICourseOutDTO,
  // IUpdateCourseInDTO,
  // ICreateCourseInDTO,
  ICourseOutPopulateDTO,
  ICourseSimpleOutDTO,
  QueryCourse,
} from "../../../domain/dtos/course";
import { PaginationDTO } from "../../../domain/dtos/pagination.dtos";
import { CourseStatus } from "../../../domain/types";
import { ICourse } from "../../databases/interfaces";
import { IBaseRepository } from "./base.repository";

export interface ICourseRepository extends IBaseRepository<ICourse> {
  // create(data: ICreateCourseInDTO): Promise<ICourseOutDTO>;
  addLessonToCourse(courseId: string, lessonId: string): Promise<void>;
  updateStatusOfCourse(
    courseId: string,
    newStatus: CourseStatus
  ): Promise<ICourseSimpleOutDTO | null>;
  // findById(id: string): Promise<ICourseOutDTO | null>;
  // update(id: string, data: IUpdateCourseInDTO): Promise<ICourseOutDTO | null>;
  findAll(query: QueryCourse): Promise<PaginationDTO>;
  findAllByMentorId(
    query: QueryCourse,
    mentorId: string
  ): Promise<PaginationDTO>;
  findAllPublished(query: QueryCourse): Promise<PaginationDTO>;
  findByIdPopulate(id: string): Promise<ICourseOutPopulateDTO | null>;
  userRevenueAnalyze(mentorId: string): Promise<any>;
}
