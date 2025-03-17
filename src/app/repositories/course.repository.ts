import { ICourseOutDTO, ICreateCourseInDTO } from "../../domain/dtos/course";

export interface ICourseRepository {
  create(data: ICreateCourseInDTO): Promise<ICourseOutDTO>;
  addLessonToCourse(courseId: string, lessonId: string): Promise<void>;
}
