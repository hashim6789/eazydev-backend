import { ICourseOutDTO, ICreateCourseInDTO } from "../../domain/dtos/course";
import { CourseStatus } from "../../domain/types";

export interface ICourseRepository {
  create(data: ICreateCourseInDTO): Promise<ICourseOutDTO>;
  addLessonToCourse(courseId: string, lessonId: string): Promise<void>;
  updateStatusOfCourse(
    courseId: string,
    newStatus: CourseStatus
  ): Promise<boolean>;
  findById(id: string): Promise<ICourseOutDTO | null>;
}
